var express = require('express');
var router = express.Router();
const transactionsController = require('../controllers/transactions');
const checkAuth = require('../middleware/check-auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/transactions', checkAuth, transactionsController.add);
router.get('/transactions', checkAuth, transactionsController.get);


module.exports = router;
