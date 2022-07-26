
import { CraftingRegistry, CraftingInput } from "./crafting.js"
import { EmptyItem, Slot } from "../items/items.js"
import { Inventory } from "../inventories/inventories.js"

/**
  Grid -- the snapping grid to snap Items to.
*/
export class CraftingGrid extends Inventory {
  /**
    constructor()
    @description constructs the snapping grid
    @param inventoryManager the grid manager that manages all the grids
    @param rows the number of rows in the grid
    @param columns the number of columns in the grid
  */
  constructor(player, crafter, inventoryManager, rows, columns) {
    super(player, inventoryManager, rows, columns)

    this._crafter = crafter
  }


  /**
   * convertToCraftingInput()
   * @description convert the crafting grid to a crafting input instance
   */
  convertToCraftingInput() {
     var grid = []
     for (var y = 0; y < this._rows; y++) {
       var row = []
       for (var x = 0; x < this._columns; x++) {
         if(this._slots[x][y].item === null) {
           row.push(new EmptyItem())
         } else {
           row.push(this._slots[x][y].item)
         }
       }
       grid.push(row)
     }
     console.log(grid);
     return new CraftingInput(grid);
   }

  /**
    * consumeItems()
    * @description consume the items after a crafted item is removed from the output
    *   slot
    */
  consumeItems() {
    for (var y = 0; y < this._rows; y++) {
      for (var x = 0; x < this._columns; x++) {
        if(!this._slots[x][y].isEmpty()) {
          if(this._slots[x][y].item.quantity > 1) {
            this._slots[x][y].item.quantity--;
          } else {
            this._slots[x][y].destroyItem();
          }
        }
      }
    }
  }


  /********************************************************
                      Getters and Setters
  *********************************************************/

  /**
    addItem()
    @description adds a item to a specified x, and y coordinate
      in the grid
    @param x the x coordinate to add the item to
    @param y the y coordinate to add the item to
    @param item the item to add
  */
  addItem(x, y, item) {
    this._slots[x][y].addItem(item, this._svg.layers);
    // look up the current formation of items in the CraftingRegistry
    let recipe = CraftingRegistry.lookup(this.convertToCraftingInput())

    if(recipe) {
      this._crafter.outputItem(recipe.output.clone())
    } 
  }

  /**
    addItemToSlot()
    @description adds a item to a specified slot
    @param slot the slot to add the item to
    @param item the item to add
  */
  addItemToSlot(slot, item) {
    slot.addItem(item, this._svg.layers);

    // look up the current formation of items in the CraftingRegistry
    var recipe = CraftingRegistry.lookup(this.convertToCraftingInput())
    if(recipe) {
      this._crafter.outputItem(recipe.output.clone())
    } 
  }


  /**
   * removeItemFromSlot()
   * @description removes an item from a given slot 
   * @param slot the slot to remove the item from
   */
  removeItemFromSlot(slot) {
    slot.removeItem()

    let recipe = CraftingRegistry.lookup(this.convertToCraftingInput())
    if(recipe !== undefined) {
      this._crafter.outputItem(recipe.output.clone())
    } else {
      this._crafter.outputItem(new EmptyItem())
    }
  }
  

}
