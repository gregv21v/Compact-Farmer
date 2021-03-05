define(["items/Slot", "d3"],
  function(Slot, d3) {
    return class Storage {
      constructor(rows, columns) {
        this.position = {x: 0, y: 0}
        this.slotSize = 50;
        this.slots = [];
        for (var x = 0; x < columns; x++) {
          var newRow = []
          for (var y = 0; y < rows; y++) {
            var newSlot = new Slot(
              this,
              {
                x: this.position.x + this.slotSize * x,
                y: this.position.y + this.slotSize * y
              }
            )
            newSlot.initSVG()
            newRow.push(newSlot)
          }
          this.slots.push(newRow);
        }

        this.lastId = 0;
        this.rows = rows;
        this.columns = columns
        this.selectedSlot = null;

        // determines if you can move objects
        // from one slot to another in the inventory
        this.itemsMovable = false;

        this.svg = {
          group: d3.create("svg:g")
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
          columns: this.columns,
          rows: this.rows,
          slots: []
        }
        for (var x = 0; x < this.columns; x++) {
          var newRow = []
          for (var y = 0; y < this.rows; y++) {
            var newSlot = this.slots[x][y].toJSON()
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
        this.slots = []
        for (var x = 0; x < this.columns; x++) {
          var newRow = []
          for (var y = 0; y < this.rows; y++) {
            var newSlot = Slot.fromJSON(
              this.player, this,
              json.slots[x][y],
              {
                x: this.position.x + this.slotSize * x,
                y: this.position.y + this.slotSize * y
              }
            )
            newRow.push(newSlot);
          }
          this.slots.push(newRow);
        }
        console.log(this.slots);
      }

      /**
        delete()
        @description delete the svg for this storage
      */
      delete() {
        this.svg.group.remove()
      }


      /**
        add()
        @description adds an item to the first available slot in the
          storage container.
        @param item the item to add
      */
      add(item) {
        // find the first available slot and place the item there
        for (var x = 0; x < this.slots.length; x++) {
          for (var y = 0; y < this.slots[x].length; y++) {
            if(this.slots[x][y].isEmpty()) {
              item.initSVG()
              this.slots[x][y].addItem(item);
              return;
            }
          }
        }
      }

      /**
        useSelectedItem()
        @description use the selected item
      */
      useSelectedSlot() {
        this.selectedSlot.useSlot();
      }

      /**
        getWidth()
        @description gets the width of the inventory
      */
      getWidth() {
        return this.slotSize * this.columns
      }

      /**
        getHeight()
        @description gets the height of the inventory
      */
      getHeight() {
        return this.slotSize * this.rows
      }


      /**
        moveTo()
        @description moves the storage to a new position
        @param position position to move to
      */
      moveTo(position) {
        for (var x = 0; x < this.slots.length; x++) {
          for (var y = 0; y < this.slots[x].length; y++) {
            this.slots[x][y].setPosition({
              x: position.x + this.slotSize * x,
              y: position.y + this.slotSize * y
            })
          }
        }
      }

      /**
        addGraphicsTo()
        @description add the graphics of the storage to a given svg group
        @param group the group to add the graphics to
      */
      addGraphicsTo(group) {
        var graphics = this.getGraphics()
        //console.log(graphics);
        for (var i = 0; i < graphics.length; i++) {
          group.append(() => graphics[i].node())
        }
      }


      /**
        deselectAll()
        @description deselect all the items in the storage
      */
      deselectAll() {
        for (var x = 0; x < this.slots.length; x++) {
          for (var y = 0; y < this.slots[x].length; y++) {
            this.slots[x][y].deselect();
          }
        }
      }

      /**
        select()
        @description selects a given slot of this storage
        @param slot slot to be selected
      */
      select(slot) {
        this.selectedSlot = slot;
      }

      /**
        getCurrentlySelected()
        @description get the currently selected slot
      */
      getCurrentlySelected() {
        return this.selectedSlot;
      }

      /**
        getGraphics()
        @description get all the graphics for the storage
      */
      getGraphics() {
        var graphicsList = []
        for (var x = 0; x < this.slots.length; x++) {
          for (var y = 0; y < this.slots[x].length; y++) {
            graphicsList.push(this.slots[x][y].getGraphic())
          }
        }
        return graphicsList;
      }
    }
})
