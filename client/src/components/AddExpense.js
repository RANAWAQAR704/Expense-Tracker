// src/components/AddIncome.js
import React, { useState } from 'react';

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding income logic here
    console.log('Income added:', { amount, description });
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
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncome;
 
