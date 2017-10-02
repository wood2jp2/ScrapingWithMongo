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
  // mongoose.promise = Promise,
  db = mongoose.connection;

  mongoose.promise = Promise;

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
    Article.find({}, function(err, doc){
      if (err) {
        console.log(err)
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
      $('div.u-flexColumnTop').each(function(i, element) {
        var result = {};
        result.headline = $(this).find('h3').text();
        result.url = $(this).children('a').attr('href');
        result.summary = $(this).find('h4').text();

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
