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

  mongoose.connect('mongodb://heroku_m5fhgc0k:4t1sk8ucn0ulht5v7893pdpol7@ds155674.mlab.com:55674/heroku_m5fhgc0k');

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
    console.log('asdfasd');
    request('https://medium.com/topic/technology', function(err, res, html) {

      // shorthand selector for elements on webpage being scraped
      const $ = cheerio.load(html);
      $('u-borderBox').each(function(i, element) {
        var result = {};
        result.headline = $(this).children('div div a h3').text();
        result.url = $(this).children('div div a').attr('href');
        result.summary = $(this).children('div div a h4').text();

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
    console.log(result.url);
  });
