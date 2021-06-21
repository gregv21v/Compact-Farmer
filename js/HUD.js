import {
  SideTabManager, InventorySideTab, CraftingSideTab,
  GuideSideTab
} from "./gui/tabs/tabs.js"

import {
  DragButton, SaveButton, LoadButton
} from "./gui/buttons/buttons.js"


export class HUD {
  constructor(game, player, world) {
    this._game = game;
    this._player = player;
    this._world = world;
    this._sideTabManager = new SideTabManager()

    this._inventoryTab = new InventorySideTab()
    this._inventoryTab.inventory = this._player.inventory
    this._inventoryTab.inventoryManager = this._player.inventoryManager;

    this._craftingTab = new CraftingSideTab()
    this._craftingTab.inventory = this._player.inventory
    this._craftingTab.crafter = this._player.crafter
    this._craftingTab.inventoryManager = this._player.inventoryManager

    this._guideTab = new GuideSideTab()

    this._sideTabManager.addTab(this._inventoryTab, game)
    this._sideTabManager.addTab(this._craftingTab, game)
    this._sideTabManager.addTab(this._guideTab, game)

    this._player.toolbar.moveTo({
      x: game.height / 2 - this._player.toolbar.width / 2,
      y: this._game.height - 50
    })

    this.dragBtn = new DragButton(
      this._world,
      {x: 100, y: this._game.height - 50},
      50, 50 // width, height
    )

    this.saveBtn = new SaveButton(
      game,
      {x: 0, y: this._game.height - 50}, // position
      50, 50 // width, height
    )

    this.loadBtn = new LoadButton(
      game,
      {x: 50, y: this._game.height - 50}, // position
      50, 50 // width, height
    )
  }

  resize() {
    console.log("Resizing");
    this.dragBtn.moveTo(
      {x: 100, y: this._game.height - 50}
    )
    this.saveBtn.moveTo(
      {x: 0, y: this._game.height - 50}
    )
    this.loadBtn.moveTo(
      {x: 50, y: this._game.height - 50}
    )

    this._player.toolbar.moveTo({
      x: this._game.width / 2 - this._player.toolbar.width / 2,
      y: this._game.height - 50
    })

    this._sideTabManager.onWindowResize(this._game);

  }

  addGraphics() {
    var svgMain = d3.select("body").select("svg").append("g")

    this._sideTabManager.addGraphicsTo(svgMain);

    this._player.toolbar.initSVG()
    this._player.toolbar.addGraphicsTo(svgMain)

    this.dragBtn.initSVG()
    this.dragBtn.addGraphicsTo(svgMain)

    this.saveBtn.initSVG()
    this.saveBtn.addGraphicsTo(svgMain)

    this.loadBtn.initSVG()
    this.loadBtn.addGraphicsTo(svgMain)

  }
}
