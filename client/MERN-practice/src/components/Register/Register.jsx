import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showRed, setShowRed] = useState(false);

    const handleNameChange = (event) => {
      setName(event.target.value);
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
      setShowRed(false);
      setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password == confirmPassword) {
          const response = await fetch("http://localhost:8082/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (response.status === 200) {
            const { message, user } = await response.json();
            navigate(`/profile/${user}`);
          } else {
            const { message } = await response.json();
            setError(message);
          }
        } else {
          setShowRed(true);
          setPasswordMatch(false);
        }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} style={{ borderColor: showRed ? 'red' : 'initial' }} />
          {showRed ? <p style={{ color: 'red' }}>Passwords do not match</p> : null}
        </div>
        <button type="submit">Register</button>
      </form>
    );
    
}

export default Register;