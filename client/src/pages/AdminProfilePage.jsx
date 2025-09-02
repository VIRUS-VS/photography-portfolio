import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminProfilePage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      try {
        const config = {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        };
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/profile`, { password }, config);
        localStorage.setItem('adminInfo', JSON.stringify(data));
        setMessage('Password updated successfully!');
      } catch (err) {
        setError('Failed to update password.');
      }
    }
  };

  return (
    <div className="pt-24 container mx-auto px-4 max-w-md">
      <Link to="/admin/dashboard" className="text-blue-400 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      <form onSubmit={submitHandler} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl text-center font-light mb-6">Update Profile</h1>
        {message && <p className="text-green-500 text-center text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">New Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-200" id="password" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm New Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-200" id="confirmPassword" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};
export default AdminProfilePage;
