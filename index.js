const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
const port = 3000;

const mongoDBURL = 'mongodb://localhost:27017'

app.use(express.static('public'))
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/save', function(request, response){
  MongoClient.connect(mongoDBURL, function (err, client) {
    if (err) throw err

    var playerCollection = client.db("playerData").collection("players")

    // save the player data to the collection
    playerCollection.findOne({
      username: "gregv21v"
    }).then(function(result) {
      if(result === null) {
        playerCollection.insertOne(
          {
            username: "gregv21v",
            data: request.body
          }
        )
      } else {
        playerCollection.replaceOne(
          {
            username: "gregv21v"
          },
          {
            username: "gregv21v",
            data: request.body
          }
        )
      }
    })

  })
  response.send(request.body);    // echo the result back
});


app.post('/load', function(request, response){
  MongoClient.connect(mongoDBURL, function (err, client) {
    if (err) throw err

    var playerCollection = client.db("playerData").collection("players")

    // load the player data from the collection
    playerCollection.findOne({
      username: "gregv21v"
    }).then(function(result) {
      console.log(result.data);
      response.send(result.data);
    })


  })
});
