/**
  CompostableItem - an item that is compostable
*/
import { Item } from "./Item.js"

export class CompostableItem extends Item {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._compostValue = 0; // the amount of compost this item will produce.
  }


  /**
   * updateToolTip()
   * updates the information on the tooltip
   */
  updateToolTip() {
    this.tooltip.html = `<strong>${this._displayName}</strong> 
    <br/>${this._description}
    <br/>Compost Value: ${this._compostValue}
    <br /><strong>Elements:</strong><br/>`
    for (var element of Object.keys(this._elements)) {
      this.tooltip.html += `<strong>${element}:</strong> ${this._elements[element]}<br/>`
    }
  }


  /**
   * get compostValue()
   * @description get the compost value of this item
   */
  get compostValue() {
    return this._compostValue;
  }
}
