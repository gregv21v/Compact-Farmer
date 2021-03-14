define([
  "game/Player", "game/World", "game/HUD",
  "recipes/PlantRecipe", "recipes/PlantRecipeRegistry",
  "items/GrassSeedItem", "items/GrassBladeItem",
  "d3", "jquery"
], function(
    Player, World, HUD,
    PlantRecipe, PlantRecipeRegistry,
    GrassSeedItem, GrassBladeItem,
    d3, $
  ) {
  return class Game {
    constructor() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.player = new Player()
      this.world = new World(this.player, {x: this.width/2, y: this.height/2})
      this.hud = new HUD(this, this.player, this.world)

      var svgMain = d3.select("body")
        .select("svg")
        .attr("width", this.width)
        .attr("height", this.height)

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

      this.player.inventory.delete()
      this.player.inventory.fromJSON(json.inventory)
      this.hud.inventoryTab.inventory = this.player.inventory

      this.player.toolbar.delete()
      this.player.toolbar.fromJSON(json.toolbar)
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
      $.ajax({
        type: "POST",
        url: "/save",
        contentType: 'application/json',
        data: JSON.stringify(this.toJSON()),
        success: function(response) { console.log(response);},
        dataType: "json"
      })
    }

    /**
      load()
      @description load the player data from the server
    */
    load() {
      var self = this;
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
      })
    }

    /**
      render()
      @description displays the graphics of the game
    */
    addGraphics() {
        this.hud.addGraphics()
        this.world.render()
    }
  }
})
