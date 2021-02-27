/**
  Item
*/
define(
  ["worldObjects/Crop", "items/Item", "d3"],
  function(Crop, Item, d3) {
    return class SeedItem extends Item {
      /**
        constructor()
        @description constructs the block
      */
      constructor(position = {x: 0, y: 0}) {
        super(position)
        this.name = "Seeds"
        this.seedColor = "white"
      }

      /**
        getCrop()
        @description get a new instance of a crop for this seed
      */
      getCrop() {
        return new Crop(this.seedColor);
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        super.initSVG();

        this.svg.seeds[0]
          .attr("cx", this.position.x + this.size/2 - this.size/4)
          .attr("cy", this.position.y + this.size/2 - this.size/4)
          .attr("rx", this.size / 9)
          .attr("ry", this.size / 11)
          .style("fill", this.seedColor)

        this.svg.seeds[1]
          .attr("cx", this.position.x + this.size/2)
          .attr("cy", this.position.y + this.size/2)
          .attr("rx", this.size / 9)
          .attr("ry", this.size / 11)
          .style("fill", this.seedColor)

        this.svg.seeds[2]
          .attr("cx", this.position.x + this.size/2 + this.size/4)
          .attr("cy", this.position.y + this.size/2 + this.size/4)
          .attr("rx", this.size / 9)
          .attr("ry", this.size / 11)
          .style("fill", this.seedColor)
      }


      /**
        createGraphic()
        @description override this function to draw the graphics for the
          block.
          Each svg should be added to this.svg
        @param group the svg group to create the graphics on
      */
      createGraphic(group) {
        super.createGraphic(group);

        // make your graphics here add add them to the this.svg object
        this.svg.seeds = [
          group.append("ellipse"),
          group.append("ellipse"),
          group.append("ellipse")
        ]
      }

      /**
        setPosition()
        @description sets the position of this item
        @param position the new position of this item
      */
      setPosition(position) {
        super.setPosition(position);

        this.svg.seeds[0]
          .attr("cx", this.position.x + this.size/2 - this.size/4)
          .attr("cy", this.position.y + this.size/2 - this.size/4)

        this.svg.seeds[1]
          .attr("cx", this.position.x + this.size/2)
          .attr("cy", this.position.y + this.size/2)

        this.svg.seeds[2]
          .attr("cx", this.position.x + this.size/2 + this.size/4)
          .attr("cy", this.position.y + this.size/2 + this.size/4)
      }



      /**
        unrender()
        @description removes the item from the canvas
      */
      unrender() {
        for (var svg of Object.values(this.svg)) {
          svg.remove();
        }
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
