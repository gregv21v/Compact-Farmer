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
    this._svg.waves = []
    this._waveCount = 5;

    for (let i = 0; i < this._waveCount; i++) {
      this._svg.waves.push(group.append("path"))
    }
  }

  /**
   * updateWaves()
   * @description updates the waves
   */
  updateWaves() {
    var worldPosition = this.getWorldPosition();

    for (var i = 0; i < this._waveCount; i++) {
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
      this._svg.waves[i]
        .style("fill", "none")
        .style("stroke", "#131354")
        .attr("d", path)
    }
  }
  
  /**
   * update()
   * @description updates the state of the block
   */
  update() {
    super.update();

    // render the background
    this._svg.background.style("fill", "blue")

    // update the waves
    this.updateWaves()
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
