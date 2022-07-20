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

    this.name = "ExpansionBlock"

    this.updateToolTip("Click with a Dirt block to expand your farm")
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
      Each svg should be added to this.svg
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    // make your graphics here add add them to the this.svg object
    this.svg.rectHorizontal = group.append("rect"),
    this.svg.rectVertical = group.append("rect")
  }



  /**
    render()
    @description sets all the attributes of the svg to their appropriate class
      variables
  */
  render() {
    super.render()

    var worldPosition = this.world.coordinateToPosition(this.coordinate);
    var size = Block.size;
    var crossWidth = size / 4;

    // render the cross
    this.svg.rectHorizontal
      .attr("x", worldPosition.x - crossWidth / 2 + size / 2)
      .attr("y", worldPosition.y + crossWidth)
      .attr("width", crossWidth)
      .attr("height", size - crossWidth*2)
      .style("fill", "green")

    this.svg.rectVertical
      .attr("x", worldPosition.x + crossWidth)
      .attr("y", worldPosition.y - crossWidth / 2 + size / 2)
      .attr("width", size - crossWidth*2)
      .attr("height", crossWidth)
      .style("fill", "green")

  }



  /**
    onLeftClick()
    @description the function called when this block is clicked
  */
  onLeftClick() {
    super.onLeftClick();
    let selectedSlot = this.player.toolbar.currentlySelected
    let selectedItem = this.player.toolbar.currentlySelected.item
    if(selectedItem instanceof DirtBlockItem) {
      selectedItem.consumeOne(selectedSlot);
      this.world.expand(new DirtBlock(this.player, this.world, this.coordinate))
    } else if(selectedItem instanceof FullLeafBucketItem) {
      selectedItem.consumeOne(selectedSlot);
      this.world.expand(new WaterBlock(this.player, this.world, this.coordinate))
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
