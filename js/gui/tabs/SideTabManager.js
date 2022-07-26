import { Slot } from "../../items/Slot.js";

/**
  SideTabManager - Manages side tabs
*/
export class SideTabManager {
  /**
    constructor()
    @description constructs the side tab manager
  */
  constructor() {
    this.tabs = [];
  }

  /**
    addTab()
    @description add a side tab
    @param a side tab to add
  */
  addTab(tab, game) {

    if(this.tabs.length <= 0) {
      tab.position = {
        x: game.width - 30,
        y: 0
      }

      tab.contentDims = {
        width: game.width/2,
        height: game.height - Slot.size - 10
      }
      this.tabs.push(tab)
    } else {
      // get the last tab
      var lastTab = this.tabs[this.tabs.length - 1];

      // position the new tab just below the last tab
      tab.position = {
        x: game.width - 30,
        y: lastTab.position.y + lastTab.buttonDims.height + 5 
      }

      tab.contentDims = {
        width: game.width/2,
        height: game.height - Slot.size - 10
      }

      this.tabs.push(tab)
    }

    //console.log(this.tabs);
  }



  /**
    attach()
    @description add the graphics to the specifed group
    @param group group to add the graphics to
  */
  attach(group) {
    for (var tab of this.tabs) {
      tab.render()
      tab.attach(group)
    }
  }

  /**
    onWindowResize()
    @description triggered when the window resizes
  */
  onWindowResize(game) {
    for (var tab of this.tabs) {
      tab.onWindowResize(game);
    }
  }
}
