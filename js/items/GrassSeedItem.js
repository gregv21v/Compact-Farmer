/**
  Item
*/
define(
  ["crops/GrassCrop", "items/SeedItem", "d3"],
  function(GrassCrop, SeedItem, d3) {
    return class GrassSeedItem extends SeedItem {
      /**
        constructor()
        @description constructs the grass seed item
      */
      constructor(position = {x: 0, y: 0}) {
        super(position)
        this.name = "GrassSeedItem"
        this.seedColor = "green"
      }

      /**
        getCrop()
        @description get a new instance of a crop for this seed
      */
      getCrop() {
        return new GrassCrop(this.seedColor);
      }

      /**
        clone()
        @description make a copy of this crop
      */
      clone() {
        var clone = new GrassSeedItem(this.position);
        clone.quantity = this.quantity;

        clone.initSVG()
        return clone
      }
    }
  })
