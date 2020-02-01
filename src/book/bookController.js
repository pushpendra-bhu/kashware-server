const bookService = require('./bookService')

const Book = {
    /**
     * @param {*} request 
     * @param {*} response 
     */
    publishBook: async function(request, response) {
      const data = request.body
      try {
          const dataObj = await bookService.publishBook(data)
          response.status(200).send({success: true, data: dataObj})
      } catch (error) {
        console.log(error)
        response.status(500).send({success: false, message: "Something went wrong!"})
      }
    },
    /**
     * @param {*} request 
     * @param {*} response 
     */
    getAllPublishedBooks: async function(request, response) {
        const data = request.query
        try {
            const dataObj = await bookService.getAllPublishedBooks(data)
            response.status(200).send({success: true, data: dataObj})
        } catch (error) {
            console.log(error)
            response.status(500).send({success: false, message: "Something went wrong!"})
        }
    },
    /**
     * @param {*} request 
     * @param {*} response 
     */
    getPublishedBook: async function(request, response) {
        const bookId = request.params.bookId
        try {
          const dataObj = await bookService.getPublishedBook({bookId})  
          response.status(200).send({success: true, data: dataObj})   
        } catch (error) {
          console.log(error)
          response.status(500).send({success: false, message: "Something went wrong!"})
        }
    },
    /**
     * @param {title} request 
     * @param {*} response 
     */
    searchBookByTitle: async function(request, response) {
        const bookTitle = request.params.title
        try {
          const dataObj = await bookService.searchBookByTitle(bookTitle)  
          response.status(200).send({success: true, data: dataObj})   
        } catch (error) {
          console.log(error)
          response.status(500).send({success: false, message: "Something went wrong!"})
        }
    },
    /**
     * @param {username} request 
     * @param {*} response 
     */
    getAuthersPublishedBook: async function(request, response) {
        const data = request.body
        try {
          const dataObj = await bookService.getAuthersPublishedBook(data)
          response.status(200).send({success: true, data: dataObj})   
        } catch (error) {
          console.log(error)
          response.status(500).send({success: false, message: "Something went wrong!"})
        }
    },
    /**
     * @param {username} request 
     * @param {*} response 
     */
    unpublishBooks: async function(request, response) {
        const data = request.body
        try {
          const dataObj = await bookService.unpublishBooks(data)
          response.status(200).send({success: true, message: "Your all books has been unpublished"})
        } catch (error) {
          console.log(error)
          response.status(500).send({success: false, message: "Something went wrong!"})
        }
    }
}

module.exports = Book