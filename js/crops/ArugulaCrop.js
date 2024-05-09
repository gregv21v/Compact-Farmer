/**
  Item
*/

import { Crop } from "./Crop.js"
export class ArugulaCrop extends Crop {
  /**
    constructor()
    @description constructs the crop
  */
  constructor() {
    super()
    this.name = "ArugulaCrop"
    this._imageUrl = "images/arugula.png";

    this._createImages();
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
    return new ArugulaCrop();
  }

  /**
    getGrowTime()
    @description get the time it takes to grow the crop in miliseconds
  */
  getGrowTime() {
    return 60;
  }


  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    return new ArugulaCrop();
  }
}
