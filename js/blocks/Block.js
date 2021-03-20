/**
  Plot - a plot of land that can be farmed on
*/
define(
  [ "d3"],
  function(d3) {
    return class Block {

      static size = 50
      /**
        getCoordinateAsString()
        @description get the coordinate of this block as a string
      */
      static getCoordinateAsString(coordinate) {
        return "x_" + coordinate.x + "y_" + coordinate.y;
      }

      /**
        constructor()
        @description constructs the block
      */
      constructor(player, world, coordinate) {
        this.name = "Block"
        this.player = player;
        this.world = world;
        this.coordinate = coordinate;

        // the resources needed to craft this item
        this.svg = {}
        this.svg.background = this.world.svgGroup.append("rect")

        this.svg.graphicsGroup = this.world.svgGroup.append("g")
        this.createGraphic(this.svg.graphicsGroup);

        this.svg.clickArea = this.world.svgGroup.append("rect")
      }

      /**
        toJSON()
        @description converts this block to its json representation
      */
      toJSON() {
        return {
          name: this.name,
          coordinate: this.coordinate
        }
      }

      /**
        fromJSON()
        @description converts a json object into this world
      */
      static fromJSON(player, world, json) {
        return new Block(player, world, json.coordinate);
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
      }

      /**
        delete()
        @description deletes this block
      */
      delete() {
        this.svg.background.remove()
        this.svg.graphicsGroup.remove()
        this.svg.clickArea.remove()
      }


      /**
        render()
        @description sets all the attributes of the svg to their appropriate class
          variables
      */
      render() {
        var worldPosition = this.getWorldPosition();
        var size = Block.size;
        var self = this;
        // render the background
        this.svg.background
          .attr("x", worldPosition.x)
          .attr("y", worldPosition.y)
          .attr("width", size)
          .attr("height", size)
          .style("fill", "grey")

        this.svg.clickArea
          .attr("x", worldPosition.x)
          .attr("y", worldPosition.y)
          .attr("width", size)
          .attr("height", size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()});
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
        @description the function called when this block is clicked
      */
      onClick() {
        // do something ...
        console.log(this.name);
      }

      /**
        getCoordinateAsString()
        @description get the coordinate of this block as a string
      */
      getCoordinateAsString() {
        return "x_" + this.coordinate.x + "y_" + this.coordinate.y;
      }

      /**
        getWorldPosition()
        @description gets the position of the block in the world
      */
      getWorldPosition() {
        return this.world.coordinateToPosition(this.coordinate)
      }

      /**
        update()
        @description updates the state of the block
      */
      update(world) {

      }

      /**
        preformActionOn()
        @description Modifies a block using an item
        @param item the item being used to preform the action
          on this block
        @returns
          true if action is preformed
          false if the action was not preformed
      */
      preformActionOn(item) {

      }


    }
  })
