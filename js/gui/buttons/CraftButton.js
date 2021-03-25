/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["gui/buttons/Button", "d3"],
  function(Button, d3) {
    return class CraftButton extends Button {

      /**
        onClick()
        @description the function called when this button is clicked
      */
      onClick() {
        // do something ...
        console.log("Crafting...");
      }
    }
  })
