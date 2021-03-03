/**
  Plot - a plot of land that can be farmed on
*/
define(
  [
    "items/GrassSeedItem",
    "items/GrassBladeItem",
    "items/HoeItem",
    "items/SeedItem",
    "items/Item",
    "d3"],
  function(GrassSeedItem, GrassBladeItem, HoeItem, SeedItem, Item, d3) {
    return class Slot {
      /**
        constructor()
        @description constructs the slot
      */
      constructor(storage, position) {
        this.item = null;
        this.storage = storage;
        //this.player = player;
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
        fromJSON()
        @description converts json to a slot object
      */
      static fromJSON(player, storage, json, position) {
        var slot = new Slot(storage, position)
        console.log(json);
        if(json.item !== null) {
          if(json.item.name === "GrassBladeItem") {
            slot.addItem(new GrassBladeItem())
          } else if(json.item.name === "GrassSeedItem") {
            slot.addItem(new GrassSeedItem())
          } else if(json.item.name === "SeedItem") {
            slot.addItem(new SeedItem())
          } else if(json.item.name === "HoeItem") {
            slot.addItem(new HoeItem())
          }
        }

        slot.initSVG()
        return slot;
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
          .style("stroke-width", 3)

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("mouseover", function() {self.onMouseEnter()})
          .on("mouseout", function() {self.onMouseLeave()})
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

          this.item.initSVG();
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
       * getGraphic()
       * @description gets the graphics for the slot
       */
      getGraphic() {
        return this.svg.group;
      }


    }
  })
