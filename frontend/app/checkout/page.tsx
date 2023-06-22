'use client';

import { useState } from 'react';
import Link from 'next/link';
import { nextApi } from '@/config';
import ShoppingCart from '@/app/utils/shoppingCart';
import Orders from '@/app/utils/orders';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [card, setCard] = useState('');
  const [loading, setLoading] = useState(false);

  const cart = ShoppingCart.getInstance();
  const orders = new Orders();

  const handleSubmit = () => {
    const items = cart.getCart();
    const sum = cart.calculateCartTotal();
    const data = { name, email, address, city, zip, card, sum, cart: items };
    setLoading(true);
    fetch(`${nextApi}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const result = await res.json();
      if (result.status === 'success') {
        orders.add(result.order.id);
        setName('');
        setEmail('');
        setAddress('');
        setCity('');
        setZip('');
        setCard('');
        cart.empty();
        setLoading(false);
        window.location.replace(`/orders`);
      } else {
        setLoading(false);
        alert('The payment was not successful. Please try again.');
      }
    });
  };

  if (cart.isEmpty()) {
    return (
      <>
        <h3>Checkout</h3>
        <article>
          <p className="center">Your cart is empty.</p>
          <div className="center">
            <Link href="/" role="button">
              Start shopping
            </Link>
          </div>
        </article>
      </>
    );
  }

  return (
    <>
      <h3>Checkout</h3>
      <article>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <h4>Personal details</h4>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <h4>Shipping Address</h4>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
          <label htmlFor="zip">Zip</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            required
          />
          <h4>Payment details</h4>
          <label htmlFor="card">Card</label>
          <input
            type="text"
            name="card"
            id="card"
            placeholder="4242424242424242"
            value={card}
            onChange={(event) => setCard(event.target.value)}
            required
          />
          {loading && <progress />}
          <button type="submit">Pay and Checkout</button>
        </form>
      </article>
    </>
  );
}
