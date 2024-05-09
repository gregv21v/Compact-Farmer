import { Item } from "./Item.js";


/**
 * IronChunksItem
 * @description chunks of iron
 */
export class IronChunksItem extends Item {

    /**
     * constructor()
     * @description constructs the IronChunksItem
     * @param {Point} position the position of the IronChunksItem
     */
    constructor(position) {
        super(position);
        this.name = "IronChunksItem";
        this._imageURL = "images/ironChunks.png";
        this._displayName = "Iron Chunks";
        this._description = "Chunks of iron to be further processed into iron ore.";

        this.updateToolTip();
    }


    /**
     * clone()
     * @description make a copy of this crop
    */
    clone() {
        var clone = new IronChunksItem(this._position);
        clone.quantity = this.quantity;

        clone.render()
        return clone
    }
}