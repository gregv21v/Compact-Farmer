/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["d3"],
  function(d3) {
    return class Slot {
      /**
        constructor()
        @description constructs the slot
      */
      constructor(storage, position) {
        this.item = null;
        this.storage = storage
        this.position = position;
        this.size = 50;
        this.svg = {}
        this.svg.group = d3.create("svg:g")
        this.svg.background = this.svg.group.append("rect")
        this.svg.itemGroup = this.svg.group.append("g")
        this.svg.clickArea = this.svg.group.append("rect")
      }

      /**
        toJSON()
        @description converts this slot to its json representation
      */
      toJSON() {
        if(this.item !== null)
          return {
            item: this.item.toJSON()
          }
        else
          return {
            item: null
          }
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        var self = this;

        // render the background
        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .style("fill", "grey")
          .style("stroke", "black")

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("mousedown", function() {self.onMouseDown()})
      }


      /**
        addItem()
        @description sets the item for this slot
        @param item item to put in this slot
      */
      addItem(item) {
        if(this.item === null) {
          this.item = item;
          this.item.setPosition({
            x: this.position.x + 5,
            y: this.position.y + 5
          })

          this.svg.itemGroup.append(() => this.item.getGraphic().node());
        }
      }


      /**
        setPosition()
        @description sets the position of this slot
        @param position the new position of this slot
      */
      setPosition(position) {
        if(this.item !== null) {
          this.item.setPosition({
            x: position.x + 5,
            y: position.y + 5
          })
        }
        this.position = position

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)

        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)
      }

      /**
        setSize()
        @description sets the size of the slot
        @param size the new size
      */
      setSize(size) {
        this.size = size;

        this.svg.background
          .attr("width", size)
          .attr("height", size)

        this.svg.clickArea
          .attr("width", size)
          .attr("height", size)
      }




      /**
        getPosition()
        @description gets the position of the slot
      */
      getPosition() {
        return this.position
      }



      /**
        isEmpty()
        @description returns whether this slot is empty or not
      */
      isEmpty() {
        return this.item === null;
      }



      /**
        select()
        @description selects this slot of the inventory
      */
      select() {
        this.svg.background.style("stroke", "green")
      }

      /**
        deselect()
        @description deselects this slot of the inventory
      */
      deselect() {
        this.svg.background.style("stroke", "black")
      }

      /**
        onClick()
        @description the function called when this block is clicked
      */
      onClick() {
        this.storage.deselectAll()
        this.storage.select(this)
        this.select()
        this.item.onClick()
      }

      /**
        onMouseDown()
        @description called when the mouse is pressed down
      */
      onMouseDown() {

      }

      /**
       * getGraphic()
       * @description gets the graphics for the slot
       */
      getGraphic() {
        return this.svg.group;
      }
    }
  })
