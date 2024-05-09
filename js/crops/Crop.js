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
      this._columns = 4;
      this._rows = 4;
      this._imageUrl = "images/stick.png";
      this._images = [];
    }


    _createImages() {
      for(var i = 0; i < this._columns; i++) {
        this._images.push([]);
        for (let j = 0; j < this._rows; j++) {
          let newImage = d3.create("svg:image");
          newImage.attr("href", this._imageUrl);
          this._images[i].push(newImage);
        }
      }
    }


    /**
     * get svg()
     * @description get the svg representation of this crop
     * @returns {SVGImageElement}
    */
    get svg() {
      return this._images;
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
    }


    /**
     * attach() 
     * @description attaches the crop to the block
     */
    attach(parent) {
      for(var i = 0; i < this._columns; i++) {
        this._images.push([]);
        for (let j = 0; j < this._rows; j++) {
          parent.append(() => this._images[i][j].node());
        }
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
      for(var i = 0; i < this._columns; i++) {
        this._images.push([]);
        for (let j = 0; j < this._rows; j++) {
          this._images[i][j].remove();
        }
      }
    }

    /**
      clone()
      @description make a copy of this crop
    */
    clone() {
      var clone = new Crop();
      clone.name = "Crop"
      clone._columns = this._columns;
      clone._rows = this._rows;
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
      for(var i = 0; i < this._columns; i++) {
        this._images.push([]);
        for (let j = 0; j < this._rows; j++) {
          this._images[i][j]
            .attr("x", worldPosition.x + (i * Block.size / 4))
            .attr("y", worldPosition.y + (j * Block.size / 4))
            .attr("width", Block.size / 4)
            .attr("height", Block.size / 4)
        }
      }
    }

    /**
     * update()
     * @description updates the crop
     */
    update() {
      let worldPosition = this.block.getWorldPosition();
      for(var i = 0; i < this._columns; i++) {
        this._images.push([]);
        for (let j = 0; j < this._rows; j++) {
          this._images[i][j]
            .attr("x", worldPosition.x + (i * Block.size / 4))
            .attr("y", worldPosition.y + (j * Block.size / 4))
            .attr("width", Block.size / 4)
            .attr("height", Block.size / 4)
        }
      }
      
    }
}
