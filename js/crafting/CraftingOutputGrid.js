import { Slot } from "../items/items.js"
import { Inventory } from "../inventories/inventories.js"
import { CraftingOutputSlot } from "./crafting.js"

/**
  Grid -- the snapping grid to snap Items to.
*/
export class CraftingOutputGrid extends Inventory {
  /**
    constructor()
    @description constructs the CraftingOutputGrid
    @param craftingGrid the grid to craft the items in
    @param inventoryManager the inventory manager that manages all the inventories
  */
  constructor(player, crafter, inventoryManager) {
    super(player, inventoryManager, 1, 1)

    this._slots = [[new CraftingOutputSlot(player, crafter, inventoryManager, this, this._position)]]
  }

  /********************************************************
                      Graphics Methods
  *********************************************************/
  /**
    addGraphicsTo()
    @description adds the graphics to a parent svg object
    @param parent the svg to add the graphics to
  */
  addGraphicsTo(parent) {
    parent.append(() => this._svg.group.node())
    this._slots[0][0].addGraphicsTo(this._svg.layers.slots);
  }

  /**
    initSVG()
    @description initializes the attributes and styles of the grid's svgs
  */
  initSVG() {
    this._slots[0][0].initSVG()
  }

  /********************************************************
                      Getters and Setters
  *********************************************************/


  /**
   * isEmpty()
   * @description checks whether the crafting grid output is empty
   */
  isEmpty() {
    return this._slots[0][0].isEmpty()
  }

  /**
    addItem()
    @description adds a item to a specified x, and y coordinate
      in the grid
    @param x the x coordinate to add the item to
    @param y the y coordinate to add the item to
    @param item the item to add
  */
  addItem(x, y, item) {
    this._slots[0][0].addItem(item)
  }


  /**
   * replaceItem()
   * @description replaces the given item in the output grid
   * @param {Item} item the item to replace the current item with
   */
  replaceItem(item) {
    this._slots[0][0].replaceItem(item)
  }


  /**
    addItemToSlot()
    @description adds a item to a specified slot
    @param slot the slot to add the item to
    @param item the item to add
  */
  addItemToSlot(slot, item) {
    console.warn("Function addItemToSlot unavailable for CraftingOutputGrid");
  }


  /**
    getClosestSlot()
    @description get the closest slot to the given item
    @param item the item to find the closest slot to
  */
  getClosestSlot(item) {
    return this._slots[0][0];
  }

  /**
    snapToClosestSlot()
    @description snap a given item to the closest slot
    @param item the item to snap to the closest slot
  */
  snapToClosestSlot(item) {
    console.warn("Function snapToClosestSlot unavailable for CraftingOutputGrid");
  }

  /**
    moveTo()
    @description moves the grid to a new position
    @param position position to move to
  */
  moveTo(position) {
    this._slots[0][0].position = {
      x: position.x,
      y: position.y
    }
  }
}
