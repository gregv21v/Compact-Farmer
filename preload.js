const { app, contextBridge } = require('electron')
const Datastore = require('@seald-io/nedb')
const db = new Datastore({
  filename: "worlds",
  autoload: true
})







contextBridge.exposeInMainWorld('api', {
  saveWorld: async function(name, world) {
    let savedWorld = await db.findOneAsync({name})
    if(!savedWorld) {
      return db.insertAsync({name, world})
    } else {
      return db.updateAsync(world, {name, world})
    }
  },
  loadWorld: async function(name) {
    return await db.findOneAsync({name})
  },
  deleteWorld: async function(name) {
    return await db.removeAsync({name})
  },
  getListOfWorlds: async function() {
    return await db.findAsync({})
  }
})

