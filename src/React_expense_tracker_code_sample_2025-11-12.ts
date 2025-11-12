import React, { useState } from 'react';

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    onAddExpense(newExpense);
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required step="0.01" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.title} - ${expense.amount} - {expense.date.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;