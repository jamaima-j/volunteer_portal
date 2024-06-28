import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //hard-coded temporary valid login credentials, will change later on
  const validCredentials = [
    { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin' },
    { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer'}
  ];

  const handleLogin = () => {
    const user = validCredentials.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError('Invalid login. Please check your email and password.');
    } else {
      setError('');
      console.log('Logged in successfully');
      if (user.accountType === 'admin') {
        navigate('/admin');
      } else if (user.profileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
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
        <p>Don't have an account? <a href="/register">Sign up here!</a></p>
      </div>
    </div>
  );
};

export default Login;
