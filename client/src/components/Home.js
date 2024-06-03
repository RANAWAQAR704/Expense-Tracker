// src/components/Home.js
import React from 'react';
import AddExpense from './AddExpense';
import AddIncome from './AddIncome';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <div>
        <h3>Add Expense</h3>
        <AddExpense />
      </div>
      <div>
        <h3>Add Income</h3>
        <AddIncome />
      </div>
    </div>
  );
};

export default Home;
