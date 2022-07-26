import PlayScene from "./scenes/PlayScene.js"
import MainMenuScene from "./scenes/MainMenuScene.js"
import WorldCreationScene from "./scenes/WorldCreationScene.js"
import WorldSelectionScene from "./scenes/WorldSelectionScene.js"

export class Game {
  
  /**
   * constructor()
   * @description constructs the game
   */
  constructor() {
    this._canvas = d3.select("svg")
      .attr("width", this.width)
      .attr("height", this.height)
    
    this._scenes = {
      "MainMenuScene": new MainMenuScene(this), 
      "PlayScene": new PlayScene(this),
      "WorldCreationScene": new WorldCreationScene(this),
      "WorldSelectionScene": new WorldSelectionScene(this)
    }
    this._currentScene = "MainMenuScene"

    this.currentScene.render()
    this.currentScene.update()
    this.currentScene.attach(this._canvas)

    let self = this;
    window.addEventListener("resize", () => { 
      self._canvas.attr("width", self.width)
                  .attr("height", self.height)
      self.currentScene.resize() 
    })

    d3.select("body").on("keypress", (event) => {
      self.currentScene.keyPress(event)
    })
  }

  /**
   * set currentSceneIndex()
   * @description sets the current scene index
   * @param {number} index the index of the scene
   */
  set currentScene(name) {
    this._scenes[this._currentScene].remove() // remove the current scene from the dom

    this._currentScene = name
    
    this._scenes[this._currentScene].render() // render the current scene
    this._scenes[this._currentScene].update() // update the current scene
    this._scenes[this._currentScene].attach(this._canvas) // attach the new scene to the dom

    let self = this;
    window.addEventListener("resize", () => { 
      self._canvas.attr("width", self.width)
                  .attr("height", self.height)
      self._scenes[self._currentScene].resize() 
    })

    d3.select("body").on("keypress", (event) => {
      self._scenes[self._currentScene].keyPress(event)
    })
  }


  /**
   * get currentScene()
   * @description gets the current scene
   * @return {Scene} the current scene
   */
  get currentScene() {
    return this._scenes[this._currentScene];
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
    /*this.world.delete()
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

    this.addGraphics()*/
  }


  

  /**
    load()
    @description load the player data from the server
  */
  load() {

    //var self = this;
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

  
}
