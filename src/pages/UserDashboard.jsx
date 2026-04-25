import React, { useState } from 'react';
import { simulateSVMPrediction } from '../utils/svmLogic';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [laporan, setLaporan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const prediction = simulateSVMPrediction(laporan);
    const existingData = JSON.parse(localStorage.getItem('dataPengaduan')) || [];
    
    const newReport = {
      id: Date.now(),
      isi_laporan: laporan,
      lokasi: lokasi,
      prioritas: prediction.priority,
      color: prediction.color,
      tanggal: new Date().toLocaleString('id-ID'),
      status: 'Terkirim'
    };

    localStorage.setItem('dataPengaduan', JSON.stringify([newReport, ...existingData]));
    window.dispatchEvent(new Event('storage')); // Memicu update di tab lain

    setLaporan(''); setLokasi('');
    alert(`Laporan terkirim! SVM menetapkan prioritas: ${prediction.priority}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">SIPENTAR</h1>
          <ul className="space-y-4">
            <li className="p-2 bg-blue-800 rounded">Beranda</li>
            <li className="p-2 hover:bg-blue-800 rounded cursor-pointer">Pengaduan</li>
            <li className="p-2 hover:bg-blue-800 rounded cursor-pointer">Laporan Saya</li>
          </ul>
        </div>
        <button onClick={() => navigate('/login')} className="bg-red-500 p-2 rounded font-bold">Logout</button>
      </nav>

      <main className="flex-1 p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Sampaikan Keluhan Anda</h2>
          <p className="text-slate-500">Partisipasi Anda membangun kota yang lebih baik.</p>
        </header>

        <section className="bg-white p-8 rounded-xl shadow-sm border max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-slate-700 font-medium mb-2">Detail Masalah</label>
              <textarea 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4" required
                value={laporan} onChange={(e) => setLaporan(e.target.value)}
                placeholder="Deskripsikan masalah secara detail..."
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">Lokasi Kejadian</label>
              <input 
                type="text" className="w-full p-3 border rounded-lg outline-none" required
                value={lokasi} onChange={(e) => setLokasi(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition">
              Kirim Pengaduan
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}