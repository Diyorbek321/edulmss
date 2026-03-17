import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Search, 
  Filter,
  Download,
  ArrowUpRight,
  UserCheck,
  Calendar,
  CreditCard,
  MoreVertical,
  CheckCircle2,
  X,
  User,
  DollarSign,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Clock
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { exportToCSV } from '@/src/lib/exportUtils';

const initialSalaries = [
  { id: '1', name: 'Alisher Navoiy', role: 'O\'qituvchi', amount: 4200000, bonus: 500000, total: 4700000, status: 'To\'landi', date: '2026-02-10', method: 'Karta orqali', type: 'Asosiy maosh', hours: 120, rate: 35000 },
  { id: '2', name: 'Malika Ahmedova', role: 'O\'qituvchi', amount: 3600000, bonus: 200000, total: 3800000, status: 'Kutilmoqda', date: '2026-02-12', method: 'Payme', type: 'Asosiy maosh', hours: 90, rate: 40000 },
  { id: '3', name: 'Bobur Mirzo', role: 'O\'qituvchi', amount: 3000000, bonus: 0, total: 3000000, status: 'To\'landi', date: '2026-02-08', method: 'Naqd pul', type: 'Asosiy maosh', hours: 60, rate: 50000 },
  { id: '4', name: 'Zuhra Karimo', role: 'Administrator', amount: 2500000, bonus: 100000, total: 2600000, status: 'To\'landi', date: '2026-02-10', method: 'Karta orqali', type: 'Asosiy maosh', hours: 160, rate: 15625 },
];

const teachersList = [
  { id: '1', name: 'Alisher Navoiy', role: 'O\'qituvchi', hours: 120, hourlyRate: 35000 },
  { id: '2', name: 'Malika Ahmedova', role: 'O\'qituvchi', hours: 90, hourlyRate: 40000 },
  { id: '3', name: 'Bobur Mirzo', role: 'O\'qituvchi', hours: 60, hourlyRate: 50000 },
  { id: '4', name: 'Zuhra Karimo', role: 'Administrator', hours: 160, hourlyRate: 15625 },
];

export const Salaries = () => {
  const [salaries, setSalaries] = useState(initialSalaries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSalary, setEditingSalary] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [salaryToDelete, setSalaryToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    teacherId: teachersList[0].id,
    type: 'Asosiy maosh',
    amount: teachersList[0].hours * teachersList[0].hourlyRate,
    bonus: 0,
    method: 'Karta orqali',
    date: new Date().toISOString().split('T')[0],
    status: 'To\'landi',
    comment: ''
  });

  const handleTeacherChange = (id: string) => {
    const teacher = teachersList.find(t => t.id === id);
    if (teacher) {
      setFormData(prev => ({
        ...prev,
        teacherId: id,
        amount: teacher.hours * teacher.hourlyRate
      }));
    }
  };

  const handleSave = () => {
    const teacher = teachersList.find(t => t.id === formData.teacherId);
    if (!teacher) return;

    const newSalary = {
      id: editingSalary ? editingSalary.id : Math.random().toString(36).substr(2, 9),
      name: teacher.name,
      role: teacher.role,
      amount: Number(formData.amount),
      bonus: Number(formData.bonus),
      total: Number(formData.amount) + Number(formData.bonus),
      status: formData.status,
      date: formData.date,
      method: formData.method,
      type: formData.type,
      hours: teacher.hours,
      rate: teacher.hourlyRate
    };

    if (editingSalary) {
      setSalaries(prev => prev.map(s => s.id === editingSalary.id ? newSalary : s));
    } else {
      setSalaries(prev => [newSalary, ...prev]);
    }

    setIsModalOpen(false);
    setEditingSalary(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      teacherId: teachersList[0].id,
      type: 'Asosiy maosh',
      amount: teachersList[0].hours * teachersList[0].hourlyRate,
      bonus: 0,
      method: 'Karta orqali',
      date: new Date().toISOString().split('T')[0],
      status: 'To\'landi',
      comment: ''
    });
  };

  const handleEdit = (salary: any) => {
    const teacher = teachersList.find(t => t.name === salary.name);
    setEditingSalary(salary);
    setFormData({
      teacherId: teacher?.id || teachersList[0].id,
      type: salary.type,
      amount: salary.amount,
      bonus: salary.bonus,
      method: salary.method,
      date: salary.date,
      status: salary.status,
      comment: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSalaryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (salaryToDelete) {
      setSalaries(prev => prev.filter(s => s.id !== salaryToDelete));
      setIsDeleteModalOpen(false);
      setSalaryToDelete(null);
    }
  };

  const totalFund = salaries.reduce((acc, s) => acc + s.total, 0);
  const paidAmount = salaries.filter(s => s.status === 'To\'landi').reduce((acc, s) => acc + s.total, 0);
  const pendingAmount = totalFund - paidAmount;

  const currentStats = [
    { label: 'Oylik ish haqi fondi', value: totalFund.toLocaleString(), trend: '+5.2%', icon: Wallet, color: 'bg-blue-100 text-blue-600' },
    { label: 'To\'langan', value: paidAmount.toLocaleString(), trend: `${Math.round((paidAmount / totalFund) * 100)}%`, icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Qolgan', value: pendingAmount.toLocaleString(), trend: `${Math.round((pendingAmount / totalFund) * 100)}%`, icon: TrendingUp, color: 'bg-orange-100 text-[#ec5b13]' },
    { label: 'Xodimlar soni', value: teachersList.length.toString(), trend: 'Faol', icon: Users, color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Ish haqi boshqaruvi</h2>
            <p className="text-sm text-slate-500 mt-1">O'qituvchi va xodimlar maoshlarini nazorat qilish</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => exportToCSV(salaries, 'ish_haqi_hisoboti')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600 text-sm"
            >
              <Download size={18} />
              <span>Eksport</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm"
            >
              <Plus size={18} />
              <span>Maosh hisoblash</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-50 text-slate-400 uppercase tracking-wider">
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
              placeholder="Xodim ismi bo'yicha qidirish" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 text-sm outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none cursor-pointer">
              <option>Oktyabr, 2023</option>
              <option>Sentyabr, 2023</option>
            </select>
            <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Salaries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Xodim</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Lavozim</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Hisoblangan</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Bonus</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Jami</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Holati</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {salaries.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{s.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{s.hours} soat × {s.rate.toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{s.role}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{s.amount.toLocaleString()} UZS</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-500">+{s.bonus.toLocaleString()} UZS</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">{s.total.toLocaleString()} UZS</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      s.status === 'To\'landi' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(s)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add/Edit Salary Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSalary(null);
          resetForm();
        }}
        title={editingSalary ? "Maoshni tahrirlash" : "Yangi maosh hisoblash"}
        footer={
          <>
            <button onClick={() => {
              setIsModalOpen(false);
              setEditingSalary(null);
              resetForm();
            }} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Xodimni tanlang</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.teacherId}
                onChange={(e) => handleTeacherChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                {teachersList.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">To'lov turi</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>Asosiy maosh</option>
                <option>Bonus</option>
                <option>Avans</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Hisoblangan summa (UZS)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 4,500,000" 
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
              {teachersList.find(t => t.id === formData.teacherId)?.hours} soat × {teachersList.find(t => t.id === formData.teacherId)?.hourlyRate.toLocaleString()} UZS
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Bonus (UZS)</label>
            <div className="relative">
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="number" 
                value={formData.bonus}
                onChange={(e) => setFormData(prev => ({ ...prev, bonus: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 500,000" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">To'lov usuli</label>
            <select 
              value={formData.method}
              onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
            >
              <option>Karta orqali</option>
              <option>Naqd pul</option>
              <option>Bank o'tkazmasi</option>
              <option>Payme</option>
              <option>Click</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Sana</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
            >
              <option>To'landi</option>
              <option>Kutilmoqda</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Izoh</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-slate-300" size={18} />
              <textarea 
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm min-h-[100px]" 
                placeholder="To'lov haqida qo'shimcha ma'lumot..."
              ></textarea>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="To'lovni o'chirish"
        footer={
          <>
            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={confirmDelete} className="flex-1 py-3 bg-rose-600 text-white rounded-2xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">Ha, o'chirilsin</button>
          </>
        }
      >
        <div className="text-center space-y-4">
          <div className="size-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <Trash2 size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Ishonchingiz komilmi?</h3>
            <p className="text-sm text-slate-500 mt-1">
              Siz ushbu maosh to'lovi ma'lumotlarini o'chirmoqchisiz. Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
