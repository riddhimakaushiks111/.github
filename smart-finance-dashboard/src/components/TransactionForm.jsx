import React, { useState } from 'react';

const TransactionForm = ({ onAdd, editingTransaction, onUpdate }) => {
  const [formData, setFormData] = useState(editingTransaction || {
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || formData.amount <= 0) {
      alert("Please enter a valid title and amount.");
      return;
    }

    const transactionData = { 
      ...formData, 
      amount: parseFloat(formData.amount),
      id: editingTransaction ? editingTransaction.id : Date.now() 
    };

    if (editingTransaction) {
      onUpdate(transactionData);
    } else {
      onAdd(transactionData);
    }

    setFormData({ title: '', amount: '', type: 'expense', category: 'Food' });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
      
      <div className="input-group">
        <label>Title</label>
        <input 
          type="text" 
          placeholder="e.g., Grocery" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div className="input-group">
        <label>Amount</label>
        <input 
          type="number" 
          placeholder="0.00" 
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
        />
      </div>

      <div className="input-group">
        <label>Type</label>
        <select 
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="input-group">
        <label>Category</label>
        <select 
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {editingTransaction ? 'Save Changes' : 'Add Entry'}
      </button>
    </form>
  );
};

export default TransactionForm;