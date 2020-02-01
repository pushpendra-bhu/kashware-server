const userService = require('./userService')
const JWT = require('jsonwebtoken')
const secretKey = 'kashware'
const redisClient = require('../../Redis/redisConnection')

const User = {
        /**
         * @param {*} request 
         * @param {*} response 
         */
        getAutherList: async function(request, response) {
            const data = await userService.getUsersList(usersList)
            response.status(200).send(data)
        },
        /**
         * @param {username, password, auther,pseudonym } request 
         * @param {*} response 
         */
        createAuther: async function(request, response) {
            const data = request.body
            /**
             * Level one check auther should have atleast username && password
             */
            if(data.username && data.password) {
                const message = await userService.createUser(request.body)
                response.status(200).send({succes: true, message})
            } else {
                response.status(500).send(j)
            }
        },
        /**
         * @param {username, password} request
         * @param {JWT} response
         */
        authenticate: async function(request, response, next) {
            const username = request.body.username
            const password = request.body.password
            /**
             * For authentication user should have pass username && password
             */
            if(username && password) {
                const isAutherAvailable = await userService.isAutherAavailable(username)
                if(isAutherAvailable) {
                    const token = JWT.sign({username: username, password: password}, secretKey)
                    // Store token into redis for authentication
                    redisClient.set(token, username)
                    response.status(200).send({succes: true, data: {token}})
                } else {
                    response.status(401).send({succes: false, message: 'Auther not available' })
                }
            } else {
                response.status(500).send({succes: false, message: "Somthing went wrong"})
            }
        }
}
module.exports = User