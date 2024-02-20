// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './LoginForm.css'; // Import the CSS file for styling

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
      const token = response.data.token;
      // Save token to local storage
      localStorage.setItem('token', token);
      // Redirect user to home page
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    <h1 className='login-header'>Welcome to Byit! Login to proceed further</h1>
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="hint-container">
        <button className="hint-button">Hint</button>
        <div className="hint-content">
          <p>username: 'kminchelle',</p>
          <p>password: '0lelplR'</p>
        </div>
      </div>
    </div>
    </>
  );
}
export default LoginForm;
