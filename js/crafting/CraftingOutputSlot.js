/**
  Plot - a plot of land that can be farmed on
*/
import { Slot } from "../items/items.js"

export class CraftingOutputSlot extends Slot {
  /**
    constructor()
    @description constructs the slot
    @param crafter the crafter for this CraftingOutputSlot
    @param inventoryManager the inventory manager that manages all the inventories
    @param inventory the inventory that this slot belongs to
    @param position the position that this slot is on the svg canvas
  */
  constructor(player, crafter, inventoryManager, inventory, position) {
    super(player, inventoryManager, inventory, position, {x: 0, y: 0})
    this._crafter = crafter;
  }


  /**
    removeUnit()
    @description removes the item from this slot
  */
  removeItem() {
    if(this._item !== null) {
      this._crafter.consumeItems()
      this._svg.itemGroup.selectAll("*").remove()
      this._item = null;
    }
  }

}
