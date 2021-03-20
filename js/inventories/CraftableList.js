define([
  "lists/GameObjectList",
  "objects/StickItem",
  "objects/ChairItem"
],
  function(GameObjectList, StickItem, ChairItem) {
    return class CraftableList extends GameObjectList {

      /**
        constructor()
        @description constructor
        @param inventory the inventory that will be
          used to find what items are craftable
      */
      constructor(inventory) {
        super()
        this.inventory = inventory
        this.craftableItems = [
          new StickItem(),
          new ChairItem()
        ]
      }

      /**
        showCraftableItems()
        @description shows a list of all the items that can be crafted
          using the items in the given inventory
      */
      showCraftableItems() {
        for (var i = 0; i < this.craftableItems.length; i++) {
          if(this.craftableItems[i].canCraft(this.inventory)) {
            this.gameObjects.push(this.craftableItems[i])
            console.log(this.craftableItems[i].name);
          }
        }
      }


    }
})
