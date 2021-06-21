/**
  Item
*/
import { Block } from "../blocks/blocks.js"

export class Crop {
    /**
      constructor()
      @description constructs the crop
    */
    constructor() {
      this.name = "Crop"
      this.columns = 4;
      this._svg = {
        image: d3.create("svg:image")
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
      this.block.svg.cropGroup.append(() => this._svg.image.node())
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
      for (var svg of Object.values(this._svg)) {
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
      let worldPosition = this.block.getWorldPosition();
      this._svg.image
        .attr("x", worldPosition.x)
        .attr("y", worldPosition.y)
        .attr("width", Block.size)
        .attr("height", Block.size)
    }
}
