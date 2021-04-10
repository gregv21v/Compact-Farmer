define(
  [],
  function() {
    return class ItemRegistry {
      static items = {}


      /**
        registerItem()
        @description registers a item by name
        @param item the item to register
      */
      static registerItem(item) {
        this.items[item.name] = item;
      }


      /**
        lookup()
        @description look up a item by name
        @param name the name of the item
      */
      static lookup(name) {
        return this.items[name];
      }

      /**
        itemFromJSON()
        @description converts a item from json
        @param item the item to convert
      */
      static itemFromJSON(json) {
        var resultItem = null;
        for (var key of Object.keys(this.items)) {
          if(json !== null && json.name === key) {
            resultItem = this.items[key].clone()
            resultItem.quantity = json.quantity
          }
        }
        return resultItem
      }

    }
  }
)
