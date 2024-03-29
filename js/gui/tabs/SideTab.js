/**
  SideTab - a tab on the side of the window
*/
export class SideTab {
  /**
    constructor()
    @description constructs the item
    @param position the top left corner of the tab button
    @param buttonDims the dimensions of the tab button
    @param contentDims the dimensions of the area that contains the
      contents of the tab
    @param name the name of the tab
  */
  constructor(position, name) {
    this.name = name;
    this.buttonDims = {width: 0, height: 0}
    this.contentDims = {width: 0, height: 0};
    this._position = position;
    this.isClosed = true;

    this.svg = {
      group: d3.create("svg:g")
    }
    this.svg.buttonBackground = this.svg.group.append("rect")
    this.svg.label = this.svg.group.append("text")
    this.svg.contentArea = this.svg.group.append("rect")
    this.svg.contentAreaGroup = this.svg.group.append("g")
    this.createGraphic(this.svg.group);
    this.svg.buttonClickArea = this.svg.group.append("rect")

    this.styles = {
      fill: "grey",
      textColor: "black"
    }
  }

  /**
    onWindowResize()
    @description fired when the window resizes
  */
  onWindowResize(game) {
    this.position = {
      x: game.width - 30,
      y: this.position.y
    }
    this.contentDims = {
      width: game.width / 2,
      height: game.height - 50
    }
    this.render()
  }

  /**
    attach()
    @description add the graphics of the side tab to a given svg group
    @param group the group to add the graphics to
  */
  attach(group) {
    group.append(() => this.svg.group.node())
  }

  /**
    createGraphic()
    @description override this function to draw the graphics for the
      block.
      Each svg should be added to this.sv
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    // make your graphics here add add them to the this.svg object
  }

  /**
    getGraphic()
    @description gets the graphical presentation of this side tab
  */
  getGraphic() {
    return this.svg.group;
  }

  /**
    open()
    @description opens the tab
  */
  open() {
    var textPos = {
      x: this._position.x + this.buttonDims.width/2 - 5 - this.contentDims.width,
      y: this._position.y + this.buttonDims.height/2 - (this.name.length*6)/2
    }

    // render the background
    this.svg.buttonBackground
      .attr("x", this._position.x - this.contentDims.width)

    this.svg.label
      .attr(
        "transform",
        "translate(" + textPos.x + "," + textPos.y + ")rotate(90)")

    this.svg.contentArea
      .attr("x", this._position.x + this.buttonDims.width - this.contentDims.width)

    this.svg.buttonClickArea
      .attr("x", this._position.x - this.contentDims.width)
  }

  /**
    close()
    @description closes the tab
  */
  close() {
    var textPos = {
      x: this._position.x + this.buttonDims.width/2 - 5,
      y: this._position.y + this.buttonDims.height/2 - (this.name.length*6)/2
    }

    // render the background
    this.svg.buttonBackground
      .attr("x", this._position.x)

    this.svg.label
      .attr(
        "transform",
        "translate(" + textPos.x + "," + textPos.y + ")rotate(90)")

    this.svg.contentArea
      .attr("x", this._position.x + this.buttonDims.width)

    this.svg.buttonClickArea
      .attr("x", this._position.x)
  }


  /**
    render()
    @description initializes the svgs for this side tab
  */
  render() {
    // initialzies svg
    this.svg.buttonBackground
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.buttonDims.width)
      .attr("height", this.buttonDims.height)
      .style("fill", this.styles.fill)
      .style("stroke", "black")

    var self = this;
    // render the background


    var textPos = {
      x: this._position.x + this.buttonDims.width/2 - 5,
      y: this._position.y + this.buttonDims.height/2 - (this.name.length*6)/2
    }

    this.svg.label
      .style("stroke", this.styles.textColor)
      .attr(
        "transform",
        "translate(" + textPos.x + "," + textPos.y + ")rotate(90)")
      .text(this.name)

    this.svg.contentArea
      .attr("x", this._position.x + this.buttonDims.width)
      .attr("y", 0)
      .attr("width", this.contentDims.width)
      .attr("height", this.contentDims.height)
      .style("fill", this.styles.fill)
      .style("stroke", "black")
      .style("stroke-width", "3px")

    this.svg.buttonClickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", this.buttonDims.width)
      .attr("height", this.buttonDims.height)
      .style("fill-opacity", 0)
      .on("click", function() {self.onClick()});
  }

  /**
    unrender()
    @description removes the block from the canvas
  */
  unrender() {
    for (var svg of Object.keys(this.svg)) {
      this.svg[svg].remove();
    }
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
    this._position = position;

    // initialzies svg
    this.svg.buttonBackground
      .attr("x", this._position.x)
      .attr("y", this._position.y)

    var self = this;
    // render the background


    var textPos = {
      x: this._position.x + this.buttonDims.width/2 - 5,
      y: this._position.y + this.buttonDims.height/2 - (this.name.length*6)/2
    }

    this.svg.label
      .attr(
        "transform",
        "translate(" + textPos.x + "," + textPos.y + ")rotate(90)")

    this.svg.contentArea
      .attr("x", this._position.x + this.buttonDims.width)
      .attr("y", 0)

    this.svg.buttonClickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)
  }

  /**
    onClick()
    @description the function called when this block is clicked
  */
  onClick() {
    if(this.isClosed) {
      this.open();
      this.isClosed = false;
    } else {
      this.close();
      this.isClosed = true
    }
  }
}
