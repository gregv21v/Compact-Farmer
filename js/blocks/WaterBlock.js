/**
  Plot - a plot of land that can be farmed on
*/
define(
  [
    "recipes/PlantRecipeRegistry",
    "items/SieveItem",
    "items/FullLeafBucketItem",
    "items/EmptyLeafBucketItem",
    "blocks/Block",
    "blocks/DirtBlock",
    "d3"
  ],
  function(
    PlantRecipeRegistry,
    SieveItem, FullLeafBucketItem, EmptyLeafBucketItem,
    Block, DirtBlock, d3
  ) {
    return class WaterBlock extends Block {


      /**
        constructor()
        @description constructs the item
      */
      constructor(player, world, coordinate) {
        super(player, world, coordinate)

        this.name = "WaterBlock"
      }

      /**
        fromJSON()
        @description converts a json object into this world
      */
      static fromJSON(player, world, json) {
        return new WaterBlock(player, world, json.coordinate);
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
        this.svg.waves = []
        this.waveCount = 5;

        for (var i = 0; i < this.waveCount; i++) {
          this.svg.waves.push(group.append("path"))
        }
      }

      /**
        render()
        @description renders the item to the SVG canvas
      */
      render() {
        super.render()
        // render the background
        var worldPosition = this.getWorldPosition();
        this.svg.background.style("fill", "blue")

        for (var i = 0; i < this.waveCount; i++) {
          var path = d3.path()
          var count = 6
          var startX = worldPosition.x
          var startY = worldPosition.y + (i+1) * Block.size/count
          path.moveTo(startX, startY)

          for (var j = 0; j < count; j++) {
            var nextX = (j+1) * Block.size/count
            if(j%2 === 0) {
             path.quadraticCurveTo(
               startX + nextX - Block.size/count/2,
               startY + Block.size/count,
               startX + nextX,
               startY
             )
            } else {
             path.quadraticCurveTo(
               startX + nextX - Block.size/count/2,
               startY - Block.size/count,
               startX + nextX,
               startY
             )
            }
          }
          this.svg.waves[i]
            .style("fill", "none")
            .style("stroke", "#131354")
            .attr("d", path)
        }

      }

      /**
        update()
        @description updates the state of the block
      */
      update(world) {

        // hydrate all the blocks in the 2 block radius of this block
        var start = {
          x: this.coordinate.x - 2,
          y: this.coordinate.y - 2
        }
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            var coordinateAsString = Block.getCoordinateAsString({
              x: start.x + x,
              y: start.y + y
            })
            if(world.blocks[coordinateAsString] instanceof DirtBlock) {
              world.blocks[coordinateAsString].hydrate()
            }
          }
        }
      }

      /**
        onClick()
        @description the function called when this block is clicked
      */
      onClick() {
        super.onClick();
        var selected = this.player.toolbar.currentlySelected
        if(selected !== null) {
          var selectedItem = selected.item
          if(selectedItem instanceof SieveItem) {
            // sieve
            this.sieve()
          } else if (selectedItem instanceof EmptyLeafBucketItem) {
            // replace emptyLeafBucket with a full one
            selected.replaceItem(new FullLeafBucketItem());
          }
        }
      }

      /**
        harvest()
        @description harvest the crop from this plot of land
      */
      sieve() {
        var recipe = PlantRecipeRegistry.lookup("GrassSieve")
        var products = recipe.getProducts();
        console.log(products);
        for (var product of products) {
          this.player.inventory.add(product)
        }
        console.log("Sieved");
      }

    }
  })
