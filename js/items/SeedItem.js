/**
  Item
*/
import { Item } from "./items.js"
import { Crop } from "../crops/crops.js"


export class SeedItem extends Item {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "SeedItem"
    this.tooltip.html = "Seeds: Placable in tilled soil"
    this._imageURL = "images/seed.png"
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
