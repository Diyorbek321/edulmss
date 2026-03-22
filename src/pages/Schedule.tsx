import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Users,
  X
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { useAuth } from '@/src/contexts/AuthContext';

const days = [
  { name: 'DUSHANBA', date: '16' },
  { name: 'SESHANBA', date: '17' },
  { name: 'CHORSHANBA', date: '18' },
  { name: 'PAYSHANBA', date: '19' },
  { name: 'JUMA', date: '20' },
  { name: 'SHANBA', date: '21' },
];

const timeSlots = ['08:00', '10:00', '14:00', '16:00'];

const scheduleData = [
  { day: 0, time: '08:00', subject: 'Math Alpha-1', teacher: 'A. Jumaboyev', room: '304-Xona', color: 'bg-blue-50 border-blue-500 text-blue-700' },
  { day: 2, time: '08:00', subject: 'Math Alpha-1', teacher: 'A. Jumaboyev', room: '304-Xona', color: 'bg-orange-50 border-orange-500 text-orange-700' },
  { day: 4, time: '08:00', subject: 'Math Alpha-1', teacher: 'A. Jumaboyev', room: '304-Xona', color: 'bg-blue-50 border-blue-500 text-blue-700' },
  { day: 1, time: '10:00', subject: 'IELTS Intensive', teacher: 'M. Ahrorova', room: '201-Xona', color: 'bg-emerald-50 border-emerald-500 text-emerald-700' },
  { day: 3, time: '10:00', subject: 'IELTS Intensive', teacher: 'M. Ahrorova', room: '201-Xona', color: 'bg-emerald-50 border-emerald-500 text-emerald-700' },
  { day: 5, time: '10:00', subject: 'Speaking Club', teacher: 'Native Speaker', room: 'Hall-A', color: 'bg-amber-50 border-amber-500 text-amber-700' },
  { day: 0, time: '14:00', subject: 'IT Fundamentals', teacher: 'J. Komilov', room: '101-IT Lab', color: 'bg-indigo-50 border-indigo-500 text-indigo-700' },
  { day: 2, time: '14:00', subject: 'IT Fundamentals', teacher: 'J. Komilov', room: '101-IT Lab', color: 'bg-indigo-50 border-indigo-500 text-indigo-700' },
  { day: 4, time: '14:00', subject: 'IT Fundamentals', teacher: 'J. Komilov', room: '101-IT Lab', color: 'bg-indigo-50 border-indigo-500 text-indigo-700' },
  { day: 1, time: '16:00', subject: 'General English B1', teacher: 'S. Mirzayeva', room: '202-Xona', color: 'bg-rose-50 border-rose-500 text-rose-700' },
  { day: 3, time: '16:00', subject: 'General English B1', teacher: 'S. Mirzayeva', room: '202-Xona', color: 'bg-rose-50 border-rose-500 text-rose-700' },
];

const roomOccupancy = [
  { name: '101-Xona (IT)', percentage: 85, color: 'bg-orange-500', capacity: 20, current: 17 },
  { name: '204-Xona (Ingliz)', percentage: 40, color: 'bg-emerald-500', capacity: 15, current: 6 },
  { name: '301-Xona (Matematika)', percentage: 100, color: 'bg-rose-500', capacity: 25, current: 25 },
  { name: 'Hall-A (Speaking)', percentage: 60, color: 'bg-blue-500', capacity: 50, current: 30 },
];

export const Schedule = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dars jadvali');

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Dars jadvali va Xonalar</h2>
            <p className="text-sm text-slate-500 mt-1">Markazning dars taqvimi va xonalar bandligini boshqarish</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-2xl mr-4">
              <button 
                onClick={() => setActiveTab('Dars jadvali')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === 'Dars jadvali' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Dars jadvali
              </button>
              <button 
                onClick={() => setActiveTab('Xonalar')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === 'Xonalar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Xonalar
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600 text-sm">
              <Download size={18} />
              <span>Export</span>
            </button>
            {isAdmin && (
              activeTab === 'Dars jadvali' ? (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm"
                >
                  <Plus size={18} />
                  <span>+ Dars qo'shish</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsRoomModalOpen(true)}
                  className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm"
                >
                  <Plus size={18} />
                  <span>+ Xona qo'shish</span>
                </button>
              )
            )}
          </div>
        </div>

        {activeTab === 'Dars jadvali' ? (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">

          <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 gap-4">
            <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
              <ChevronLeft size={18} className="text-slate-600" />
            </button>
            <span className="text-sm font-bold text-slate-900">16-21 Oktyabr, 2023</span>
            <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
              <ChevronRight size={18} className="text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Xona:</span>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none cursor-pointer">
                <option>Barcha xonalar</option>
                <option>304-Xona</option>
                <option>201-Xona</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">O'qituvchi:</span>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none cursor-pointer">
                <option>Barcha o'qituvchilar</option>
                <option>A. Jumaboyev</option>
                <option>M. Ahrorova</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all font-bold text-sm">
              <Filter size={18} />
              <span>Saralash</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Schedule Grid */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-100">
              <div className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider border-r border-slate-100 flex items-center justify-center">
                Vaqt
              </div>
              {days.map((day, i) => (
                <div key={i} className={cn(
                  "p-4 text-center border-r border-slate-100 last:border-r-0",
                  day.name === 'CHORSHANBA' ? "bg-orange-50/30" : ""
                )}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{day.name}</p>
                  <p className={cn(
                    "text-xl font-black mt-1",
                    day.name === 'CHORSHANBA' ? "text-[#ec5b13]" : "text-slate-900"
                  )}>{day.date}</p>
                </div>
              ))}
            </div>

            <div className="divide-y divide-slate-100">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-[100px_repeat(6,1fr)] min-h-[120px]">
                  <div className="p-4 text-xs font-bold text-slate-400 border-r border-slate-100 flex items-start justify-center pt-6">
                    {time}
                  </div>
                  {Array.from({ length: 6 }).map((_, dayIndex) => {
                    const lesson = scheduleData.find(d => d.day === dayIndex && d.time === time);
                    return (
                      <div key={dayIndex} className="p-2 border-r border-slate-100 last:border-r-0 relative group">
                        {lesson && (
                          <div className={cn(
                            "h-full rounded-xl border-l-4 p-3 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer",
                            lesson.color
                          )}>
                            <div>
                              <p className="text-xs font-black leading-tight">{lesson.subject}</p>
                              <p className="text-[10px] font-bold opacity-70 mt-1">{lesson.teacher}</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-70">
                              <MapPin size={10} />
                              <span className="text-[10px] font-bold">{lesson.room}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="w-72 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-6">Xonalar bandligi</h3>
              <div className="space-y-6">
                {roomOccupancy.map((room, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-700">{room.name}</span>
                      <span className="text-slate-900">{room.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", room.color)}
                        style={{ width: `${room.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roomOccupancy.map((room, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="size-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ec5b13] group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={28} />
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    room.percentage >= 90 ? "bg-rose-100 text-rose-700" :
                    room.percentage >= 60 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  )}>
                    {room.percentage >= 90 ? 'Band' : room.percentage >= 60 ? 'Qisman band' : 'Bo\'sh'}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-slate-900 mb-4">{room.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-500">Sig'imi:</span>
                    <span className="text-slate-900">{room.capacity} ta o'rin</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-500">Hozirgi bandlik:</span>
                    <span className="text-slate-900">{room.current} kishi</span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-400 uppercase tracking-wider">Bandlik darajasi</span>
                      <span className="text-slate-900">{room.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", room.color)}
                        style={{ width: `${room.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Room Modal */}
      <Modal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        title="Yangi xona qo'shish"
        footer={
          <>
            <button onClick={() => setIsRoomModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={() => setIsRoomModalOpen(false)} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Xona nomi yoki raqami</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" placeholder="Masalan: 101-Xona" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Xona turi (Yo'nalish)</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" placeholder="Masalan: IT Laboratoriya" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Sig'imi (O'quvchilar soni)</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="number" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" placeholder="Masalan: 20" />
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi dars qo'shish"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Guruhni tanlang</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Guruhni tanlang</option>
                <option>Math Alpha-1</option>
                <option>IELTS Intensive</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">O'qituvchi</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>O'qituvchini tanlang</option>
                <option>A. Jumaboyev</option>
                <option>M. Ahrorova</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Xona</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Xonani tanlang</option>
                <option>304-Xona</option>
                <option>201-Xona</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Kurs</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer appearance-none">
                <option>Kursni tanlang</option>
                <option>Matematika</option>
                <option>Ingliz tili</option>
              </select>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Kunlar</label>
            <div className="flex flex-wrap gap-2">
              {['Dush', 'Sesh', 'Chor', 'Pay', 'Juma', 'Shan'].map((day) => (
                <button key={day} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Boshlanish vaqti</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="time" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Tugash vaqti</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="time" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
