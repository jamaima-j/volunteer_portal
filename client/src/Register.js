import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validationErrors = [];

    if (!email || !password || !confirmPassword) {
      validationErrors.push('Please fill in all fields.');
    }

    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match.');
    }

    if (!validateEmail(email)) {
      validationErrors.push('Please enter a valid email address.');
    }

    if (password.length < 8) {
      validationErrors.push('Password must be at least 8 characters long.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/auth/register', { email, password, accountType: 'volunteer' }); //also running on 5001 bc my computer won't run on 5000

      setErrors([]);
      console.log('Registered successfully');
      navigate('/profile');
    } catch (err) {
      setErrors(['User already exists. Please login.']);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //email validation regex, checks for @ and . in email
    return emailRegex.test(email);
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Register</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <p>Already have an account? <a href="/">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
