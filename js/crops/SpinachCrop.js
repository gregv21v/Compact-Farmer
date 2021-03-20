/**
  Item
*/
define(
  [
    "items/GrassBladeItem",
    "items/GrassSeedItem",

    "crops/Crop",
    "blocks/Block",
    "d3"
  ],
  function(
    GrassBladeItem, SeedItem,
    Crop, Block, d3) {
    return class SpinachCrop extends Crop {
      /**
        constructor()
        @description constructs the crop
      */
      constructor(cropColor) {
        super(cropColor)
        this.name = "SpinachCrop"
      }

      /**
        toJSON()
        @description converts this block to its json representation
      */
      toJSON() {
        return {
          name: this.name
        }
      }

      /**
        fromJSON()
        @description converts a json object into this world
      */
      static fromJSON(player, json) {
        return new SpinachCrop();
      }

      /**
        getGrowTime()
        @description get the time it takes to grow the crop in miliseconds
      */
      getGrowTime() {
        return 40;
      }
    }
  })
