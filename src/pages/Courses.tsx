import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Clock, 
  Layers, 
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { Course, Group } from '@/src/types';
import { Users } from 'lucide-react';

const courses: Course[] = [
  { id: '1', name: 'General English', duration: '4 oy', price: '450,000', lessonsCount: 48, groupsCount: 12, status: 'Faol', description: 'Barcha darajalar uchun umumiy ingliz tili kursi.' },
  { id: '2', name: 'IELTS Intensive', duration: '3 oy', price: '600,000', lessonsCount: 36, groupsCount: 5, status: 'Faol', description: 'IELTS imtihoniga tayyorlov kursi.' },
  { id: '3', name: 'Frontend React', duration: '6 oy', price: '1,200,000', lessonsCount: 72, groupsCount: 3, status: 'Faol', description: 'Zamonaviy web dasturlash kursi.' },
  { id: '4', name: 'Mathematics SAT', duration: '5 oy', price: '500,000', lessonsCount: 60, groupsCount: 4, status: 'Nofaol', description: 'SAT imtihoniga tayyorlov kursi.' },
];

const mockGroups: Group[] = [
  { id: '1', name: 'English IELTS #12', course: 'General English', level: 'Advanced', teacher: 'Alisher Navoiy', studentsCount: 15, capacity: 18, status: 'Faol', schedule: 'Dush-Chor-Jum', time: '14:00 - 15:30', room: '302-xona' },
  { id: '2', name: 'Foundation #4', course: 'General English', level: 'Beginner', teacher: 'Malika Ahmedova', studentsCount: 12, capacity: 12, status: 'Faol', schedule: 'Sesh-Pay-Shan', time: '10:00 - 11:30', room: '101-xona' },
  { id: '3', name: 'Backend Pro #1', course: 'Frontend React', level: 'Intermediate', teacher: 'Bobur Mirzo', studentsCount: 8, capacity: 15, status: 'Qabul ochiq', schedule: 'Dush-Chor-Jum', time: '18:30 - 20:00', room: 'Laboratoriya' },
];

export const Courses = () => {
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    description: ''
  });

  const handleAddClick = () => {
    setEditingCourse(null);
    setFormData({ name: '', duration: '', price: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      duration: course.duration,
      price: course.price,
      description: course.description
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourseList(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
    } else {
      const newCourse: Course = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        lessonsCount: 0,
        groupsCount: 0,
        status: 'Faol'
      };
      setCourseList(prev => [...prev, newCourse]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourseList(prev => prev.filter(c => c.id !== courseToDelete.id));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Kurslar</h2>
            <p className="text-sm text-slate-500 mt-1">Markazda o'tiladigan barcha o'quv yo'nalishlari</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            <Plus size={20} />
            <span>Kurs qo'shish</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="size-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ec5b13]">
                    <BookOpen size={28} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsGroupModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:bg-orange-50 hover:text-[#ec5b13] rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
                      title="Guruhlarni boshqarish"
                    >
                      <Users size={18} />
                      <span>Guruhlar</span>
                    </button>
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                      course.status === 'Faol' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {course.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#ec5b13] transition-colors">{course.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-xs font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Layers size={16} className="text-slate-400" />
                    <span className="text-xs font-bold">{course.groupsCount} ta guruh</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Kurs narxi</p>
                    <p className="text-lg font-black text-slate-900">{course.price} <span className="text-xs font-normal text-slate-400">UZS</span></p>
                  </div>
                  <button 
                    onClick={() => handleDeleteClick(course)}
                    className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleEditClick(course)}
                    className="p-3 bg-slate-50 text-slate-400 hover:bg-[#ec5b13] hover:text-white rounded-xl transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Manage Groups Modal */}
      <Modal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        title={`${selectedCourse?.name} - Guruhlarni biriktirish`}
        footer={
          <button 
            onClick={() => setIsGroupModalOpen(false)} 
            className="w-full py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
          >
            Tayyor
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium">Ushbu kursga tegishli guruhlarni tanlang:</p>
          <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {mockGroups.map((group) => (
              <label 
                key={group.id} 
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                  group.course === selectedCourse?.name 
                    ? "bg-orange-50 border-orange-200" 
                    : "bg-white border-slate-200 hover:border-orange-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "size-5 rounded border flex items-center justify-center transition-all",
                    group.course === selectedCourse?.name 
                      ? "bg-[#ec5b13] border-[#ec5b13]" 
                      : "bg-white border-slate-300 group-hover:border-[#ec5b13]"
                  )}>
                    {group.course === selectedCourse?.name && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{group.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{group.teacher} • {group.schedule}</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={group.course === selectedCourse?.name}
                  onChange={() => {
                    // In a real app, this would update the backend
                    console.log(`Assigning ${group.name} to ${selectedCourse?.name}`);
                  }}
                />
              </label>
            ))}
          </div>
          <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-[#ec5b13] hover:text-[#ec5b13] transition-all flex items-center justify-center gap-2 mt-4">
            <Plus size={18} />
            <span>Yangi guruh yaratish va biriktirish</span>
          </button>
        </div>
      </Modal>

      {/* Add/Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Kurs nomi</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
              placeholder="Masalan: General English" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Davomiyligi</label>
              <input 
                type="text" 
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 4 oy" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Narxi (oylik)</label>
              <input 
                type="text" 
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 500,000" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Tavsif</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm h-24 resize-none" 
              placeholder="Kurs haqida qisqacha ma'lumot..."
            ></textarea>
          </div>
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Kursni o'chirish"
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
              Siz <span className="font-bold text-slate-900">{courseToDelete?.name}</span> kursini tizimdan o'chirmoqchisiz. Bu amalni ortga qaytarib bo'lmaydi va barcha bog'langan ma'lumotlar o'chib ketishi mumkin.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
