
module.exports = function(stockRepository) {

  return {
    findAll: function(req, res, next) {
      console.log('findAll...');
      stockRepository.
        findAll().
        then(function(results) {
          console.log('Results: ', results);
          res.json(results);
        }).catch(next);
    },

    getCount: function (req, res, next) {
    console.log('getCount by ISBN...');
    stockRepository.
      getCount(req.params.isbn).
      then(function (result) {
        if (result) {
          res.json({count: result});
        } else {
          next();
        }
      }).
      catch(next);
    },

    stockUp: function (req, res, next) {
      console.log('stockUp...');
      stockRepository.
        stockUp(req.body.isbn, req.body.count).
        then(function() {
          res.json({isbn: req.body.isbn, count: req.body.count});
        }).catch(next);
    },

    hello:  function (req, res) {
      //throw new Error('ERROR');
      res.send('Hello World Express! ' + process.env.NODE_ENV);
    }

  };
};

