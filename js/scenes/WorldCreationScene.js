import { Button } from "../gui/buttons/Button.js";
import Scene from "./Scene.js";

/**
 * WorldCreationScene - main menu scene class
 */
 export default class WorldCreationScene extends Scene {

    /**
     * constructor()
     * @description constructs the scene
     * @param {Game} game the game
     */
    constructor(game) {
        super(game, "WorldCreationScene", {});

        let self = this;

        this._createBtn = new Button(
            {
                x: this._game.width - 100 - 100, 
                y: this._game.height - 50 - 100
            },
            100, 50,
            "Create",
            () => {
                self._game.currentScene = "PlayScene"
                self._game.currentScene.addDefaults();
                self._game.currentScene.saveWorld(this._svg.input.node().value);
            }
        )

        this._backToMainMenuBtn = new Button(
            {x: this._game.width/2 - 100, y: this._game.height - 50 - 100},
            this._game.width/4,
            50,
            "Back to Main Menu",
            () => {self._game.currentScene = "MainMenuScene";}
        )
    }

    /**
     * recreate()
     * @description recreates the current scene
     */
    render() {
        super.render()

        this._createBtn.render();
        this._backToMainMenuBtn.render();

        this._svg.background = this._svg.group.append("rect")
            .attr("x", 50)
            .attr("y", 50)
            .style("fill", "gray")
            .style("margin", "25px")


        this._svg.textBox = this._svg.group.append("foreignObject")
            .attr("x", 50 + 50)
            .attr("y", 50 + 50)
            .attr("width", 200)
            .attr("height", 200)

        let div = this._svg.textBox.append("xhtml:div")
        this._svg.input = div.append("xhtml:input")
            .attr("type", "text")
            .attr("placeholder", "World Name")
    }


    /**
     * update()
     * @description updates the scene
     */
    update(props) {
        Object.assign(this._props, props)

        this._svg.background
            .attr("width", this._game.width - 50*2)
            .attr("height", this._game.height - 50*2)
    }


    /**
     * addWorld()
     * @description adds a world to the scene
     * @param {string} name the name of the world
     */




    


    /**
     * destroy()
     * @description destroys the scene
     */
    remove() {
        this._createBtn.remove()
        this._backToMainMenuBtn.remove()
        this._svg.group.remove()
    }


    /**
     * attach()
     * @description attaches the scene to the DOM
     */
    attach(parent) {
        super.attach(parent)

        this._createBtn.attach(this._svg.group)
        this._backToMainMenuBtn.attach(this._svg.group)
    }


    /**
     * resize()
     * @description resizes the scene
     */
    resize() {
        this._createBtn.moveTo(
            {
                x: this._game.width - 100 - 100, 
                y: this._game.height - 50 - 100
            }
        )

        this._svg.background
            .attr("width", this._game.width - 50*2)
            .attr("height", this._game.height - 50*2)
    }


    /**
     * keyPress()
     * @description handles keyPresses
     * @param {KeyboardEvent} event the keypress event
     */
    keyPress(event) {
        
    }



}