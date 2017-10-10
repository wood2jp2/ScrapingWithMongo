const
  // six required packages
  express = require('express'),
  hbs = require('express-handlebars'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  request = require('request'),
  cheerio = require('cheerio'),
  localServer = "mongodb://localhost:27017/ScrapingWithMongoTest57",
  MONGODB_URI = 'mongodb://heroku_m5fhgc0k:4t1sk8ucn0ulht5v7893pdpol7@ds155674.mlab.com:55674/heroku_m5fhgc0k',

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

// test scraping link, from what I understand, this temporarily hosts your
mongoose.connect(localServer, {
  useMongoClient: true
});

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
  Article.find({
    'saved': false
  }, function(err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.json(doc)
    }
  });
});

app.get('/saved', function(req, res) {
  Article.find({
    'saved': true
  }, function(err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.json(doc)
    }
  });
});

app.get('/articles/:id', function(req, res) {
  Article.findOne({
      '_id': req.params.id
    })
    .populate('note')
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    })
});

app.delete('/articles/:id', function(req, res) {
  console.log(req.params);
  Note.findByIdAndRemove({
      '_id': req.params.id
    })
    .exec(function(err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.send(doc);
      }
    });

});

// app.post('/articles/:id', function(req, res) {
//   var newNote = new Note(req.body);
//   console.log(req);
//   newNote.save(function(error, doc) {
//     if (error) {
//       console.log(error)
//     } else {
//       Article.findOneAndUpdate({
//           '_id': req.params.id
//         }, {
//           'note': doc._id
//         })
//         .exec(function(err, doc) {
//           if (err) {
//             console.log(err)
//           } else {
//             res.send(doc);
//           }
//         })
//     }
//   })
// });

app.post('/articles/:id', function(req, res) {
  var newNote = new Note(req.body);
  newNote.save(function(error, doc) {
    if (error) {
      console.log(error)
    } else {
      Article.findByIdAndUpdate(
          req.params.id, {
            $push: {
              'note': doc._id
            }
          })
        .exec(function(err, doc) {
          if (err) {
            console.log(err)
          } else {
            res.send(doc);
          }
        })
    }
  })
});

app.put('/articles/:id', function(req, res) {
  if (req.body.saved) {
    Article.findOneAndUpdate({
        '_id': req.params.id
      }, {
        'saved': req.body.saved
      })
      .exec(function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          res.send(doc)
        }
      });
  } else {
    Note.findOneAndUpdate({
        '_id': req.params.id
      }, {
        'body': 'something'
      })
      .exec(function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          res.send(doc)
        }
      })
  }

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
