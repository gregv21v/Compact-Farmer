import {
  Block, ExpansionBlock, DirtBlock,
  WaterBlock, ComposterBlock
} from "./blocks/blocks.js"


export class World {

  constructor(player, layer, position) {
    this.position = position
    this.blocks = {};
    this.player = player;
    this._layer = layer;

    this._svgLayers = {
      blocks: layer.append("g"),
      tooltips: layer.append("g")
    }

    this.addBlock(new WaterBlock(this.player, this, {x: 0, y: 0}))// origin block
    this.addBlock(new ComposterBlock(this.player, this, {x: 0, y: 1}))
    this.addBlock(new ExpansionBlock(this.player, this, {x: 0, y: -1}))
    this.addBlock(new ExpansionBlock(this.player, this, {x: -1, y: 0}))
    this.addBlock(new ExpansionBlock(this.player, this, {x: 1, y: 0}))
  }

  /**
    toJSON()
    @description converts this world to its json representation
  */
  toJSON() {
    let blocksAsJSON = {}
    for (var key of Object.keys(this.blocks)) {
      blocksAsJSON[key] = this.blocks[key].toJSON()
    }
    return blocksAsJSON;
  }


  /**
    fromJSON()
    @description converts a json object into this world
  */
  fromJSON(player, world, json) {
    for (var key of Object.keys(json)) {
      var block = null;
      if(json[key].name === "ExpansionBlock") {
        block = ExpansionBlock.fromJSON(player, world, json[key])
      } else if(json[key].name === "DirtBlock") {
        block = DirtBlock.fromJSON(player, world, json[key])
      } else if(json[key].name === "WaterBlock") {
        block = WaterBlock.fromJSON(player, world, json[key])
      } else if(json[key].name === "ComposterBlock") {
        block = ComposterBlock.fromJSON(player, world, json[key])
      } else {
        block = Block.fromJSON(player, world, json[key]);
      }

      this.blocks[key] = block
    }
  }

  /**
    delete()
    @description delete all the blocks in the world
  */
  delete() {
    for (var key of Object.keys(this.blocks)) {
      this.blocks[key].delete()
      delete this.blocks[key]
    }
  }


  /**
    addBlock()
    @description adds a block to the world
    @param block the block to add
  */
  addBlock(block) {
    this.blocks[block.getCoordinateAsString()] = block;
  }




  /**
    coordinateToPosition()
    @description converts the coordinate of a block to its world position
    @param coordinate the coordinate of the block in the world
  */
  coordinateToPosition(coordinate) {
    return {
      x: this.position.x + coordinate.x * Block.size,
      y: this.position.y + coordinate.y * Block.size
    }
  }


  /**
    remove()
    @description removes a given block from the world.
    @param block the block to remove
  */
  removeBlock(block) {
    var coordAsString = block.getCoordinateAsString()
    if(coordAsString in this.blocks) {
      // remove it
      this.blocks[coordAsString].unrender();
      delete this.blocks[coordAsString]

      // add the new block
      this.blocks[coordAsString] = new ExpansionBlock(
        this.player, this,
        block.coordinate
      );
      this.blocks[coordAsString].render()

      this.updateBlocks();
    }
  }

  /**
    replaceBlock()
    @description replaces a block at the given coordinate location.
      if the location is empty, the block is simply placed there
    @param block the block to be replaced with the coordinates to place it at
  */
  replaceBlock(block) {

    var coordAsString = block.getCoordinateAsString()
    if(coordAsString in this.blocks) {
      // remove it
      this.blocks[coordAsString].unrender();
      delete this.blocks[coordAsString]

      // add the new block
      block.render();
      this.blocks[coordAsString] = block;

      this.updateBlocks();
    }
  }

  /**
    updateBlocks()
    @description update all the blocks
  */
  updateBlocks() {
    for (var block of Object.values(this.blocks)) {
      block.update(this)
    }
  }

  /**
    expand()
    @description expands the world centered around the given block,
      and replaces the block at the coordinates of the given block
    @param block the block to expand around
  */
  expand(block) {
    // replace the block
    this.replaceBlock(block)

    // add expansions blocks to the four sides of the replaced
    // block unless there are blocks already there

    // left
    var leftExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x - 1,
      y: block.coordinate.y
    })
    if(!(leftExp.getCoordinateAsString() in this.blocks)) {
      this.blocks[leftExp.getCoordinateAsString()] = leftExp;
      leftExp.render();
    }


    // right
    var rightExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x + 1,
      y: block.coordinate.y
    })
    if(!(rightExp.getCoordinateAsString() in this.blocks)) {
      this.blocks[rightExp.getCoordinateAsString()] = rightExp;
      rightExp.render()
    }

    // top
    var topExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x,
      y: block.coordinate.y - 1
    })
    if(!(topExp.getCoordinateAsString() in this.blocks)) {
      this.blocks[topExp.getCoordinateAsString()] = topExp;
      topExp.render()
    }

    // bottom
    var bottomExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x,
      y: block.coordinate.y + 1
    })
    if(!(bottomExp.getCoordinateAsString() in this.blocks)) {
      this.blocks[bottomExp.getCoordinateAsString()] = bottomExp;
      bottomExp.render()
    }
  }





  /**
    render()
    @description renders the world to the svg canvas
  */
  render() {
    for (var block of Object.values(this.blocks)) {
      block.render();
    }
  }

  /**
    move()
    @description moves the world relative to its current position
  */
  move(delta) {
    this.position.x += delta.x
    this.position.y += delta.y
    for (var block of Object.values(this.blocks)) {
      block.render();
    }
  }


  /**************************************************************
                  Getters & Setters
   **************************************************************/

  /**
   * get layers
   * @description get the layers of the world
   */
  get layers() {
    return this._svgLayers;
  }

}
