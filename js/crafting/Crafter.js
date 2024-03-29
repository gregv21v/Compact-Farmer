import { CraftingOutputGrid, CraftingGrid } from "./crafting.js"
import { Slot } from "../items/items.js"

export class Crafter {
  /**
    constructor()
    @description constructs the crafter
    @param inventoryManager the grid manager to manage the grids
    @param position the position to put the crafter
  */
  constructor(player, inventoryManager, position) {
    this._position = position;
    this._inventoryManager = inventoryManager
    this._craftingGrid = new CraftingGrid(player, this, inventoryManager, 3, 3);
    this._outputSlot = new CraftingOutputGrid(player, this, inventoryManager);
    this._player = player;

    this._inventoryManager.addInventory(this._craftingGrid)
    this._inventoryManager.addInventory(this._outputSlot)

    this._craftingGrid.moveTo({
      x: position.x,
      y: position.y
    })

    this._outputSlot.moveTo({
      x: position.x + this._craftingGrid.width + Slot.size,
      y: position.y + this._craftingGrid.height / 2 - Slot.size / 2
    })
  }


  /**
   * get width()
   * @description gets the width of the crafter
   */
  get width() {
    return this._craftingGrid.width + this._outputSlot.width + Slot.size;
  }

  /**
   * get height()
   * @description gets the height of the crafter
   */
  get height() {
    return this._craftingGrid.height
  }


  /**
   * moveTo()
   * @description move the crafter to a different location
   */
   moveTo(position) {
     this._position = position;
     this._craftingGrid.moveTo({
       x: position.x,
       y: position.y
     })

     this._outputSlot.moveTo({
       x: position.x + this._craftingGrid.width + Slot.size,
       y: position.y + this._craftingGrid.height / 2 - Slot.size / 2
     })
   }

   /**
     render()
     @description initializes the attributes and styles of the crafter's svgs
   */
   render() {
     this._outputSlot.render();
     this._craftingGrid.render();
   }

   /**
     attach()
     @description initializes the attributes and styles of the crafter's svgs
     @param parent the parent svg to attach the crafter to
   */
   attach(parent) {
     this._craftingGrid.attach(parent)
     this._outputSlot.attach(parent)
   }

   /**
     outputItem()
     @description adds or replaces an item in the output slot
     @param item the item to add or replace in the output slot
   */
   outputItem(item) {
      if(this._outputSlot.isEmpty())
        this._outputSlot.addItem(0, 0, item)
      else { // replace the item in the output slot
        this._outputSlot.replaceItem(item)
      }
   }

   /**
    * consumeUnits()
    * @description consume all the items used in the crafting recipe
    */
  consumeItems() {
    this._craftingGrid.consumeItems()
  }

}
