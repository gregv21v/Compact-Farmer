/**
  Item
*/
define(
  ["crops/Crop", "items/Item", "d3"],
  function(Crop, Item, d3) {
    return class GrassBladeItem extends Item {
      /**
        constructor()
        @description constructs the block
      */
      constructor(position = {
        x: 0,
        y: 0
      }) {
        super(position)
        this._currDurability = 20;
        this._maxDurability = 20;
        this.name = "HoeItem"
        this.tooltip.text = "Hoe: Used to till soil"
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
        this.svg.progressBar = group.append("rect")
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        super.initSVG();

        this.svg.image
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", this.size)
          .attr("height", this.size)
          .attr("href", "images/hoe.png")

        this.svg.progressBar
          .attr("x", this._position.x)
          .attr("y", this._position.y + this.size - 2)
          .attr("width", (this._currDurability / this._maxDurability) * this.size)
          .attr("height", 2)
          .style("fill", "green")
      }

      /**
       * use()
       * @description uses the hoe
       */
      use() {
        if (this.currDurability > 1) {
          this.currDurability--
        } else {
          console.log("No more durability");
        }
      }




      /**
        set position
        @description sets the position of this item
        @param position the new position of this item
      */
      set position(position) {
        super.position = position;

        this.svg.image
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        this.svg.progressBar
          .attr("x", this._position.x)
          .attr("y", this._position.y + this.size - 2)
      }

      /**
        get position
        @description gets the position of the item
      */
      get position() {
        return super.position;
      }


      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new GrassBladeItem(this._position);
        clone.quantity = this.quantity;

        clone.initSVG()
        return clone
      }

      /**
        onClick()
        @description the function called when this block is clicked
      */
      onClick() {

      }

      /**
       * get maxDurability()
       * @description gets the max durability
       */
      get maxDurability() {
        return this._maxDurability;
      }


      /**
       * set maxDurability
       * @description sets the maxDurability
       * @param value the value to set the max maxDurability to
       */
      set maxDurability(value) {
        this._maxDurability = value;

        this.svg.progressBar
          .attr("width", (this._currDurability / this._maxDurability) * this.size)
      }

      /**
       * get currDurability()
       * @description gets the current durability
       */
      get currDurability() {
        return this._currDurability;
      }


      /**
       * set currDurability
       * @description sets the currDurability
       * @param value the value to set the max currDurability to
       */
      set currDurability(value) {
        this._currDurability = value;

        this.svg.progressBar
          .attr("width", (this._currDurability / this._maxDurability) * this.size)
      }
    }
  })
