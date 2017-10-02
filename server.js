const
  express = require('express'),
  hbs = require('express-handlebars'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  request = require('request'),
  cheerio = require('cheerio'),

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
    res.send('HELLLLLOOOOOOO')
  });

  app.listen(5000, function() {
    console.log('App running on port 5000')
  });
