import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  X,
  User,
  Phone as PhoneIcon,
  MapPin,
  Users,
  Trash2,
  Camera,
  Key,
  Lock
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Student } from '@/src/types';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/src/components/Modal';

const students: Student[] = [
  { id: '1', name: 'Alisher Sadullayev', phone: '+998 90 123 45 67', group: 'English IELTS #12', status: 'Faol', debt: 0, paid: 1200000, attendance: 95, birthDate: '15.05.2008', gender: 'Erkak', address: 'Toshkent', parentName: 'Jasur', parentPhone: '901234567' },
  { id: '2', name: 'Malika Karimova', phone: '+998 93 456 78 90', group: 'Foundation #4', status: 'Muzlatilgan', debt: 250000, paid: 800000, attendance: 80, birthDate: '10.02.2009', gender: 'Ayol', address: 'Toshkent', parentName: 'Zuhra', parentPhone: '934567890' },
  { id: '3', name: 'Javohir Orifov', phone: '+998 97 777 00 11', group: 'Backend Pro #1', status: 'Faol', debt: 0, paid: 1500000, attendance: 100, birthDate: '20.12.2007', gender: 'Erkak', address: 'Toshkent', parentName: 'Anvar', parentPhone: '977770011' },
  { id: '4', name: 'Shaxnoza Hasanova', phone: '+998 99 888 22 33', group: 'English Intermediate', status: 'Ketgan', debt: 0, paid: 400000, attendance: 60, birthDate: '05.08.2008', gender: 'Ayol', address: 'Toshkent', parentName: 'Nigora', parentPhone: '998882233' },
];

export const Students = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState<Student[]>(students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    gender: 'Erkak',
    group: 'Guruhni tanlang',
    address: '',
    parentName: '',
    parentPhone: '',
    avatar: '',
    login: '',
    password: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      phone: '',
      birthDate: '',
      gender: 'Erkak',
      group: 'Guruhni tanlang',
      address: '',
      parentName: '',
      parentPhone: '',
      avatar: '',
      login: '',
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      phone: student.phone,
      birthDate: student.birthDate,
      gender: student.gender,
      group: student.group,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      avatar: student.avatar || '',
      login: student.login || '',
      password: student.password || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudentList(prev => prev.filter(s => s.id !== studentToDelete.id));
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudentList(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...formData } : s));
    } else {
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'Faol',
        debt: 0,
        paid: 0,
        attendance: 0
      };
      setStudentList(prev => [...prev, newStudent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">O‘quvchilar ro‘yxati</h2>
            <p className="text-sm text-slate-500 mt-1">Jami 154 ta o'quvchi tizimda mavjud</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            <Plus size={20} />
            <span>O‘quvchi qo‘shish</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Ism yoki telefon bo'yicha qidirish" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 placeholder:text-slate-400 text-sm outline-none transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-bold text-slate-600">
              <Filter size={18} />
              <span>Filtrlar</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {['Status', 'Guruh', 'Kurs', 'Qarzdorlik'].map((filter) => (
              <select key={filter} className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-orange-500/20 cursor-pointer outline-none">
                <option>{filter}</option>
              </select>
            ))}
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
              <Calendar size={16} className="text-slate-400" />
              <span>Sana oralig‘i</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Ism</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Telefon</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Guruh</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Qarzdorlik</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {studentList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => navigate(`/students/${s.id}`)}
                        className="flex items-center gap-3 text-left hover:text-[#ec5b13] transition-colors"
                      >
                        {s.avatar ? (
                          <img src={s.avatar} alt={s.name} className="size-9 rounded-full object-cover" />
                        ) : (
                          <div className={cn(
                            "size-9 rounded-full flex items-center justify-center text-xs font-black",
                            s.gender === 'Erkak' ? "bg-blue-100 text-blue-600" : "bg-rose-100 text-rose-600"
                          )}>
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <span className="font-bold text-sm text-slate-900 group-hover:text-[#ec5b13]">{s.name}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{s.phone}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{s.group}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        s.status === 'Faol' ? "bg-emerald-100 text-emerald-700" :
                        s.status === 'Muzlatilgan' ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-500"
                      )}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-sm font-black",
                        s.debt > 0 ? "text-red-500" : "text-slate-900"
                      )}>
                        {s.debt.toLocaleString()} UZS
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigate(`/students/${s.id}`)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                          title="Profilni ko'rish"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditClick(s)}
                          className="p-2 bg-slate-50 text-slate-400 hover:bg-[#ec5b13] hover:text-white rounded-xl transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(s)}
                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
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

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/30">
            <p className="text-xs text-slate-500 font-bold">Jami 154 tadan 1-10 gacha ko'rsatilmoqda</p>
            <div className="flex items-center gap-2">
              <button className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-slate-400 disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <button className="size-9 flex items-center justify-center rounded-xl bg-[#ec5b13] text-white font-black text-sm shadow-md shadow-orange-200">1</button>
              <button className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-sm font-bold text-slate-600">2</button>
              <button className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-sm font-bold text-slate-600">3</button>
              <span className="text-slate-300 font-black">...</span>
              <button className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-sm font-bold text-slate-600">16</button>
              <button className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-slate-400">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "O'quvchi ma'lumotlarini tahrirlash" : "Yangi o'quvchi qo'shish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative group cursor-pointer">
            <div className="size-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-slate-300" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <Camera size={24} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-2">Rasm yuklash</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Ismi sharifi</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: Alisher Sadullayev" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Telefon raqami</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="+998 90 123 45 67" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Tug'ilgan sanasi</label>
            <input 
              type="date" 
              value={formData.birthDate}
              onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Jinsi</label>
            <select 
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
            >
              <option>Erkak</option>
              <option>Ayol</option>
            </select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase">Guruhni tanlang</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.group}
                onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>Guruhni tanlang</option>
                <option>English IELTS #12</option>
                <option>Foundation #4</option>
                <option>Backend Pro #1</option>
              </select>
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase">Yashash manzili</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Toshkent sh., Yunusobod t." 
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-100 mt-6">
          <h4 className="text-sm font-black text-slate-900 mb-4">Mobil ilova uchun hisob</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Login</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  value={formData.login}
                  onChange={(e) => setFormData(prev => ({ ...prev, login: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                  placeholder="student_login" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                  placeholder="Parolni kiriting" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-100 mt-6">
          <h4 className="text-sm font-black text-slate-900 mb-4">Ota-onasi haqida ma'lumot</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Ota-onasi ismi</label>
              <input 
                type="text" 
                value={formData.parentName}
                onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: Jasur Sadullayev" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Bog'lanish uchun telefon</label>
              <input 
                type="text" 
                value={formData.parentPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="+998 90 987 65 43" 
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="O'quvchini o'chirish"
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
              Siz <span className="font-bold text-slate-900">{studentToDelete?.name}</span> o'quvchini tizimdan o'chirmoqchisiz. Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
