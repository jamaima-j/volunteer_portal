import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validationErrors = [];

    if (!email || !password) {
      validationErrors.push('Please fill in all fields.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      console.log('Response:', response.data);

      setErrors([]);
      console.log('Logged in successfully');
      localStorage.setItem('email', response.data.user.email); // store email in localStorage
      localStorage.setItem('accountType', response.data.user.accountType); // store account type in localStorage

      if (response.data.user.accountType === 'admin') {
        navigate('/admin');
      } else if (response.data.user.profileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setErrors(['Invalid email or password.']);
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
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;
