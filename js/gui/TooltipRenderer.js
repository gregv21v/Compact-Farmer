export default class TooltipRenderer {
    /**
     * create()
     * @description initializes the svgs of the tooltip. Should only be
     *  called once
     */
    create(data) {
        this._svg = {
            group: d3.create("svg:g") // the main svg group that everything resides in
        }
        this._svg.foreignObject = this._svg.group.append("foreignObject")
        this._svg.div = this._svg.foreignObject.append("xhtml:div")

        this._svg.foreignObject
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", (data.hidden) ? 0 : data.width)
            .attr("height", data.height)
            .style("background", "lightblue")
            .style("border-radius", "5px")

        this._svg.div
            .attr("width", "100%")
            .attr("height", "100%")
            .style("color", "black")
            .style("padding", "2px")
            .style("font-size", "11px")

        this._svg.div
            .html(this._html)

    }


    /**
     * 
     * @param {Object} data the new data for the tooltip
     */
    update(data) {
        this._svg.foreignObject
            .attr("x", data.position.x)
            .attr("y", data.position.y)
            .attr("width", (data.hidden) ? 0 : data.width)
            .attr("height", data.height)

        this._svg.div
            .html(this._html)
    }

    /**
      attachTo()
      @description add the graphics of the tooltip to a given svg group
      @param group the group to add the graphics to
    */
    attachTo(group) {
      group.append(() => this._svg.group.node())
    }

}
