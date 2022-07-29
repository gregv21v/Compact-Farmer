import Scene from "../scenes/Scene.js";
import { Player } from "../Player.js";
import { World } from "../World.js";
import { HUD } from "../HUD.js";
import { GrassBladeItem, GrassSeedItem, DirtBlockItem, HoeItem, ShovelItem } from "../items/items.js";
import { WaterBlock, ComposterBlock, ExpansionBlock } from "../blocks/blocks.js";

/**
 * PlayScene - This is the scene that is displayed when the game is played.
 */
export default class PlayScene extends Scene {
    /**
     * constructor()
     * @description constructs the scene
     * @param {Game} game the game
     */
    constructor(game) {
        super(game, "PlayScene", {
            layerNames: [
                "world",
                "tabs",
                "mouse",
                "tooltips",
                "menu"
            ]
        });
    }


    


    /**
     * render()
     * @description displays the graphics of the game
     */
    render() {
        super.render();

        //console.log(this._svg);
        // create the player
        this._player = new Player({
            inventoryLayer: this._svg.layers.tabs,
            mouseLayer: this._svg.layers.mouse,
        });

        this._player.createInventories()
 
        // create the world
        this._world = new World({
            player: this._player,
            position: {x: this._game.width/2, y: this._game.height/2}
        });

        // create the hud
        this._hud = new HUD(this._game, this, this._player, this._world)

        // render the PlayScene
        this._player.render();
        this._world.render()
        this._hud.render()
    }


    /**
     * update()
     * @description updates the PlayScene
     */
    update(props) {
        super.update(props);

        if(this._world) {
            this._world.update(props)
        }
        
        if(this._hud) {
            this._hud.update()
        }
    }




    /**
     * attach()
     * @description adds the graphics of the scene to the game
     * @param {SVGElement} parent the parent element to attach the scene to
     */
    attach(parent) {
        super.attach(parent);

        this._hud.attach(this._svg.layers.tabs) 
        this._world.attach(this._svg.layers.world);
    }

    /**
     * resize()
     * @description resizes the scene
     */
    resize() {
        this._hud.resize()
    }


    /**
     * keyPress()
     * @description handles keyPresses
     * @param {KeyboardEvent} event the keypress event
     */
    keyPress(event) {
        let slotNum = parseInt(event.key) - 1;

        if(slotNum === -1) slotNum = 9;
        this._player.toolbar.selectSlotByPosition(slotNum, 0);
    }


    /**
     * loadWorld()
     * @description loads a world from a JSON representation
     */
    loadWorld(json) {
        console.log(json);

        // remove all content from the tabs and mouse layers
        this._svg.layers.tabs.selectAll("*").remove()
        this._svg.layers.mouse.selectAll("*").remove()

        this._player = Player.fromJSON(json, {
            inventoryLayer: this._svg.layers.tabs,
            mouseLayer: this._svg.layers.mouse,
        })


        //console.log({x: this._game.width/2, y: this._game.height/2});
        this._world = World.fromJSON(json.blocks, {
            player: this._player,
            position: {x: this._game.width/2, y: this._game.height/2}
        })
    
        this._hud = new HUD(this._game, this, this._player, this._world)

        this._player.toolbar.moveTo({
            x: this._game.width / 2 - this._player.toolbar.width / 2,
            y: this._game.height - 50
        })


        this._player.render()
        this._world.render()
        this._hud.render()

        this._world.update()

        this._hud.attach(this._svg.layers.tabs) 
        this._world.attach(this._svg.layers.world);
    }



    saveWorld(name) {
        window.api.saveWorld(name, this._game.currentScene.toJSON())
    }


    /**
     * createStartWorld()
     * @description creates a world for the player to start in
     */
    addDefaults(name) {
        this._world.name = name;

        //this._player.createInventories()

        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())
        this._player.inventory.add(new GrassBladeItem())

        this._player.toolbar.add(new GrassSeedItem())
        this._player.toolbar.add(new DirtBlockItem())
        this._player.toolbar.add(new HoeItem())
        this._player.toolbar.add(new ShovelItem())

        this._world.addBlock(new WaterBlock(this._player, this._world, {x: 0, y: 0}))// origin block
        this._world.addBlock(new ComposterBlock(this._player, this._world, {x: 0, y: 1}))
        this._world.addBlock(new ExpansionBlock(this._player, this._world, {x: 0, y: -1}))
        this._world.addBlock(new ExpansionBlock(this._player, this._world, {x: -1, y: 0}))
        this._world.addBlock(new ExpansionBlock(this._player, this._world, {x: 1, y: 0}))
    }



    

    /**
     * toJSON()
     * @description returns a JSON representation of the scene
     */
    toJSON() {
        return {
            blocks: this._world.toJSON(),
            inventory: this._player.inventory.toJSON(),
            toolbar: this._player.toolbar.toJSON()
        }
    }
    
}