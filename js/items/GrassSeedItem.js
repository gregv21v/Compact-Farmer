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
        this._elements = {
          Magnesium: 8,
          Iron: 200,
          Potassium: 42
        }

        this._description = "Grass Seed: Placable on tilled farm block"
        this.updateToolTip()

        this._imageURL = "images/grassSeed.png"
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
