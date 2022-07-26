/**
  SideTab - a tab on the side of the window
*/
import { SideTab } from "./tabs.js"

export class GuideSideTab extends SideTab {
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
      "Guide"
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
        <h2>Guide</h2>
        <b>Welcome to the guide!</b>
    
        <p style="text-align: left;">
          The goal of this game is to grow a garden.

        <p style="text-align: left;">  
          Here I will teach you the basics of growing a garden. On your toolbar you will see that you have 
          several items that you can use. Lets first start with the dirt block.
        </p>

        <figure>
          <img src="./images/dirtBlock.png" width="50px" height="50px" alt="Dirt Block">
          <figcaption>
            Dirt Block
          </figcaption>
        </figure>

        <p style="text-align: left;">
          Dirt blocks can be placed on expansion blocks (the blocks with a the green plus sign) 
          to expand your farm.
        </p>

        <p style="text-align: left;">
          Close the guide tab, and try placing the two dirt blocks you have on the expansion block. Once you are done open the 
          guide tab again.
        </p>
        
        <p>
          Now that you have a dirt block placeed, you can plow that dirt block with the hoe.
        </p>

        <figure>
          <img src="./images/hoe.png" width="50px" height="50px" alt="Hoe">
          <figcaption>
            Hoe
          </figcaption>
        </figure>

        <p>
          Once you have hoed the dirt block, you can plant a seed. You start with grass seeds.
        </p>

        <figure>
          <img src="./images/grassSeed.png" width="25px" height="50px" alt="Grass Seed">
          <figcaption>
            Grass Seed
          </figcaption>
        </figure>

        <p style="text-align: left;">
          9 grass blades can be placed into a crafting grid to create a dirt block
          4 grass blades in the upper left hand corner of a crafting grid makes a grass sieve
          a grass sieve can be used to sieve dirt to find seeds and other things
        </p>


      `)
      .style("padding", "5px")
      .style("text-align", "left")

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
