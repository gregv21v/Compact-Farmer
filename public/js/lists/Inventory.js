define(["app/objects/ItemStack", "app/lists/GameObjectList"],
  function(GameObject, GameObjectList) {
    return class Inventory extends Storage {

      /**
        add()
        @description add a itemStack to the inventory
        @param itemStack the itemStack to add to the inventory
      */
      add(itemStack) {
        for (var i = 0; i < this.items.length; i++) {
          if(typeof itemStack === typeof this.items[i]) {
            // stack the new game object on the existing one
            this.items[i].quantity += 1;
            return;
          }
        }
        itemStack.id = this.lastId;
        this.lastId++;
        this.items.push(itemStack);
      }


    /**
      contains()
      @description checks if a given game object is in the inventory
        matching both type and quantity
      @param gameObject the game object to check for
    */
    contains(gameObject) {
      for (var i = 0; i < this.items.length; i++) {
        if(
          typeof gameObject === typeof this.items[i] &&
          gameObject.quantity <= this.items[i].quantity
        ) {
          return true;
        }
      }
      return false;
    }

    /**
      take()
      @description takes an item stack from the inventory of one or
        more items
      @param itemStack the item to take
    */
    take(itemStack) {
      for (var i = 0; i < this.items.length; i++) {
        if(
          typeof gameObject === typeof this.items[i] &&
          itemStack.quantity <= this.items[i].quantity
        ) {
          // remove the itemStack from the inventory
          if(itemStack.quantity === this.items[i].quantity) {
            this.items = this.items.slice(i, 1);
            return itemStack;
          } else {
            this.items[i].quantity -= itemStack.quantity;
            return itemStack;
          }
        }
      }
      return null;
    }

  }
})
