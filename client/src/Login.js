import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //hard-coded temporary valid login credentials 
  const validCredentials = [
    { email: 'omarwabbouchi@gmail.com', password: 'omar' },
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
      //will route to dashboard
      navigate('/dashboard'); //need to create dashboard/route component?
    }
  };

  return (
    <div>
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
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
