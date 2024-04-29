/**
  Item
*/
import { CompostableItem } from "./items.js"


export class SieveItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "SieveItem"
    this._description = "Used to collect seeds from water"
    this._displayName = "Sieve"
    this._compostValue = 28
    this._maxDurability = 2;
    this._currentDurability = 2;

    this.updateToolTip();
  }

  /**
   * use()
   * @description use this item
   */
  use() { 
    if((this._currentDurability * this._quantity-1) > 0) {
      this._currentDurability--;
      if(this._currentDurability == 0) {
        this._quantity--;
        this._currentDurability = this._maxDurability;
      }
      return true;
    } else {
      return false;
    }
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
    this._svg.progressBar = group.append("rect")
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
      .attr("href", this._imageURL)

    this._svg.progressBar
      .attr("x", this._position.x)
      .attr("y", this._position.y + this.size - 2)
      .attr("width", (this._currentDurability / this._maxDurability) * this.size)
      .attr("height", 2)
      .style("fill", "green")
  }


  /**
   * update()
   * @description update the block
   */
  update() { 
    super.update();

    this._svg.image
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.size)
      .attr("height", this.size)
  
    this._svg.progressBar
      .attr("x", this._position.x)
      .attr("y", this._position.y + this.size - 2)
      .attr("width", (this._currentDurability / this._maxDurability) * this.size)
    
  }




  /**
    setPosition()
    @description sets the position of this item
    @param position the new position of this item
  */
  set position(position) {
    super.position = position;
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
    var clone = new SieveItem(this._position);
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
