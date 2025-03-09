const express = require("express");
const { addTransaction,getAllTransactions, editTransaction ,deleteTransaction } = require("../controllers/transactionController");
const router = express.Router();

router.post('/add-transaction', addTransaction );
router.post('/edit-transaction', editTransaction );
router.post('/delete-transaction', deleteTransaction );
router.post('/get-transactions', getAllTransactions);



module.exports = router;
