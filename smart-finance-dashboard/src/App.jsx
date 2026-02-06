import React, { useState, useMemo } from 'react';
import TransactionForm from './components/TransactionForm';

const App = () => {

  const [transactions, setTransactions] = useState([]);
  

  const [editingTransaction, setEditingTransaction] = useState(null);


  const BUDGET_LIMIT = 5000;


  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expenses;
    
    
    const savingsPercent = income > 0 ? (balance / income) * 100 : 0;

    return { income, expenses, balance, savingsPercent };
  }, [transactions]); 


  const categorySummary = useMemo(() => {
    const summary = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      summary[t.category] = (summary[t.category] || 0) + t.amount;
    });
    return summary;
  }, [transactions]);

  
  const highestCategory = useMemo(() => {
    const categories = Object.keys(categorySummary);
    if (categories.length === 0) return "None";
    return categories.reduce((a, b) => categorySummary[a] > categorySummary[b] ? a : b);
  }, [categorySummary]);


  
  const addTransaction = (item) => {
    setTransactions([...transactions, item]);
  };

  const updateTransaction = (updatedItem) => {
    setTransactions(transactions.map(t => t.id === updatedItem.id ? updatedItem : t));
    setEditingTransaction(null); 
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };


  return (
    <div className="container">
      <header>
        <h1>Smart Finance Dashboard</h1>
        {totals.expenses > BUDGET_LIMIT && (
          <div className="alert-banner">
            BUDGET ALERT: You've spent more than ${BUDGET_LIMIT}!
          </div>
        )}
      </header>


      <div className="stats-grid">
        <div className="card">
          <h3>Income</h3>
          <p className="income-text">${totals.income.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Expenses</h3>
          <p className="expense-text">${totals.expenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Balance</h3>
          <p><strong>${totals.balance.toFixed(2)}</strong></p>
        </div>
        <div className="card">
          <h3>Savings</h3>
          <p>{totals.savingsPercent.toFixed(1)}%</p>
        </div>
      </div>

      <div className="main-layout">
        <TransactionForm 
          key={editingTransaction ? editingTransaction.id : 'new'}
          onAdd={addTransaction} 
          onUpdate={updateTransaction} 
          editingTransaction={editingTransaction} 
        />

        <div className="data-display">
          <div className="analysis-box">
            <h3>Insights</h3>
            <p>Top Spending Category: <strong>{highestCategory}</strong></p>
          </div>

          <h3>Transaction History</h3>
          <div className="transaction-list">
            {transactions.length === 0 && <p>No transactions yet.</p>}
            {transactions.map(t => (
              <div key={t.id} className={`list-item ${t.type}`}>
                <div>
                  <strong>{t.title}</strong>
                  <div className="category-tag">{t.category}</div>
                </div>
                <div className="item-actions">
                  <span className="amount-display">
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                  <button onClick={() => setEditingTransaction(t)}>Edit</button>
                  <button className="del-btn" onClick={() => deleteTransaction(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;