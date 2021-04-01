/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["items/Slot", "d3"],
  function(Slot, d3) {
    return class CraftingOutputSlot extends Slot {
      /**
        constructor()
        @description constructs the slot
        @param crafter the crafter for this CraftingOutputSlot
        @param inventoryManager the inventory manager that manages all the inventories
        @param inventory the inventory that this slot belongs to
        @param position the position that this slot is on the svg canvas
      */
      constructor(crafter, inventoryManager, inventory, position) {
        super(inventoryManager, inventory, position)
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
  })
