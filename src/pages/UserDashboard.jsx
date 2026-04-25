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
      tanggal: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Terkirim'
    };

    localStorage.setItem('dataPengaduan', JSON.stringify([newReport, ...existingData]));
    window.dispatchEvent(new Event('storage'));

    setLaporan(''); setLokasi('');
    alert(`Laporan terkirim! SVM menetapkan prioritas: ${prediction.priority}`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar modern */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex shadow-sm z-10">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SP</div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">SIPENTAR</h1>
          </div>
          <ul className="space-y-2">
            <li className="p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold cursor-pointer border border-blue-100">Buat Pengaduan</li>
            <li className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer transition-colors">Laporan Saya</li>
          </ul>
        </div>
        <button onClick={() => navigate('/login')} className="w-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 p-3 rounded-xl font-semibold transition-colors border border-slate-200">
          Keluar
        </button>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-8 border-b border-slate-200 shadow-sm sticky top-0 z-0">
          <h2 className="text-2xl font-bold text-slate-800">Sampaikan Keluhan Anda</h2>
          <p className="text-slate-500 mt-1">Partisipasi Anda membangun kota pintar yang lebih baik.</p>
        </header>

        <div className="p-8 max-w-3xl">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2">Detail Masalah</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                  rows="5" required
                  value={laporan} onChange={(e) => setLaporan(e.target.value)}
                  placeholder="Ceritakan dengan detail. Contoh: Terdapat lubang besar dan jalan amblas di pertigaan lampu merah yang menyebabkan macet..."
                ></textarea>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Lokasi Kejadian</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required
                  value={lokasi} onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Nama jalan atau patokan lokasi"
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all w-full md:w-auto hover:-translate-y-0.5">
                Kirim Pengaduan Sekarang
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}