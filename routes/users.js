var express = require('express');
var router = express.Router();
const authorization = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', checkAuth, function(req, res, next) {
  res.send('respond with a resource');
  });

router.post('/signup', authorization.signup);
router.post('/login', authorization.login);

module.exports = router;
