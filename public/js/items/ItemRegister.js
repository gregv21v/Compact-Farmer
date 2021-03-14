define(
  [
    "d3"
  ],
  function(d3) {
    return class ItemRegistry {

      /**
        constructor()
        @description constructs the item registry
      */
      constructor() {
        this.items = {};
      }


      /**
        registerItem()
        @description registers a item by name
        @param item the item to register
      */
      registerItem(item) {
        this.items[item.name] = item;
      }


      /**
        lookup()
        @description look up a item by name
        @param name the name of the item
      */
      lookup(name) {
        return this.items[name];
      }

      /**
        itemFromJSON()
        @description converts a item from json
        @param item the item to convert
      */
      itemFromJSON(json) {
        var resultItem = null;
        for (var item of Object.keys(this.items)) {
          if(json.name === item.name) {
            item = item.clone()
            item.quantity = jsonItem.quantity
          }
        }
        return item
      }

    }
  }
)
