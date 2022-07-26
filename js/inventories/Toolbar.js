import { ItemRegistry } from "../items/ItemRegistry.js";
import { Inventory } from "./inventories.js"

export class Toolbar extends Inventory {
  /**
    constructor()
    @description constructs the toolbar
    @param manager the inventory manager to add the toolbar to
  */
  constructor(player, manager) {
    super(player, manager, 1, 10)

    this.selectedSlot = this._slots[0][0];
    this._onRightClickEnabled = false;
  }

  /**
   * fromJSON()
   * @description parses a JSON object to create a new toolbar
   */
  static fromJSON(player, inventoryManager, json) {
    let inventory = new Toolbar(player, inventoryManager, json.rows, json.columns)
    for (var x = 0; x < inventory._columns; x++) {
      for (var y = 0; y < inventory._rows; y++) {
        inventory._slots[x][y].destroyItem()
        var item = ItemRegistry.itemFromJSON(json.slots[x][y].item);
        if(item !== null) {
          inventory._slots[x][y].addItem(
            item, inventory._svg.layers
          )
        }
      }
    }
    return inventory
  }
}
