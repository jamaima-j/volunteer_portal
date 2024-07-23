// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      const user = response.data.user;

      setError('');
      console.log('Logged in successfully');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userAccountType', user.accountType);
      localStorage.setItem('userProfileComplete', user.profileComplete);

      if (user.accountType === 'admin') {
        navigate('/admin');
      } else if (user.profileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError('Invalid login. Please check your email and password.');
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
        <p className="register-link">Don't have an account? <a href="/register">Sign up here!</a></p>
      </div>
    </div>
  );
};

export default Login;
