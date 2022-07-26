/**
  Plot - a plot of land that can be farmed on
*/

import { Tooltip } from "../gui/Tooltip.js"

export class Block {

    static size = 60
    static ProgressBarHeight = 4;
    /**
      getCoordinateAsString()
      @description get the coordinate of this block as a string
    */
    static getCoordinateAsString(coordinate) {
      return "x_" + coordinate.x + "y_" + coordinate.y;
    }

    /**
      constructor()
      @description constructs the block
    */
    constructor(player, world, coordinate) {
      this._name = "Block"
      this._player = player;
      this._world = world;
      this._coordinate = coordinate;
      this._elements = {}
      this._progress = 0;
      this._progressMax = 100;

      var worldPosition = this.getWorldPosition();
      this._tooltip = new Tooltip(
        this._name,
        {x: worldPosition.x, y: worldPosition.y - 90},
        150, 90
      )

      this._displayName = "Block"
      this._description = "A basic block"
    }

    /**
     * updateToolTip()
     * updates the information on the tooltip
     */
    updateToolTip() {
      this._tooltip.html = `<strong>${this._displayName}</strong>: <br>
      ${this._description}<br /><strong>Elements:</strong><br/>`
      for (var element of Object.keys(this._elements)) {
        this._tooltip.html += `<strong>${element}:</strong> ${this._elements[element]}<br/>`
      }
    }

    /**
     * initTooltip()
     * @description initializes the tooltip
     * @param layer the graphics layer that the tooltips will be showed on
     */
     initTooltip(layer) {
       this._tooltip.hide()
       this._tooltip.attach(layer)
     }

    /**
      toJSON()
      @description converts this block to its json representation
    */
    toJSON() {
      return {
        name: this._name,
        coordinate: this._coordinate
      }
    }

    /**
      fromJSON()
      @description converts a json object into this world
    */
    static fromJSON(player, world, json) {
      return new Block(player, world, json.coordinate);
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
    }

    /**
      delete()
      @description deletes this block
    */
    remove() {
      this._svg.background.remove()
      this._svg.graphicsGroup.remove()
      this._svg.clickArea.remove()
    }


    /**
      render()
      @description sets all the attributes of the svg to their appropriate class
        variables
    */
    render() {
      //let worldPosition = this.getWorldPosition();

      // the resources needed to craft this item
      this._svg = {}
      this._svg.background = this._world.layers.blocks.append("rect")

      this._svg.graphicsGroup = this._world.layers.blocks.append("g")
      this.createGraphic(this._svg.graphicsGroup);

      this._svg.clickArea = this._world.layers.blocks.append("rect")

      this.initTooltip(this._world.layers.tooltips);
      this.updateToolTip("A basic Block")

      this._tooltip.render()
      this._tooltip.hide()
    }

    /**
     * update()
     * @description updates the block
     */
    update() {
      let worldPosition = this.getWorldPosition();
      let size = Block.size;
      let self = this;
      // render the background
      this._svg.background
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y)
        .attr("width", size)
        .attr("height", size)
        .style("fill", "grey")

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
    }

    /**
      remove()
      @description removes the block from the canvas
    */
    remove() {
      for (var key of Object.keys(this._svg)) {
        this._svg[key].remove();
      }
    }

    /**
      onLeftClick()
      @description the function called when this block is clicked
    */
    onLeftClick() {
      // do something ...
      this._tooltip.hide()
    }

    /**
      onRightClick()
      @description the function called when this block is clicked
    */
    onRightClick() {
      // do something ...
      this._tooltip.hide()
    }

    /**
      onMouseOver()
      @description the function called when you mouse over
        this item
    */
    onMouseOver() {
      this._tooltip.show()
    }

    /**
      onMouseOut()
      @description the function when the mouse leaves the
        area of the item
    */
    onMouseOut() {
      this._tooltip.hide()
    }

    /**
      getCoordinateAsString()
      @description get the coordinate of this block as a string
    */
    getCoordinateAsString() {
      return "x_" + this._coordinate.x + "y_" + this._coordinate.y;
    }

    /**
      getWorldPosition()
      @description gets the position of the block in the world
    */
    getWorldPosition() {
      return this._world.coordinateToPosition(this._coordinate)
    }

    /**
     * get coordinate()
     * @description gets the coordinate of this block
     * @returns {Coordinate} the coordinate of this block
     */
    get coordinate() {
      return this._coordinate;
    }

    /**
      preformActionOn()
      @description Modifies a block using an item
      @param item the item being used to preform the action
        on this block
      @returns
        true if action is preformed
        false if the action was not preformed
    */
    preformActionOn(item) {

    }


    /**
     * get svg()
     * @description gets the svg of this block
     * @returns {Object} the svg of this block
     * 
     */
    get svg() {
      return this._svg;
    }


}
