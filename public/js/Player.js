define(
  [
    "lists/Storage", "lists/Toolbar",
    "recipes/PlantOutput", "recipes/PlantRecipe", "recipes/PlantRecipeRegistry",
    "items/HoeItem", "items/GrassBladeItem", "items/GrassSeedItem",
    "d3"
  ],
  function(
    Storage, Toolbar,
    PlantOutput, PlantRecipe, PlantRecipeRegistry,
    HoeItem,
    GrassBladeItem, GrassSeedItem,
    d3
  ) {
    return class Player {
      constructor() {
        var self = this;

        this.hand = null; // an item/object that follows the curser movement
        this.inventory = new Storage(6, 5)
        this.toolbar = new Toolbar()

        this.toolbar.add(
          new GrassSeedItem()
        )

        this.toolbar.add(
          new HoeItem()
        )

        this.registerRecipes();

        var mainSVG = d3.select("body").select("svg")
        mainSVG.on("mousemove", function() { self.onMouseMove() })
      }


      /**
        onMouseMove()
        @description the function called when the mouse moves
      */
      onMouseMove() {
        //this.hand.setPosition(d3.mouse)
      }

      /**
        registerRecipes()
        @description register recipes
      */
      registerRecipes() {
        this.recipeRegistry = new PlantRecipeRegistry()

        this.recipeRegistry.add(
          new PlantRecipe(
            "GrassCrop",
            [
              new PlantOutput(
                new GrassSeedItem(),
                1, 3
              ),
              new PlantOutput(
                new GrassBladeItem(),
                1, 2
              )
            ]
          )
        )
      }
    }


  })
