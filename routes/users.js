var express = require('express');
var router = express.Router();
const authorization = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', authorization.signup);
router.post('/login', authorization.login);

module.exports = router;
