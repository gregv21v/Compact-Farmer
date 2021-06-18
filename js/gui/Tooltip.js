define(
  [
    "d3"
  ],
  function(d3) {
    return class Tooltip {
      /**
       * constructor()
       * @description constructs the tooltip class
       * @param text text of the tooltip
       */
      constructor(text, position, width, height) {
        this._text = text;
        this._position = position;
        this._width = width
        this._height = height
        this._svg = {
          group: d3.create("svg:g") // the main svg group that everything resides in
        }
        this._svg.foreignObject = this._svg.group.append("foreignObject")
        this._svg.div = this._svg.foreignObject.append("xhtml:div")
        this._svg.paragraph = this._svg.div.append("xhtml:p")
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

        this._svg.paragraph
          .html(this._text)

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
       * set text
       * @description sets the text of the tooltip
       */
      set text(value) {
        this._text = value;
        this._svg.paragraph.html(this._text)
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
        console.log("Showing tooltip");
        this._svg.paragraph.html(this._text)
        this._svg.foreignObject.attr("width", this._width)
      }

      /**
       * hide()
       * @description hides the tooltip
       */
      hide() {
        this._svg.paragraph.html("")
        this._svg.foreignObject.attr("width", 0)
      }

    }

  }
)
