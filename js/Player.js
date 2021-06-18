define(
  [
    "inventories/Inventory", "inventories/Toolbar",
    "inventories/InventoryManager",
    "recipes/PlantOutput", "recipes/PlantRecipe", "recipes/PlantRecipeRegistry",
    "crafting/CraftingInput",
    "crafting/CraftingRecipe", "crafting/CraftingRegistry",
    "crafting/Crafter",
    "items/HoeItem",
    "items/GrassBladeItem", "items/GrassSeedItem", "items/GrassSieveItem",
    "items/SpinachItem", "items/SpinachSeedItem", "items/EmptyItem",
    "items/DirtBlockItem", "items/FullLeafBucketItem", "items/EmptyLeafBucketItem",
    "items/ShovelItem", "items/ItemRegistry",
    "d3"
  ],
  function(
    Inventory, Toolbar, InventoryManager,
    PlantOutput, PlantRecipe, PlantRecipeRegistry,
    CraftingInput,
    CraftingRecipe, CraftingRegistry,
    Crafter,
    HoeItem,
    GrassBladeItem, GrassSeedItem, GrassSieveItem,
    SpinachItem, SpinachSeedItem, EmptyItem,
    DirtBlockItem, FullLeafBucketItem, EmptyLeafBucketItem,
    ShovelItem, ItemRegistry,
    d3
  ) {
    return class Player {
      constructor() {
        var self = this;

        this.hand = null; // an item/object that follows the curser movement
        this.inventoryManager = new InventoryManager()
        this.inventory = new Inventory(this.inventoryManager, 6, 5)
        this.crafter = new Crafter(this.inventoryManager, {x: 0, y: 0})

        this.toolbar = new Toolbar(this.inventoryManager)

        this.inventoryManager.addInventory(this.inventory);
        this.inventoryManager.addInventory(this.toolbar);

        this.inventory.add(new GrassBladeItem())
        this.inventory.add(new GrassBladeItem())
        this.inventory.add(new GrassBladeItem())
        this.inventory.add(new GrassBladeItem())
        this.inventory.add(new GrassBladeItem())
        this.inventory.add(new GrassBladeItem())

        this.toolbar.add(new GrassSeedItem())
        this.toolbar.add(new DirtBlockItem())
        this.toolbar.add(new DirtBlockItem())
        this.toolbar.add(new HoeItem())

        this.registerPlantRecipes();
        this.registerCraftingRecipes();
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
        ItemRegistry.registerItem(new GrassSeedItem())
        ItemRegistry.registerItem(new SpinachSeedItem())
        ItemRegistry.registerItem(new GrassBladeItem())
        ItemRegistry.registerItem(new GrassSieveItem())
        ItemRegistry.registerItem(new HoeItem())
      }

      /**
        registerCraftingRecipes()
        @description register recipes
      */
      registerCraftingRecipes() {
        CraftingRegistry.register(new CraftingRecipe(
          new CraftingInput(
            [
              [new GrassBladeItem(), new GrassBladeItem(), new EmptyItem()],
              [new GrassBladeItem(), new GrassBladeItem(), new EmptyItem()],
              [new EmptyItem(), new EmptyItem(), new EmptyItem()]
            ]
          ),
          new GrassSieveItem()
        ))

        CraftingRegistry.register(new CraftingRecipe(
          new CraftingInput(
            [
              [new GrassBladeItem(), new GrassBladeItem(), new GrassBladeItem()],
              [new GrassBladeItem(), new GrassBladeItem(), new GrassBladeItem()],
              [new GrassBladeItem(), new GrassBladeItem(), new GrassBladeItem()]
            ]
          ),
          new DirtBlockItem()
        ))
      }

      /**
        registerPlantRecipes()
        @description register recipes
      */
      registerPlantRecipes() {
        PlantRecipeRegistry.add(
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

        PlantRecipeRegistry.add(
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

        PlantRecipeRegistry.add(
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
