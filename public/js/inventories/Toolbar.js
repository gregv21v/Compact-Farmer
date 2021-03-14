define(["inventories/Inventory", "items/Slot"],
  function(Inventory, Slot) {
    return class Toolbar extends Inventory {
      /**
        constructor()
        @description constructs the toolbar
        @param manager the inventory manager to add the toolbar to
      */
      constructor(manager) {
        super(manager, 1, 10)

        this.selectedSlot = this._slots[0][0];
      }
    }


})
