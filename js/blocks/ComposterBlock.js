/**
  Plot - a plot of land that can be farmed on
*/
import { Block } from "./blocks.js"
import { CompostableItem, DirtBlockItem } from "../items/items.js"

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

    this._dirtSpecPositions = [];

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
    this._svg.circle = group.append("circle")
    this._svg.progressBar = group.append("rect")

    this._lineCount = 10;
    this._svg.randomLines = [];
    this._svg.randomPoints = [];

    for (let i = 0; i < this._lineCount; i++) {
      this._svg.randomLines.push(group.append("path"))
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
    this._svg.circle
      .attr("cx", worldPosition.x + Block.size / 2)
      .attr("cy", worldPosition.y + Block.size / 2)
      .attr("r", (Block.size / 2) - 5)
      .style("fill", "black")
      .style("stroke", "black")
      .style("stroke-width", 1)

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

    for (let i = 0; i < this._svg.randomPoints.length; i++) {
      this._svg.randomPoints[i]
        .attr("cx", center.x + this._dirtSpecPositions[i].x)
        .attr("cy", center.y + this._dirtSpecPositions[i].y)
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

      //console.log(startPoint, endPoint);

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

      let radius = (Block.size / 2) - 10 - 1;

      //https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
      let randomRadius = () => radius * Math.sqrt(Math.random())
      let randomAngle = () => Math.random() * 2 * Math.PI

      let x = randomRadius() * Math.cos(randomAngle());
      let y = randomRadius() * Math.sin(randomAngle());

      let worldPosition = this._world.coordinateToPosition(this._coordinate);
      let center = {
        x: worldPosition.x + Block.size / 2,
        y: worldPosition.y + Block.size / 2
      }

      // add more specs to the compost block
      this._dirtSpecPositions.push(
        {x, y}
      )

      let newCircle = this._group.append("circle")
      newCircle
        .attr("r", 1)
        .attr("fill", "brown")
        .attr("stroke", "brown")
        .attr("cx", center.x + x)
        .attr("cy", center.y + y)
      this._svg.randomPoints.push(newCircle);
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

    console.log("Right Clicked Composter Block");
  }


}
