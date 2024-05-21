
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
import { ArugulaLeafItem } from "./items/ArugulaLeafItem.js";
import { ArugulaSeedItem } from "./items/ArugulaSeedItem.js";
import { IronChunksItem } from "./items/IronChunksItem.js";

export class Player {
  /**
   * constructor()
   * @description create a new player
   * @param {d3.selection} mouseLayer the layer to add the mouse to
   * @param {d3.selection} inventoryLayer the layer to add the inventory to
   */
    constructor(props) {
      this._props = props

      this._inventoryLayer = props.inventoryLayer
      this._mouseLayer = props.mouseLayer

      var self = this;
      var canvas = d3.select("body").select("svg")

      this.hand = null; // an item/object that follows the curser movement

      this.registerPlantRecipes();
      this.registerCraftingRecipes();
      this.registerItems()

      canvas.on("mousemove", (event) => { self.onMouseMove(event) })
    }


    /**
     * get inventory()
     * @description gets the inventory 
     * @returns the inventory
     */
    get inventory() {
      return this._inventory
    }

    /**
     * get toolbar()
     * @description gets the toolbar 
     * @returns the toolbar
     */
    get toolbar() {
      return this._toolbar
    }

    /**
     * get crafter()
     * @description gets the crafter 
     * @returns the crafter
     */
    get crafter() {
      return this._crafter
    }

    /**
     * get inventoryManager()
     * @description gets the inventory manager
     * @returns the inventory manager
     */
    get inventoryManager() {
      return this._inventoryManager
    }


    /**
     * createInventories() 
     * @description creates the inventories for the player
     */
    createInventories() {
      this._inventoryManager = new InventoryManager(this._inventoryLayer)
      this._inventory = new Inventory(this, this._inventoryManager, 6, 5)
      this._crafter = new Crafter(this, this._inventoryManager, {x: 0, y: 0})
      this._toolbar = new Toolbar(this, this._inventoryManager)

      this._inventoryManager.addInventory(this.inventory);
      this._inventoryManager.addInventory(this.toolbar);
    }



    // TODO: Make it so that the json for the inventories is simply a list of items with their coordinates

    /**
     * fromJSON()
     * @description create a player from a json object
     * @param {JSON} json the json to load
     */
    static fromJSON(json, props) {
      var player = new Player(props)
      player._inventoryManager = new InventoryManager(player.inventoryLayer)
      player._inventory = Inventory.fromJSON(player, player._inventoryManager, json.inventory)
      player._toolbar = Toolbar.fromJSON(player, player._inventoryManager, json.toolbar)
      player._crafter = new Crafter(player, player._inventoryManager, {x: 0, y: 0})

      player._inventoryManager.addInventory(player._inventory);
      player._inventoryManager.addInventory(player._toolbar);
      return player
    }



    /**
     * render()
     * @description render the player
     * @param {Object} props the properties to render the player with
     */
    render() {



      this.inventory.render()
      this.toolbar.render()
      this.crafter.render()
    }

   

    /**
     * attach()
     * @description add the graphics to the given svg element
     * @param {d3.selection} svg the svg element to add the graphics to
     */
    attach(svg) {

    }


    /**
     * update()
     * @description update the player
     * @param {Object} props the properties to render the player with
     */
    update(props) {
      Object.assign(this._props, props)
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
      this.hand.inPlayerHand = false;
      this.hand = null
    }




    /**
      onMouseMove()
      @description the function called when the mouse moves
    */
    onMouseMove(event) {
      let pos = d3.pointer(event)
      if(this.hand) {
        this.hand.position = {
          x: pos[0],
          y: pos[1]
        } 
        
        this.hand.update() 
      }    
    }


    /**
      registerItems()
      @description register items
    */
    registerItems() {
      ItemRegistry.registerItem(new GrassSeedItem())
      ItemRegistry.registerItem(new SpinachSeedItem())
      ItemRegistry.registerItem(new SpinachItem())
      ItemRegistry.registerItem(new GrassBladeItem())
      ItemRegistry.registerItem(new GrassSieveItem())
      ItemRegistry.registerItem(new HoeItem())
      ItemRegistry.registerItem(new ShovelItem())
      ItemRegistry.registerItem(new DirtBlockItem())
      ItemRegistry.registerItem(new FullLeafBucketItem())
      ItemRegistry.registerItem(new EmptyLeafBucketItem())
      ItemRegistry.registerItem(new EmptyItem())
      ItemRegistry.registerItem(new ArugulaLeafItem())
      ItemRegistry.registerItem(new ArugulaSeedItem())
      ItemRegistry.registerItem(new IronChunksItem())
    
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

      CraftingRegistry.register(new CraftingRecipe(
        new CraftingInput(
          [
            [new ArugulaLeafItem(), new ArugulaLeafItem(), new ArugulaLeafItem()],
            [new ArugulaLeafItem(), new ArugulaLeafItem(), new ArugulaLeafItem()],
            [new ArugulaLeafItem(), new ArugulaLeafItem(), new ArugulaLeafItem()]
          ]
        ),
        new DirtBlockItem()
      ))


      CraftingRegistry.register(new CraftingRecipe(
        new CraftingInput(
          [
            [new SpinachItem(), new SpinachItem(), new SpinachItem()],
            [new SpinachItem(), new SpinachItem(), new SpinachItem()],
            [new SpinachItem(), new SpinachItem(), new SpinachItem()]
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
            ),
            new PlantOutput( 
              new ArugulaSeedItem(),
              1, 3
            )  
          ]
        )
      )


      PlantRecipeRegistry.add(
        new PlantRecipe(
          "ArugulaCrop",
          [
            new PlantOutput(
              new ArugulaLeafItem(),
              3, 5
            ),
            new PlantOutput( 
              new ArugulaSeedItem(),
              1, 3
            )  
          ]
        )
      )
    }
}
