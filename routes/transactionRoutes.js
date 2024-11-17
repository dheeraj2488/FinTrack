const express = require("express");
const { addTransaction,getAllTransactions } = require("../controllers/transactionController");
const router = express.Router();

router.post('/add-transaction', addTransaction );
router.post('/get-transactions', getAllTransactions);



module.exports = router;
