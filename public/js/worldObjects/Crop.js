/**
  Item
*/
define(
  [
    "blocks/Block",
    "d3"
  ],
  function(Block, d3) {
    return class Crop {
      /**
        constructor()
        @description constructs the crop
      */
      constructor(cropColor) {
        this.name = "Crop"
        this.columns = 4;
        this.svg = []
        this.styles = {
          fill: cropColor
        }
      }

      /**
        toJSON()
        @description converts this block to its json representation
      */
      toJSON() {
        return {
          name: this.name
        }
      }

      /**
        fromJSON()
        @description converts a json object into this world
      */
      static fromJSON(json) {
        return new Crop();
      }

      /**
        getGrowTime()
        @description get the time it takes to grow the crop in miliseconds
      */
      getGrowTime() {
        return 0;
      }

      /**
        setBlock()
        @description sets the block that this crop is on
      */
      setBlock(block) {
        this.block = block;
        for (var i = 0; i < this.block.rows; i++) {
          var row = []
          for (var j = 0; j < this.columns; j++) {
            row.push(this.block.svg.cropGroup.append("circle"))
          }
          this.svg.push(row);
        }
      }

      /**
        removeBlock()
        @description removes the block from this crop
      */
      removeBlock() {
        this.block.svg.cropGroup.selectAll("*").remove()
        this.block = null;
      }

      /**
        delete()
        @description deletes this block
      */
      delete() {
        for (var svg of Object.values(this.svg)) {
          svg.remove()
        }  
      }

      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new Crop();
        clone.name = "Crop"
        clone.columns = 4;
        clone.svg = []
        clone.setBlock(this.block);
        clone.styles = {
          fill: cropColor
        }
      }

      /**
        render()
        @description updates the attributes of the svg
      */
      render() {
        var worldPosition = this.block.getWorldPosition();
        var seedSize = 2;
        for (var i = 0; i < this.block.rows; i++) {
          for (var j = 0; j < this.columns; j++) {
            this.svg[i][j]
              .attr("cx", worldPosition.x + (i+1) * Block.size / (this.columns+1))
              .attr("cy", worldPosition.y + (j+1) * Block.size / (this.columns+1))
              .attr("r", seedSize)
              .style("fill", this.styles.fill)
          }
        }
      }


    }
  })
