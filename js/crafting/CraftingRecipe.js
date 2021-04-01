define(
  [],
  function() {
    return class CraftingRecipe {
      /**
        constructor()
        @description constructs the recipe
        @param input a CraftingUnit
        @param output a single output unit
      */
      constructor(craftingInput, output) {
        this.input = craftingInput;
        this.output = output;
      }

      /**
       * getKey()
       * @description get the string of inputs as a key
       */
      getKey() {
        return this.input.getKey();
      }

    }
  }
)
