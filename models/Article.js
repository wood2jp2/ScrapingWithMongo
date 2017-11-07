const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String
  },
  summary: {
    type: String
  },
  url: {
    type: String
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  saved: {
    type: Boolean,
    default: false
  }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
