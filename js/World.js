import {
  Block, ExpansionBlock, DirtBlock,
  WaterBlock, ComposterBlock
} from "./blocks/blocks.js"


export class World {

  /**
   * constructor()
   * @description constructs a new world
   * @param {Object} props the properties of the world
   *  Properties:
   *    player: the player
   *    position: the position of the world
   */
  constructor(props) {
    this._props = props;
    this._name = "World";

    // properties
    this.position = props.position;
    this.player = props.player;

    // state variables
    this._blocks = {};

    // render the world
  }



  /**
    toJSON()
    @description converts this world to its json representation
  */
  toJSON() {
    let blocksAsJSON = {}
    for (var key of Object.keys(this._blocks)) {
      blocksAsJSON[key] = this._blocks[key].toJSON()
    }
    return blocksAsJSON;
  }


  /**
   * get name()
   * @description get the name of the world
   * @returns {string} the name of the world
   */
  get name() {
    return this._name;
  }

  /**
   * set name()
   * @description set the name of the world
   */
  set name(value) {
    this._name = value;
  }


  /**
   * get blocks()
   * @description get the blocks in the world
   * @returns {Object} the blocks in the world
   */
  get blocks() {
    return this._blocks;
  }

  /**
    fromJSON()
    @description converts a json object into this world
  */
  static fromJSON(json, props) {
    let world = new World(props)
    for (var key of Object.keys(json)) {
      var block = null;
      if(json[key].name === "ExpansionBlock") {
        block = ExpansionBlock.fromJSON(props.player, world, json[key])
      } else if(json[key].name === "DirtBlock") {
        block = DirtBlock.fromJSON(props.player, world, json[key])
      } else if(json[key].name === "WaterBlock") {
        block = WaterBlock.fromJSON(props.player, world, json[key])
      } else if(json[key].name === "ComposterBlock") {
        block = ComposterBlock.fromJSON(props.player, world, json[key])
      } else {
        block = Block.fromJSON(props.player, world, json[key]);
      }


      world._blocks[key] = block
    }

    return world;
  }

  /**
    delete()
    @description delete all the blocks in the world
  */
  remove() {
    for (var key of Object.keys(this._blocks)) {
      this._blocks[key].remove()
      delete this._blocks[key]
    }
  }


  /**
    addBlock()
    @description adds a block to the world
    @param block the block to add
  */
  addBlock(block) {
    this._blocks[block.getCoordinateAsString()] = block;

    block.render()
    block.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
    block.update()
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
   * 
   * @param {*} block 
   * @returns 
   */
  getAdjacentBlocks(block) {
    let self = this;
    return [
      block.coordinate.x + "_" + (block.coordinate.y + 1),
      block.coordinate.x + "_" + (block.coordinate.y - 1),
      (block.coordinate.x - 1) + "_" + block.coordinate.y,
      (block.coordinate.x + 1) + "_" + block.coordinate.y
    ]
  }


  /**
    remove()
    @description removes a given block from the world.
    @param block the block to remove
  */
  removeBlock(block) {
    var coordAsString = block.getCoordinateAsString()
    if(coordAsString in this._blocks) {
      // remove the expansion blocks around this block
      let adjacentBlocks = this.getAdjacentBlocks(block);

      for (const blockCoordinate of adjacentBlocks) {
        if(this._blocks[blockCoordinate] instanceof ExpansionBlock) {
          this._blocks[blockCoordinate].remove();
          delete this._blocks[blockCoordinate];
        }
      }

      this.replaceBlock(new ExpansionBlock(this.player, this, {
        x: block.coordinate.x,
        y: block.coordinate.y
      }))

      // add the new block
      /*
      this._blocks[coordAsString] = new ExpansionBlock(
        this.player, this,
        block.coordinate
      );
      this._blocks[coordAsString].render()
      this._blocks[coordAsString].attach(this._svg.layers.tooltips, this._svg.layers.blocks);
      this.updateBlocks();
      */
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
    if(coordAsString in this._blocks) {
      // remove it
      this._blocks[coordAsString].remove();
      delete this._blocks[coordAsString]

      // add the new block
      block.render();
      block.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
      block.update();

      this._blocks[coordAsString] = block;

      this.updateBlocks();
    }
  }

  /**
    updateBlocks()
    @description update all the blocks
  */
  updateBlocks() {
    for (var block of Object.values(this._blocks)) {
      block.update()
      block.updateWorld(this)
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
    if(!(leftExp.getCoordinateAsString() in this._blocks)) {
      this._blocks[leftExp.getCoordinateAsString()] = leftExp;
      leftExp.render();
      leftExp.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
    }


    // right
    var rightExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x + 1,
      y: block.coordinate.y
    })
    if(!(rightExp.getCoordinateAsString() in this._blocks)) {
      this._blocks[rightExp.getCoordinateAsString()] = rightExp;
      rightExp.render()
      rightExp.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
    }

    // top
    var topExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x,
      y: block.coordinate.y - 1
    })
    if(!(topExp.getCoordinateAsString() in this._blocks)) {
      this._blocks[topExp.getCoordinateAsString()] = topExp;
      topExp.render()
      topExp.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
    }

    // bottom
    var bottomExp = new ExpansionBlock(this.player, this, {
      x: block.coordinate.x,
      y: block.coordinate.y + 1
    })
    if(!(bottomExp.getCoordinateAsString() in this._blocks)) {
      this._blocks[bottomExp.getCoordinateAsString()] = bottomExp;
      bottomExp.render()
      bottomExp.attach(this._svg.layers.tooltips, this._svg.layers.blocks);
    }

    this.updateBlocks();
  }





  /**
    render()
    @description renders the world to the svg canvas
  */
  render() {
    this._svg = {
      group: d3.create("svg:g"),
      layers: {}
    }

    this._svg.layers.blocks = this._svg.group.append("g")
    this._svg.layers.tooltips = this._svg.group.append("g")

    for (const block of Object.values(this._blocks)) { 
      block.render();
    }

    this.enableDrag();
  }


  /**
   * enableDrag() 
   * @description enables the drag functionality of the world
   */
  enableDrag() {
    this.dragActive = true;
    this.dragStart = {x: 0, y: 0}
    this.lastDrag = {x: 0, y: 0}

    let svgMain = d3.select("body").select("svg")
    let self = this;
    let dragHandler = d3.drag()
      .on("start", (event) => {
        if(self.dragActive) {
          self.dragStart = {
            x: event.x,
            y: event.y
          }

          self.lastDrag = {
            x: 0,
            y: 0
          }
        }
      })
      .on("drag", (event) => {
        if(self.dragActive) {
          self.move({
            x: -self.lastDrag.x,
            y: -self.lastDrag.y
          })

          self.move({
            x: event.x - self.dragStart.x,
            y: event.y - self.dragStart.y
          })

          self.lastDrag = {
            x: event.x - self.dragStart.x,
            y: event.y - self.dragStart.y
          }
        }
      })

    dragHandler(svgMain)
  }




  /** 
   * update()
   * @description updates the world
   */
  update() {
    for (const block of Object.values(this._blocks)) {
      block.update();
    }
  }

  /**
   * attach()
   * @description attaches the world to the svg canvas
   * @param svg the svg canvas to attach to
   */
  attach(svg) {
    console.log("attaching world to svg");

    svg.append(() => this._svg.group.node())

    for (const block of Object.values(this._blocks)) {
      block.attach(this._svg.layers.tooltips, this._svg.layers.blocks)
    }
  }


  /**
   * getSurroundingBlocks()
   * @description gets the blocks surrounding the given block
   * @param {Block} block the block to get the surrounding blocks for
   */
  getSurroundingBlocks(block) {
    var surroundingBlocks = []

    console.log("getting surrounding blocks for block", block);
    console.log("blocks", this._blocks);

    for(var x = block.coordinate.x - 1; x <= block.coordinate.x + 1; x++) {
      for(var y = block.coordinate.y - 1; y <= block.coordinate.y + 1; y++) {
        if(
          !(x == block.coordinate.x && y == block.coordinate.y) && 
          Block.getCoordinateAsString({x, y}) in this._blocks
        ) {
          surroundingBlocks.push(this._blocks[Block.getCoordinateAsString({x, y})])
        }
      }
    }

    return surroundingBlocks;
  }


  /**
    move()
    @description moves the world relative to its current position
  */
  move(delta) {
    this.position.x += delta.x
    this.position.y += delta.y
    this.update()
  }


  /**************************************************************
                  Getters & Setters
   **************************************************************/

  /**
   * get layers
   * @description get the layers of the world
   */
  get layers() {
    return this._svg.layers;
  }

}
