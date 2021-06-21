/**
  Plot - a plot of land that can be farmed on
*/
import { Button } from "./buttons.js"

export class SaveButton extends Button {
  /**
    constructor()
    @description constructs the item
  */
  constructor(player, position, width, height) {
    super(position, width, height, "Save")

    this.player = player;
  }


  /**
    onClick()
    @description the function called when this button is clicked
  */
  onClick() {
    this.player.save()
  }

}
