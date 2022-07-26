/**
  Plot - a plot of land that can be farmed on
*/
import { Button } from "./buttons.js"

export class DragButton extends Button {
  /**
    constructor()
    @description constructs the item
  */
  constructor(world, position, width, height) {
    super(position, width, height, "Drag")

    
  }

  /**
    render()
    @description sets all the attributes of the svg to their appropriate class
      variables
  */
  render() {
    super.render()
    this._svg.background
      .style("fill", "green")
      .style("stroke", "black")
  }

  /**
    onClick()
    @description the function called when this button is clicked
  */
  onClick() {
    if(this.dragActive) {
      this.dragActive = false;
      this._svg.background.style("fill", "red")
    } else {
      this.dragActive = true
      this._svg.background.style("fill", "green")
    }
  }


  /**
    getDragActive()
    @description get whether the ability to drag the map on the screen is active
  */
  getDragActive() {
    return this.dragActive
  }
}
