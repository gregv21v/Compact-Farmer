define([
  "items/ItemRegistry",
  "items/GrassSeedItem",
  "items/GrassBladeItem",
  "items/HoeItem",
  "items/SeedItem",
  "items/Item",
  "items/Slot", "d3"],
  function(
    ItemRegistry,
    GrassSeedItem, GrassBladeItem, HoeItem, SeedItem, Item,
    Slot, d3) {
    return class Inventory {

      /**
        constructor()
        @description constructs the Inventory
        @param manager the inventory manager
        @param rows the rows of this inventory
        @param columns the columns of this inventory
      */
      constructor(manager, rows, columns) {
        this._position = {x: 0, y: 0}
        this._slots = [];
        this._rows = rows;
        this._columns = columns;
        this._selectedSlot = null;
        this._inventoryManager = manager;

        // determines if you can move objects
        // from one slot to another in the inventory
        this._itemsMovable = false;
        this._active = true;

        this._svg = {
          group: d3.create("svg:g"),
          layers: {}
        }
        this._svg.layers = {
          slots: this._svg.group.append("g"),
          items: this._svg.group.append("g"),
          contextMenus: this._svg.group.append("g")
        }

        this._svg.group.attr("class", "inventory")
        this._svg.layers.slots.attr("class", "slotsLayer")
        this._svg.layers.items.attr("class", "itemsLayer")
        this._createSlots();
      }

      /**
        _createSlots()
        @description create all the _slots for the storage
      */
      _createSlots() {
        for (var x = 0; x < this._columns; x++) {
          var newRow = []
          for (var y = 0; y < this._rows; y++) {
            var newSlot = new Slot(
              this._inventoryManager, this,
              {
                x: this._position.x + Slot.size * x,
                y: this._position.y + Slot.size * y
              }
            )
            newRow.push(newSlot)
          }
          this._slots.push(newRow);
        }
      }


      /********************************************************
                        JSON Function
      *********************************************************/
      /**
        toJSON()
        @description converts this storage to its json representation
      */
      toJSON() {
        let storageAsJSON = {
          columns: this._columns,
          rows: this._rows,
          slots: []
        }
        for (var x = 0; x < this._columns; x++) {
          var newRow = []
          for (var y = 0; y < this._rows; y++) {
            var newSlot = this._slots[x][y].toJSON()
            newRow.push(newSlot);
          }
          storageAsJSON.slots.push(newRow);
        }
        return storageAsJSON;
      }

      /**
        fromJSON()
        @description convert a json object to a storage object
      */
      fromJSON(json) {
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            this._slots[x][y].destroyItem()
            var jsonItem = json.slots[x][y].item;
            if(jsonItem !== null) {
              this._slots[x][y].addItem(
                ItemRegistry.itemFromJSON(jsonItem), this._svg.layers.items
              )
            }
          }
        }
      }

      /********************************************************
                        Getters and Setters
      *********************************************************/

      /**
        get width
        @description gets the width of the inventory
      */
      get width() {
        return Slot.size * this._columns
      }

      /**
        get height
        @description gets the height of the inventory
      */
      get height() {
        return Slot.size * this._rows
      }

      /**
        get currentlySelected
        @description get the currently selected slot
      */
      get currentlySelected() {
        return this._selectedSlot;
      }

      /**
        get itemsMoveable
        @description gets whether the items are movable
      */
      get itemsMovable() {
        return this._itemsMovable;
      }

      /**
        set itemsMoveable
        @description gets whether the items are movable
      */
      set itemsMovable(value) {
        this._itemsMovable = value;
      }

      /**
        get active
        @description gets whether the items are active
      */
      get active() {
        return this._active;
      }

      /**
        activate
        @description activate the inventory
      */
      activate() {
        this._active = true;
      }

      /**
        deactivate
        @description deactivate the inventory
      */
      deactivate() {
        this._active = false;
      }

      /**
       * get contextMenuSVG
       * @description gets the contextMenuSVG
       */
      get contextMenuSVG() {
        return this._svg.layers.contextMenus
      }




      /**
        moveTo()
        @description moves the storage to a new position
        @param position position to move to
      */
      moveTo(position) {
        for (var x = 0; x < this._slots.length; x++) {
          for (var y = 0; y < this._slots[x].length; y++) {
            this._slots[x][y].position = {
              x: position.x + Slot.size * x,
              y: position.y + Slot.size * y
            }
          }
        }
      }

      /**
        add()
        @description adds an item to the first available slot in the
          storage container.
        @param item the item to add
      */
      add(item) {
        // find the first available slot and place the item there
        for (var x = 0; x < this._slots.length; x++) {
          for (var y = 0; y < this._slots[x].length; y++) {
            if(this._slots[x][y].isEmpty() || this._slots[x][y].item.name === item.name) {
              this._slots[x][y].addItem(item, this._svg.layers.items);
              return;
            }
          }
        }
      }

      /**
        getClosestSlot()
        @description get the closest slot to the given unit
        @param unit the unit to find the closest slot to
      */
      getClosestSlot(item) {
        var distance = this._slots[0][0].distanceTo(item);
        var closestSlot = this._slots[0][0];
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            var tempDistance = this._slots[x][y].distanceTo(item)
            if(tempDistance <= distance) {
              distance = tempDistance;
              closestSlot = this._slots[x][y];
            }
          }
        }
        return closestSlot;
      }

      /**
        snapToClosestSlot()
        @description snap a given item to the closest slot
        @param item the item to snap to the closest slot
      */
      snapToClosestSlot(item) {
        var closestSlot = this.getClosestSlot(item)
        this.addUnitToSlot(closestSlot, item)
      }


      /**
        addItemToSlot()
        @description adds a item to a specified slot
        @param slot the slot to add the item to
        @param item the item to add
      */
      addItemToSlot(slot, item) {
        slot.addItem(item, this._svg.layers.items);
      }



      /********************************************************
                        Graphics
      *********************************************************/

      /**
        addGraphicsTo()
        @description add the graphics of the storage to a given svg group
        @param parent the parent to add the graphics to
      */
      addGraphicsTo(parent) {
        parent.append(() => this._svg.group.node())
        for (var x = 0; x < this._slots.length; x++) {
          for (var y = 0; y < this._slots[x].length; y++) {
            this._slots[x][y].initSVG()
            this._slots[x][y].addGraphicsTo(this._svg.layers.slots);
          }
        }
      }

      /**
        initSVG()
        @description initializes the attributes and styles of the grid's svgs
      */
      initSVG() {
        for (var x = 0; x < this.columns; x++) {
          for (var y = 0; y < this.rows; y++) {
            this._slots[x][y].initSVG()
          }
        }
      }

      /**
        delete()
        @description delete the svg for this storage
      */
      delete() {
        this._svg.group.remove()
      }


      /**
        deselectAll()
        @description deselect all the items in the storage
      */
      deselectAll() {
        for (var x = 0; x < this._slots.length; x++) {
          for (var y = 0; y < this._slots[x].length; y++) {
            this._slots[x][y].deselect();
          }
        }
      }

      /**
        select()
        @description selects a given slot of this storage
        @param slot slot to be selected
      */
      select(slot) {
        this._selectedSlot = slot;
      }


      /**
        useSelectedItem()
        @description use the selected item
      */
      useSelectedSlot() {
        this._selectedSlot.useSlot();
      }



    }
})
