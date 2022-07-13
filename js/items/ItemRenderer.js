/**
 * ItemRenderer - renders an item from data 
 * 
 */

export default class ItemRenderer {

    /**
     * render()
     */
    create(data) {
        this._svg = {}
        this._svg.group = d3.create("svg:g")
        this._svg.background = this._svg.group.append("rect")
        this._svg.graphicGroup = this._svg.group.append("g")
        this._svg.label = this._svg.group.append("text")
        this._svg.count = this._svg.group.append("text")
        //this.createGraphic(this._svg.graphicGroup)
        this._svg.image = this._svg.group.append("image")
        this._svg.clickArea = this._svg.group.append("rect")

        this._svg.background
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)
            .style("fill", data.color)
            .style("stroke", "black")

        this._svg.count
            .attr("x", data.position.x + data.size - 5)
            .attr("y", data.position.y + 5)
            .attr("text-anchor", "center")
            .attr("dominant-baseline", "central")
            .style("stroke", "black")
            .style("font-size", "10px")
            .text(data.quantity)
        
        this._svg.clickArea
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)
            .style("fill-opacity", 0)
            .on("click", data.onClick)
            .on("mousedown", data.onMouseDown)
            .on("mouseover", data.onMouseOver)
            .on("mouseout", data.onMouseOut)

        this._svg.image
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)
            .attr("href", data.imageURL)
    }


    update(data) {
        this._svg.background
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)

        this._svg.count
            .attr("x", data.position.x + data.size - 5)
            .attr("y", data.position.y + 5)
            .text(data.quantity)
        
        this._svg.clickArea
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)
            .on("click", data.onClick)
            .on("mousedown", data.onMouseDown)
            .on("mouseover", data.onMouseOver)
            .on("mouseout", data.onMouseOut)

        this._svg.image
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", data.size)
            .attr("height", data.size)
            .attr("href", data.imageURL)
    }

    
    /**
        attachTo()
        @description attaches the graphics to the parent svg
    */
    attachTo(parent) {
        parent.append(() => this._svg.group.node())
    }
}