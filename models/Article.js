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
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
    }
})

var Article = mongoose.model('Article', ArticleSchema);

module.exports = ArticleSchema;