define(["lists/GameObjectList", "objects/Tree"], function(GameObjectList, Tree) {
  return class Forest extends GameObjectList {

    constructor(player) {
      super()
      this.player = player
    }

    addByName(name) {
      let tree = new Tree(this)
      tree.name = name
      tree.id = this.lastId;
      this.lastId++;
      this.gameObjects.push(tree)
    }

    plant() {
      var treeTypes = [
        "Spruce",
        "Pine",
        "Maple",
        "Apple",
        "Oak"
      ]

      for (var i = 0; i < 20; i++) {
        this.addByName(treeTypes[Math.floor(Math.random() * treeTypes.length)] + " Tree")
      }
    }

  }
})
