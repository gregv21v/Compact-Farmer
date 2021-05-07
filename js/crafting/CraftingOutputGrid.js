define(
  [
    "items/Slot", "inventories/Inventory", "crafting/CraftingOutputSlot", "d3"
  ],
  function(Slot, Inventory, CraftingOutputSlot, d3) {
    /**
      Grid -- the snapping grid to snap Items to.
    */
    return class CraftingOutputGrid extends Inventory {
      /**
        constructor()
        @description constructs the CraftingOutputGrid
        @param craftingGrid the grid to craft the items in
        @param inventoryManager the inventory manager that manages all the inventories
      */
      constructor(crafter, inventoryManager) {
        super(inventoryManager, 1, 1)

        this._slots = new CraftingOutputSlot(crafter, inventoryManager, this, this._position)
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
        this._slots.addGraphicsTo(this._svg.layers.slots);
      }

      /**
        initSVG()
        @description initializes the attributes and styles of the grid's svgs
      */
      initSVG() {
        this._slots.initSVG()
      }

      /********************************************************
                          Getters and Setters
      *********************************************************/

      /**
        addItem()
        @description adds a item to a specified x, and y coordinate
          in the grid
        @param x the x coordinate to add the item to
        @param y the y coordinate to add the item to
        @param item the item to add
      */
      addItem(x, y, item) {
        this._slots.addItem(item, this._svg.layers)
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
        return this._slots;
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
        this._slots.position = {
          x: position.x,
          y: position.y
        }
      }
    }
  }
)
