/**
 * Register all model and bind with mongoDB connection
 */
require('./Connection/MongoConnection')
const express = require('express')
const fs = require('fs')
const port = 8000
const app = express()
const bodyParser = require('body-parser')

const authentication = require('./Middleware/Authentication')
const userController = require('./src/user/userController')
const bookController = require('./src/book/bookController')

app.use(bodyParser.urlencoded({extended:true,}))
app.use(bodyParser.json({
    limit: '100mb'
}))

app.get('/', function(request, response){
    response.sendFile(__dirname+'/index.html')
})

app.post('/api/v1/auther/create', userController.createAuther)
app.post('/api/v1/authenticate', userController.authenticate)
app.post('/api/v1/publish-books', authentication.isAutherised, bookController.publishBook)
app.get('/api/v1/list-all-books', bookController.getAllPublishedBooks)
app.get('/api/v1/book/:bookId', bookController.getPublishedBook)
app.get('/api/v1/book/title/:title', bookController.searchBookByTitle)
app.get('/api/v1/auther/publish-books', authentication.isAutherised, bookController.getAuthersPublishedBook)
app.delete('/api/v1/auther/unpublish-books', authentication.isAutherised, bookController.unpublishBooks)

app.listen(port, function(req, res){
    console.log('Server is running on port no.', port)
})