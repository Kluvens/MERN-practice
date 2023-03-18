import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Cart = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/users/cart/${id}`);
        const data = await response.json();
        setCartItems(data.items);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, [id, navigate]);

  const handleIncrement = async (item) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch("http://localhost:8082/api/users/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          userId: id,
          itemName: item.name,
          itemDescription: item.description,
          itemPrice: item.price
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setCartItems(data.items);
        setTotal(data.total);
      } else {
        console.log(userId);
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  }

  const handleDecrement = async (item) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (item.quantity == 1) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/users/removeFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          userId: id,
          itemName: item.name,
          itemDescription: item.description,
          itemPrice: item.price
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setCartItems(data.items);
        setTotal(data.total);
      } else {
        console.log(userId);
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  }

  const handleDelete = async (item) => {
    try {
      const response = await fetch("http://localhost:8082/api/users/deleteFromCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          userId: id,
          itemName: item.name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items);
        setTotal(data.total);
      } else {
        setError("Error");
      }
    } catch (error) {
      setError("An error happened");
    }
  }

  return (
    <div>
        <h1>Welcome to my cart</h1>
        {cartItems.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => handleIncrement(item)}>+</button>
            <button onClick={() => handleDecrement(item)}>-</button>
            <button onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ))}
        <div>
          Total price: {total}
        </div>
    </div>
  )
}

export default Cart;
