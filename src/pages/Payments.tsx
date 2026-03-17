import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter,
  Download,
  CreditCard,
  Banknote,
  Smartphone,
  Plus,
  X,
  User,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { exportToCSV } from '@/src/lib/exportUtils';

const stats = [
  { label: 'Umumiy tushum', value: '124,500,000', trend: '+12.5%', icon: Wallet, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Xarajatlar', value: '42,300,000', trend: '+4.2%', icon: ArrowUpRight, color: 'bg-rose-100 text-rose-600' },
  { label: 'Sof foyda', value: '82,200,000', trend: '+15.8%', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
  { label: 'Qarzdorlik', value: '18,400,000', trend: '-2.1%', icon: ArrowDownLeft, color: 'bg-amber-100 text-amber-600' },
];

const payments = [
  { id: 1, student: 'Alisher Sadullayev', amount: '1,200,000', method: 'Click', date: '12.10.2023', time: '14:20', status: 'Muvaffaqiyatli' },
  { id: 2, student: 'Malika Karimova', amount: '800,000', method: 'Cash', date: '12.10.2023', time: '12:15', status: 'Muvaffaqiyatli' },
  { id: 3, student: 'Javohir Orifov', amount: '1,500,000', method: 'Payme', date: '11.10.2023', time: '18:45', status: 'Kutilmoqda' },
  { id: 4, student: 'Shaxnoza Hasanova', amount: '400,000', method: 'Card', date: '11.10.2023', time: '10:30', status: 'Muvaffaqiyatli' },
];

export const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">To‘lovlar va Moliya</h2>
            <p className="text-sm text-slate-500 mt-1">Markazning moliyaviy oqimini nazorat qilish</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => exportToCSV(payments, 'tolovlar_hisoboti')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600 text-sm"
            >
              <Download size={18} />
              <span>Hisobot yuklash</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm"
            >
              <Plus size={18} />
              <span>Yangi to'lov</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <span className={cn(
                  "text-xs font-black px-2 py-1 rounded-lg",
                  stat.trend.includes('+') ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                )}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-bold">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1 text-slate-900">{stat.value} <span className="text-xs font-normal text-slate-400">UZS</span></h3>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="O'quvchi ismi bo'yicha qidirish" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 text-sm outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none cursor-pointer">
              <option>To'lov turi</option>
              <option>Click</option>
              <option>Payme</option>
              <option>Naqd</option>
            </select>
            <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">O‘quvchi</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Summa</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Usul</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Sana va Vaqt</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Holati</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-sm text-slate-900">{p.student}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900">{p.amount} UZS</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {p.method === 'Click' && <Smartphone size={14} className="text-blue-500" />}
                      {p.method === 'Cash' && <Banknote size={14} className="text-emerald-500" />}
                      {p.method === 'Payme' && <Smartphone size={14} className="text-cyan-500" />}
                      {p.method === 'Card' && <CreditCard size={14} className="text-indigo-500" />}
                      <span className="text-xs font-bold text-slate-500">{p.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-bold text-slate-700">{p.date}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase">{p.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      p.status === 'Muvaffaqiyatli' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi to'lov qo'shish"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">O'quvchini tanlang</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Alisher Sadullayev</option>
                <option>Malika Karimova</option>
                <option>Javohir Orifov</option>
                <option>Shaxnoza Hasanova</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">To'lov usuli</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Click</option>
                <option>Payme</option>
                <option>Naqd</option>
                <option>Karta (Terminal)</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Summa (UZS)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" placeholder="Masalan: 1,200,000" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Sana</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="date" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Holati (Status)</label>
            <div className="relative">
              <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Muvaffaqiyatli</option>
                <option>Kutilmoqda</option>
                <option>Rad etildi</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Izoh</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-slate-300" size={18} />
              <textarea className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm min-h-[100px]" placeholder="To'lov haqida qo'shimcha ma'lumot..."></textarea>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
