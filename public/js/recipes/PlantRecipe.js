define(
  [],
  function() {
    return class PlantRecipe {
      /**
        constructor()
        @description constructs the recipe
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
          products.push(output.clone())
        }
        return products
      }
    }
  }
)
