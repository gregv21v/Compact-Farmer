define(
  [
    "inventories/Inventory", "inventories/Toolbar", "inventories/InventoryManager",
    "recipes/PlantOutput", "recipes/PlantRecipe", "recipes/PlantRecipeRegistry",
    "items/HoeItem",
    "items/GrassBladeItem", "items/GrassSeedItem", "items/GrassSieveItem",
    "items/SpinachItem", "items/SpinachSeedItem",
    "items/ItemRegistry",
    "d3"
  ],
  function(
    Inventory, Toolbar, InventoryManager,
    PlantOutput, PlantRecipe, PlantRecipeRegistry,
    HoeItem,
    GrassBladeItem, GrassSeedItem, GrassSieveItem,
    SpinachItem, SpinachSeedItem,
    ItemRegistry,
    d3
  ) {
    return class Player {
      constructor() {
        var self = this;

        this.hand = null; // an item/object that follows the curser movement
        this.inventoryManager = new InventoryManager()
        this.inventory = new Inventory(this.inventoryManager, 6, 5)
        this.craftingInventory = new Inventory(this.inventoryManager, 3, 3)
        this.toolbar = new Toolbar(this.inventoryManager)

        this.inventoryManager.addInventory(this.inventory);
        this.inventoryManager.addInventory(this.toolbar);
        this.inventoryManager.addInventory(this.craftingInventory);

        this.toolbar.add(
          new SpinachSeedItem()
        )

        this.toolbar.add(
          new HoeItem()
        )

        this.toolbar.add(
          new GrassSieveItem()
        )

        this.registerRecipes();
        this.registerItems()

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
        registerItems()
        @description register items
      */
      registerItems() {
        this.itemRegistry = new ItemRegistry();

        this.itemRegistry.registerItem(new GrassSeedItem())
        this.itemRegistry.registerItem(new SpinachSeedItem())
        this.itemRegistry.registerItem(new GrassBladeItem())
        this.itemRegistry.registerItem(new GrassSieveItem())
        this.itemRegistry.registerItem(new HoeItem())
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

        this.recipeRegistry.add(
          new PlantRecipe(
            "SpinachCrop",
            [
              new PlantOutput(
                new SpinachSeedItem(),
                1, 1
              ),
              new PlantOutput(
                new SpinachItem(),
                1, 2
              )
            ]
          )
        )

        this.recipeRegistry.add(
          new PlantRecipe(
            "GrassSieve",
            [
              new PlantOutput(
                new SpinachSeedItem(),
                1, 3
              )
            ]
          )
        )
      }
    }


  })
