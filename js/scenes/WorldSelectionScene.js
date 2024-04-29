import { Button } from "../gui/buttons/Button.js";
import Scene from "./Scene.js";

/**
 * WorldSelectionScene - main menu scene class
 */
 export default class WorldSelectionScene extends Scene {

    /**
     * constructor()
     * @description constructs the scene
     * @param {Game} game the game
     */
    constructor(game) {
        super(game, "WorldSelectionScene", {})


        let self = this;

        this._backToMainMenuBtn = new Button(
            {x: this._game.width/2 - this._game.width/8, y: this._game.height - 125},
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
        super.render();

        let self = this;

        this._svg.background = this._svg.group.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this._game.width)
            .attr("height", this._game.height)
            .attr("fill", "#355223")

        this._svg.dialogBackground = this._svg.group.append("rect")
            .attr("x", 50)
            .attr("y", 50)
            .attr("width", this._game.width - 50*2)
            .attr("height", this._game.height - 50*2)
            .style("fill", "gray")
            .style("margin", "25px")
            .style("filter", "drop-shadow(16px 16px 20px black)")

        this._backToMainMenuBtn.render()

        this._svg.foreignObject = this._svg.group.append("foreignObject")
            .attr("x", 50)
            .attr("y", 50)
            .attr("width", this._game.width - 50*2)
            .attr("height", this._game.height - 50*2)
        
        this._svg.title = this._svg.foreignObject.append("xhtml:h1")
            .html("Farms")
            .style("text-align", "center")
        
        window.api.getListOfWorlds().then((worlds) => {

            for (const world of worlds) {
                self.createWorldItem(world)
            }

            this._svg.foreignObject.append("xhtml:button")
                .attr("type", "button")
                .html("Create New Farm")
                .style("float", "right")
                .style("width", "25%")
                .style("height", "50px")
                .style("padding", "10px")
                .style("filter", "drop-shadow(4px 4px 4px black)")
                .on("click", () => {
                    self._game.currentScene = "WorldCreationScene"
                })
        })

    }


    /**
     * createWorldItem()
     * @description creates a world item
     * @param {World} world the world
     * @returns {SVGGElement} the world item
     */
    createWorldItem(world) {
        let self = this;

        let div = this._svg.foreignObject.append("xhtml:div")
            .style("width", "100%")
            .style("border", "1px solid black")
            .style("padding", "10px")

        let nameDiv = div.append("xhtml:div")
            .style("width", "75%")
            .style("display", "inline-block")
        let name = nameDiv.append("xhtml:p")
            .html(world.name)

            
        let button = div.append("xhtml:button")
            .attr("type", "button")
            .html("Open")
            .style("width", "10%")
            .style("height", "50px")
            .style("display", "inline-block")
            .on("click", () => {
                //console.log(((name) => {return () => name})(world.name)());
                window.api.loadWorld(
                    ((name) => {return () => name})(world.name)()
                ).then((world) => {
                    self._game.currentScene = "PlayScene"
                    self._game.scenes.PlayScene.loadWorld(world)                            
                }).catch((err) => {
                    console.log(err)
                })
            })
        
        let deleteButton = div.append("xhtml:button")
            .attr("type", "button")
            .html("Delete")
            .style("width", "10%")
            .style("height", "50px")
            .style("display", "inline-block")
            .on("click", () => {
                //console.log(((name) => {return () => name})(world.name)());
                window.api.deleteWorld(
                    ((name) => {return () => name})(world.name)()
                ).then(() => {
                    // refresh the scene
                    self._game.currentScene = "WorldSelectionScene"
                }).catch((err) => {
                    console.log(err)
                })
            })
    }


    /**
     * update()
     * @description updates the scene
     */
    update(props) {
        Object.assign(this._props, props)



        this._svg.background
            .attr("width", this._game.width)
            .attr("height", this._game.height)
            .attr("fill", "#355223")

        this._svg.dialogBackground
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
        this._svg.group.remove()
    }


    /**
     * attach()
     * @description attaches the scene to the DOM
     */
    attach(parent) {
        parent.append(() => this._svg.group.node())

        this._backToMainMenuBtn.attach(this._svg.group)
    }


    /**
     * resize()
     * @description resizes the scene
     */
    resize() {
        this._svg.background
            .attr("width", this._game.width)
            .attr("height", this._game.height)

        this._svg.dialogBackground
            .attr("width", this._game.width - 50*2)
            .attr("height", this._game.height - 50*2)

        this._backToMainMenuBtn.moveTo(
            {
                x: this._game.width/2 - 100, 
                y: this._game.height - 25 - 100
            }
        )
    }


    /**
     * keyPress()
     * @description handles keyPresses
     * @param {KeyboardEvent} event the keypress event
     */
    keyPress(event) {
        
    }



}