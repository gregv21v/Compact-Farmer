/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["gui/Button", "d3"],
  function(Button, d3) {
    return class DragButton extends Button {
      /**
        constructor()
        @description constructs the item
      */
      constructor(world, position, width, height) {
        super(position, width, height, "Drag")

        this.dragActive = true;
        this.dragStart = {x: 0, y: 0}
        this.lastDrag = {x: 0, y: 0}

        var svgMain = d3.select("body").select("svg")
        var self = this;
        var dragHandler = d3.drag()
          .on("start", function(event) {
            if(self.dragActive) {
              self.dragStart = {
                x: event.x,
                y: event.y
              }

              self.lastDrag = {
                x: 0,
                y: 0
              }
            }
          })
          .on("drag", function(event) {
            if(self.dragActive) {
              world.move({
                x: -self.lastDrag.x,
                y: -self.lastDrag.y
              })

              world.move({
                x: event.x - self.dragStart.x,
                y: event.y - self.dragStart.y
              })

              self.lastDrag = {
                x: event.x - self.dragStart.x,
                y: event.y - self.dragStart.y
              }
            }
          })

        dragHandler(svgMain)
      }

      /**
        render()
        @description sets all the attributes of the svg to their appropriate class
          variables
      */
      initSVG() {
        super.initSVG()
        this.svg.background
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
          this.svg.background.style("fill", "red")
        } else {
          this.dragActive = true
          this.svg.background.style("fill", "green")
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
  })
