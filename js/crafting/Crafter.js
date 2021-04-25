define(
  [
    "crafting/CraftingOutputGrid",
    "crafting/CraftingGrid",
    "items/Slot"
  ],
  function(CraftingOutputGrid, CraftingGrid, Slot) {
    /**
     * Crafter - a gui that manages crafting
     */
    return class Crafter {
      /**
        constructor()
        @description constructs the crafter
        @param inventoryManager the grid manager to manage the grids
        @param position the position to put the crafter
      */
      constructor(inventoryManager, position) {
        this._position = position;
        this._inventoryManager = inventoryManager
        this._craftingGrid = new CraftingGrid(this, inventoryManager, 3, 3);
        this._outputSlot = new CraftingOutputGrid(this, inventoryManager);

        this._inventoryManager.addInventory(this._craftingGrid)
        this._inventoryManager.addInventory(this._outputSlot)

        this._craftingGrid.moveTo({
          x: position.x,
          y: position.y
        })

        this._outputSlot.moveTo({
          x: position.x + this._craftingGrid.width + Slot.size,
          y: position.y + this._craftingGrid.height / 2 - Slot.size / 2
        })
      }


      /**
       * get width()
       * @description gets the width of the crafter
       */
      get width() {
        return this._craftingGrid.width + this._outputSlot.width + Slot.size;
      }

      /**
       * get height()
       * @description gets the height of the crafter
       */
      get height() {
        return this._craftingGrid.height
      }


      /**
       * moveTo()
       * @description move the crafter to a different location
       */
       moveTo(position) {
         this._position = position;
         this._craftingGrid.moveTo({
           x: position.x,
           y: position.y
         })

         this._outputSlot.moveTo({
           x: position.x + this._craftingGrid.width + Slot.size,
           y: position.y + this._craftingGrid.height / 2 - Slot.size / 2
         })
       }

       /**
         initSVG()
         @description initializes the attributes and styles of the crafter's svgs
       */
       initSVG() {
         this._outputSlot.initSVG();
         this._craftingGrid.initSVG();
       }

       /**
         addGraphicsTo()
         @description initializes the attributes and styles of the crafter's svgs
         @param parent the parent svg to attach the crafter to
       */
       addGraphicsTo(parent) {
         this._craftingGrid.addGraphicsTo(parent)
         this._outputSlot.addGraphicsTo(parent)
       }

       /**
         outputItem()
         @description adds a item to the output slot
         @param item the item to add to the output
       */
       outputItem(item) {
         this._outputSlot.addItem(0, 0, item)
       }

       /**
        * consumeUnits()
        * @description consume all the items used in the crafting recipe
        */
      consumeItems() {
        this._craftingGrid.consumeItems()
      }

    }
  }
)
