import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { register } from '../store/authSlice';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem', 
        padding: '1rem', 
        borderRadius: '8px', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
        margin: '0 auto',
        width: 'calc(100vw - 57px)'
      }}
    >
      <div style={{ width: '100%' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </div>
      <div style={{ width: '100%' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </div>
      <div style={{ width: '100%' }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </div>
      <button 
        type="submit" 
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#fff',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
