/**
 * Scene - main menu scene class
 */
export default class Scene {

    /**
     * constructor()
     * @description constructs the scene
     * @param {Game} game the game
     */
    constructor(game, name, props) {
        this._game = game;
        this._props = props;
        this._name = name;
    }

    /**
     * recreate()
     * @description recreates the current scene
     */
    render() {
        this._svg = {
            group: d3.create("svg:g")
        }

        //console.log(this._props, Object.hasOwnProperty(this._props, "layerNames"));

        if("layerNames" in this._props) {
            this._svg.layers = {}
            for (const layer of this._props.layerNames) {
                this.renderLayer(layer);
            }
        }
    }


    /**
     * update()
     * @description updates the scene
     */
    update(props) {
        Object.assign(this._props, props)
    }



    /**
     * addLayer()
     * @description adds a layer to the scene
     * @param {string} name the name of the layer
     */
    renderLayer(name) {
        this._svg.layers[name] = this._svg.group.append("g")
        this._svg.layers[name].attr("class", name)
    }

    


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
    }


    /**
     * resize()
     * @description resizes the scene
     */
    resize() {
        
    }


    /**
     * keyPress()
     * @description handles keyPresses
     * @param {KeyboardEvent} event the keypress event
     */
    keyPress(event) {
        
    }


    /**
     * get name
     * @description returns the name
     */
    get name() {
        return this._name;
    }



}