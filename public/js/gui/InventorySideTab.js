/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/SideTab",
    "d3"
  ],
  function(SideTab, d3) {
    return class InventorySideTab extends SideTab {
      /**
        constructor()
        @description constructs the InventorySideTab
        @param storage the inventory to display in this tab
        @param windowDims the dimensions of the window that the tab will
          be on
      */
      constructor(windowDims) {
        super(
          {x: windowDims.width - 30, y: 0},
          {width: 30, height: 100}, // button dimensions
          {width: windowDims.width/2, height: windowDims.height - 50}, // content area dimensions
          windowDims, // window dimensions
          "Inventory"
        )
      }



      /**
        set inventory
        @description sets the inventory of this tab
        @param inventory the inventory to set this inventory to
      */
      set inventory(inventory) {
        this._inventory = inventory
        this._inventory.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

        this._inventory.addGraphicsTo(this.svg.contentAreaGroup)
      }


      /**
        set inventoryManager
        @description sets the inventory manager of this inventory tab
        @param value the inventory manager to be set
      */
      set inventoryManager(value) {
        this._inventoryManager = value;
      }

      /**
        open()
        @description opens the tab
      */
      open() {
        super.open();

        this._inventory.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this._inventory.width / 2,
          y: this.position.y + 30
        })

        // Allow all active inventories to move items
        this._inventory.activate()
        this._inventoryManager.allowItemMovement();
      }

      /**
        close()
        @description closes the tab
      */
      close() {
        super.close()

        this._inventory.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

        this._inventory.deactivate()
        this._inventoryManager.disallowItemMovement();
      }

    }
  })
