/**
  Item
*/
import { GrassBladeItem, GrassSeedItem } from "../items/items.js"
import { Crop } from "./crops.js"
import { Block } from "../blocks/blocks.js"

export class GrassCrop extends Crop {
  /**
    constructor()
    @description constructs the crop
  */
  constructor() {
    super()
    this.name = "GrassCrop"
    this._svg.image.attr("href", "images/grassCrop.png")
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
  static fromJSON(player, json) {
    return new GrassCrop();
  }

  /**
    getGrowTime()
    @description get the time it takes to grow the crop in miliseconds
  */
  getGrowTime() {
    return 40;
  }
}
