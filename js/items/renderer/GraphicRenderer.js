/**
 * ItemRenderer - renders an item from data 
 * 
 * 
 * Canvas endering: draw it, and forget about it
 * SVG Rendering: draw it, and update it.
 * 
 * 
 * Objective: how do you describe an image in simple terms 
 *  such that it can be rendered either as an svg or through 
 *  raster graphics
 * 
 * First the graphic will be describe as a javascript object 
 * then it can be converted to whatever format you wish to use
 * 
 */

export default class GraphicRendererNYI {
    constructor(data) {
        this._data = data;
    }

    /**
     * render()
     * @description renders the item
     * $ - means data 
     * _ - tag
     */
    render() {
        return (
            {
                tag: "g",
                name: "group",
                class: "item",
                children: [
                    { 
                        tag: "rect",
                        name: "background", 
                        props: {
                            x: this._data.x,
                            y: this._data.y
                        }
                    },
                    {
                        tag: "$inject",
                        name: "graphics",
                        children: [this._data.inject]
                    },
                    {
                        tag: "text",
                        name: "label",
                        value: this._data.name
                    },
                    {
                        tag: "rect",
                        name: "clickArea",
                        props: {
                            x: this._data.x,
                            y: this._data.y,
                            width: this._data.size,
                            height: this._data.size
                        }
                    }
                ]
            }
        )
    }

    /**
     * update()
     * @description updates any properties that have already been rendered 
     */
    update(data) {

    }
}


export default function ItemRenderer() {

}