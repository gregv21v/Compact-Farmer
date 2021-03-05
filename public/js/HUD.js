define([
  "gui/StorageSideTab",
  "gui/CraftingSideTab",
  "gui/DragButton",
  "gui/SaveButton",
  "gui/LoadButton",
  
  "d3"

], function(
  StorageSideTab, CraftingSideTab,
  DragButton, SaveButton, LoadButton,
  d3
) {
  return class HUD {
    constructor(game, player, world) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.player = player;
      this.world = world;
      this.inventoryTab = new StorageSideTab(
        {width: this.width, height: this.height}
      )
      this.inventoryTab.setStorage(this.player.inventory)
      this.craftingTab = new CraftingSideTab(
        {width: this.width, height: this.height}
      )

      this.player.toolbar.moveTo({
        x: this.width / 2 - this.player.toolbar.getWidth() / 2,
        y: this.height - 50
      })

      this.dragBtn = new DragButton(
        this.world,
        {x: 100, y: this.height - 50},
        50, 50 // width, height
      )

      this.saveBtn = new SaveButton(
        game,
        {x: 0, y: this.height - 50}, // position
        50, 50 // width, height
      )

      this.loadBtn = new LoadButton(
        game,
        {x: 50, y: this.height - 50}, // position
        50, 50 // width, height
      )
    }

    addGraphics() {
      var svgMain = d3.select("body").select("svg")
      this.player.toolbar.addGraphicsTo(svgMain)

      this.inventoryTab.initSVG()
      this.inventoryTab.addGraphicsTo(svgMain)

      this.craftingTab.initSVG()
      this.craftingTab.addGraphicsTo(svgMain)

      this.dragBtn.initSVG()
      this.dragBtn.addGraphicsTo(svgMain)

      this.saveBtn.initSVG()
      this.saveBtn.addGraphicsTo(svgMain)

      this.loadBtn.initSVG()
      this.loadBtn.addGraphicsTo(svgMain)
    }
  }
})
