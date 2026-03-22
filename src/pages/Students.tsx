import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Lock,
  AlertCircle,
  Download,
  MessageSquare
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Student } from '@/src/types';
import { Modal } from '@/src/components/Modal';
import { SkeletonTable } from '@/src/components/SkeletonTable';
import { ErrorState } from '@/src/components/ErrorState';
import { api } from '@/src/lib/api';
import { useAuth } from '@/src/contexts/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const studentSchema = z.object({
  name: z.string().min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"),
  phone: z.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, "Format: +998 XX XXX XX XX"),
  birthDate: z.string().min(1, "Tug'ilgan sana kiritilishi shart"),
  gender: z.enum(['Erkak', 'Ayol']),
  group: z.string().min(1, "Guruhni tanlang"),
  address: z.string().min(5, "Manzil kamida 5 ta belgidan iborat bo'lishi kerak"),
  parentName: z.string().min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"),
  parentPhone: z.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, "Format: +998 XX XXX XX XX"),
  login: z.string().min(4, "Login kamida 4 ta belgidan iborat bo'lishi kerak"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
  avatar: z.string().optional()
});

type StudentFormValues = z.infer<typeof studentSchema>;

export const Students = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      gender: 'Erkak',
      group: 'Guruhni tanlang'
    }
  });

  const avatarPreview = watch('avatar');

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/students', {
        params: {
          search: searchQuery,
          page: page
        }
      });
      setStudentList(response.data);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      searchParams.set('search', value);
      searchParams.set('page', '1');
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingStudent) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await api.post(`/students/${editingStudent.id}/avatar`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setValue('avatar', response.data.avatar_url || response.data.url);
      } catch (err) {
        console.error("Rasm yuklashda xatolik");
      }
    } else if (file) {
      // If creating a new student, just preview it locally for now
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    reset({
      name: '', phone: '', birthDate: '', gender: 'Erkak', group: 'Guruhni tanlang',
      address: '', parentName: '', parentPhone: '', login: '', password: '', avatar: ''
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    reset({
      name: student.name, phone: student.phone, birthDate: student.birthDate,
      gender: student.gender as 'Erkak' | 'Ayol', group: student.group, address: student.address,
      parentName: student.parentName, parentPhone: student.parentPhone,
      login: student.login || '', password: student.password || '', avatar: student.avatar || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await api.delete(`/students/${studentToDelete.id}`);
        setStudentList(prev => prev.filter(s => s.id !== studentToDelete.id));
        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
      } catch (err) {
        console.error("O'chirishda xatolik");
      }
    }
  };

  const onSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        const response = await api.put(`/students/${editingStudent.id}`, data);
        setStudentList(prev => prev.map(s => s.id === editingStudent.id ? response.data : s));
      } else {
        const response = await api.post('/students', data);
        setStudentList(prev => [...prev, response.data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Saqlashda xatolik");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text("O'quvchilar ro'yxati", 14, 22);
    
    // Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Sana: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Table data
    const tableColumn = ["#", "Ism", "Telefon", "Guruh", "Status", "Qarzdorlik"];
    const tableRows = studentList.map((student, index) => [
      index + 1,
      student.name,
      student.phone,
      student.group,
      student.status,
      `${student.debt.toLocaleString()} UZS`
    ]);

    // @ts-ignore - jspdf-autotable adds autoTable to jsPDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [236, 91, 19], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    doc.save("oquvchilar_royxati.pdf");
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
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm active:scale-95"
            >
              <Download size={20} />
              <span>PDF yuklab olish</span>
            </button>
            {isAdmin && (
              <button 
                onClick={handleAddClick}
                className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
              >
                <Plus size={20} />
                <span>O‘quvchi qo‘shish</span>
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
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

        {/* Table Content */}
        {isLoading ? (
          <SkeletonTable columns={6} rows={5} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchStudents} />
        ) : (
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
                  {studentList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                        O'quvchilar topilmadi
                      </td>
                    </tr>
                  ) : (
                    studentList.map((s) => (
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
                            {isAdmin && (
                              <button 
                                onClick={() => navigate(`/sms?phone=${encodeURIComponent(s.phone)}&name=${encodeURIComponent(s.name)}`)}
                                className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all"
                                title="SMS yuborish"
                              >
                                <MessageSquare size={16} />
                              </button>
                            )}
                            <button 
                              onClick={() => navigate(`/students/${s.id}`)}
                              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                              title="Profilni ko'rish"
                            >
                              <Eye size={16} />
                            </button>
                            {isAdmin && (
                              <>
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
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/30">
              <p className="text-xs text-slate-500 font-bold">Jami 154 tadan 1-10 gacha ko'rsatilmoqda</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    searchParams.set('page', Math.max(1, page - 1).toString());
                    setSearchParams(searchParams);
                  }}
                  disabled={page === 1}
                  className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-slate-400 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button className="size-9 flex items-center justify-center rounded-xl bg-[#ec5b13] text-white font-black text-sm shadow-md shadow-orange-200">{page}</button>
                <button 
                  onClick={() => {
                    searchParams.set('page', (page + 1).toString());
                    setSearchParams(searchParams);
                  }}
                  className="size-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white transition-all text-slate-400"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "O'quvchi ma'lumotlarini tahrirlash" : "Yangi o'quvchi qo'shish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 disabled:opacity-70">
              {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </>
        }
      >
        <form className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="size-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
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
                  {...register('name')}
                  type="text" 
                  className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.name ? "border-red-300" : "border-transparent")}
                  placeholder="Masalan: Alisher Sadullayev" 
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Telefon raqami</label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  {...register('phone')}
                  type="text" 
                  className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.phone ? "border-red-300" : "border-transparent")}
                  placeholder="+998 90 123 45 67" 
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Tug'ilgan sanasi</label>
              <input 
                {...register('birthDate')}
                type="date" 
                className={cn("w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.birthDate ? "border-red-300" : "border-transparent")}
              />
              {errors.birthDate && <p className="text-xs text-red-500 font-medium">{errors.birthDate.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Jinsi</label>
              <select 
                {...register('gender')}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
              >
                <option value="Erkak">Erkak</option>
                <option value="Ayol">Ayol</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-slate-400 uppercase">Guruhni tanlang</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select 
                  {...register('group')}
                  className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none", errors.group ? "border-red-300" : "border-transparent")}
                >
                  <option value="">Guruhni tanlang</option>
                  <option value="English IELTS #12">English IELTS #12</option>
                  <option value="Foundation #4">Foundation #4</option>
                  <option value="Backend Pro #1">Backend Pro #1</option>
                </select>
              </div>
              {errors.group && <p className="text-xs text-red-500 font-medium">{errors.group.message}</p>}
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-slate-400 uppercase">Yashash manzili</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  {...register('address')}
                  type="text" 
                  className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.address ? "border-red-300" : "border-transparent")}
                  placeholder="Toshkent sh., Yunusobod t." 
                />
              </div>
              {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address.message}</p>}
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
                    {...register('login')}
                    type="text" 
                    className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.login ? "border-red-300" : "border-transparent")}
                    placeholder="student_login" 
                  />
                </div>
                {errors.login && <p className="text-xs text-red-500 font-medium">{errors.login.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    {...register('password')}
                    type="text" 
                    className={cn("w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.password ? "border-red-300" : "border-transparent")}
                    placeholder="Parolni kiriting" 
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 mt-6">
            <h4 className="text-sm font-black text-slate-900 mb-4">Ota-onasi haqida ma'lumot</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase">Ota-onasi ismi</label>
                <input 
                  {...register('parentName')}
                  type="text" 
                  className={cn("w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.parentName ? "border-red-300" : "border-transparent")}
                  placeholder="Masalan: Jasur Sadullayev" 
                />
                {errors.parentName && <p className="text-xs text-red-500 font-medium">{errors.parentName.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase">Bog'lanish uchun telefon</label>
                <input 
                  {...register('parentPhone')}
                  type="text" 
                  className={cn("w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm", errors.parentPhone ? "border-red-300" : "border-transparent")}
                  placeholder="+998 90 987 65 43" 
                />
                {errors.parentPhone && <p className="text-xs text-red-500 font-medium">{errors.parentPhone.message}</p>}
              </div>
            </div>
          </div>
        </form>
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
