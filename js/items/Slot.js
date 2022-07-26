/**
  Plot - a plot of land that can be farmed on
*/
import {
  GrassSeedItem, GrassBladeItem, HoeItem, SeedItem,
  Item
} from "./items.js"

import { ContextMenu } from "../gui/ContextMenu.js"


export class Slot {
  static size = 50;

  /**
    constructor()
    @description constructs the slot
  */
  constructor(player, inventoryManager, inventory, position, coordinate) {
    this._coordinate = coordinate
    this._position = position;
    this._inventoryManager = inventoryManager;
    this._inventory = inventory;
    this._item = null;
    this._contextMenu = null;
    this._player = player
    this._onMouse = false;

    this._svg = {}
    this._svg.group = d3.create("svg:g")
    this._svg.background = this._svg.group.append("rect")
    this._svg.itemGroup = this._svg.group.append("g")
    this._svg.contextMenuGroup = this._svg.itemGroup.append("g")
    this._svg.clickArea = this._svg.group.append("rect")
  }

  /********************************************************
                    JSON Function
  *********************************************************/

  /**
    toJSON()
    @description converts this slot to its json representation
  */
  toJSON() {
    if(this._item !== null)
      return {
        item: this._item.toJSON()
      }
    else
      return {
        item: null
      }
  }




  /********************************************************
                    Graphics Methods
  *********************************************************/

  /**
    render()
    @description initialize the values for the _svg
  */
  render() {
    var self = this;

    this._svg.group.attr("class", "slot")

    // render the background
    this._svg.background
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", Slot.size)
      .attr("height", Slot.size)
      .style("fill", "grey")
      .style("stroke", "black")
      .style("stroke-width", 1)

    this._svg.clickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .attr("width", Slot.size)
      .attr("height", Slot.size)
      .style("fill-opacity", 0)
      .on("click", function(event) {self.onClick(event)})
      .on("mouseover", function() {self.onMouseEnter()})
      .on("mouseout", function() {self.onMouseLeave()})
      .on("mousedown", function() {self.onMouseDown()})
  }

  /**
    attach()
    @description add this slot to parent graphics
    @param parent the svg element to add this slot to
  */
  attach(parent) {
    parent.append(() => this._svg.group.node())
  }



  /********************************************************
                    Getters and Setters
  *********************************************************/

  /**
    set position
    @description sets the _position of this slot
    @param _position the new _position of this slot
  */
  set position(position) {
    this._position = position
    if(this._item !== null) {
      this._item.position = {
        x: position.x + 5,
        y: position.y + 5
      }
    }

    this._svg.clickArea
      .attr("x", this._position.x)
      .attr("y", this._position.y)

    this._svg.background
      .attr("x", this._position.x)
      .attr("y", this._position.y)
  }

  /**
    get position
    @description gets the _position of the slot
  */
  get position() {
    return this._position
  }

  /**
   * getGraphics()
   * @description gets the graphics for the slot
   */
  get graphics() {
    return this._svg.group;
  }

  /**
   * get item
   * @description gets the item of the slot
   */
  get item() {
    return this._item;
  }


  /**
    addItem()
    @description adds a unit for this slot
    @param item item to put in this slot
    @param layers the graphics layers
  */
  addItem(item) {
    if(!this._item) {

      // update the item
      this._item = item;
      this._item.position = {
        x: this.position.x + 5,
        y: this.position.y + 5
      }

      // initialize the unit and add it to the svg layer
      this._item.render()
      //console.log(this._inventory)
      this._item.attach(this._inventory.layers.items)
      this._item.initTooltip(this._inventory.layers.tooltips)

      // setup the drag handler that allows you to drag
      // the unit around
      var self = this

      this._item._svg.clickArea.on("click", (event) => {
        self.onClick(event)
      })

      this._item._svg.clickArea.on("dblclick", (event) => self.onDoubleClick(event))

      if(this._inventory.onRightClickEnabled) {
        this._item._svg.clickArea.on("contextmenu", function(event) {
          self.onRightClick(event, self._inventory.layers.contextMenus)
        })
      }
    } else if(this._item.constructor === item.constructor) {
        //console.log(this._item);
        console.log("Items stacked");
        this._item.quantity += item.quantity;
        item.destroy();
    }
  }

  /**
    * consumeOne()
    * @description consumes one of the item in this slot
    */
  consumeOne(slot) {
    if(this._item.quantity > 1) {
      this._item.quantity -= 1;
    } else {
      this.destroyItem()
      this.removeItem()
    }
  }

  /**
   * replaceItem()
   * @description replace the item in this inventory
   * @param item the new item to replace the old one with
   */
  replaceItem(item) {
    console.log("Replacing item");
    this.destroyItem();
    this.addItem(item)
  }

  /**
    removeItem()
    @description removes the item from this slot
  */
  removeItem() {
    if(this._item) {
      //this._item.svg.group.selectAll("*").remove()
      this._item = null;
    }
  }

  /**
    destroyItem()
    @description removes the item and its graphic from the slot
  */
  destroyItem() {
    if(this._item) {
      this._item.destroy();
      this._item = null;
    }
  }


  /**
    distanceTo()
    @description returns the distance between the center of this
      slot and the center of a item
    @param item the item to find the distance to
  */
  distanceTo(item) {
    return Math.sqrt(
      Math.pow(item.position.x - this._position.x, 2) +
      Math.pow(item.position.y - this._position.y, 2)
    )
  }

  /**
   * contains()
   * @description check if this slot contains a given point
   * @param {Point} point the point to check for 
   */
  contains(point) {
    return (
      this._position.x < point.x && point.x < this._position.x + Slot.size &&
      this._position.y < point.y && point.y < this._position.y + Slot.size
    )
  }

  /**
    useSlot()
    @description use the item in this slot
  */
  useSlot() {
    if(this._item.quantity - 1 > 0) {
      this._item.quantity -= 1;
    } else {
      this.destroyItem()
    }
  }

  /**
    isEmpty()
    @description returns whether this slot is empty or not
  */
  isEmpty() {
    return this._item === null;
  }



  /**
    select()
    @description selects this slot of the inventory
  */
  select() {
    this._svg.background.style("stroke", "green")
    this._svg.background.style("stroke-width", 5)
  }

  /**
    deselect()
    @description deselects this slot of the inventory
  */
  deselect() {
    this._svg.background.style("stroke", "black")
    this._svg.background.style("stroke-width", 1)
  }

  /********************************************************
                   Mouse Interactions
  *********************************************************/



  /**
   * onDoubleClick()
   * @description the event that occures when an item or slot is double clicked
   */
  onDoubleClick(event) {
    console.log("Double Click");
    // add all the items of the clicks item to
    // your hand
    this._player.addItemToHand(this._inventory.getAllItemsByName(this._item.name));
  }

  /**
    onClick()
    @description the function called when this block is clicked
  */
  onClick(event) {
    if(this._inventory.itemsMovable) {

      let pos = d3.pointer(event);


      if(this._player.hand) { // there is something in the hand
        // place the item in the players hand into the designated slot
        if(
          this._inventoryManager.addToContainingSlot({
            x: pos[0], y: pos[1]
          }, this._player.hand)
        ) {
          //this._player.hand.destroy();
          this._player.removeItemFromHand();
          console.log("Slot clicked");
        } 
      } else {
        console.log("Hand empty");
        this._player.addItemToHand(this._item)
        this._inventory.removeItemFromSlot(this)
      }

      
      
    } else {
      this._inventory.deselectAll()
      this._inventory.select(this)
      this.select()
    }

    // select this slot and only this slot of the inventory
    //this._inventory.clearContextMenus();
    

  }

  /**
    onMouseDown()
    @description the function called when the mouse is pressed down on the slot
  */
  onMouseDown() {
  }

  /**
    onMouseEnter()
    @description the function called when the mouse enters the button area
  */
  onMouseEnter() {
    this._svg.background.style("fill-opacity", 0.5)
  }

  /**
    onMouseLeave()
    @description the function called when the mouse enters the button area
  */
  onMouseLeave() {
    this._svg.background.style("fill-opacity", 1)
  }


  /**
    onRightClick()
    @description the function called on right click which is normally the
      creation of a context menu
  */
  onRightClick(event, layer) {
    console.log("Right Click");
    event.preventDefault();

    let self = this;
    /*this._contextMenu = new ContextMenu({x: event.x, y: event.y})
    this._contextMenu.addMenuItem("Split", function() {
      console.log("Split");
      self._inventory.splitStack(self._coordinate)
    })*/

    //this._contextMenu.attach(layer);
    let pos = d3.pointer(event)

    if(this._player.hand) {
      let newItem = this._player.hand.clone()
      newItem.quantity = 1
      this._inventoryManager.addToContainingSlot({
        x: pos[0], y: pos[1]
      }, newItem)
      this._player.hand.quantity -= 1;

      if(this._player.hand.quantity === 0) {
        this._player.hand.destroy()
        this._player.removeItemFromHand()
      }
    }


  }
}
