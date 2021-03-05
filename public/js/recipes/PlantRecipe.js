define(
  [],
  function() {
    return class PlantRecipe {
      /**
        constructor()
        @description constructs the recipe
        @param cropName the name of the input crop
        @param outputs an array of item PlantOutput objects
      */
      constructor(cropName, outputs) {
        this.input = cropName;
        this.outputs = outputs;
      }

      /**
        getProducts()
        @description get the products of the recipe
      */
      getProducts() {
        var products = []
        for (var output of this.outputs) {
          products.push(output.getOutput())
        }
        return products;
      }
    }
  }
)
