define([
  "gui/SideTabManager",
  "gui/InventorySideTab",
  "gui/CraftingSideTab",
  "gui/DragButton",
  "gui/SaveButton",
  "gui/LoadButton",

  "d3"

], function(
  SideTabManager,
  InventorySideTab, CraftingSideTab,
  DragButton, SaveButton, LoadButton,
  d3
) {
  return class HUD {
    constructor(game, player, world) {
      this.game = game;
      this.player = player;
      this.world = world;
      this._sideTabManager = new SideTabManager()


      this.inventoryTab = new InventorySideTab()
      this.inventoryTab.inventory = this.player.inventory
      this.inventoryTab.inventoryManager = this.player.inventoryManager;
      this._sideTabManager.addTab(this.inventoryTab, game)

      this.player.toolbar.moveTo({
        x: game.height / 2 - this.player.toolbar.width / 2,
        y: this.game.height - 50
      })

      this.dragBtn = new DragButton(
        this.world,
        {x: 100, y: this.game.height - 50},
        50, 50 // width, height
      )

      this.saveBtn = new SaveButton(
        game,
        {x: 0, y: this.game.height - 50}, // position
        50, 50 // width, height
      )

      this.loadBtn = new LoadButton(
        game,
        {x: 50, y: this.game.height - 50}, // position
        50, 50 // width, height
      )
    }

    resize() {
      console.log("Resizing");
      this.dragBtn.moveTo(
        {x: 100, y: this.game.height - 50}
      )
      this.saveBtn.moveTo(
        {x: 0, y: this.game.height - 50}
      )
      this.loadBtn.moveTo(
        {x: 50, y: this.game.height - 50}
      )

      this.player.toolbar.moveTo({
        x: this.game.width / 2 - this.player.toolbar.width / 2,
        y: this.game.height - 50
      })

      this._sideTabManager.onWindowResize(this.game);

    }

    addGraphics() {
      var svgMain = d3.select("body").select("svg").append("g")

      this._sideTabManager.addGraphicsTo(svgMain);

      this.player.toolbar.initSVG()
      this.player.toolbar.addGraphicsTo(svgMain)

      this.dragBtn.initSVG()
      this.dragBtn.addGraphicsTo(svgMain)

      this.saveBtn.initSVG()
      this.saveBtn.addGraphicsTo(svgMain)

      this.loadBtn.initSVG()
      this.loadBtn.addGraphicsTo(svgMain)
    }
  }
})
