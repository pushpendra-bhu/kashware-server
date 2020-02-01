const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const uri = 'mongodb://localhost:27017/abc-test'

const connectMongoose = function () {
  mongoose.connect(uri, { useNewUrlParser: true })
  mongoose.set('useCreateIndex', true)
}

connectMongoose()

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
})

mongoose.connection.on('open', function () {
  helper.importAllModels();
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  setTimeout(function () {
    connectMongoose()
  }, 1000)
})

const helper = {
  importAllModels: function () {
    require('./bootstrap') 
  }
}

helper.importAllModels()
