var collection;

/*
MongoClient.connect(url, function (err, db) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    else {
        console.log("Connected succesfully to server");
        collection = db.collection('books'); // to moze trwac i collection moze byc undefined! -> solution: promises
    }
});
*/

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mymongodb';

var collection = MongoClient.connect(url, {
  db: { bufferMaxEntries: 0 }
}).then(function(db) {
  return db.collection('books');
}).catch(function(err) {
  console.error(err);
  process.exit(1);
});


module.exports = {

  stockUp: function (isbn, count) {
    return collection.
      then(function(collection) {
        return collection.updateOne({isbn: isbn}, {
          isbn: isbn,
          count: count
        }, {upsert: true});
    });
  },

  findAll: function () {
      return collection.then(function(collection) {
        return collection.find({}).toArray();
    });
  },

  getCount: function(isbn) {
      return collection.then(function(collection) {
        return collection.find({"isbn": isbn}).limit(1).next();
      }).then(function(result) {
        if (result) {
          res.format({
            'text/html': function () {
              res.send('<div>Copies left: ' + result + '</div>');
            },
            'default': function () {
              res.send({count: result});
            }
          });
        } else {
          next();
        }
      });
  }
};

