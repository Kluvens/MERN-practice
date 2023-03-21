import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setError('');
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setError('');
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8082/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        const { user, token } = await response.json();
        localStorage.setItem('token', token); // Save JWT token to local storage
        localStorage.setItem('userId', user.id);
        navigate(`/profile/${user.id}`);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* display error message in red */}
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;
