import React, { useState } from 'react';

const Product = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Send POST request to add product to cart
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: quantity
        })
      });
      const data = await res.json();
      addToCart(data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
