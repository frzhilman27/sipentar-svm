import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/warga');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-slate-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">SIPENTAR</h2>
        <p className="text-center text-slate-500 mb-6 italic text-sm">Sistem Pengaduan Warga Pintar</p>
        <input 
          type="email" placeholder="Email" required
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Masuk ke Sistem
        </button>
      </form>
    </div>
  );
}