import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'omarwabbouchi@gmail.com', password: 'omar', accountType: 'admin' }, //hardcoded in for now
  ]);
  const navigate = useNavigate();

  const handleRegister = () => {
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

    const userExists = registeredUsers.find(user => user.email === email);

    if (userExists) {
      validationErrors.push('User already exists. Please login.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const newUser = { email, password, accountType: 'volunteer', profileComplete: false };
      setRegisteredUsers([...registeredUsers, newUser]);
      setErrors([]);
      console.log('Registered successfully');
      sendEmailNotification(email);
      navigate('/profile');
    }


  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //use regex to check to make sure email is valid and contains an '@' and a '.'
    return emailRegex.test(email);
  };

  const sendEmailNotification = (email) => {
    console.log(`Sending email notification to ${email}`); //temporary, will fix with backend services when we get there
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
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
