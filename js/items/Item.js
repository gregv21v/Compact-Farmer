/**
  Item
*/
import { Tooltip } from "../gui/Tooltip.js"


export class Item {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    this.name = "Item"
    this._position = position;
    this.size = 40
    this._quantity = 1;
    this._imageURL = "";
    this._elements = {}
    this._description = ""

    this.tooltip = new Tooltip(
      this.name,
      {x: this._position.x - 5, y: this._position.y - 5},
      150, 90
    )

    this.updateToolTip();

    // create the svg elements
    this._svg = {}
    this._svg.group = d3.create("svg:g")
    this._svg.background = this._svg.group.append("rect")
    this._svg.graphicGroup = this._svg.group.append("g")
    this._svg.label = this._svg.group.append("text")
    this._svg.count = this._svg.group.append("text")
    this.createGraphic(this._svg.graphicGroup)
    this._svg.clickArea = this._svg.group.append("rect")
  }


  /**
   * get isCompostable
   * @description gets the isCompostable value
   */
  get isCompostable() {
    return this._compostable;
  }

  /**
   * updateToolTip()
   * updates the information on the tooltip
   */
  updateToolTip() {
    this.tooltip.html = `${this._description}<br /><strong>Elements:</strong><br/>`
    for (var element of Object.keys(this._elements)) {
      this.tooltip.html += `<strong>${element}:</strong> ${this._elements[element]}<br/>`
    }
  }

  /**
   * initTooltip()
   * @description initializes the tooltip
   * @param layer the graphics layer that the tooltips will be showed on
   */
   initTooltip(layer) {
     this.tooltip.hide()
     this.tooltip.addGraphicsTo(layer)
   }


   /**
    * consumeOne()
    * @description consumes one of this item
    */
   consumeOne(slot) {
     if(this.quantity > 1) {
       this.quantity -= 1;
     } else {
       slot.destroyItem()
     }
   }

  /**
    toJSON()
    @description converts this slot to its json representation
  */
  toJSON() {
    return {
      name: this.name,
      quantity: this._quantity
    }
  }

  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new Item(this._position);
    clone.quantity = this._quantity;

    clone.initSVG()
    return clone
  }

  /**
   * destroy()
   * @description completely destroys the unit
   */
  destroy() {
    this._svg.background.remove()
    this._svg.label.remove()
    this._svg.count.remove()
    this._svg.graphicGroup.remove()
    this._svg.clickArea.remove()
    this.tooltip.destroy()
  }

  /**
    initSVG()
    @description initialize the values for the svg
  */
  initSVG() {
    this._svg.group.attr("class", "item")

    // render the background
    this._svg.background
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.size)
      .attr("height", this.size)
      .style("fill", "grey")
      .style("stroke", "black")

    this.tooltip.initSVG();
    this.tooltip.hide()

    /*this._svg.label
      .attr("x", this._position.x + this.size/2)
      .attr("y", this._position.y + this.size - 5)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .style("stroke", "black")
      .style("font-size", "10px")
      .text(this.name)*/

    this._svg.count
      .attr("x", this._position.x + this.size - 5)
      .attr("y", this._position.y + 5)
      .attr("text-anchor", "center")
      .attr("dominant-baseline", "central")
      .style("stroke", "black")
      .style("font-size", "10px")
      .text(this._quantity)

    var self = this;

    this._svg.clickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.size)
      .attr("height", this.size)
      .style("fill-opacity", 0)
      .on("click", function() {self.onClick()})
      .on("mousedown", function() {self.onMouseDown()})
      .on("mouseover", function() {self.onMouseOver()})
      .on("mouseout", function() {self.onMouseOut()})


    this._svg.image
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("href", this._imageURL)
  }

  /**
   * get svg
   * @description gets the svg object
   */
  get svgGroup() {
    return this._svg.group;
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
    this._svg.image = group.append("image")
  }

  /**
    set quantity
    @description sets the quantity of this item
    @param value the value to set the quantity to
  */
  set quantity(value) {
    this._quantity = value
    this._svg.count.text(value)
  }

  /**
    get quantity
    @description sets the quantity of this item
    @param value the value to set the quantity to
  */
  get quantity() {
    return this._quantity;
  }

  /**
    setPosition()
    @description sets the position of this item
    @param position the new position of this item
  */
  set position(position) {
    this._position = position

    this.tooltip.position = {
      x: this._position.x,
      y: this._position.y - this.tooltip.height
    }

    if(this.tooltip.position.y < 0) {
      // put the tooltip below the item
      this.tooltip.position = {
        x: this._position.x,
        y: this._position.y + this.size
      }
    }

    this._svg.background
      .attr("x", this._position.x)
      .attr("y", this._position.y)

    var textPos = {
      x: this._position.x + this.size/2,
      y: this._position.y + this.size - 5
    }

    this._svg.label
      .attr("x", textPos.x)
      .attr("y", textPos.y)

    this._svg.count
      .attr("x", this._position.x + this.size - 5)
      .attr("y", this._position.y + 5)


    this._svg.clickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)

    this._svg.image
      .attr("x", this._position.x)
      .attr("y", this._position.y)
  }

  /**
    get position
    @description gets the position of the item
  */
  get position() {
    return this._position;
  }

  /**
   * set elements
   * @description sets the value of elements
   * @param value the new value of elements as an object
   */
  set elements(value) {
    this._elements = value

    this.updateToolTip(this._description);
  }

  /**
   * get elements
   * @description gets the elements of this item
   */
  get elements() {
    return this._elements;
  }

  /**
    addGraphicsTo()
    @description adds the graphics to the parent svg
  */
  addGraphicsTo(parent) {
    parent.append(() => this._svg.group.node())
  }


  /**
    onClick()
    @description the function called when this item is clicked
  */
  onClick() {
    // do something ...
    console.log(this.name);
  }

  /**
    onMouseDown()
    @description the function called when the mouse is held down over
      the item
  */
  onMouseDown() {
    //
  }

  /**
    onMouseOver()
    @description the function called when you mouse over
      this item
  */
  onMouseOver() {
    this.tooltip.show()
  }

  /**
    onMouseOut()
    @description the function when the mouse leaves the
      area of the item
  */
  onMouseOut() {
    this.tooltip.hide()
  }
}
