const { app, contextBridge } = require('electron')
const Datastore = require('nedb-promises')
const db = Datastore.create({
  filename: "playerData",
  autoload: true
})


contextBridge.exposeInMainWorld('api', {
  save: async function(username, data) {
    var user = await db.findOne({username: username})
    console.log(user);
    if(user === null) {
      return db.insert({username: username, data: data})
    } else {
      return db.update(user, {username: username, data: data})
    }
  },
  load: async function(username) {
    return await db.findOne({username: username})
  }
})
