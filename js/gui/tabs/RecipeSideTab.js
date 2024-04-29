/**
  SideTab - a tab on the side of the window
*/
import { SideTab } from "./tabs.js"

export class RecipeSideTab extends SideTab {
  /**
    constructor()
    @description constructs the InventorySideTab
    @param storage the inventory to display in this tab
    @param windowDims the dimensions of the window that the tab will
      be on
  */
  constructor() {
    super(
      {x: 0, y: 0},
      "Recipes"
    )

    this.buttonDims = {width: 30, height: 100}
  }

  /**
    render()
    @description initializes the svgs for this side tab
  */
  render() {
    super.render();

    this.svg.foreignObject
      .attr("x", this._position.x + this.buttonDims.width)
      .attr("y", 0)
      .attr("width", this.contentDims.width)
      .attr("height", this.contentDims.height)

    this._html.div
      .html(`
        <h2>Recipes</h2>
        
        <img src="./images/screenshots/Dirt_Block_Recipe.png" width=${this.contentDims.width - 50}>

        <p> 9 grass blades can be placed into a crafting grid to create a dirt block. </p>
        <p> 4 grass blades in the upper left hand corner of a crafting grid makes a grass sieve. </p>

      `)
      .style("padding", "5px")
      .style("text-align", "left")
      .style("height", this.contentDims.height)

  }

  /**
    createGraphic()
    @description override this function to draw the graphics for the
      block.
      Each svg should be added to this.sv
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    this.svg.foreignObject = group.append("foreignObject")
    this._html = {
      div: this.svg.foreignObject.append("xhtml:div")
    }
  }

  /**
    open()
    @description opens the tab
  */
  open() {
    super.open();

    this.svg.foreignObject
      .attr("x", this._position.x + this.buttonDims.width - this.contentDims.width)
  }

  /**
    close()
    @description closes the tab
  */
  close() {
    super.close()

    this.svg.foreignObject
      .attr("x", this.position.x + this.buttonDims.width)
  }

  /**
    get position()
    @description get the position of the tab
  */
  get position() {
    return this._position
  }

  /**
    set position()
    @description set the position of the tab
    @param position new position of tab
  */
  set position(position) {
    super.position = position;

    this.svg.foreignObject
      .attr("x", this._position.x + this.buttonDims.width)
      .attr("y", 0)
  }

}
