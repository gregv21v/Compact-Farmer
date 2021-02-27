/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/SideTab",
    "lists/Storage",
    "d3"
  ],
  function(SideTab, Storage, d3) {
    return class StorageSideTab extends SideTab {
      /**
        constructor()
        @description constructs the InventorySideTab
        @param storage the inventory to display in this tab
        @param windowDims the dimensions of the window that the tab will
          be on
      */
      constructor(storage, windowDims) {
        super(
          {x: windowDims.width - 30, y: 0},
          {width: 30, height: 100}, // button dimensions
          {width: windowDims.width/2, height: windowDims.height - 50}, // content area dimensions
          windowDims, // window dimensions
          "Inventory"
        )

        this.storage = storage
        this.storage.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

        this.storage.addGraphicsTo(this.svg.contentAreaGroup)
      }



      /**
        setStorage()
        @description sets the storage of this tab
      */
      setStorage() {

      }

      /**
        open()
        @description opens the tab
      */
      open() {
        super.open();

        this.storage.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this.storage.getWidth() / 2,
          y: this.position.y + 30
        })

      }

      /**
        close()
        @description closes the tab
      */
      close() {
        super.close()

        this.storage.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

      }

    }
  })
