/**
  Item
*/

import { Crop } from "./crops.js"
export class SpinachCrop extends Crop {
  /**
    constructor()
    @description constructs the crop
  */
  constructor() {
    super()
    this.name = "SpinachCrop"
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
    return new SpinachCrop();
  }

  /**
    getGrowTime()
    @description get the time it takes to grow the crop in miliseconds
  */
  getGrowTime() {
    return 40;
  }
}
