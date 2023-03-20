import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Product from './Products/Product';
import Items from './Products/Products';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/login');
      return;
    }
    
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = Date.now();
      
      if (expirationTime < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        return;
      }
      
      navigate(`/profile/${userId}`);
      
    } catch (error) {
      console.error('Error parsing token:', error);
      navigate('/login');
    }
  }

  const handleCartOnclick = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = Date.now();
      
      if (expirationTime < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        return;
      }
      
      navigate(`/cart/${userId}`);
      
    } catch (error) {
      console.error('Error parsing token:', error);
      navigate('/login');
    }
  }

  return (
    <div>
      <h1>Welcome to the home page!</h1>
      <button onClick={handleProfileClick}>Profile</button>
      <button onClick={handleCartOnclick}>Cart</button>
      <div>
        <Link to='/login'>
          <FaSignInAlt /> Login
        </Link>
      </div>
      <div>
      {Items.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      </div>
    </div>
  )
}

export default Home;
