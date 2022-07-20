import { Player } from "./Player.js"
import { World } from "./World.js"
import { HUD } from "./HUD.js"
import { PlantRecipe, PlantRecipeRegistry } from "./recipes/recipes.js"
import { GrassSeedItem, GrassBladeItem } from "./items/items.js"
import { Inventory } from "./inventories/Inventory.js"
import { Toolbar } from "./inventories/Toolbar.js"
import { InventoryManager } from "./inventories/InventoryManager.js"

export class Game {
  constructor() {
    

    let canvas = d3.select("body")
      .select("svg")
      .attr("width", this.width)
      .attr("height", this.height)

    this._svg = {
      group: canvas.append("g"),
      layers: {}
    }
    this._svg.layers.world = this._svg.group.append("g")
    this._svg.layers.tabs = this._svg.group.append("g")
    this._svg.layers.mouse = this._svg.group.append("g")
    this._svg.layers.tooltips = this._svg.group.append("g")

    
    this.player = new Player(this._svg.layers.mouse, this._svg.layers.tabs);
    this.world = new World(this.player, this._svg.layers.world, {x: this.width/2, y: this.height/2})
    this.hud = new HUD(this, this.player, this.world)

    var self = this;

    window.addEventListener("resize", function() {
      canvas
        .attr("width", self.width)
        .attr("height", self.height)

      self.hud.resize()
    })
  }


  /**
    get height
    @description gets the height of the game window
  */
  get height() {
    //console.log("Height: " + window.innerHeight);
    return window.innerHeight
  }

  /**
    get width
    @description gets the width of the game window
  */
  get width() {
    //console.log("Width: " + window.innerWidth);
    return window.innerWidth;
  }

  /**
    toJSON()
    @description converts this block to its json representation
  */
  toJSON() {
    return {
      world: this.world.toJSON(),
      inventory: this.player.inventory.toJSON(),
      toolbar: this.player.toolbar.toJSON()
    }
  }

  /**
    fromJSON()
    @description creates a player out of json data
  */
  fromJSON(json) {
    this.world.delete()
    this.world.fromJSON(this.player, this.world, json.world)

    this.player.inventoryManager.clear()

    // delete the old inventories
    this.player.inventory.delete()
    this.player.toolbar.delete()

    // load the new inventories from the server
    this.player.inventory = Inventory.fromJSON(this.player, this.player.inventoryManager, json.inventory)
    this.player.toolbar = Toolbar.fromJSON(this.player, this.player.inventoryManager, json.toolbar);
  
    // add the inventory to the tab
    this.hud._inventoryTab.inventory = this.player.inventory
    this.hud._craftingTab.inventory = this.player.inventory

    this.player.inventoryManager.addInventory(this.player.inventory);
    this.player.inventoryManager.addInventory(this.player.toolbar)

    this.player.toolbar.moveTo({
      x: this.width / 2 - this.player.toolbar.width / 2,
      y: this.height - 50
    })

    this.addGraphics()
  }


  /**
    save()
    @description save the player data to the server
  */
  save() {
    /*$.ajax({
      type: "POST",
      url: "/save",
      contentType: 'application/json',
      data: JSON.stringify(this.toJSON()),
      success: function(response) { console.log(response);},
      dataType: "json"
    })*/

    window.api.save("gregv21v", JSON.stringify(this.toJSON()));
  }

  /**
    load()
    @description load the player data from the server
  */
  load() {

    var self = this;
    /*
    $.ajax({
      type: "POST",
      url: "/load",
      contentType: 'application/json',
      data: JSON.stringify({username: "gregv21v"}),
      success: function(response) {
        self.fromJSON(response)
        console.log("Loaded");
      },
      dataType: "json"
    })*/
    window.api.load("gregv21v").then(function(user) {
      console.log(JSON.parse(user.data));
      self.fromJSON(JSON.parse(user.data))
    })
  }

  /**
    render()
    @description displays the graphics of the game
  */
  addGraphics() {    
    this.hud.addGraphicsTo(this._svg.layers.tabs)
    this.world.render()
  }
}
