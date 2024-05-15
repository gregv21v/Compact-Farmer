/**
  Plot - a plot of land that can be farmed on
*/
import { PlantRecipeRegistry } from "../recipes/recipes.js"
import {
  SieveItem, FullLeafBucketItem, EmptyLeafBucketItem
} from "../items/items.js"
import { Block, DirtBlock } from "./blocks.js"

export class WaterBlock extends Block {
  /**
    constructor()
    @description constructs the item
  */
  constructor(player, world, coordinate) {
    super(player, world, coordinate)

    this._name = "WaterBlock"

    this._displayName = "Water"
    this._description = "A block of water"
    this.updateToolTip()
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
      Each svg should be added to this._svg
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    // make your graphics here add add them to the this._svg object
    this._svg.image = group.append("svg:image");

    this._svg.image.attr("href", "images/water.png")

  }

  
  /**
   * update()
   * @description updates the state of the block
   */
  update() {
    let worldPosition = this.getWorldPosition();
      let size = Block.size;
      let self = this;
      // render the background
      this._svg.image
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y)
        .attr("width", size)
        .attr("height", size)

      this._svg.clickArea
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y)
        .attr("width", size)
        .attr("height", size)
        .style("fill-opacity", 0)
        .on("click", (event) => {self.onLeftClick(event)})
        .on("contextmenu", (event) => self.onRightClick(event))
        .on("mouseover", (event) => {self.onMouseOver(event)})
        .on("mouseout", (event) => {self.onMouseOut(event)})

      this._tooltip.position = {
        x: worldPosition.x,
        y: worldPosition.y - 90
      }
  }


  /**
    updateWorld()
    @description updates the state of the block
  */
  updateWorld(world) {

    // hydrate all the blocks in the 2 block radius of this block
    var start = {
      x: this._coordinate.x - 2,
      y: this._coordinate.y - 2
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
  onLeftClick() {
    super.onLeftClick();
    var selected = this._player.toolbar.currentlySelected
    if(selected !== null) {
      var selectedItem = selected.item
      if(selectedItem instanceof SieveItem) {
        // sieve
        
        if(selectedItem.use()) {
          selectedItem.update()
          this.sieve()
        } else {
          selectedItem.destroy();
          selected.removeItem();
        }
        
      } else if (selectedItem instanceof EmptyLeafBucketItem) {
        // replace emptyLeafBucket with a full one
        selected.replaceItem(new FullLeafBucketItem());
      }
    }
  }

  /**
    sieve()
    @description Sieve the water for plant seeds
  */
  sieve() {
    let recipe = PlantRecipeRegistry.lookup("GrassSieve")
    let products = recipe.getProducts();
    console.log(products);
    for (let product of products) {
      if(!this._player.toolbar.add(product))
        this._player.inventory.add(product)
    }
    console.log("Sieved");
  }
}
