import { Button } from "../gui/buttons/Button.js";
import Scene from "../scenes/Scene.js";

/**
 * MainMenuScene - the main menu scene
 */
export default class MainMenuScene extends Scene {
    /**
     * constructor()
     * @description constructs the scene
     * @param {Game} game the game
     */
    constructor(game) {
        super(game, "MainMenuScene", {layerNames: []});

        let self = this;
        this._newGameBtn = new Button(
            {x: this._game.width/2 - this._game.width/8, y: this._game.height/2 - 25},
            this._game.width/4,
            50,
            "New Game",
            () => {self._game.currentScene = "WorldCreationScene";}
        )
        
        this._loadGameBtn = new Button(
            {x: this._game.width/2 - this._game.width/8, y: this._game.height/2 + 50},
            this._game.width/4,
            50,
            "Load Game",
            () => {self._game.currentScene = "WorldSelectionScene";}
        )
        
    }

    /**
     * render()
     * @description displays the graphics of the MainMenuScene
     */
    render() {
        super.render();

        this._newGameBtn.render();
        this._loadGameBtn.render();
    }

    /**
     * remove()
     * @description removes the MainMenuScene from the dom
     */
    remove() {
        this._newGameBtn.remove();
        this._loadGameBtn.remove();
    }


    /**
     * attach() 
     * @description attaches the MainMenuScene to the dom
     * @param {SVGElement} parent the parent element
     */
    attach(parent) {
        super.attach(parent);

        this._newGameBtn.attach(this._svg.group);
        this._loadGameBtn.attach(this._svg.group);
    }


    /**
     * resize()
     * @description resizes the MainMenuScene
     */
    resize() {
        this._newGameBtn.moveTo(
            {
                x: this._game.width/2 - this._game.width/8, 
                y: this._game.height/2 - 25
            }
        )
        this._loadGameBtn.moveTo(
            {
                x: this._game.width/2 - this._game.width/8, 
                y: this._game.height/2 + 50
            }
        )
        
    }
}