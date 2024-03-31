// frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3000/signup', { username, password });
      alert('User created successfully');
    } catch (error) {
      alert('An error occurred during sign-up');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setToken(response.data.token);
      alert('Logged in successfully');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Authentication Demo</h1>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
      </div>
      {token && <div><strong>Token:</strong> {token}</div>}
    </div>
  );
}

export default App;
