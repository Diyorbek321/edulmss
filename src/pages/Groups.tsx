import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  Clock, 
  MapPin, 
  BookOpen, 
  MoreVertical, 
  Filter,
  X,
  User,
  Calendar,
  Layers,
  UserPlus,
  Edit2,
  Trash2
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { Group, Student } from '@/src/types';

const mockAllStudents: Student[] = [
  { id: '1', name: 'Alisher Sadullayev', phone: '+998 90 123 45 67', group: 'English IELTS #12', status: 'Faol', debt: 0, paid: 1200000, attendance: 95, birthDate: '15.05.2008', gender: 'Erkak', address: 'Toshkent', parentName: 'Jasur', parentPhone: '901234567' },
  { id: '2', name: 'Malika Karimova', phone: '+998 93 456 78 90', group: 'Foundation #4', status: 'Faol', debt: 250000, paid: 800000, attendance: 80, birthDate: '10.02.2009', gender: 'Ayol', address: 'Toshkent', parentName: 'Zuhra', parentPhone: '934567890' },
  { id: '3', name: 'Javohir Orifov', phone: '+998 97 777 00 11', group: 'Backend Pro #1', status: 'Faol', debt: 0, paid: 1500000, attendance: 100, birthDate: '20.12.2007', gender: 'Erkak', address: 'Toshkent', parentName: 'Anvar', parentPhone: '977770011' },
  { id: '4', name: 'Shaxnoza Hasanova', phone: '+998 99 888 22 33', group: 'English Intermediate', status: 'Faol', debt: 0, paid: 400000, attendance: 60, birthDate: '05.08.2008', gender: 'Ayol', address: 'Toshkent', parentName: 'Nigora', parentPhone: '998882233' },
  { id: '5', name: 'Sardor Qodirov', phone: '+998 90 111 22 33', group: '', status: 'Kutishda', debt: 0, paid: 0, attendance: 0, birthDate: '12.03.2008', gender: 'Erkak', address: 'Toshkent', parentName: 'Qodir', parentPhone: '901112233' },
];

const groups: Group[] = [
  { id: '1', name: 'English IELTS #12', course: 'English IELTS', level: 'Advanced', teacher: 'Alisher Navoiy', studentsCount: 15, capacity: 18, status: 'Faol', schedule: 'Dush-Chor-Jum', time: '14:00 - 15:30', room: '302-xona' },
  { id: '2', name: 'Foundation #4', course: 'Foundation', level: 'Beginner', teacher: 'Malika Ahmedova', studentsCount: 12, capacity: 12, status: 'Faol', schedule: 'Sesh-Pay-Shan', time: '10:00 - 11:30', room: '101-xona' },
  { id: '3', name: 'Backend Pro #1', course: 'Web Development', level: 'Intermediate', teacher: 'Bobur Mirzo', studentsCount: 8, capacity: 15, status: 'Qabul ochiq', schedule: 'Dush-Chor-Jum', time: '18:30 - 20:00', room: 'Laboratoriya' },
];

export const Groups = () => {
  const [groupList, setGroupList] = useState<Group[]>(groups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [isManageStudentsModalOpen, setIsManageStudentsModalOpen] = useState(false);
  const [selectedGroupForStudents, setSelectedGroupForStudents] = useState<Group | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>(mockAllStudents);
  const [searchStudent, setSearchStudent] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    course: 'General English',
    level: 'Beginner',
    teacher: 'Alisher Navoiy',
    room: '302-xona',
    schedule: 'Toq kunlar (Dush-Chor-Jum)',
    time: '',
    capacity: 18,
    studentsCount: 0,
    status: 'Qabul ochiq'
  });

  const handleAddClick = () => {
    setEditingGroup(null);
    setFormData({
      name: '',
      course: 'General English',
      level: 'Beginner',
      teacher: 'Alisher Navoiy',
      room: '302-xona',
      schedule: 'Toq kunlar (Dush-Chor-Jum)',
      time: '',
      capacity: 18,
      studentsCount: 0,
      status: 'Qabul ochiq'
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (group: Group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      course: group.course,
      level: group.level,
      teacher: group.teacher,
      room: group.room,
      schedule: group.schedule,
      time: group.time,
      capacity: group.capacity,
      studentsCount: group.studentsCount,
      status: group.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (group: Group) => {
    setGroupToDelete(group);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete) {
      setGroupList(prev => prev.filter(g => g.id !== groupToDelete.id));
      setIsDeleteModalOpen(false);
      setGroupToDelete(null);
    }
  };

  const handleSave = () => {
    if (editingGroup) {
      setGroupList(prev => prev.map(g => g.id === editingGroup.id ? { ...g, ...formData } : g));
    } else {
      const newGroup: Group = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setGroupList(prev => [...prev, newGroup]);
    }
    setIsModalOpen(false);
  };

  const handleManageStudentsClick = (group: Group) => {
    setSelectedGroupForStudents(group);
    setIsManageStudentsModalOpen(true);
    setSearchStudent('');
  };

  const handleAddStudentToGroup = (studentId: string) => {
    if (!selectedGroupForStudents) return;
    
    // Update student's group
    setAllStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, group: selectedGroupForStudents.name } : s
    ));
    
    // Update group's student count
    setGroupList(prev => prev.map(g => 
      g.id === selectedGroupForStudents.id ? { ...g, studentsCount: g.studentsCount + 1 } : g
    ));
    
    // Update selected group state to reflect new count
    setSelectedGroupForStudents(prev => prev ? { ...prev, studentsCount: prev.studentsCount + 1 } : null);
  };

  const handleRemoveStudentFromGroup = (studentId: string) => {
    if (!selectedGroupForStudents) return;
    
    // Clear student's group
    setAllStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, group: '' } : s
    ));
    
    // Update group's student count
    setGroupList(prev => prev.map(g => 
      g.id === selectedGroupForStudents.id ? { ...g, studentsCount: Math.max(0, g.studentsCount - 1) } : g
    ));
    
    // Update selected group state to reflect new count
    setSelectedGroupForStudents(prev => prev ? { ...prev, studentsCount: Math.max(0, prev.studentsCount - 1) } : null);
  };

  const filteredGroups = groupList.filter(g => {
    if (activeTab === 'Barchasi') return true;
    return g.status === activeTab;
  });

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Guruhlar boshqaruvi</h2>
            <p className="text-sm text-slate-500 mt-1">O'quv guruhlarini shakllantirish va nazorat qilish</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            <Plus size={20} />
            <span>Guruh yaratish</span>
          </button>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex items-center w-full md:w-auto overflow-x-auto">
            {['Barchasi', 'Faol', 'Qabul ochiq', 'Yopilgan'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === tab 
                    ? "bg-orange-50 text-[#ec5b13]" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-64 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Guruh nomi..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 text-sm outline-none transition-all"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="size-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ec5b13] group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={28} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      group.status === 'Faol' ? "bg-emerald-100 text-emerald-700" :
                      group.status === 'Qabul ochiq' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {group.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleManageStudentsClick(group)}
                        className="p-2 text-slate-300 hover:text-emerald-600 transition-colors"
                        title="O'quvchilarni boshqarish"
                      >
                        <Users size={18} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(group)}
                        className="p-2 text-slate-300 hover:text-blue-600 transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(group)}
                        className="p-2 text-slate-300 hover:text-rose-600 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1">{group.name}</h3>
                <p className="text-sm text-slate-500 font-bold mb-6">{group.course}</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                      <User size={16} />
                    </div>
                    <span className="text-slate-600 font-medium">
                      <strong className="text-slate-900">O'qituvchi:</strong> {group.teacher}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                      <Calendar size={16} />
                    </div>
                    <span className="text-slate-600 font-medium">
                      <strong className="text-slate-900">Jadval:</strong> {group.schedule}, {group.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                      <MapPin size={16} />
                    </div>
                    <span className="text-slate-600 font-medium">
                      <strong className="text-slate-900">Xona:</strong> {group.room}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">To'lganlik</span>
                    </div>
                    <span className="text-sm font-black text-[#ec5b13]">{group.studentsCount} / {group.capacity}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        group.status === 'Faol' ? "bg-emerald-500" :
                        group.status === 'Qabul ochiq' ? "bg-blue-500" : "bg-orange-500"
                      )} 
                      style={{ width: `${(group.studentsCount / group.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add/Edit Group Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGroup ? "Guruhni tahrirlash" : "Yangi guruh yaratish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Guruh nomi</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: Matematika N1" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Kursni tanlang</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.course}
                onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>General English</option>
                <option>IELTS Intensive</option>
                <option>Frontend React</option>
                <option>Mathematics SAT</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Daraja (Level)</label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>Beginner</option>
                <option>Elementary</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>IELTS</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">O'qituvchini tanlang</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.teacher}
                onChange={(e) => setFormData(prev => ({ ...prev, teacher: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>Alisher Navoiy</option>
                <option>Malika Ahmedova</option>
                <option>Bobur Mirzo</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Xonani tanlang</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.room}
                onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>302-xona</option>
                <option>101-xona</option>
                <option>Laboratoriya</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Kunlar</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                value={formData.schedule}
                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none"
              >
                <option>Toq kunlar (Dush-Chor-Jum)</option>
                <option>Juft kunlar (Sesh-Pay-Shan)</option>
                <option>Har kuni</option>
                <option>Dam olish kunlari</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Vaqti</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 14:00 - 15:30"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Sig'imi (Capacity)</label>
            <input 
              type="number" 
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
              placeholder="Masalan: 18" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">O'quvchilar soni</label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="number" 
                value={formData.studentsCount}
                onChange={(e) => setFormData(prev => ({ ...prev, studentsCount: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: 0" 
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
              <option>Qabul ochiq</option>
              <option>Faol</option>
              <option>Yopilgan</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Manage Students Modal */}
      <Modal
        isOpen={isManageStudentsModalOpen}
        onClose={() => setIsManageStudentsModalOpen(false)}
        title={`${selectedGroupForStudents?.name} - O'quvchilarni boshqarish`}
        footer={
          <button onClick={() => setIsManageStudentsModalOpen(false)} className="w-full py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
            Yopish
          </button>
        }
      >
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="O'quvchini qidirish..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Students in Group */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900">Guruhdagi o'quvchilar</h4>
                <span className="text-xs font-bold text-[#ec5b13] bg-orange-50 px-2 py-1 rounded-lg">
                  {allStudents.filter(s => s.group === selectedGroupForStudents?.name).length} ta
                </span>
              </div>
              <div className="h-[300px] overflow-y-auto space-y-2 pr-2">
                {allStudents
                  .filter(s => s.group === selectedGroupForStudents?.name)
                  .filter(s => s.name.toLowerCase().includes(searchStudent.toLowerCase()))
                  .map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{student.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{student.phone}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveStudentFromGroup(student.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                      title="Guruhdan o'chirish"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {allStudents.filter(s => s.group === selectedGroupForStudents?.name).length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm font-medium">
                    Guruhda o'quvchilar yo'q
                  </div>
                )}
              </div>
            </div>

            {/* Available Students */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900">Boshqa o'quvchilar</h4>
              </div>
              <div className="h-[300px] overflow-y-auto space-y-2 pr-2">
                {allStudents
                  .filter(s => s.group !== selectedGroupForStudents?.name)
                  .filter(s => s.name.toLowerCase().includes(searchStudent.toLowerCase()))
                  .map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{student.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {student.group ? `Hozirda: ${student.group}` : 'Guruhsiz'}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleAddStudentToGroup(student.id)}
                      disabled={selectedGroupForStudents ? selectedGroupForStudents.studentsCount >= selectedGroupForStudents.capacity : true}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Guruhga qo'shish"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Guruhni o'chirish"
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
              Siz <span className="font-bold text-slate-900">{groupToDelete?.name}</span> guruhini tizimdan o'chirmoqchisiz. Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
