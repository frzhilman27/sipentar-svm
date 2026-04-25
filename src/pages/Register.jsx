import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Di sini kita bisa simpan data ke Local Storage jika mau
    alert(`Pendaftaran warga berhasil atas nama: ${nama}. Silakan masuk (Login)!`);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px] border border-white/20 relative overflow-hidden">
        
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">Daftar Warga Baru</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Bergabung dengan SIPENTAR</p>
        </div>

        <form onSubmit={handleRegister} className="relative z-10 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" placeholder="Masukkan nama Anda" required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setNama(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
            <input 
              type="number" placeholder="Masukkan 16 digit NIK" required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Email</label>
            <input 
              type="email" placeholder="Contoh: warga@desa.com" required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi Baru</label>
            <input 
              type="password" placeholder="Buat kata sandi" required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-xl font-bold shadow-lg transition-all mt-4">
            Daftarkan Akun
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600 relative z-10">
          Sudah punya akun?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 font-bold cursor-pointer hover:underline">
            Masuk di sini
          </span>
        </p>
      </div>
    </div>
  );
}