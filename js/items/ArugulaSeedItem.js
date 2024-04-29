/**
  Item
*/
import { SeedItem } from "./items.js"
import { Crop, SpinachCrop } from "../crops/crops.js"
import { ArugulaCrop } from "../crops/ArugulaCrop.js"


export class ArugulaSeedItem extends SeedItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "ArugulaSeedItem"
    this.seedColor = "#1d4016"
    this._description = "Used for planting arugula"
    this._displayName = "Arugula Seed"
    this.updateToolTip()
    this._imageURL = "images/arugulaSeed.png"
    
  }

  /**
    getCrop()
    @description get a new instance of a crop for this seed
  */
  getCrop() {
    return new ArugulaCrop(this.seedColor);
  }



  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new ArugulaSeedItem(this.position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }
}
