/**
  Plot - a plot of land that can be farmed on
*/
define(
  [
    "items/SeedItem",
    "items/HoeItem",
    "blocks/Block",
    "worldObjects/Crop",
    "d3"
  ],
  function(SeedItem, HoeItem, Block, Crop, d3) {
    return class FarmBlock extends Block {

      /**
        constructor()
        @description constructs the item
      */
      constructor(player, coordinate) {
        super(player, coordinate)

        this.name = "FarmBlock"
        this.crop = null;
        this.isCropFullyGrown = false; // there are two stages, start and complete
        this.isHydrated = false;
        this.isPlowed = false;
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
          isPlowed: this.isPlowed
        }
      }

      /**
        fromJSON()
        @description converts a json object into this world
      */
      static fromJSON(player, json) {
        var newFarmBlock = new FarmBlock(player, json.coordinate)
        newFarmBlock.crop = null;
        if(json.crop !== null) {
          if(json.crop.name === "GrassCrop") {
            newFarmBlock.crop = GrassCrop.fromJSON(json)
          } else {
            newFarmBlock.crop = Crop.fromJSON(json)
          }
        }
        newFarmBlock.isCropFullyGrown = json.isCropFullyGrown;
        newFarmBlock.isHydrated = json.isHydrated;
        newFarmBlock.isPlowed = json.isPlowed;
        return newFarmBlock;
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

        var worldPosition = this.player.world.coordinateToPosition(this.coordinate);
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
        hydrate()
        @description hydrates the farmBlock
      */
      hydrate() {
        this.isHydrated = true;
        this.svg.background.style("fill", "#361d07")
      }

      /**
        dehydrate()
        @description hydrates the farmBlock
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
        var selectedItem = this.player.toolbar.getCurrentlySelected().item

        if(selectedItem instanceof SeedItem) {
          // plant seeds
          if(this.crop === null && this.isHydrated && this.isPlowed) {
            var crop = selectedItem.getCrop();
            crop.setBlock(this);
            this.plantCrop(crop);
          }
        } else if(selectedItem instanceof HoeItem) {
          console.log("Plowing land...");
          // plow land
          this.plow()
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

        var self = this;
        var width = 0;
        var id = setInterval(frame, crop.getGrowTime());
        function frame() {
          if (width >= Block.size) {
            self.isCropFullyGrown = true;
            clearInterval(id);
          } else {
            width++;
            self.svg.progressBar.attr("width", width)
          }
        }
      }




      /**
        plow()
        @description prepares this plot of land for planting

      */
      plow() {
        var worldPosition = this.player.world.coordinateToPosition(this.coordinate);

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
          var recipe = this.player.recipeRegistry.lookup(this.crop.name)
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
  })
