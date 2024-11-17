const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectDate ,mode} = req.body;
    const transactions = await transactionModel.find({
      userid: req.body.userid,
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectDate[0],
              $lte: selectDate[1],
            },
          }),
          ...(mode !== "all" && {type:mode}),
            
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    console.log(newTransaction);
    await newTransaction.save();
    res
      .status(201)
      .json({ success: true, message: "Transaction added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllTransactions, addTransaction };
