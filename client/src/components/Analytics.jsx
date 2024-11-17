import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];
  const totalTransaction = allTransaction.length;
  const totalIncome = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpense = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent = (totalIncome.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpense.length / totalTransaction) * 100;

  //total turnover

  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className=" flex  gap-10">
        {" "}
        <div class="block max-w-80 p-6 my-3 border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Transaction: {totalTransaction}
          </h5>
          <p class="font-normal  dark:text-gray-400">
            Income: {totalIncome.length}
          </p>
          <p class="font-normal  dark:text-gray-400">
            Expense: {totalExpense.length}
          </p>
          <div className="flex my-3 ">
            <Progress
              type="circle"
              strokeColor={"green"}
              className="mx-2 my-2"
              percent={totalIncomePercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor={"red"}
              className="mx-2"
              percent={totalExpensePercent.toFixed(0)}
            />
          </div>
        </div>
        <div class="block max-w-80 p-6 my-3 border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total TurnOver: {totalTurnover}
          </h5>
          <p class="font-normal  dark:text-gray-400">
            Income: {totalIncomeTurnover}
          </p>
          <p class="font-normal  dark:text-gray-400">
            Expense: {totalExpenseTurnover}
          </p>
          <div className="flex my-3 ">
            <Progress
              type="circle"
              strokeColor={"green"}
              className="mx-2 my-2"
              status="active"
              percent={totalIncomeTurnoverPercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor={"red"}
              className="mx-2"
              percent={totalExpenseTurnoverPercent.toFixed(0)}
            />
          </div>
        </div>
      </div>
      <div className="container flex gap-20">
        <div className="block max-w-80 p-6 my-3  text-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
          <h4 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white" >CategoryWise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.category === category &&
                  transaction.type === "income"
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="flex">
                  <h5>{category}:</h5>
                  <Progress
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="block max-w-80 p-6 my-3 border text-white border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
          <h4 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">CategoryWise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.category === category &&
                  transaction.type === "expense"
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="flex">
                  <h5>{category}:</h5>
                  <Progress
                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
