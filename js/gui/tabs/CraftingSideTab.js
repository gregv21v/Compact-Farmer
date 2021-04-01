/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/tabs/SideTab",
    "gui/buttons/CraftButton",
    "inventories/Inventory",
    "items/Slot",
    "d3"
  ],
  function(SideTab, CraftButton, Inventory, Slot, d3) {
    return class CraftingSideTab extends SideTab {
      /**
        constructor()
        @description constructs the InventorySideTab
        @param windowDims the dimensions of the window that the tab will
          be on
      */
      constructor(windowDims) {
        super(
          {x: 0, y: 0},
          "Craft"
        )

        this.buttonDims = {width: 30, height: 100}
      }


      /**
        set inventory
        @description sets the crafting inventory of this tab
      */
      set inventory(inventory) {
        this._inventory = inventory
        this._inventory.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 10
        })

        this._inventory.initSVG();
        this._inventory.addGraphicsTo(this.svg.contentAreaGroup)
      }

      /**
        set crafter
        @description sets the crafter of the tab
      */
      set crafter(crafter) {
        this._crafter = crafter
        this._crafter.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

        this._crafter.initSVG()
        this._crafter.addGraphicsTo(this.svg.contentAreaGroup)
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

        // show the crafter
        this._crafter.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this._crafter.width / 2,
          y: this.position.y
        })

        this._inventory.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this._inventory.width / 2,
          y: this.position.y +
              this._crafter.height + Slot.size
        })

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
          y: this.position.y
        })

        this._crafter.moveTo({
          x: this.position.x + this.buttonDims.width + 100,
          y: this.position.y + this._crafter.height + 30
        })

        this._inventory.deactivate()
        this._inventoryManager.disallowItemMovement();

      }

      /**
        get position()
        @description get the position of the tab
      */
      get position() {
        return this._position
      }

      /**
        set position()
        @description set the position of the tab
        @param position new position of tab
      */
      set position(position) {
        super.position = position;

        if(this.isClosed) {
          this.close()
        } else {
          this.open()
        }
      }

    }
  })
