var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Successfully connected to the server :)\n');
});

module.exports = router;
