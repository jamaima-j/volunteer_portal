import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'omarwabbouchi@gmail.com', password: 'omar' },
  ]);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userExists = registeredUsers.find(user => user.email === email);

    if (userExists) {
      setError('User already exists. Please login.');
      return;
    } else {
      const newUser = { email, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      setError('');
      console.log('Registered successfully');
      sendEmailNotification(email);
      navigate('/profile'); //replace with dashboard
    }
  };

  const sendEmailNotification = (email) => {
    //placeholder to simulate sending an email notification, will fix later with backend logic
    console.log(`Sending email notification to ${email}`);
    // another placeholder
  };

  return (
    <div>
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
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
