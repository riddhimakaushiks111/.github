import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || formData.amount <= 0) {
      alert("Please enter valid details");
      return;
    }
    
    
    onAdd({ ...formData, amount: parseFloat(formData.amount), id: Date.now() });
    setFormData({ title: '', amount: '', type: 'expense', category: 'Food' });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input 
        type="text" 
        placeholder="Entry Title (e.g. Salary)" 
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
      />
      <select onChange={(e) => setFormData({...formData, type: e.target.value})}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default TransactionForm;