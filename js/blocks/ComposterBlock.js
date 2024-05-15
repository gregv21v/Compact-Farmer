/**
  Plot - a plot of land that can be farmed on
*/
import { Block } from "./blocks.js"
import { CompostableItem, DirtBlockItem } from "../items/items.js"
import { getRandomInt } from "../util.js"

export class ComposterBlock extends Block {

  /**
   * constructor()
   * @description constructs the item
   * @param {player} player the player playing the game
   * @param {World} world the world the player is playing in
   * @param {Point} coordinate the coordinate of the block in the world
   */
  constructor(player, world, coordinate) {
    super(player, world, coordinate)

    this._name = "ComposterBlock"

    this._displayName = "Composter"
    this._description = "Left click with a plant to make compost. Right click to extract dirt blocks"

    this.updateToolTip()
  }

  /**
    toJSON()
    @description converts this block to its json representation
  */
  toJSON() {
    return {
      name: this._name,
      coordinate: this._coordinate,
      progress: this._progress
    }
  }

  /**
    fromJSON()
    @description converts a json object into this world
  */
  static fromJSON(player, world, json) {
    let newBlock = new ComposterBlock(player, world, json.coordinate);
    newBlock._progress = json.progress
    console.log(newBlock);
    return newBlock
  }

  /**
    createGraphic()
    @description override this function to draw the graphics for the
      block.
      Each svg should be added to this._svg
    @param group the svg group to create the graphics on
  */
  createGraphic(group) {
    this._group = group;

    // make your graphics here add add them to the this._svg object
    this._svg.image = group.append("svg:image");
    this._svg.progressBar = group.append("rect");

    this._svg.image
      .attr("href", "images/compostBin.png")
      .attr("width", Block.size)
      .attr("height", Block.size)

    this._leafCount = 20;
    this._svg.leaves = [];
    this._leafProperties = [];

    //https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
    let randomRadius = () => radius * Math.sqrt(Math.random())
    let randomAngle = () => Math.random() * 2 * Math.PI

    let worldPosition = this._world.coordinateToPosition(this._coordinate);
    let center = {
      x: worldPosition.x + Block.size / 2,
      y: worldPosition.y + Block.size / 2
    }

    let radius = (Block.size / 2) - 10 - 1;

    for (let i = 0; i < this._leafCount; i++) {
      let leaf = this._group.append("image");
      let x = randomRadius() * Math.cos(randomAngle());
      let y = randomRadius() * Math.sin(randomAngle());
      let rotation = getRandomInt(0, 360);

      leaf
        .attr("x", center.x + x)
        .attr("y", center.y + y)
        .attr("width", 10)
        .attr("height", 10)
        .style("opacity", 0)
        .attr("href", "images/orangeLeaf.png")
        .attr("transform", "rotate(" + rotation + ", " + (center.x + x + 5) + ", " + (center.y + y + 5) + ")")

      this._svg.leaves.push(leaf);
      this._leafProperties.push(
        { x, y, rotation }
      )
    }
  }

  /**
   * render()
   * @description renders the block to the screen
   */
  render() {
    super.render()
  }


  /**
   * update()
   * @description updates the block
   */
  update() {
    super.update()

    let worldPosition = this._world.coordinateToPosition(this._coordinate);

    //this.updateToolTip("Left clicking this block with plants will allow you produce compost")

    // render the cross
    this._svg.image
      .attr("x", worldPosition.x)
      .attr("y", worldPosition.y)

    this.renderRandomLines()

    this._svg.progressBar
      .attr("x", worldPosition.x)
      .attr("y", worldPosition.y + Block.size - Block.ProgressBarHeight)
      .attr("height", Block.ProgressBarHeight)
      .attr("width", this._progress / this._progressMax * Block.size)
      .style("fill", "#45211e")
  }


  /**
   * renderRandomLines()
   * @description renders the random lines on the block
   */
  renderRandomLines() {
    let worldPosition = this._world.coordinateToPosition(this._coordinate);
    let center = {
      x: worldPosition.x + Block.size / 2,
      y: worldPosition.y + Block.size / 2
    }

    let lastLeafVisible = Math.round(this._leafCount * this._progress / this._progressMax);

    for (let i = 0; i < this._svg.leaves.length; i++) {
      this._svg.leaves[i]
        .attr("x", center.x + this._leafProperties[i].x)
        .attr("y", center.y + this._leafProperties[i].y)
        .style("opacity", (i < lastLeafVisible) ? 1 : 0)
        .attr(
          "transform",
          "rotate(" + this._leafProperties[i].rotation + ", " + (center.x + this._leafProperties[i].x) + ", " + (center.y + this._leafProperties[i].y) + ")")
    }


    /*for(let i = 0; i < this._svg.randomLines.length; i++) {
      let path = d3.path()

      // radius within the circle
      let startPoint = {
        x: center.x + randomRadius() * Math.cos(randomAngle()),
        y: center.y + randomRadius() * Math.sin(randomAngle())
      }

      let endPoint = {
        x: center.x + randomRadius() * Math.cos(randomAngle()),
        y: center.y + randomRadius() * Math.sin(randomAngle())
      }


      path.moveTo(startPoint.x, startPoint.y)
      path.lineTo(endPoint.x, endPoint.y)

      this._svg.randomLines[i]
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black")
    }*/
  }



  /**
    onClick()
    @description the function called when this block is clicked
  */
  onLeftClick() {
    super.onLeftClick();

    let selectedSlot = this._player.toolbar.currentlySelected
    let selectedItem = selectedSlot.item

    // if a compostable item is in the players hand 
    if (
      selectedItem &&
      selectedItem instanceof CompostableItem &&
      this._progress + selectedItem.compostValue <= this._progressMax
    ) {
      selectedSlot.consumeOne()

      // update the progress bar
      this._progress += selectedItem.compostValue;
      this._svg.progressBar.attr("width", this._progress / this._progressMax * Block.size)

      this.update();
    }
  }

  /**
   * onRightClick()
   * @description the function called when this block is right clicked
   */
  onRightClick() {
    super.onRightClick();

    let selectedSlot = this._player.toolbar.currentlySelected
    let selectedItem = selectedSlot.item

    // if the compost bin is at least half full, 
    // pull out a dirt block
    if (selectedItem === null && this._progress >= this._progressMax / 2) {
      this._progress -= this._progressMax / 2
      this._svg.progressBar.attr("width", (this._progress / this._progressMax) * Block.size)

      if (!this._player.toolbar.add(new DirtBlockItem())) {
        this._player.inventory.add(new DirtBlockItem())
      }
    }


    this.update();

    console.log("Right Clicked Composter Block");
  }


}
