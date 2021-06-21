
/**
 * ContextMenu - right click menu
 */
export class ContextMenu {
  /**
   * constructor()
   * @description constructs the context menu gui component
   */
  constructor(position) {
    this.position = position
    this.menuItemWidth = 50
    this.menuItemHeight = 30
    this._svg = {
      group: d3.create("svg:g")
    }
    this._svg.menuItems = []
  }

  /**
   * get svgGroup
   * @description gets the svg group of the context menu
   */
  get svgGroup() {
    return this._svg.group
  }

  /**
   * addGraphicsTo()
   * @description add this ContextMenu to the parent graphic
   * @param group group to add the context menu to
   */
  addGraphicsTo(group) {
    group.append(() => this._svg.group.node())
  }

  /**
   * addMenuItem()
   * @description adds a menu item to this context menu
   * @param name name of the menu item
   * @param action the action to preform when this menu item is clicked
   */
  addMenuItem(name, action) {
    var self = this;
    var background = this._svg.group
      .append("rect")
        .attr("x", this.position.x)
        .attr("y", this.position.y + this._svg.menuItems.length * (this.menuItemHeight))
        .attr("width", this.menuItemWidth)
        .attr("height", this.menuItemHeight)
        .style("fill", "white")

    var text = this._svg.group
      .append("text")
        .attr("x", this.position.x + this.menuItemWidth/2)
        .attr("y", this.position.y + (this._svg.menuItems.length+1) * (this.menuItemHeight/2))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text("Split")
        .on("mouseover", function() {
          background.style("fill", "blue")
        })
        .on("mouseout", function() {
          background.style("fill", "white")
        })
        .on("mousedown", function() {
          self._svg.rightClickMenu.selectAll("*").remove();
        })

    var clickArea = this._svg.group
      .append("rect")
        .attr("x", this.position.x)
        .attr("y", this.position.y + this._svg.menuItems.length * (this.menuItemHeight))
        .attr("width", this.menuItemWidth)
        .attr("height", this.menuItemHeight)
        .style("fill", "white")
        .style("fill-opacity", 0.0)
        .on("click", function() {
          action()
          self.destroy()
        })
    this._svg.menuItems.push({
      background,
      text,
      clickArea
    })
  }

  /**
   * destroy()
   * @description destroys the context menu
   */
  destroy() {
    this._svg.group.selectAll("*").remove()
    this._svg.group.remove()
  }


  /**
   * initSVG()
   * @description draw context menu
   * @param position position to draw the context menu at
   */
  initSVG(parent, position) {

  }
}
