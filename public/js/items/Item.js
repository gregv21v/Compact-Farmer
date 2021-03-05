/**
  Item
*/
define(
  ["d3"],
  function(d3) {
    return class Item {
      /**
        constructor()
        @description constructs the block
      */
      constructor(position = {x: 0, y: 0}) {
        this.name = "Item"
        this.position = position;
        this.size = 40
        this.quantity = 1;

        // tooltip dimensions
        this.tooltip = {
          height: 50,
          width: 50
        }

        // create the svg elements
        this.svg = {}
        this.svg.group = d3.create("svg:g")
        this.svg.background = this.svg.group.append("rect")

        this.svg.graphicGroup = this.svg.group.append("g")
        this.svg.label = this.svg.group.append("text")
        this.svg.count = this.svg.group.append("text")
        this.createGraphic(this.svg.graphicGroup)
        this.svg.clickArea = this.svg.group.append("rect")
      }

      /**
        toJSON()
        @description converts this slot to its json representation
      */
      toJSON() {
        return {
          name: this.name,
          quantity: this.quantity
        }
      }

      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new Item(this.position);
        clone.quantity = this.quantity;

        clone.initSVG()
        return clone
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        // render the background
        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .style("fill", "grey")
          .style("stroke", "black")

        this.svg.label
          .attr("x", this.position.x + this.size/2)
          .attr("y", this.position.y + this.size - 5)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "10px")
          .text(this.name)

        this.svg.count
          .attr("x", this.position.x + this.size - 5)
          .attr("y", this.position.y + 5)
          .attr("text-anchor", "center")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "10px")
          .text(this.quantity)

        var self = this;

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("mousedown", function() {self.onMouseDown()})
          //.on("mouseover", function() {self.onMouseOver()})
          //.on("mouseout", function() {self.onMouseOut()})
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
        this.svg.tooltip = group.append("g")
        this.svg.tooltipLabel = this.svg.tooltip.append("text")
        this.svg.tooltipRect = this.svg.tooltip.append("rect")
      }


      /**
        setPosition()
        @description sets the position of this item
        @param position the new position of this item
      */
      setPosition(position) {
        this.position = position

        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)

        var textPos = {
          x: this.position.x + this.size/2,
          y: this.position.y + this.size - 5
        }

        this.svg.label
          .attr("x", textPos.x)
          .attr("y", textPos.y)

        this.svg.count
          .attr("x", this.position.x + this.size - 5)
          .attr("y", this.position.y + 5)


        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
      }

      /**
        getGraphic()
        @description gets the svg graphic representing
          this item
      */
      getGraphic() {
        return this.svg.group;
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
        // display the tooltip



      }

      /**
        onMouseOut()
        @description the function when the mouse leaves the
          area of the item
      */
      onHover() {
        // hide the tooltip
      }
    }
  })
