/**
  Item
*/
import { Item } from "./items.js"
import { Crop } from "../crops/crops.js"
import { GrassBladeItem } from "./items.js";
import { ToolItem } from "./ToolItem.js";

export class HoeItem extends ToolItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {
    x: 0,
    y: 0
  }) {
    super(position)
    this._currDurability = 20;
    this._maxDurability = 20;
    this.name = "HoeItem"
    this._description = "Used to till soil"
    this._displayName = "Hoe"
    this._imageURL = "images/hoe.png"
    this.updateToolTip()
  }


 
  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    let clone = new HoeItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }
}
