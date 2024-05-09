/**
 * Dialog - A dialog box for displaying information to the user.
 */
export default class Dialog {
    /**
     * constructor()
     * @description constructs the dialog box
     * @param {Game} game the game
     */
    constructor(game) {
        this._hidden = true;
        this._game = game;
        this._svg = game.currentScene.layers.overlay;
        this._dialog = this._svg.append("rect")
            .attr("x", this._game.width/2 - this._game.width/4)
            .attr("y", this._game.height/2 - this._game.height/4)
            .attr("width", this._game.width/2)
            .attr("height", this._game.height/2)
            .style("color", "grey")
            .style("border", "1px solid black")
            .style("padding", "10px")
            .style("text-align", "center")
            .style("font-size", "20px")
            .style("font-family", "sans-serif")
            .style("border-radius", "10px")
            .style("position", "absolute")
            .style("z-index", "100")
            .style("overflow", "auto")
            .style("max-height", "100%")
            .style("max-width", "100%")
            .style("box-shadow", "0px 0px 10px black")
            .style("pointer-events", "none")
            .style("opacity", "0.8")
            .style("transition", "opacity 0.5s")
    }

    toggle() {
        if(this._hidden) {
            this.show();
        } else {
            this.hide();
        }

        this._hidden = !this._hidden;
    }



    hide() {
        this._dialog.style("display", "none");
    }


    show() {
        this._dialog.style("display", "block");
    }
}