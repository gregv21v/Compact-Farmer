define(
  [

  ],
  function() {
    /**
      SideTabManager - Manages side tabs
    */
    return class SideTabManager {

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
            height: game.height
          }
          this.tabs.push(tab)
        } else {
          // get the last tab
          var lastTab = this.tabs[this.tabs.length - 1];

          // position the new tab just below the last tab
          tab.position = {
            x: game.width - 30,
            y: lastTab.position.y + lastTab.buttonDims.height
          }

          tab.contentDims = {
            width: game.width/2,
            height: game.height
          }

          this.tabs.push(tab)
        }

        //console.log(this.tabs);
      }



      /**
        addGraphicsTo()
        @description add the graphics to the specifed group
        @param group group to add the graphics to
      */
      addGraphicsTo(group) {
        for (var tab of this.tabs) {
          tab.initSVG()
          tab.addGraphicsTo(group)
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
  }
)
