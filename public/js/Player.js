define(
  [
    "lists/Storage", "lists/Toolbar",
    "recipes/PlantRecipe", "recipes/PlantRecipeRegistry",
    "items/GrassBladeItem", "items/GrassSeedItem",
  ],
  function(
    Storage, Toolbar,
    PlantRecipe, PlantRecipeRegistry,
    GrassBladeItem, GrassSeedItem
  ) {
    return class Player {
      constructor() {
        var self = this;

        this.hand = null; // an item/object that follows the curser movement
        this.inventory = new Storage(6, 5)
        this.toolbar = new Toolbar()

        this.registerRecipes();
      }

      /**
        registerRecipes()
        @description register recipes
      */
      registerRecipes() {
        this.recipeRegistry = new PlantRecipeRegistry()

        this.recipeRegistry.add(new PlantRecipe(
          "GrassCrop",
          [new GrassSeedItem(), new GrassBladeItem()]
        ))
      }
    }


  })
