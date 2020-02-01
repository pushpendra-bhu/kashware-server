const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const BookModel = mongoose.model(constants.BookModel)
const UserModel = mongoose.model(constants.UserModel)
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const BookService = {
    /**
     * @param {title, description, auther, cover, price, username} data 
     */
    publishBook: async function(data) {

       const userDetials = await UserModel.findOne({username: data.username})
       console.log(userDetials);
       const bookModel = new BookModel()

       bookModel.title = data.title
       bookModel.description = data.description
       bookModel.author = userDetials.author
       bookModel.cover = data.cover
       bookModel.price = data.price

       return await bookModel.save()
    },
    /**
     * @param {offset, limit} data 
     */
    getAllPublishedBooks: async function(data){
        const offset = data.offset ? parseInt(data.offset) : 0
        const limit = data.limit ? parseInt(data.limit) : 100
        return BookModel.find({}).skip(offset).limit(limit)
    },
    /**
     * @param {bookId} data 
     */
    getPublishedBook: async function(data) {
        if(mongoose.Types.ObjectId.isValid(data.bookId)) {
            return BookModel.findOne({_id: data.bookId})
        } else {
            throw Error()
        }
    },
    /**
     * @param {title} data 
     */
    searchBookByTitle: async function(title) {
      return BookModel.find({title: new RegExp(title, 'i')})
    },
    /**
     * @param {username} data 
     */
    getAuthersPublishedBook: async function(data) {
      if(data.username) {
       const userDetials = await UserModel.findOne({username: data.username})
       return BookModel.find({author: userDetials.auther})   
      } else {
          throw Error()
      }
    },
    /**
     * @param {username} data 
     */
    unpublishBooks: async function(data) {
        if(data.username) {
            const userDetials = await UserModel.findOne({username: data.username})
            return BookModel.deleteMany({author: 'Pushpendra Kumar'})
        } else {
            throw Error()
        }
    }
}

module.exports = BookService