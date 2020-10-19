/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var shortid = require('shortid');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

var books = [];

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      return res.json(books.map(book => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      })))
    })
    
    .post(function (req, res){
      var title = req.body.title;

      let newBook = {
        _id: shortid.generate(),
        title,
        comments: []
      }

      books.push(newBook);

      console.log(books);

      return res.json(newBook);
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      books = [];
      res.send('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      return res.json(books.find(book => book._id === bookid));
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;

      books = books.map(book => {
        if (book._id === bookid) {
          book.comments.push(comment);
        }

        return book;
      });

      return res.json(books.find(book => book._id === bookid));
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      books = books.filter(book => book._id !== bookid);
      res.send('delete successful')
    });
  
};
