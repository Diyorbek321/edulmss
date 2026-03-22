import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Clock,
  Search,
  Users,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

const attendanceData = [
  { id: '1', name: 'Alisher Sadullayev', status: 'present', group: 'English IELTS #12' },
  { id: '2', name: 'Malika Karimova', status: 'absent', group: 'English IELTS #12' },
  { id: '3', name: 'Javohir Orifov', status: 'excused', group: 'Foundation #4' },
  { id: '4', name: 'Shaxnoza Hasanova', status: 'late', group: 'Foundation #4' },
  { id: '5', name: 'Sardor Azimov', status: 'present', group: 'Backend Pro #1' },
  { id: '6', name: 'Lola Tursunova', status: 'late', group: 'Backend Pro #1' },
  { id: '7', name: 'Dilshodbek Turgunboyev', status: 'present', group: 'SAT Math #2' },
  { id: '8', name: 'Zilola Ahmedova', status: 'absent', group: 'SAT Math #2' },
];

export const Attendance = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [selectedGroup, setSelectedGroup] = useState('English IELTS #12');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [students, setStudents] = useState(attendanceData);

  const filteredStudents = students.filter(s => s.group === selectedGroup);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const presentCount = filteredStudents.filter(s => s.status === 'present').length;
  const absentCount = filteredStudents.filter(s => s.status === 'absent').length;
  const lateCount = filteredStudents.filter(s => s.status === 'late').length;
  const excusedCount = filteredStudents.filter(s => s.status === 'excused').length;

  const getStatusBorder = (status: string) => {
    switch(status) {
      case 'present': return 'border-l-emerald-500 bg-emerald-50/30';
      case 'absent': return 'border-l-rose-500 bg-rose-50/30';
      case 'late': return 'border-l-amber-500 bg-amber-50/30';
      case 'excused': return 'border-l-blue-500 bg-blue-50/30';
      default: return 'border-l-transparent';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Davomatni belgilash</h2>
            <p className="text-sm text-slate-500 mt-1">Guruhlar bo'yicha kunlik davomatni qayd etish</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex items-center">
              <button 
                onClick={() => changeDate(-1)}
                className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="px-4 flex items-center gap-2 font-bold text-slate-700 min-w-[180px] justify-center">
                <Calendar size={18} className="text-[#ec5b13]" />
                <span>{formatDate(currentDate)}</span>
              </div>
              <button 
                onClick={() => changeDate(1)}
                className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Groups List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Guruhlar</h3>
              <div className="space-y-2">
                {['English IELTS #12', 'Foundation #4', 'Backend Pro #1', 'SAT Math #2'].map((group) => (
                  <button 
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group",
                      selectedGroup === group 
                        ? "bg-[#ec5b13] text-white shadow-lg shadow-orange-100" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span>{group}</span>
                    <Clock size={14} className={cn(selectedGroup === group ? "text-white/60" : "text-slate-300")} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Marking */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#ec5b13]">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedGroup}</h3>
                    <p className="text-xs text-slate-500 font-bold">O'qituvchi: Alisher Navoiy • 14:00 - 15:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 mr-4">
                    <div className="text-center px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                      <p className="text-[10px] text-emerald-600 font-black uppercase">Keldi</p>
                      <p className="text-sm font-black text-emerald-700">{presentCount}</p>
                    </div>
                    <div className="text-center px-3 py-1 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-[10px] text-amber-600 font-black uppercase">Kechikdi</p>
                      <p className="text-sm font-black text-amber-700">{lateCount}</p>
                    </div>
                    <div className="text-center px-3 py-1 bg-rose-50 rounded-lg border border-rose-100">
                      <p className="text-[10px] text-rose-600 font-black uppercase">Kelmadi</p>
                      <p className="text-sm font-black text-rose-700">{absentCount}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        // In a real app, this would save to the database
                        alert(`${selectedGroup} uchun ${formatDate(currentDate)} sanasidagi davomat saqlandi!`);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                      Saqlash
                    </button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {filteredStudents.map((student, i) => (
                  <div key={student.id} className={cn("p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/50 transition-colors gap-4 border-l-4", getStatusBorder(student.status))}>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-slate-300 w-4">{i + 1}</span>
                      <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{student.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                      <button 
                        onClick={() => isAdmin && handleStatusChange(student.id, 'present')}
                        disabled={!isAdmin}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                          student.status === 'present' 
                            ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-200" 
                            : "bg-slate-50 text-slate-400 border-2 border-transparent hover:bg-emerald-50 hover:text-emerald-600",
                          !isAdmin && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Check size={14} />
                        Keldi
                      </button>
                      <button 
                        onClick={() => isAdmin && handleStatusChange(student.id, 'late')}
                        disabled={!isAdmin}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                          student.status === 'late' 
                            ? "bg-amber-100 text-amber-700 border-2 border-amber-200" 
                            : "bg-slate-50 text-slate-400 border-2 border-transparent hover:bg-amber-50 hover:text-amber-600",
                          !isAdmin && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <AlertCircle size={14} />
                        Kechikdi
                      </button>
                      <button 
                        onClick={() => isAdmin && handleStatusChange(student.id, 'excused')}
                        disabled={!isAdmin}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                          student.status === 'excused' 
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-200" 
                            : "bg-slate-50 text-slate-400 border-2 border-transparent hover:bg-blue-50 hover:text-blue-600",
                          !isAdmin && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Clock size={14} />
                        Sababli
                      </button>
                      <button 
                        onClick={() => isAdmin && handleStatusChange(student.id, 'absent')}
                        disabled={!isAdmin}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                          student.status === 'absent' 
                            ? "bg-rose-100 text-rose-700 border-2 border-rose-200" 
                            : "bg-slate-50 text-slate-400 border-2 border-transparent hover:bg-rose-50 hover:text-rose-600",
                          !isAdmin && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <X size={14} />
                        Kelmadi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
