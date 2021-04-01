define(
  [],
  function() {
    return class PlantRecipeRegistry {

      static recipes = {}

      /**
        addRecipe()
        @description adds a recipe to the recipe registry.
        @param recipe the recipe to add the the registry
      */
      static add(recipe) {
        PlantRecipeRegistry.recipes[recipe.input] = recipe;
      }

      /**
        lookup()
        @description look up a recipe by its input
      */
      static lookup(name) {
        return PlantRecipeRegistry.recipes[name]
      }

    }
  }
)
