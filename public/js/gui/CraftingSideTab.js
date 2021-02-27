/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/SideTab",
    "gui/Button",
    "lists/Storage",
    "d3"
  ],
  function(SideTab, Button, Storage, d3) {
    return class CraftingSideTab extends SideTab {
      /**
        constructor()
        @description constructs the InventorySideTab
        @param storage the inventory to display in this tab
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

        this.storage = new Storage(3, 3)
        this.storage.moveTo({
          x: this.position.x + this.buttonDims.width,
          y: this.position.y + 30
        })

        this.storage.addGraphicsTo(this.svg.contentAreaGroup)

        var craftButtonWidth = 100;
        var craftButtonHeight = 40
        this.craftButton = new Button(
          {
            x: this.position.x + this.contentDims.width,
            y: this.position.y + this.storage.getHeight() + 30
          },
          craftButtonWidth, craftButtonHeight,
          "Craft"
        )

        this.craftButton.initSVG()
        this.craftButton.addGraphicsTo(this.svg.contentAreaGroup)
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

        this.craftButton.moveTo({
          x: this.position.x +
              this.buttonDims.width -
              this.contentDims.width +
              this.contentDims.width / 2 -
              this.craftButton.getWidth() / 2,
          y: this.position.y + this.storage.getHeight() + 40
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

        this.craftButton.moveTo({
          x: this.position.x + this.buttonDims.width + this.craftButton.getWidth(),
          y: this.position.y + 30
        })

      }

    }
  })
