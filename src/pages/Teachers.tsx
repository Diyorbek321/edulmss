import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Star, 
  Users, 
  Clock, 
  Phone,
  GraduationCap,
  Eye,
  X,
  User,
  Briefcase,
  DollarSign,
  Edit2,
  Trash2,
  Camera,
  Key,
  Lock
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Teacher } from '@/src/types';
import { Modal } from '@/src/components/Modal';
import { useNavigate } from 'react-router-dom';
import { api } from '@/src/lib/api';
import { useAuth } from '@/src/contexts/AuthContext';

export const Teachers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [teacherList, setTeacherList] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialty: '',
    salary: 0,
    bonus: 0,
    hourlyRate: 0,
    status: 'Faol',
    avatar: '',
    login: '',
    password: ''
  });

  const fetchTeachers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/teachers', {
        params: { search: searchQuery }
      });
      setTeacherList(response.data);
    } catch (err) {
      setError("O'qituvchilarni yuklashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [searchQuery]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingTeacher) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      try {
        const response = await api.post(`/teachers/${editingTeacher.id}/avatar`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFormData(prev => ({ ...prev, avatar: response.data.avatar_url || response.data.url }));
      } catch (err) {
        console.error("Rasm yuklashda xatolik");
      }
    } else if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      phone: '',
      specialty: '',
      salary: 0,
      bonus: 0,
      hourlyRate: 0,
      status: 'Faol',
      avatar: '',
      login: '',
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      phone: teacher.phone,
      specialty: teacher.specialty,
      salary: teacher.salary,
      bonus: teacher.bonus,
      hourlyRate: teacher.hourlyRate,
      status: teacher.status,
      avatar: teacher.avatar || '',
      login: teacher.login || '',
      password: teacher.password || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (teacherToDelete) {
      try {
        await api.delete(`/teachers/${teacherToDelete.id}`);
        setTeacherList(prev => prev.filter(t => t.id !== teacherToDelete.id));
        setIsDeleteModalOpen(false);
        setTeacherToDelete(null);
      } catch (err) {
        console.error("O'chirishda xatolik");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingTeacher) {
        const response = await api.put(`/teachers/${editingTeacher.id}`, formData);
        setTeacherList(prev => prev.map(t => t.id === editingTeacher.id ? response.data : t));
      } else {
        const response = await api.post('/teachers', formData);
        setTeacherList(prev => [...prev, response.data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Saqlashda xatolik");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">O‘qituvchilar</h2>
            <p className="text-sm text-slate-500 mt-1">Markazimizning malakali mutaxassislari</p>
          </div>
          {isAdmin && (
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              <Plus size={20} />
              <span>O‘qituvchi qo‘shish</span>
            </button>
          )}
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative group max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ism yoki mutaxassislik bo'yicha qidirish" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 placeholder:text-slate-400 text-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {teacherList.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <div className="size-20 rounded-2xl bg-slate-100 overflow-hidden border-2 border-slate-50 group-hover:border-[#ec5b13]/20 transition-all flex items-center justify-center">
                      {teacher.avatar ? (
                        <img 
                          src={teacher.avatar} 
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={`https://picsum.photos/seed/${teacher.id}/200/200`} 
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white",
                      teacher.status === 'Faol' ? "bg-emerald-500" : "bg-slate-300"
                    )}></div>
                  </div>
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleEditClick(teacher)}
                        className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Tahrirlash"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(teacher)}
                        className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#ec5b13] transition-colors truncate">{teacher.name}</h3>
                  <p className="text-sm font-bold text-[#ec5b13] bg-orange-50 inline-block px-2 py-0.5 rounded-lg mt-1">{teacher.specialty}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Guruhlar</span>
                    </div>
                    <p className="text-sm font-black text-slate-900">{teacher.groupsCount} ta</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Dars soati</span>
                    </div>
                    <p className="text-sm font-black text-slate-900">{teacher.hours} soat</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Reyting</span>
                    </div>
                    <p className="text-sm font-black text-slate-900">{teacher.rating}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Aloqa</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 truncate">{teacher.phone}</p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/teachers/${teacher.id}`)}
                  className="w-full py-3 bg-slate-50 hover:bg-[#ec5b13] hover:text-white rounded-xl text-sm font-bold text-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Profilni ko'rish
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add/Edit Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeacher ? "O'qituvchi ma'lumotlarini tahrirlash" : "O‘qituvchi qo‘shish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative group cursor-pointer">
            <div className="size-24 rounded-2xl bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-slate-300" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer">
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
                placeholder="Masalan: Alisher Navoiy" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Telefon raqami</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
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
            <label className="text-xs font-black text-slate-400 uppercase">Mutaxassisligi</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.specialty}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: Matematika" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Oylik maoshi</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="number" 
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 4,500,000" 
              />
            </div>
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
            <label className="text-xs font-black text-slate-400 uppercase">Soatbay stavka (UZS)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="number" 
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 35,000" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
            >
              <option>Faol</option>
              <option>Nofaol</option>
            </select>
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
                  placeholder="teacher_login" 
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
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="O'qituvchini o'chirish"
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
              Siz <span className="font-bold text-slate-900">{teacherToDelete?.name}</span> o'qituvchini tizimdan o'chirmoqchisiz. Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
