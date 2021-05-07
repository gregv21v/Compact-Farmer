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
        this._svg.background = this._svg.group.append("rect")
        this._svg.text = this._svg.group.append("text")
      }

      /**
       * initSVG()
       * @description initializes the svgs of the tooltip. Should only be
       *  called once
       */
      initSVG() {

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", this._width)
          .attr("height", this._height)
          .style("fill", "white")
          .style("stroke", "black")

        this._svg.text
          .attr("x", this._position.x + this._width/2)
          .attr("y", this._position.y + this._height/2)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "10px")
          .text(this._text)
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
        this._svg.text.text(this._text)
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

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        this._svg.text
          .attr("x", this._position.x + this._width/2)
          .attr("y", this._position.y + this._height/2)
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
        this._svg.text.text(this._text)
        this._svg.background.attr("width", this._width)
      }

      /**
       * hide()
       * @description hides the tooltip
       */
      hide() {
        this._svg.text.text("")
        this._svg.background.attr("width", 0)
      }

    }

  }
)
