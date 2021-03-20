define(
  [],
  function() {
    return class PlantRecipeRegistry {

      /**
        constructor()
        @description constructs the recipe registry
      */
      constructor() {
        this.recipes = {}
      }

      /**
        addRecipe()
        @description adds a recipe to the recipe registry.
        @param recipe the recipe to add the the registry
      */
      add(recipe) {
        this.recipes[recipe.input] = recipe;
      }

      /**
        lookup()
        @description look up a recipe by its input
      */
      lookup(name) {
        return this.recipes[name]
      }

    }
  }
)
