import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8080/api/expenses';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', date: '', category: 'Food' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ title: '', amount: '', date: '', category: 'Food' });
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Expense Tracker Dashboard</h2>
      <div style={{ padding: '15px', background: '#f4f4f4', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Total Spent: ${totalAmount.toFixed(2)}</h3>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transport">Transport</option>
        </select>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none' }}>Add Expense</button>
      </form>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>{exp.category}</td>
              <td>${exp.amount}</td>
              <td>{exp.date}</td>
              <td>
                <button onClick={() => handleDelete(exp.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
