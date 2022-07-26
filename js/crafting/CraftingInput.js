export class CraftingInput {
  /**
    constructor()
    @description constructs the recipe
    @param items a 3x3 array of items
  */
  constructor(items) {
    this.items = items;
  }

  /**
   * getKey()
   * @description get the string of inputs as a key
   */
  getKey() {
    var key = "";
    for (var y = 0; y < this.items.length; y++) {
      for (var x = 0; x < this.items[y].length; x++) {
        key += this.items[x][y].name + "_";
      }
    }
    //console.log(key);
    return key;
  }

}
