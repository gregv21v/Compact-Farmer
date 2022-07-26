/**
  Item
*/
import { CompostableItem } from "./items.js"


export class SpinachItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "SpinachItem"
    this._description = "Used for crafting"
    this._displayName = "Spinach"
  }


  /**
    createGraphic()
    @description override this function to draw the graphics for the
      block.
      Each svg should be added to this._svg
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    // draw the blade of grass
    this._svg.image = group.append("image")
    this._svg.label = group.append("text")
  }

  /**
    render()
    @description initialize the values for the svg
  */
  render() {
    super.render();

    this._svg.image
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("href", "images/spinach.png")
  }




  /**
    setPosition()
    @description sets the position of this item
    @param position the new position of this item
  */
  set position(position) {
    super.position = position;

    this._svg.image
      .attr("x", this._position.x)
      .attr("y", this._position.y)
  }

  /**
    get position
    @description gets the position of the item
  */
  get position() {
    return super.position;
  }

  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new SpinachItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }

  /**
    onClick()
    @description the function called when this block is clicked
  */
  onClick() {
    // do something ...
    console.log(this.name);
  }
}
