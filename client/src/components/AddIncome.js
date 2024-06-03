// src/components/AddExpense.js
import React, { useState } from 'react';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding expense logic here
    console.log('Expense added:', { amount, description });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;

