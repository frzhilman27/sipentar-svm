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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px] border border-white/20 relative overflow-hidden">
        {/* Dekorasi lingkaran di pojok */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-50 blur-2xl"></div>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-4 shadow-lg shadow-blue-500/30 font-bold text-2xl">
            SP
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">SIPENTAR</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Sistem Pengaduan Warga Pintar</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Email</label>
            <input 
              type="email" placeholder="Contoh: warga@desa.com" required
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi</label>
            <input 
              type="password" placeholder="Masukkan sandi apa saja" required
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
            Masuk ke Sistem
          </button>
        </form>
      </div>
    </div>
  );
}