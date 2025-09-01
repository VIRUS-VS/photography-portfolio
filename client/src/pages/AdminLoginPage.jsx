import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/admin/login',
        { email, password },
        config
      );

      // Save admin info to local storage
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-light text-center mb-6">Admin Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password"  className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;