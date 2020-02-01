const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
    title : {type: String},
    description : {type: String},
    author : {type: String},
    cover  : {type: String},
    price : {type: Number}
},{collection: constants.BookModel, autoIndex: true, timestamps: true});

mongoose.model(constants.BookModel, schema)