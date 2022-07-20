/**
  Plot - a plot of land that can be farmed on
*/
import { Block } from "./blocks.js"
import { CompostableItem, DirtBlockItem } from "../items/items.js"

export class ComposterBlock extends Block {

  /**
   * constructor()
   * @description constructs the item
   * @param {player} player the player playing the game
   * @param {World} world the world the player is playing in
   * @param {Point} coordinate the coordinate of the block in the world
   */
  constructor(player, world, coordinate) {
    super(player, world, coordinate)

    this.name = "ComposterBlock"
  }

  /**
    toJSON()
    @description converts this block to its json representation
  */
  toJSON() {
    return {
      name: this.name,
      coordinate: this.coordinate,
      progress: this._progress
    }
  }

  /**
    fromJSON()
    @description converts a json object into this world
  */
  static fromJSON(player, world, json) {
    let newBlock = new ComposterBlock(player, world, json.coordinate);
    newBlock._progress = json.progress
    console.log(newBlock);
    return newBlock
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
    this.svg.circle = group.append("circle")
    this.svg.progressBar = group.append("rect")
  }



  /**
    render()
    @description sets all the attributes of the svg to their appropriate class
      variables
  */
  render() {
    super.render()

    let worldPosition = this.world.coordinateToPosition(this.coordinate);

    // render the cross
    this.svg.circle
      .attr("cx", worldPosition.x + Block.size / 2)
      .attr("cy", worldPosition.y + Block.size / 2)
      .attr("r", Block.size / 2 - 5)
      .style("fill", "#45211e")

    this.svg.progressBar
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y + Block.size - Block.ProgressBarHeight)
        .attr("height", Block.ProgressBarHeight)
        .attr("width", this._progress / this._progressMax * Block.size)
        .style("fill", "#45211e")
  }



  /**
    onClick()
    @description the function called when this block is clicked
  */
  onLeftClick() {
    super.onLeftClick();

    let selectedSlot = this.player.toolbar.currentlySelected
    let selectedItem = selectedSlot.item

    if(
      selectedItem && 
      selectedItem instanceof CompostableItem &&
      this._progress + selectedItem.compostValue <= this._progressMax
    ) {
      selectedItem.consumeOne(selectedSlot)

      // update the progress bar
      this._progress += selectedItem.compostValue;
      this.svg.progressBar.attr("width", this._progress / this._progressMax * Block.size)
    }
  }

  /**
   * onRightClick()
   * @description the function called when this block is right clicked
   */
  onRightClick() {
    super.onRightClick();

    let selectedSlot = this.player.toolbar.currentlySelected
    let selectedItem = selectedSlot.item

    // if the compost bin is at least half full, 
    // pull out a dirt block
    if(selectedItem === null && this._progress >= this._progressMax / 2) {
      this._progress -= this._progressMax / 2
      this.svg.progressBar.attr("width", (this._progress / this._progressMax) * Block.size)

      selectedSlot.addItem(new DirtBlockItem())
    }

    console.log("Right Clicked Composter Block");
  }


}
