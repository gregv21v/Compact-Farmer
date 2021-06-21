export class Tooltip {
    /**
     * constructor()
     * @description constructs the tooltip class
     * @param html html of the tooltip
     */
    constructor(html, position, width, height) {
      this._html = html;
      this._position = position;
      this._width = width
      this._height = height
      this._svg = {
        group: d3.create("svg:g") // the main svg group that everything resides in
      }
      this._svg.foreignObject = this._svg.group.append("foreignObject")
      this._svg.div = this._svg.foreignObject.append("xhtml:div")
    }

    /**
     * initSVG()
     * @description initializes the svgs of the tooltip. Should only be
     *  called once
     */
    initSVG() {

      this._svg.foreignObject
        .attr("x", this._position.x)
        .attr("y", this._position.y)
        .attr("width", this._width)
        .attr("height", this._height)
        .style("background", "lightblue")
        .style("border-radius", "5px")

      this._svg.div
        .attr("width", "100%")
        .attr("height", "100%")
        .style("color", "black")
        .style("padding", "2px")
        .style("font-size", "11px")

      this._svg.div
        .html(this._html)

    }

    /**
      addGraphicsTo()
      @description add the graphics of the button to a given svg group
      @param group the group to add the graphics to
    */
    addGraphicsTo(group) {
      group.append(() => this._svg.group.node())
    }

    /********************************************************************
                            Getters and Setters
    *********************************************************************/

    /**
     * set html
     * @description sets the html of the tooltip
     */
    set html(value) {
      this._html = value;
      this._svg.div.html(this._html)
    }

    /**
     * get html
     * @description gets the html of the tooltip
     */
    get html() {
      return this._html;
    }

    /**
     * get height
     * @description gets the height of the tooltip
     */
    get height() {
      return this._height
    }

    /**
     * get width
     * @description gets the width of the tooltip
     */
    get width() {
      return this._width
    }

    /**
     * set position
     * @description sets the position of the tooltip
     * @param pos the new position to set the tooltip to
     */
    set position(pos) {
      this._position = pos

      this._svg.foreignObject
        .attr("x", this._position.x)
        .attr("y", this._position.y)
    }

    /**
     * get position
     * @description gets the position of the tooltip
     */
    get position() {
      return this._position;
    }

    /**
     * show()
     * @description shows the tooltip
     */
    show() {
      //console.log("Showing tooltip");
      this._svg.div.html(this._html)
      this._svg.foreignObject.attr("width", this._width)
    }

    /**
     * hide()
     * @description hides the tooltip
     */
    hide() {
      this._svg.div.html("")
      this._svg.foreignObject.attr("width", 0)
    }
}
