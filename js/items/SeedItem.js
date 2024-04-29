/**
  Item
*/
import { CompostableItem } from "./items.js"
import { Crop } from "../crops/crops.js"


export class SeedItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "SeedItem"
    this._description = "Placable in tilled dirt block"
    this._displayName = "Seed"
    this._imageURL = "images/seed.png"
    this._compostValue = 1;
  }

  /**
    getCrop()
    @description get a new instance of a crop for this seed
  */
  getCrop() {
    return new Crop(this.seedColor);
  }


  /**
    onClick()
    @description the function called when this block is clicked
  */
  onClick() {
    // do something ...
    console.log(this.name);
  }
}
