export class BlockRegistry {
    static blocks = {}
  
  
    /**
      registerblock()
      @description registers a block by name
      @param block the block to register
    */
    static registerBlock(block) {
      this.blocks[block.name] = block;
    }
  
  
    /**
      lookup()
      @description look up a block by name
      @param name the name of the block
    */
    static lookup(name) {
      return this.blocks[name];
    }
  
    /**
      blockFromJSON()
      @description converts a block from json
      @param block the block to convert
    */
    static blockFromJSON(json) {
      var resultBlock = null;
      for (var key of Object.keys(this.blocks)) {
        if(json !== null && json.name === key) {
          resultBlock = this.blocks[key].clone()
          resultBlock.quantity = json.quantity
        }
      }
      return resultBlock
    }
  
  }
  