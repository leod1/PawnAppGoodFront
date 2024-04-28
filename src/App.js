import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');  // Add email for registration
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(true); // Toggle between Login and Register

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        console.log('Login successful:', data);
      } else {
        setMessage('Login failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error: ' + error.toString());
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Include email
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful!');
        console.log('Registration successful:', data);
      } else {
        setMessage('Registration failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error: ' + error.toString());
    }
  };

  return (
    <div className="App">
      <h1>{showLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={showLogin ? handleLogin : handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!showLogin && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{showLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Need to register?' : 'Go to Login'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
