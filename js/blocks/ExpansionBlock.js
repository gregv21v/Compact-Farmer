/**
  Plot - a plot of land that can be farmed on
*/
import { Block, DirtBlock } from "./blocks.js"
import { DirtBlockItem, FullLeafBucketItem } from "../items/items.js"

export class ExpansionBlock extends Block {

  /**
    constructor()
    @description constructs the item
  */
  constructor(player, world, coordinate) {
    super(player, world, coordinate)

    this._name = "ExpansionBlock"

    this._displayName = "Expansion Block"
    this._description = "Left click with a Dirt block to expand your farm"
    this.updateToolTip()
  }

  /**
    fromJSON()
    @description converts a json object into this world
  */
  static fromJSON(player, world, json) {
    return new ExpansionBlock(player, world, json.coordinate);
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
    this._svg.rectHorizontal = group.append("rect"),
    this._svg.rectVertical = group.append("rect")
  }


  /**
   * update()
   * @description updates the block
   */
  update() {
    super.update();

    var worldPosition = this._world.coordinateToPosition(this._coordinate);
    var size = Block.size;
    var crossWidth = size / 6;

    // render the cross
    this._svg.rectHorizontal
      .attr("x", worldPosition.x - crossWidth / 2 + size / 2)
      .attr("y", worldPosition.y + crossWidth)
      .attr("width", crossWidth)
      .attr("height", size - crossWidth*2)
      .style("fill", "green")

    this._svg.rectVertical
      .attr("x", worldPosition.x + crossWidth)
      .attr("y", worldPosition.y - crossWidth / 2 + size / 2)
      .attr("width", size - crossWidth*2)
      .attr("height", crossWidth)
      .style("fill", "green")
    
    //console.log("Updateing expansion block");
  }



  /**
    onLeftClick()
    @description the function called when this block is clicked
  */
  onLeftClick() {
    super.onLeftClick();
    let selectedSlot = this._player.toolbar.currentlySelected
    let selectedItem = selectedSlot.item
    if(selectedItem) {
      if(selectedItem instanceof DirtBlockItem) {
        selectedSlot.consumeOne();  
        this._world.expand(new DirtBlock(this._player, this._world, this._coordinate))
      } else if(selectedItem instanceof FullLeafBucketItem) {
        selectedSlot.consumeOne();
        this._world.expand(new WaterBlock(this._player, this._world, this._coordinate))
      }
    }

  }

  /**
    plow()
    @description prepares this plot of land for planting

  */
  plow() {

  }

  /**
    harvest()
    @description harvest the crop from this plot of land
  */
  harvest() {

  }

}
