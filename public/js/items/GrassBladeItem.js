/**
  Item
*/
define(
  ["worldObjects/Crop", "items/Item", "d3"],
  function(Crop, Item, d3) {
    return class GrassBladeItem extends Item {
      /**
        constructor()
        @description constructs the block
      */
      constructor(position = {x: 0, y: 0}) {
        super(position)
        this.name = "GrassBladeItem"
      }


      /**
        createGraphic()
        @description override this function to draw the graphics for the
          block.
          Each svg should be added to this.svg
        @param group the svg group to create the graphics on
      */
      createGraphic(group) {
        // draw the blade of grass
        this.svg.image = group.append("image")
        this.svg.label = group.append("text")
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        super.initSVG();

        this.svg.image
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .attr("href", "images/grass.png")
      }




      /**
        setPosition()
        @description sets the position of this item
        @param position the new position of this item
      */
      setPosition(position) {
        super.setPosition(position);

        this.svg.image
          .attr("x", this.position.x)
          .attr("y", this.position.y)
      }

      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new GrassBladeItem(this.position);
        clone.quantity = this.quantity;

        clone.initSVG()
        return clone
      }

      /**
        onClick()
        @description the function called when this block is clicked
      */
      onClick() {
        // do something ...
        console.log(this.name);
      }
    }
  })
