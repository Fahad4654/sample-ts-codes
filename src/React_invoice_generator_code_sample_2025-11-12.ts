import React, { useState } from 'react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

function App() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Item 1', quantity: 2, price: 10 },
    { id: '2', description: 'Item 2', quantity: 1, price: 20 },
  ]);

  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const addItem = () => {
    setItems([...items, { id: String(Date.now()), description: newItemDescription, quantity: newItemQuantity, price: newItemPrice }]);
    setNewItemDescription('');
    setNewItemQuantity(1);
    setNewItemPrice(0);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  return (
    <div>
      <h1>Invoice Generator</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
              <td><button onClick={() => removeItem(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <input type="text" placeholder="Description" value={newItemDescription} onChange={e => setNewItemDescription(e.target.value)} />
        <input type="number" placeholder="Quantity" value={newItemQuantity} onChange={e => setNewItemQuantity(parseInt(e.target.value))} />
        <input type="number" placeholder="Price" value={newItemPrice} onChange={e => setNewItemPrice(parseFloat(e.target.value))} />
        <button onClick={addItem}>Add Item</button>
      </div>

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default App;