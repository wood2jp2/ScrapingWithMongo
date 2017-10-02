const
// six required packages
  express = require('express'),
  hbs = require('express-handlebars'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  request = require('request'),
  cheerio = require('cheerio'),

// schema models for comments (notes) and each article
  Note = require('./models/Note.js'),
  Article = require('./models/Article.js'),

  app = express(),

  db = mongoose.connection;

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(express.static("public"));

  mongoose.connect("mongodb://localhost:27017/ScrapingWithMongoTest");

  db.on('error', function(err) {
    console.log('Database Error:', err)
  });

  db.once('open', function() {
    console.log('Mongoose connection successful')
  });

  app.get('/', function(req, res) {
    res.send('HELLLLLOOOOOOO');
  });

  app.get('/articles', function(req, res) {
    console.log(Article);
    Article.find({}, function(err, doc){
      if (error) {
        console.log(error)
      } else {
        res.json(doc)
      }
    });
  });

  app.listen(5000, function() {
    console.log('App running on port 5000')
  });

  app.get('/scrape', function(req, res) {
    request('https://medium.com/topic/technology', function(err, res, html) {

      // shorthand selector for elements on webpage being scraped
      const $ = cheerio.load(html);
      $('a').each(function(i, element) {
        var result = {};
        result.headline = $(this).children('h3').text();
        result.url = $(this).attr('href');
        result.summary = $(this).children('h4').text();
        
        var entry = new Article(result);

        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });

      });
    });
    res.send('scrape complete');
  });
