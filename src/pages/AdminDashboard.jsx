import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem('dataPengaduan')) || [];
    setReports(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar Admin Gelap */}
      <aside className="w-72 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shadow-xl z-10">
        <div>
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">A</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">COMMAND CENTER</h1>
              <p className="text-xs text-indigo-400 font-medium">SIPENTAR Admin</p>
            </div>
          </div>
          <ul className="space-y-2">
            <li className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl font-semibold border border-indigo-500/20">Laporan Masuk</li>
            <li className="p-3 hover:bg-slate-800 rounded-xl font-medium cursor-pointer transition-colors">Kelola Warga</li>
          </ul>
        </div>
        <button onClick={() => navigate('/login')} className="bg-slate-800 hover:bg-red-500 hover:text-white p-3 rounded-xl font-bold transition-colors text-slate-400">
          Keluar Sistem
        </button>
      </aside>

      {/* Konten Utama Admin */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-8 border-b border-slate-200 shadow-sm flex justify-between items-center sticky top-0 z-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Daftar Pengaduan Masuk</h2>
            <p className="text-slate-500 mt-1 text-sm">Klasifikasi otomatis menggunakan simulasi Machine Learning (SVM)</p>
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold border border-indigo-100">
            Total Laporan: {reports.length}
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-5 font-semibold text-slate-600 text-sm uppercase tracking-wider">Waktu Laporan</th>
                  <th className="p-5 font-semibold text-slate-600 text-sm uppercase tracking-wider">Lokasi Kejadian</th>
                  <th className="p-5 font-semibold text-slate-600 text-sm uppercase tracking-wider">Detail Masalah</th>
                  <th className="p-5 font-semibold text-slate-600 text-sm uppercase tracking-wider text-center">Tingkat Prioritas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-500">Belum ada pengaduan yang masuk hari ini.</td>
                  </tr>
                ) : (
                  reports.map(report => (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 text-sm text-slate-500 align-top whitespace-nowrap">{report.tanggal}</td>
                      <td className="p-5 font-medium text-slate-800 align-top">{report.lokasi}</td>
                      <td className="p-5 text-sm text-slate-600 align-top leading-relaxed max-w-md">{report.isi_laporan}</td>
                      <td className="p-5 text-center align-top">
                        <span className={`px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-sm inline-block ${report.color}`}>
                          {report.prioritas}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}