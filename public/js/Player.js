define(
  [
    "game/World",

    "blocks/Block",
    "blocks/ExpansionBlock",
    "blocks/FarmBlock",
    "blocks/WaterBlock",

    "items/HoeItem",
    "items/GrassBladeItem",
    "items/GrassSeedItem",
    "items/SeedItem",
    "items/Item",

    "recipes/PlantRecipe",
    "recipes/PlantRecipeRegistry",

    "lists/Storage", "lists/Toolbar",

    "gui/CraftingSideTab",
    "gui/StorageSideTab",

    "gui/DragButton",
    "gui/SaveButton",
    "gui/LoadButton",
    "d3"
  ],
  function(
    World,
    Block, ExpansionBlock, FarmBlock, WaterBlock,
    HoeItem, GrassBladeItem, GrassSeedItem, SeedItem, Item,
    PlantRecipe, PlantRecipeRegistry,
    Storage, Toolbar,
    CraftingSideTab, StorageSideTab,
    DragButton, SaveButton, LoadButton,
    d3
  ) {
    return class Player {
      constructor() {

        var self = this;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        var svgMain = d3.select("body")
          .select("svg")
          .attr("width", this.width)
          .attr("height", this.height)

        this.inventory = new Storage(6, 5)
        this.recipeRegistry = new PlantRecipeRegistry()

        this.recipeRegistry.add(new PlantRecipe(
          "Grass Crop",
          [new GrassSeedItem(), new GrassBladeItem()]
        ))

        /**
          Menu Options
            0 => inventory
            1 => world
        */
        this.menuSelection = 1


        this.world = new World(this, {x: this.width/2, y: this.height/2});
        this.world.addBlock(new WaterBlock(this, {x: 0, y: 0}))// origin block
        this.world.addBlock(new ExpansionBlock(this, {x: 0, y: 1}))
        this.world.addBlock(new ExpansionBlock(this, {x: 0, y: -1}))
        this.world.addBlock(new ExpansionBlock(this, {x: -1, y: 0}))
        this.world.addBlock(new ExpansionBlock(this, {x: 1, y: 0}))


        this.inventoryTab = new StorageSideTab(
          this.inventory,
          {width: this.width, height: this.height}
        )
        this.craftingTab = new CraftingSideTab(
          {width: this.width, height: this.height}
        )

        this.toolbar = new Toolbar()

        this.toolbar.add(
          new GrassBladeItem()
        )

        this.toolbar.add(
          new GrassSeedItem()
        )

        this.toolbar.add(
          new HoeItem()
        )

        this.toolbar.moveTo({
          x: this.width / 2 - this.toolbar.getWidth() / 2,
          y: this.height - 50
        })

        this.dragBtn = new DragButton(
          this.world,
          {x: 100, y: this.height - 50},
          50, 50 // width, height
        )

        this.saveBtn = new SaveButton(
          this,
          {x: 0, y: this.height - 50}, // position
          50, 50 // width, height
        )

        this.loadBtn = new LoadButton(
          this,
          {x: 50, y: this.height - 50}, // position
          50, 50 // width, height
        )
      }


      /**
        toJSON()
        @description converts this block to its json representation
      */
      toJSON() {
        return {
          world: this.world.toJSON(),
          inventory: this.inventory.toJSON(),
          toolbar: this.toolbar.toJSON()
        }
      }

      /**
        fromJSON()
        @description creates a player out of json data
      */
      fromJSON(json) {
        this.world.fromJSON(this, json.world)
        this.inventory.fromJSON(json.inventory)
        this.toolbar.fromJSON(json.toolbar)
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
          },
          dataType: "json"
        })
      }



      /**
        render()
        @description displays the graphics of the player
      */
      addGraphics() {
        var svgMain = d3.select("body").select("svg");


        this.toolbar.addGraphicsTo(svgMain)

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

        this.world.render()
      }
    }
  })
