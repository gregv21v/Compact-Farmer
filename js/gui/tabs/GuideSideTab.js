/**
  SideTab - a tab on the side of the window
*/
define(
  [
    "gui/tabs/SideTab",
    "d3"
  ],
  function(SideTab, d3) {
    return class GuideSideTab extends SideTab {
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
        initSVG()
        @description initializes the svgs for this side tab
      */
      initSVG() {
        super.initSVG();

        this.svg.foreignObject
          .attr("x", this._position.x + this.buttonDims.width)
          .attr("y", 0)
          .attr("width", this.contentDims.width)
          .attr("height", this.contentDims.height)

        this._html.div
          .html(`
            <h2>Guide</h2>
            <p>

              You start off with 2 dirt blocks a hoe, and some grass seeds.
              The grass seed can be planted, once you place a dirt block and hoe it.

            </p>

            <div style='display: flex; flex: row;'>
              <figure>
                <img src="./images/grassSeed.png" width="25px" height="50px" alt="Grass Seed">
                <figcaption>
              	 Grass Seed
                </figcaption>
              </figure>

              <figure>
                <img src="./images/dirtBlock.png" width="50px" height="50px" alt="Grass Seed">
                <figcaption>
              	 Dirt Block
                </figcaption>
              </figure>

              <figure>
                <img src="./images/hoe.png" width="50px" height="50px" alt="Grass Seed">
                <figcaption>
              	 Hoe
                </figcaption>
              </figure>
            </div>

          `)
          .style("padding", "5px")
          .style("text-align", "center")

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
  })
