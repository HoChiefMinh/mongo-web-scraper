//Bring in our scrape and date scripts
const scrape = require('../scripts/scrape');
const makeDate = require('../scripts/date');

// Bring in the Headline and Note mongoose models
let Headline = require('../models/Headlines');
let Notes = require('../models/Note');

module.exports = {
  fetch: function(cb) {
    scrape(function(data) {
      let articles = data;
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }
      Headline.collection.insertMany(articles, { ordered: false }, function(
        err,
        docs
      ) {
        cb(err, docs);
      });
    });
  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  update: function(query, cb) {
    Headline.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      cb
    );
  }
};
