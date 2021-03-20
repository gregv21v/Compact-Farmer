/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["items/SieveItem", "blocks/Block", "blocks/FarmBlock", "d3"],
  function(SieveItem, Block, FarmBlock, d3) {
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
        render()
        @description renders the item to the SVG canvas
      */
      render() {
        super.render()
        // render the background
        this.svg.background.style("fill", "blue")
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
            if(world.blocks[coordinateAsString] instanceof FarmBlock) {
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
        var selectedItem = this.player.toolbar.currentlySelected.item

        if(selectedItem instanceof SieveItem) {
          // sieve
          this.sieve()
        }

      }

      /**
        harvest()
        @description harvest the crop from this plot of land
      */
      sieve() {
        var recipe = this.player.recipeRegistry.lookup("GrassSieve")
        var products = recipe.getProducts();
        console.log(products);
        for (var product of products) {
          this.player.inventory.add(product)
        }
        console.log("Sieved");
      }

    }
  })
