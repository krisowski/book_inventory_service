
module.exports = {

  logger: function(req, res, next) {
    console.log('New request at ' + new Date());
    next();
  },

  clientErrorHandler: function(req, res, next) {
    console.error("CLIENT ERROR HANDLER");
    res.status(400).send("Link doesn't exist");
  },

  serverErrorHandler: function(err, req, res, next) {
    console.error("SERVER ERROR HANDLER");
    console.error(err.stack);
    res.status(500).send('Something broke');
  }
};

