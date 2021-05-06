var express = require('express');
var router = express.Router();

/* POST ip reputation. */
router.post('/query', function(req, res, next) {
  res.render('index', { title: 'query' });
});

module.exports = router;
