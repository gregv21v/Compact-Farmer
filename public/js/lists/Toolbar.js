define(["lists/Storage", "items/Slot"],
  function(Storage, Slot) {
    return class Toolbar extends Storage {
      constructor() {
        super(1, 10)

        this.selectedSlot = this.slots[0][0];
      }
    }


})
