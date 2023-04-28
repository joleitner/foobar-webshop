'use client';

import { useState } from 'react';
import { api } from '@/config';

export default function AdminArticlesPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    console.log('test');
    const data = { name, description, price };
    fetch(`${api}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h3>Add new article</h3>
      <article>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="€"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <button type="submit" className="cont">
            Add
          </button>
        </form>
      </article>
    </>
  );
}
