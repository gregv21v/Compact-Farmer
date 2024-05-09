import {
  SideTabManager, InventorySideTab, CraftingSideTab,
  GuideSideTab
} from "./gui/tabs/tabs.js"

import {
  Button
} from "./gui/buttons/buttons.js"
import { RecipeSideTab } from "./gui/tabs/RecipeSideTab.js";
import Dialog from "./gui/Dialog.js";


export class HUD {
  constructor(game, scene, player, world) {
    this._game = game;
    this._player = player;
    this._world = world;
    this._scene = scene;
    this._sideTabManager = new SideTabManager()

    this._inventoryTab = new InventorySideTab()
    this._inventoryTab.inventory = this._player.inventory
    this._inventoryTab.inventoryManager = this._player.inventoryManager;

    this._craftingTab = new CraftingSideTab()
    this._craftingTab.inventory = this._player.inventory
    this._craftingTab.crafter = this._player.crafter
    this._craftingTab.inventoryManager = this._player.inventoryManager

    this._guideTab = new GuideSideTab()
    this._recipeTab = new RecipeSideTab()

    this._sideTabManager.addTab(this._inventoryTab, game)
    this._sideTabManager.addTab(this._craftingTab, game)
    this._sideTabManager.addTab(this._guideTab, game)
    this._sideTabManager.addTab(this._recipeTab, game)

    this._player.toolbar.moveTo({
      x: game.height / 2 - this._player.toolbar.width / 2,
      y: this._game.height - 50 - 5
    })

  
    let self = this;
    this._menuDialog = new Dialog(this._game);
    this._menuDialog.hide();

    this._menuBtn = new Button(
      {x: 0, y: 0},
      60, 30,
      "Menu",
      () => {
        console.log("Open Main Menu Dialog");

        this._menuDialog.toggle();
      }
    )


    this.saveBtn = new Button(
      {x: 0, y: this._game.height - 50}, // position
      50, 50, // width, height
      "Save", // text
      () => {
        //console.log(game.currentScene);
        if(game.currentScene.name === "PlayScene") {
          console.log("saving");
          game.currentScene.saveWorld(game.currentScene._world.name);
        }
      }
    )

    this.exitBtn = new Button(
      {x: 50, y: this._game.height - 50}, // position
      50, 50, // width, height
      "Exit",
      () => {
        game.currentScene = "MainMenuScene";
      }
    )
  }

  /**
   * resize()
   * @description resizes the hud
   */
  resize() {
    this.exitBtn.moveTo(
      {x: 50, y: this._game.height - 50}
    )
    this.saveBtn.moveTo(
      {x: 0, y: this._game.height - 50}
    )

    this._player.toolbar.moveTo({
      x: this._game.width / 2 - this._player.toolbar.width / 2,
      y: this._game.height - 50
    })

    this._sideTabManager.onWindowResize(this._game);

  }


  /**
   * render()
   * @description renders the hud
   */
  render() {
    this._player.toolbar.render()

    this.saveBtn.render()

    this.exitBtn.render()

    this._menuBtn.render()
  }

  /**
   * update()
   * @description updates the hud
   * @param {Object} props the properties to update the hud with
   */
  update(props) {
   /* this._sideTabManager.update(props);

    this._player.toolbar.update(props);

    this.dragBtn.update(props);

    this.saveBtn.update(props);

    this.exitBtn.update(props);*/
  }


  /**
   * attach()
   * @description adds the graphics of the hud to the game
   * @param {SVGElement} svg the svg element to add the graphics to
   */
  attach(mainLayer) {
    this._sideTabManager.attach(mainLayer);

    this._player.toolbar.attach(mainLayer)

    this.saveBtn.attach(mainLayer)

    this.exitBtn.attach(mainLayer)

    this._menuBtn.attach(mainLayer)
  }
}
