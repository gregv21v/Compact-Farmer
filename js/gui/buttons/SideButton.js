/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["d3", "gui/buttons/Button"],
  function(d3, Button) {
    return class SideButton extends Button {


      /**
        createGraphic()
        @description override this function to draw the graphics for the
          block.
          Each svg should be added to this.svg
        @param mainSVG the main svg canvas to create the graphics on
      */
      createGraphic(mainSVG) {
        // make your graphics here add add them to the this.svg object
        this.svg.label = mainSVG.append("text")
      }


      /**
        render()
        @description renders the button to the SVG canvas
      */
      render() {
        var self = this;
        // render the background
        this.svg.background
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.width)
          .attr("height", this.height)
          .style("fill", "grey")

        var textPos = {
          x: this.position.x + this.width/2 - 5,
          y: this.position.y + this.height/2 - (this.text.length*6)/2
        }

        this.svg.label
          .style("fill", "black")
          .attr(
            "transform",
            "translate(" + textPos.x + "," + textPos.y + ")rotate(90)")
          .text(this.text)

        this.svg.clickArea
          .attr("x", this.position.x)
          .attr("y", this.position.y)
          .attr("width", this.width)
          .attr("height", this.height)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()});
      }



    }
  })
