
import {
  Inventory, Toolbar, InventoryManager
} from "./inventories/inventories.js"
import {
  PlantOutput, PlantRecipe, PlantRecipeRegistry
} from "./recipes/recipes.js"
import {
  CraftingInput, CraftingRecipe, CraftingRegistry,
  Crafter
} from "./crafting/crafting.js"
import {
  HoeItem, GrassBladeItem, GrassSeedItem, GrassSieveItem,
  SpinachItem, SpinachSeedItem, EmptyItem,
  DirtBlockItem, FullLeafBucketItem, EmptyLeafBucketItem,
  ShovelItem, ItemRegistry
} from "./items/items.js"
import { BlockRegistry } from "./blocks/BlockRegistry.js";

export class Player {
  /**
   * constructor()
   * @description create a new player
   * @param {d3.selection} mouseLayer the layer to add the mouse to
   * @param {d3.selection} inventoryLayer the layer to add the inventory to
   */
    constructor(mouseLayer, inventoryLayer) {
      var self = this;
      var canvas = d3.select("body").select("svg")

      this._mouseLayer = mouseLayer
      this._inventoryLayer = inventoryLayer

      this.hand = null; // an item/object that follows the curser movement
      this.inventoryManager = new InventoryManager(inventoryLayer)
      this.inventory = new Inventory(this, this.inventoryManager, 6, 5)
      this.crafter = new Crafter(this, this.inventoryManager, {x: 0, y: 0})
      this.toolbar = new Toolbar(this, this.inventoryManager)

      

      this.inventoryManager.addInventory(this.inventory);
      this.inventoryManager.addInventory(this.toolbar);


      this.inventory.add(new GrassBladeItem())
      this.inventory.add(new GrassBladeItem())
      this.inventory.add(new GrassBladeItem())
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
      this.toolbar.add(new ShovelItem())

      this.registerPlantRecipes();
      this.registerCraftingRecipes();
      this.registerItems()

      
      canvas.on("mousemove", (event) => { self.onMouseMove(event) })
    }

    /**
     * addGraphicsTo()
     * @description add the graphics to the given svg element
     * @param {d3.selection} svg the svg element to add the graphics to
     */
    addGraphicsTo(svg) {

    }



    /**
     * addToHand()
     * @description add an item to the hand of the player
     * @param {Item} item the item to add
     */
    addItemToHand(item) {
      this.hand = item
      this._mouseLayer.append(() => item.svgGroup.node())
    }


    /** 
     * removeItemFromHand()
     * @description remove an item from the hand of the player
     * @param {Item} item the item to remove
     */
    removeItemFromHand() {
      this.hand = null
    }




    /**
      onMouseMove()
      @description the function called when the mouse moves
    */
    onMouseMove(event) {
      let pos = d3.pointer(event)
      if(this.hand)
        this.hand.position = {
          x: pos[0],
          y: pos[1]
        }      
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
      ItemRegistry.registerItem(new ShovelItem())
      ItemRegistry.registerItem(new DirtBlockItem())
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
