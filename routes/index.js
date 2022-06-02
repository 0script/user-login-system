var express = require('express');
var router = express.Router();
const {check,validationResult}=require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members' });
});

module.exports = router;
