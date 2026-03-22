import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Clock, 
  BookOpen,
  MessageSquare,
  FileText,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Key,
  Lock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { api } from '@/src/lib/api';
import { Student } from '@/src/types';

export const StudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Umumiy');
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (err) {
        setError("O'quvchi ma'lumotlarini yuklashda xatolik yuz berdi.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const tabs = ['Umumiy', 'Davomat', 'To\'lovlar', 'Uyga vazifa', 'Izohlar'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Davomat':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900">Oxirgi davomat holati</h3>
            <div className="space-y-3">
              {[
                { date: '25.02.2026', group: student?.group || 'Noma\'lum', status: 'Keldi', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { date: '23.02.2026', group: student?.group || 'Noma\'lum', status: 'Keldi', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { date: '21.02.2026', group: student?.group || 'Noma\'lum', status: 'Kelmidi', color: 'text-rose-500', bg: 'bg-rose-50' },
                { date: '19.02.2026', group: student?.group || 'Noma\'lum', status: 'Sababli', color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.date}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.group}</p>
                    </div>
                  </div>
                  <span className={cn("text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider", item.bg, item.color)}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'To\'lovlar':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900">To'lovlar tarixi</h3>
            <div className="space-y-3">
              {[
                { date: '15.02.2026', amount: '450,000', method: 'Click', status: 'Muvaffaqiyatli' },
                { date: '15.01.2026', amount: '450,000', method: 'Payme', status: 'Muvaffaqiyatli' },
                { date: '15.12.2025', amount: '450,000', method: 'Naqd', status: 'Muvaffaqiyatli' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.amount} UZS</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date} • {item.method}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Uyga vazifa':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900">Uyga vazifalar</h3>
            <div className="space-y-3">
              {[
                { title: 'IELTS Writing Task 1', group: student?.group || 'Noma\'lum', date: '24.02.2026', status: 'Bajarildi', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2 },
                { title: 'Vocabulary Unit 5-6', group: student?.group || 'Noma\'lum', date: '22.02.2026', status: 'Bajarilmadi', color: 'text-rose-500', bg: 'bg-rose-50', icon: XCircle },
                { title: 'Reading Practice Test', group: student?.group || 'Noma\'lum', date: '20.02.2026', status: 'Bajarildi', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className={cn("size-10 rounded-xl bg-white flex items-center justify-center shadow-sm", item.color)}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.group} • {item.date}</p>
                    </div>
                  </div>
                  <span className={cn("text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider", item.bg, item.color)}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Izohlar':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900">O'qituvchilar izohlari</h3>
            <div className="space-y-4">
              {[
                { teacher: 'Alisher Navoiy', comment: 'Darsda juda faol qatnashmoqda. Writing bo\'yicha sezilarli o\'sish bor.', date: 'Bugun, 14:20' },
                { teacher: 'Malika Ahmedova', comment: 'Grammatika ustida ko\'proq ishlash kerak. Uyga vazifalarni o\'z vaqtida bajaryapti.', date: 'Kecha, 18:00' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-slate-900">{item.teacher}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "{item.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Active Groups */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4">A'zo bo'lgan guruhlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student?.group ? (
                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between group hover:border-[#ec5b13]/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-12 bg-white rounded-xl flex items-center justify-center text-[#ec5b13] shadow-sm">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{student.group}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">O'qituvchi: Noma'lum</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">FAOL</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Guruhga a'zo emas</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4">Oxirgi harakatlar</h3>
              <div className="space-y-4">
                {[
                  { icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'To\'lov amalga oshirildi', desc: '450,000 UZS miqdorida to\'lov qabul qilindi', time: 'Bugun, 14:20' },
                  { icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Izoh qoldirildi', desc: 'O\'qituvchi tomonidan darsdagi faolligi uchun izoh', time: 'Kecha, 18:00' },
                  { icon: User, color: 'text-orange-500', bg: 'bg-orange-50', title: 'Guruhga qo\'shildi', desc: `${student?.group || 'Guruh'} guruhiga muvaffaqiyatli qo'shildi`, time: '12-Oktyabr' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={cn("size-10 rounded-xl flex-shrink-0 flex items-center justify-center", item.bg, item.color)}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1 border-b border-slate-50 pb-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-slate-500 font-bold">Yuklanmoqda...</div>
        </main>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-rose-500 font-bold">{error || "O'quvchi topilmadi"}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-[#ec5b13] font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Orqaga qaytish</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-orange-400 to-[#ec5b13]"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="relative inline-block">
                  <div className="size-24 rounded-3xl bg-white p-1 shadow-xl">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full rounded-2xl object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-2xl border border-slate-100">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "absolute bottom-1 right-1 size-5 border-4 border-white rounded-full",
                    student.status === 'Faol' ? "bg-emerald-500" :
                    student.status === 'Muzlatilgan' ? "bg-amber-500" : "bg-slate-400"
                  )}></div>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-2xl font-black text-slate-900">{student.name}</h2>
                  <p className="text-sm font-bold text-slate-400">ID: #{student.id.substring(0, 8).toUpperCase()}</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone size={18} />
                    </div>
                    <span className="font-bold text-slate-700">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapPin size={18} />
                    </div>
                    <span className="font-bold text-slate-700">{student.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <span className="font-bold text-slate-700">{student.birthDate}</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button className="py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all">
                    Tahrirlash
                  </button>
                  <button className="py-3 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-rose-100 transition-all">
                    Muzlatish
                  </button>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Ota-onasi haqida</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Ismi sharifi</p>
                  <p className="text-sm font-bold text-slate-900">{student.parentName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Telefon raqami</p>
                  <p className="text-sm font-bold text-slate-900">{student.parentPhone}</p>
                </div>
              </div>
            </div>

            {/* Login Credentials */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Mobil ilova hisobi</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Login</p>
                    <p className="text-sm font-bold text-slate-900">{student.login || 'Kiritilmagan'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Parol</p>
                    <p className="text-sm font-bold text-slate-900">{student.password ? '••••••••' : 'Kiritilmagan'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats and Tabs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                    <AlertCircle size={20} />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Qarzdorlik</span>
                </div>
                <h4 className="text-2xl font-black text-red-500">{student.debt.toLocaleString()} <span className="text-xs font-normal text-slate-400">UZS</span></h4>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <CreditCard size={20} />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">To'langan</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900">{student.paid.toLocaleString()} <span className="text-xs font-normal text-slate-400">UZS</span></h4>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Davomat</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900">{student.attendance} <span className="text-xs font-normal text-slate-400">%</span></h4>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
                {tabs.map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-3 text-sm font-bold rounded-2xl transition-all",
                      activeTab === tab ? "bg-white text-[#ec5b13] shadow-sm" : "text-slate-500 hover:bg-white/50"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
