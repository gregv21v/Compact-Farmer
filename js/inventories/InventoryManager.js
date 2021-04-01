define(
  [
    "inventories/Inventory"
  ],
  function(Inventory) {
    /**
      InventoryManager - combination of all the currently active inventorys
    */
    return class InventoryManager {
      /**
        constructor()
        @description constructs the Inventory
      */
      constructor() {
        this._inventories = []
        this._onMouse = null; // the item that is currently on the mouse
        //this._itemsMovable = false;
      }

      /**
        allowItemMovement()
        @description Allows item movement for all active inventories
      */
      allowItemMovement() {
        for (var inventory of this._inventories) {
          if(inventory.active === true) {
            inventory.itemsMovable = true;
          }
        }
      }

      /**
        disallowItemMovement()
        @description disallows item movement for all active inventories
      */
      disallowItemMovement() {
        for (var inventory of this._inventories) {
          if(inventory.active === true) {
            inventory.itemsMovable = false;
          }
        }
      }





      /**
        addInventory()
        @description adds a new inventory to the inventory manager
        @param inventory the inventory to add
      */
      addInventory(inventory) {
        this._inventories.push(inventory);
      }

      /**
        addInventory()
        @description adds a new inventory to the inventory manager
        @param rows the number of rows in the inventory
        @param columns the number of columns in the inventory
      */
      createInventory(rows, columns) {
        var inventory = new Inventory(this, rows, columns)
        this._inventories.push(inventory);
        return inventory;
      }



      /**
        getClosestSlot()
        @description get the closest slot to the given item
        @param item the item to find the closest slot to
      */
      getClosestSlot(item) {
        var distance = this._inventories[0].getClosestSlot(item).distanceTo(item)
        var closest = {
          slot: this._inventories[0].getClosestSlot(item),
          inventory: 0
        }
        if(this._inventories.length > 1) {
          for (var x = 1; x < this._inventories.length; x++) {
            var tempSlot = this._inventories[x].getClosestSlot(item)
            var tempDistance = tempSlot.distanceTo(item);
            if(tempDistance <= distance) {
              distance = tempDistance;
              closest.slot = tempSlot;
              closest.inventory = x;
            }
          }
        }
        return closest;
      }

      /**
        snapToClosestSlot()
        @description snap a given item to the closest slot
        @param item the item to snap to the closest slot
      */
      snapToClosestSlot(item) {
        var closest = this.getClosestSlot(item)
        this._inventories[closest.inventory].addItemToSlot(closest.slot, item);
      }


      /**
       * get onMouse
       * @description gets the current item on the mouse
       */
      get onMouse() {
        return this._onMouse;
      }

      /**
       * set onMouse
       * @description sets the current item on the mouse
       */
      set onMouse(value) {
        this._onMouse = value;
      }
    }
  }
)
