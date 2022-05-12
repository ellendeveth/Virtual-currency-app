var express = require('express');
var router = express.Router();
const authorization = require('../controllers/auth');
const users = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// get all users
router.get('/', checkAuth, users.getUser);
// get user amount
router.get('/amount', checkAuth, users.getAmount);

router.post('/test', checkAuth, function(req, res, next) {
  res.send('respond with a resource');
  });

router.post('/signup', authorization.signup);
router.post('/login', authorization.login);

module.exports = router;
