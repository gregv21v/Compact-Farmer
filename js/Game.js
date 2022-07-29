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
   * get scenes()
   * @description gets the list of scenes
   */
  get scenes() {
    return this._scenes
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
   * attachScene()
   * @description attaches the current scene to the DOM
   * @param {string} name the name of the scene to attach
   */
  attachScene(name) {
    this._scenes[name].attach(this._canvas)
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
    load()
    @description load the player data from the server
  */
  loadWorld() {
    
  }

  
}
