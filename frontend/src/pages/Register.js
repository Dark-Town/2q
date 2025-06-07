import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://twoq.onrender.com/api/users/register', { username, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch(err) {
      alert('Error registering user');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br /><br />
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <button type='submit'>Register</button>
      </form>
      <p>Already have an account? <a href='/'>Login</a></p>
    </div>
  );
}

export default Register;
