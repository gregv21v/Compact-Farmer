/**
  Plot - a plot of land that can be farmed on
*/
import {
  SeedItem, HoeItem, DirtBlockItem, ShovelItem
} from "../items/items.js"

import { Block } from "./Block.js"
import { Crop, GrassCrop, SpinachCrop, ArugulaCrop } from "../crops/crops.js"
import { PlantRecipeRegistry } from "../recipes/recipes.js"

export class DirtBlock extends Block {
    /**
      constructor()
      @description constructs the item
    */
    constructor(player, world, coordinate) {
      super(player, world, coordinate)

      this._name = "DirtBlock"
      this._crop = null;
      this.isCropFullyGrown = false; // there are two stages, start and complete
      this.isHydrated = false;
      this.isPlowed = false;
      this._progress = 0;

      // elements in the soil that can be extracted by the plant

      this._displayName = "Dirt Block"
      this._description = "Left click with a hoe to till. After you have tilled, you can plant a crop. Left click with a seed to plant."
      this.updateToolTip()
    }



    /**
      toJSON()
      @description converts this block to its json representation
    */
    toJSON() {
      var crop = null
      if(this._crop) {
        crop = this._crop.toJSON()
      }

      return {
        name: this._name,
        coordinate: this._coordinate,
        crop: crop,
        isCropFullyGrown: this.isCropFullyGrown,
        isHydrated: this.isHydrated,
        isPlowed: this.isPlowed,
        progress: this._progress
      }
    }

    /**
      fromJSON()
      @description converts a json object into this world
    */
    static fromJSON(player, world, json) {
      var newDirtBlock = new DirtBlock(player, world, json.coordinate)
      newDirtBlock._progress = json.progress;
      
      if(json.crop !== null) {
        if(json.crop.name === "GrassCrop") {
          newDirtBlock._crop = GrassCrop.fromJSON(json)
        } else if(json.crop.name === "ArugulaCrop") {
          newDirtBlock._crop = ArugulaCrop.fromJSON(json)
        } else if(json.crop.name === "SpinachCrop") {
          newDirtBlock._crop = SpinachCrop.fromJSON(json)
        } else {
          newDirtBlock._crop = Crop.fromJSON(json)
        }
        newDirtBlock._crop.setBlock(newDirtBlock);
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
      if(this._crop !== null)
        this._crop.delete()
    }

    /**
      createGraphic()
      @description override this function to draw the graphics for the
        block.
        Each svg should be added to this._svg
      @param group the svg group to create the graphics on

    */
    createGraphic(group) {
      // make your graphics here add add them to the this._svg object
      this._svg.rows = []
      this.rows = 4;

      for (var i = 0; i < this.rows; i++) {
        let img = group.append("image");
        img.attr("href", "images/tilledSoil.png");
        this._svg.rows.push(img);
      }
      this._svg.cropGroup = group.append("g")
      this._svg.progressBar = group.append("rect")
    }



    /**
      render()
      @description renders the item to the SVG canvas
    */
    render() {
      super.render()

      if(this._crop !== null) {
        this._crop.render()
      }
    }

    /**
     * update()
     * @description updates the block
     */
    update() {
      super.update()
      let worldPosition = this._world.coordinateToPosition(this._coordinate);
      // render the background
      if(this.isHydrated)
        this._svg.background.style("fill", "#42240a")
      else
        this._svg.background.style("fill", "#7d4514") // dehydrated color

      if(this.isPlowed)
        for (var i = 0; i < this.rows; i++) {
          this._svg.rows[i]
            .attr("x1", worldPosition.x)
            .attr("y1", worldPosition.y + (i)*(Block.size/(this.rows)))
            .attr("width", Block.size)
            .attr("height", Block.size / 4)
            .style("stroke", "black")
        }

      this._svg.progressBar
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y + Block.size - Block.ProgressBarHeight)
        .attr("height", Block.ProgressBarHeight)
        .style("fill", "green")
      

      if(this._crop) this._crop.update()
    }

    /**
     * attach()
     * @description attaches the crop to the block dom
     */
    attach(tooltipsLayer, blocksLayer) {
      super.attach(tooltipsLayer, blocksLayer)
      if(this._crop !== null) {
        this._crop.attach(this._svg.cropGroup)
      }
    }

    /**
      unrender()
      @description removes the block from the canvas
    */
    remove() {
      this._svg.background.remove();
      this._svg.clickArea.remove();
      this._svg.cropGroup.selectAll("*").remove();
      this._svg.graphicsGroup.selectAll("*").remove();
      this._svg.progressBar.remove();
      for (let row of this._svg.rows) {
        row.remove();
      }
    }

    /**
      hydrate()
      @description hydrates the DirtBlock
    */
    hydrate() {
      this.isHydrated = true;
      this._svg.background.style("fill", "#361d07")
    }

    /**
      dehydrate()
      @description hydrates the DirtBlock
    */
    dehydrate() {
      this.isHydrated = false;
      this._svg.background.style("fill", "#7d4514")
    }

    /**
      onClick()
      @description the function called when this block is clicked
    */
    onLeftClick() {
      super.onLeftClick()
      var selectedItem = this._player.toolbar.currentlySelected.item
      console.log("Farm Block Clicked");

      if(selectedItem instanceof SeedItem) {
        // plant seeds
        if(this._crop === null && this.isHydrated && this.isPlowed) {
          var crop = selectedItem.getCrop();
          crop.setBlock(this);
          this._player.toolbar.useSelectedSlot()
          this.plantCrop(crop);
        }
      } else if(selectedItem instanceof HoeItem) {
        console.log("Plowing land...");
        // plow land
        this.plow(selectedItem)
      } else if(selectedItem instanceof ShovelItem) {
        // remove block from world
        this._world.removeBlock(this);

        if(!this._player.toolbar.add(new DirtBlockItem())) {
          this._player.inventory.add(new DirtBlockItem())
        }
      } else {
        console.log("No item selected.");
      }


      // harvest crop
      if(this._crop !== null) {
        this.harvest()
      }

    }

    /**
      plantCrop()
      @description plants a crop on this farm land
      @param crop the crop to plant
    */
    plantCrop(crop) {
      this._crop = crop
      this._crop.render()
      this._progress = 0;
      this._crop.attach(this._svg.cropGroup)
      this.setGrowthTimer()
    }

    /**
      growthFrame()
      @description the frame of the growth of the plant
    */
    setGrowthTimer() {
      var self = this;
      var id = setInterval(frame, this._crop.getGrowTime());
      function frame() {
        if (self._progress >= Block.size) {
          self.isCropFullyGrown = true;
          // propagate the crop to adjacent blocks
          self._world.getSurroundingBlocks(self).forEach((block) => {
            if(block instanceof DirtBlock && block.isPlowed) {
              if(block._crop === null) {
                var crop = self._crop.clone()
                crop.setBlock(block);
                block.plantCrop(crop);
              }
            }
          })
          clearInterval(id);
        } else {
          self._progress++;
          self.svg.progressBar.attr("width", self._progress)
        }
      }
    }




    /**
      plow()
      @description prepares this plot of land for planting

    */
    plow(hoe) {
      hoe.use()

      var worldPosition = this._world.coordinateToPosition(this._coordinate);

      for (var i = 0; i < this.rows; i++) {
        this._svg.rows[i]
          .attr("x", worldPosition.x)
          .attr("y", worldPosition.y + (i)*(Block.size/(this.rows)))
          .attr("width", Block.size)
          .attr("height", Block.size / 4)
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
        var recipe = PlantRecipeRegistry.lookup(this._crop.name)
        var products = recipe.getProducts();
        for (var product of products) {
          if(!this._player.toolbar.add(product)) {
            this._player.inventory.add(product)
          }
        }
        this._crop.removeBlock()
        this._crop = null;
        this.isCropFullyGrown = false;
        this._svg.progressBar.attr("width", 0)
      }
    }

}
