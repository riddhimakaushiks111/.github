import React, { useState, useMemo } from 'react';
import TransactionForm from './components/TransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Calculation Logic (Requirement: useMemo for efficiency)
  const totals = useMemo(() => {
    const inc = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { 
      income: inc, 
      expenses: exp, 
      balance: inc - exp,
      savingsPercent: inc > 0 ? ((inc - exp) / inc) * 100 : 0 
    };
  }, [transactions]);

  const addTransaction = (data) => setTransactions([...transactions, data]);
  
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>Finance Tracker</h1>
        {totals.expenses > 5000 && <p className="alert">⚠️ Budget Warning!</p>}
      </header>

      <div className="stats-grid">
        <div className="card">Income: ${totals.income}</div>
        <div className="card">Expenses: ${totals.expenses}</div>
        <div className="card">Balance: ${totals.balance}</div>
      </div>

      <TransactionForm onAdd={addTransaction} />

      <div className="list">
        {transactions.map(t => (
          <div key={t.id} className={`item ${t.type}`}>
            <span>{t.title}</span>
            <span>${t.amount}</span>
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};