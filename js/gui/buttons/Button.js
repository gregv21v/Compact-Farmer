/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["d3"],
  function(d3) {
    return class Button {
      /**
        constructor()
        @description constructs the item
      */
      constructor(position, width, height, text) {
        this._text = text;
        this._width = width;
        this._height = height;
        this._position = position;

        this._svg = {
          group: d3.create("svg:g")
        }
        this._svg.background = this._svg.group.append("rect")
        this._createGraphic(this._svg.group.append("g"));
        this._svg.clickArea = this._svg.group.append("rect")
      }

      /**
        get width()
        @description gets the width of the inventory
      */
      get width() {
        return this._width
      }

      /**
        set width()
        @description sets the width of the inventory
      */
      set width(value) {
        this._width = value;
      }

      /**
        get height()
        @description gets the height of the inventory
      */
      get height() {
        return this._height
      }

      /**
        set height()
        @description sets the height of the inventory
      */
      set height(value) {
        this._height = value;
      }

      /**
        addGraphicsTo()
        @description add the graphics of the button to a given svg group
        @param group the group to add the graphics to
      */
      addGraphicsTo(group) {
        group.append(() => this._svg.group.node())
      }

      /**
        createGraphic()
        @description override this function to draw the graphics for the
          block.
          Each svg should be added to this._svg
        @param mainSVG the svg group to create the graphics in
      */
      _createGraphic(group) {
        // make your graphics here add add them to the this._svg object
        this._svg.label = group.append("text")
      }


      /**
        initSVG()
        @description initializes the values of the svg objects
      */
      initSVG() {
        var self = this;

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", this._width)
          .attr("height", this._height)
          .style("fill", "orange")
          .style("stroke", "black")

        var textPos = {
          x: this._position.x + this.width/2,
          y: this._position.y + this.height/2
        }

        this._svg.label
          .attr("x", textPos.x)
          .attr("y", textPos.y)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "20px")
          .text(this._text)

        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", this._width)
          .attr("height", this._height)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("mousedown", function() {self.onMouseDown()})
          .on("mouseup", function() {self.onMouseUp()})
          .on("mouseenter", function() {self.onMouseEnter()})
          .on("mouseleave", function() {self.onMouseLeave()})
      }



      /**
        moveTo()
        @description move the button to a new location
        @param position the new position to move the button to
      */
      moveTo(position) {
        this._position = position
        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        var textPos = {
          x: this._position.x + this._width/2,
          y: this._position.y + this._height/2
        }

        this._svg.label
          .attr("x", textPos.x)
          .attr("y", textPos.y)

        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)
      }

      /**
        unrender()
        @description removes the block from the canvas
      */
      unrender() {
        for (var svg of Object.keys(this._svg)) {
          this._svg[svg].remove();
        }
      }

      /**
        onClick()
        @description the function called when this button is clicked
      */
      onClick() {
        // do something ...
        console.log(this.name);
      }

      /**
        onMouseEnter()
        @description the function called when the mouse enters the button area
      */
      onMouseEnter() {
        // do something ...
        this._svg.background.style("fill-opacity", 0.5)
      }

      /**
        onMouseLeave()
        @description the function called when the mouse enters the button area
      */
      onMouseLeave() {
        // do something ...
        this._svg.background.style("fill-opacity", 1)
      }

      /**
        onMousePress()
        @description the function called when the button is pressed
      */
      onMouseDown() {
        // do something ...
        this._svg.background.style("fill-opacity", 0.4)
      }

      /**
        onRelease()
        @description the function called when the button is released
      */
      onMouseUp() {
        // do something ...
        this._svg.background.style("fill-opacity", 1)
      }



    }
  })
