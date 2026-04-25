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
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10 text-blue-400">ADMIN PANEL</h1>
          <ul className="space-y-4">
            <li className="p-2 bg-slate-800 rounded">Laporan Masuk</li>
            <li className="p-2 hover:bg-slate-800 rounded cursor-pointer">Kelola Warga</li>
            <li className="p-2 hover:bg-slate-800 rounded cursor-pointer">Pengaturan</li>
          </ul>
        </div>
        <button onClick={() => navigate('/login')} className="bg-red-600 p-2 rounded font-bold">Keluar</button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Daftar Pengaduan Masuk</h2>
        
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 border-b font-bold text-slate-600">Tanggal</th>
                <th className="p-4 border-b font-bold text-slate-600">Lokasi</th>
                <th className="p-4 border-b font-bold text-slate-600">Laporan</th>
                <th className="p-4 border-b font-bold text-slate-600 text-center">Prioritas (SVM)</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 border-b text-sm text-slate-500">{report.tanggal}</td>
                  <td className="p-4 border-b font-medium">{report.lokasi}</td>
                  <td className="p-4 border-b text-sm text-slate-600">{report.isi_laporan}</td>
                  <td className="p-4 border-b text-center">
                    <span className={`px-4 py-1 rounded-full text-white text-xs font-bold uppercase ${report.color}`}>
                      {report.prioritas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}