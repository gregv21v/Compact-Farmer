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
        this.text = text;
        this.width = width;
        this.height = height;
        this.position = position;

        this.svg = {
          group: d3.create("svg:g")
        }
        this.svg.background = this.svg.group.append("rect")
        this.createGraphic(this.svg.group.append("g"));
        this.svg.clickArea = this.svg.group.append("rect")
      }

      /**
        getWidth()
        @description gets the width of the inventory
      */
      getWidth() {
        return this.width
      }

      /**
        getHeight()
        @description gets the height of the inventory
      */
      getHeight() {
        return this.height
      }

      /**
        addGraphicsTo()
        @description add the graphics of the button to a given svg group
        @param group the group to add the graphics to
      */
      addGraphicsTo(group) {
        group.append(() => this.svg.group.node())
      }

      /**
        createGraphic()
        @description override this function to draw the graphics for the
          block.
          Each svg should be added to this.svg
        @param mainSVG the svg group to create the graphics in
      */
      createGraphic(group) {
        // make your graphics here add add them to the this.svg object
        this.svg.label = group.append("text")
      }


      /**
        initSVG()
        @description initializes the values of the svg objects
      */
      initSVG() {
        var self = this;

        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.width)
          .attr("height", this.height)
          .style("fill", "orange")
          .style("stroke", "black")

        var textPos = {
          x: this.position.x + this.getWidth()/2,
          y: this.position.y + this.getHeight()/2
        }

        this.svg.label
          .attr("x", textPos.x)
          .attr("y", textPos.y)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "20px")
          .text(this.text)

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.width)
          .attr("height", this.height)
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
        this.position = position
        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)

        var textPos = {
          x: this.position.x + this.width/2,
          y: this.position.y + this.height/2
        }

        this.svg.label
          .attr("x", textPos.x)
          .attr("y", textPos.y)

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
      }

      /**
        unrender()
        @description removes the block from the canvas
      */
      unrender() {
        for (var svg of Object.keys(this.svg)) {
          this.svg[svg].remove();
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
        this.svg.background.style("fill-opacity", 0.5)
      }

      /**
        onMouseLeave()
        @description the function called when the mouse enters the button area
      */
      onMouseLeave() {
        // do something ...
        this.svg.background.style("fill-opacity", 1)
      }

      /**
        onMousePress()
        @description the function called when the button is pressed
      */
      onMouseDown() {
        // do something ...
        this.svg.background.style("fill-opacity", 0.4)
      }

      /**
        onRelease()
        @description the function called when the button is released
      */
      onMouseUp() {
        // do something ...
        this.svg.background.style("fill-opacity", 1)
      }



    }
  })
