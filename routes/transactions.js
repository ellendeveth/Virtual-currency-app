var express = require('express');
var router = express.Router();
const transactionsController = require('../controllers/transactions');
const checkAuth = require('../middleware/check-auth');

//add transaction
router.post('/', checkAuth, transactionsController.add);
//get all transactions
router.get('/', checkAuth, transactionsController.getAll);
//get transaction by id
router.get('/:id', checkAuth, transactionsController.getById);
//show per user coins
//router.get('/leaderboard', checkAuth, transactionsController.getByUser);


module.exports = router;
