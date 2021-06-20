/**
  Item
*/
define(
  ["crops/SpinachCrop", "crops/Crop", "items/SeedItem", "d3"],
  function(SpinachCrop, Crop, SeedItem, d3) {
    return class SpinachSeedItem extends SeedItem {
      /**
        constructor()
        @description constructs the block
      */
      constructor(position = {x: 0, y: 0}) {
        super(position)
        this.name = "SpinachSeedItem"
        this.seedColor = "#1d4016"
        this.tooltip.html = "Spinach Seed: Used for planting spinach"
      }

      /**
        getCrop()
        @description get a new instance of a crop for this seed
      */
      getCrop() {
        return new SpinachCrop(this.seedColor);
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        super.initSVG();

        this.svg.seeds[0]
          .attr("cx", this._position.x + this.size/2 - this.size/4)
          .attr("cy", this._position.y + this.size/2 - this.size/4)
          .attr("rx", this.size / 9)
          .attr("ry", this.size / 11)
          .style("fill", this.seedColor)

        this.svg.seeds[1]
          .attr("cx", this._position.x + this.size/2)
          .attr("cy", this._position.y + this.size/2)
          .attr("rx", this.size / 9)
          .attr("ry", this.size / 11)
          .style("fill", this.seedColor)

        this.svg.seeds[2]
          .attr("cx", this._position.x + this.size/2 + this.size/4)
          .attr("cy", this._position.y + this.size/2 + this.size/4)
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
        set position
        @description sets the position of this item
        @param position the new position of this item
      */
      set position(position) {
        super.position = position;

        this.svg.seeds[0]
          .attr("cx", this._position.x + this.size/2 - this.size/4)
          .attr("cy", this._position.y + this.size/2 - this.size/4)

        this.svg.seeds[1]
          .attr("cx", this._position.x + this.size/2)
          .attr("cy", this._position.y + this.size/2)

        this.svg.seeds[2]
          .attr("cx", this._position.x + this.size/2 + this.size/4)
          .attr("cy", this._position.y + this.size/2 + this.size/4)
      }

      /**
        get position
        @description gets the position of the item
      */
      get position() {
        return super.position;
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

      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new SpinachSeedItem(this.position);
        clone.quantity = this.quantity;

        clone.initSVG()
        return clone
      }
    }
  })
