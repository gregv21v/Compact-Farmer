define(
  [],
  function() {
    return class PlantOutput {

      /**
        constructor()
        @description constructs the plant output
        @param output the output item
        @param min the minimum number of this item that will be output
        @param max the maximum number of this item that will be output
      */
      constructor(output, min, max) {
        this.output = output; // the output product
        this.min = min; // the minimum number of this product that will be output
        this.max = max; // the maximum number of this product that will be output
      }

      /**
        getOutput()
        @description get the output of a random quantity between the specified
          range
      */
      getOutput() {
        var newProduct = null;
        var quantity = Math.floor(Math.random() * this.max) +
          this.min;

        if(quantity > 0) {
          newProduct = this.output.clone();
          newProduct.quantity = quantity;
        }

        return newProduct;
      }

    }
  }
)
