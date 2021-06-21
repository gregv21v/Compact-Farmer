/**
  Plot - a plot of land that can be farmed on
*/
import {
  SeedItem, HoeItem, DirtBlockItem, ShovelItem
} from "../items/items.js"

import { Block } from "./Block.js"
import { Crop, GrassCrop } from "../crops/crops.js"
import { PlantRecipeRegistry } from "../recipes/recipes.js"

export class DirtBlock extends Block {
    /**
      constructor()
      @description constructs the item
    */
    constructor(player, world, coordinate) {
      super(player, world, coordinate)

      this.name = "DirtBlock"
      this.crop = null;
      this.isCropFullyGrown = false; // there are two stages, start and complete
      this.isHydrated = false;
      this.isPlowed = false;
      this.growthProgress = 0;

      // elements in the soil that can be extracted by the plant
    }



    /**
      toJSON()
      @description converts this block to its json representation
    */
    toJSON() {
      var crop = null
      if(this.crop) {
        crop = this.crop.toJSON()
      }

      return {
        name: this.name,
        coordinate: this.coordinate,
        crop: crop,
        isCropFullyGrown: this.isCropFullyGrown,
        isHydrated: this.isHydrated,
        isPlowed: this.isPlowed,
        growthProgress: this.growthProgress
      }
    }

    /**
      fromJSON()
      @description converts a json object into this world
    */
    static fromJSON(player, world, json) {
      var newDirtBlock = new DirtBlock(player, world, json.coordinate)
      newDirtBlock.growthProgress = json.growthProgress;
      newDirtBlock.crop = null;
      if(json.crop !== null) {
        if(json.crop.name === "GrassCrop") {
          newDirtBlock.crop = GrassCrop.fromJSON(json)
        } else {
          newDirtBlock.crop = Crop.fromJSON(json)
        }
        newDirtBlock.crop.setBlock(newDirtBlock);
        newDirtBlock.setGrowthTimer()
      }
      newDirtBlock.isCropFullyGrown = json.isCropFullyGrown;
      newDirtBlock.isHydrated = json.isHydrated;
      newDirtBlock.isPlowed = json.isPlowed;
      //newDirtBlock.elements = json.elements;

      return newDirtBlock;
    }

    /**
      delete()
      @description deletes this block
    */
    delete() {
      super.delete()
      if(this.crop !== null)
        this.crop.delete()
    }

    /**
      createGraphic()
      @description override this function to draw the graphics for the
        block.
        Each svg should be added to this.svg
      @param group the svg group to create the graphics on

    */
    createGraphic(group) {
      // make your graphics here add add them to the this.svg object
      this.svg.rows = []
      this.rows = 4;

      for (var i = 0; i < this.rows; i++) {
        this.svg.rows.push(group.append("line"))
      }
      this.svg.cropGroup = group.append("g")
      this.svg.progressBar = group.append("rect")
    }



    /**
      render()
      @description renders the item to the SVG canvas
    */
    render() {
      super.render()

      if(this.crop !== null) {
        this.crop.render()
      }

      var worldPosition = this.world.coordinateToPosition(this.coordinate);
      // render the background
      if(this.isHydrated)
        this.svg.background.style("fill", "#42240a")
      else
        this.svg.background.style("fill", "#7d4514") // dehydrated color

      if(this.isPlowed)
        for (var i = 0; i < this.rows; i++) {
          this.svg.rows[i]
            .attr("x1", worldPosition.x + Block.size/10)
            .attr("y1", worldPosition.y + (i+1)*(Block.size/(this.rows+1)))
            .attr("x2", worldPosition.x + Block.size - Block.size/10)
            .attr("y2", worldPosition.y + (i+1)*(Block.size/(this.rows+1)))
            .style("stroke", "black")
        }

      var progressBarHeight = 4;
      this.svg.progressBar
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y + Block.size - progressBarHeight)
        .attr("height", progressBarHeight)
        .style("fill", "green")
    }

    /**
      unrender()
      @description removes the block from the canvas
    */
    unrender() {
      this.svg.background.remove();
      this.svg.clickArea.remove();
      this.svg.cropGroup.selectAll("*").remove();
      this.svg.graphicsGroup.selectAll("*").remove();
      this.svg.progressBar.remove();
      for (let row of this.svg.rows) {
        row.remove();
      }
    }

    /**
      hydrate()
      @description hydrates the DirtBlock
    */
    hydrate() {
      this.isHydrated = true;
      this.svg.background.style("fill", "#361d07")
    }

    /**
      dehydrate()
      @description hydrates the DirtBlock
    */
    dehydrate() {
      this.isHydrated = false;
      this.svg.background.style("fill", "#7d4514")
    }

    /**
      onClick()
      @description the function called when this block is clicked
    */
    onClick() {
      super.onClick()
      var selectedItem = this.player.toolbar.currentlySelected.item
      console.log("Farm Block Clicked");

      if(selectedItem instanceof SeedItem) {
        // plant seeds
        if(this.crop === null && this.isHydrated && this.isPlowed) {
          var crop = selectedItem.getCrop();
          crop.setBlock(this);
          this.player.toolbar.useSelectedSlot()
          this.plantCrop(crop);
        }
      } else if(selectedItem instanceof HoeItem) {
        console.log("Plowing land...");
        // plow land
        this.plow(selectedItem)
      } else if(selectedItem instanceof ShovelItem) {
        // remove block from world
        this.world.removeBlock(this);
        this.player.inventory.add(new DirtBlockItem())
      } else {
        console.log("No item selected.");
      }


      // harvest crop
      if(this.crop !== null) {
        this.harvest()
      }

    }

    /**
      plantCrop()
      @description plants a crop on this farm land
      @param crop the crop to plant
    */
    plantCrop(crop) {
      this.crop = crop
      this.crop.render()
      this.growthProgress = 0;
      this.setGrowthTimer()
    }

    /**
      growthFrame()
      @description the frame of the growth of the plant
    */
    setGrowthTimer() {
      var self = this;
      var id = setInterval(frame, this.crop.getGrowTime());
      function frame() {
        if (self.growthProgress >= Block.size) {
          self.isCropFullyGrown = true;
          clearInterval(id);
        } else {
          self.growthProgress++;
          self.svg.progressBar.attr("width", self.growthProgress)
        }
      }
    }




    /**
      plow()
      @description prepares this plot of land for planting

    */
    plow(hoe) {
      hoe.use()

      var worldPosition = this.world.coordinateToPosition(this.coordinate);

      for (var i = 0; i < this.rows; i++) {
        this.svg.rows[i]
          .attr("x1", worldPosition.x + Block.size/10)
          .attr("y1", worldPosition.y + (i+1)*(Block.size/(this.rows+1)))
          .attr("x2", worldPosition.x + Block.size - Block.size/10)
          .attr("y2", worldPosition.y + (i+1)*(Block.size/(this.rows+1)))
          .style("stroke", "black")
      }
      this.isPlowed = true;
    }

    /**
      harvest()
      @description harvest the crop from this plot of land
    */
    harvest() {
      // harvest the crop
      if(this.isCropFullyGrown) {
        var recipe = PlantRecipeRegistry.lookup(this.crop.name)
        var products = recipe.getProducts();
        for (var product of products) {
          this.player.inventory.add(product)
        }
        this.crop.removeBlock()
        this.crop = null;
        this.isCropFullyGrown = false;
        this.svg.progressBar.attr("width", 0)
      }
    }

}
