/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/SideTab",
    "gui/Button",
    "inventories/Inventory",
    "d3"
  ],
  function(SideTab, Button, Inventory, d3) {
    return class CraftingSideTab extends SideTab {
      /**
        constructor()
        @description constructs the InventorySideTab
        @param windowDims the dimensions of the window that the tab will
          be on
      */
      constructor(windowDims) {
        super(
          {x: windowDims.width - 30, y: 100},
          {width: 30, height: 100}, // button dimensions
          {width: windowDims.width/2, height: windowDims.height - 50}, // content area dimensions
          windowDims, // window dimensions
          "Craft"
        )

        var craftButtonWidth = 100;
        var craftButtonHeight = 40
        this.craftButton = new Button(
          {
            x: this.position.x + this.contentDims.width,
            y: this.position.y + 150 + 30
          },
          craftButtonWidth, craftButtonHeight,
          "Craft"
        )

        this.craftButton.initSVG()
        this.craftButton.addGraphicsTo(this.svg.contentAreaGroup)
      }


      /**
        set inventory
        @description sets the crafting inventory of this tab
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
              this._inventory.getWidth() / 2,
          y: this.position.y + 30
        })

        this.craftButton.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this.craftButton.getWidth() / 2,
          y: this.position.y + this._inventory.getHeight() + 40
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
          y: this.position.y + 30
        })

        this.craftButton.moveTo({
          x: this.position.x + this.buttonDims.width + this.craftButton.getWidth(),
          y: this.position.y + 30
        })

        this._inventory.deactivate()
        this._inventoryManager.disallowItemMovement();

      }

    }
  })
