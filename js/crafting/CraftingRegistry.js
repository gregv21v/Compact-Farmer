/**
 * ItemRegistry -- Keeps track of all the types of units in the game
 */
export class CraftingRegistry {
  static recipes = {}

  /**
    registerItem()
    @description registers a unit by name
    @param unit the unit to register
  */
  static register(recipe) {
    this.recipes[recipe.getKey()] = recipe;
  }


  /**
    lookup()
    @description look up a unit by name
    @param name the name of the unit
  */
  static lookup(craftingInput) {
    return this.recipes[craftingInput.getKey()];
  }

}
