import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  CreditCard, 
  Mail,
  Lock,
  ChevronRight,
  LogOut,
  Camera
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';

export const Settings = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1000px] mx-auto w-full">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Sozlamalar</h2>
          <p className="text-sm text-slate-500 mt-1">Profil va tizim parametrlarini boshqarish</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1 space-y-2">
            {[
              { icon: User, label: 'Profil ma\'lumotlari', active: true },
              { icon: Bell, label: 'Bildirishnomalar', active: false },
              { icon: Shield, label: 'Xavfsizlik', active: false },
              { icon: Globe, label: 'Til va hudud', active: false },
              { icon: Smartphone, label: 'Mobil ilova', active: false },
              { icon: CreditCard, label: 'To\'lov rejalari', active: false },
            ].map((item) => (
              <button 
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                  item.active 
                    ? "bg-white text-[#ec5b13] shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all">
                <LogOut size={20} />
                <span>Tizimdan chiqish</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative group">
                  <div className="size-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-slate-50 group-hover:border-orange-100 transition-all">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRFOdoDi2u7SDmxIuUZ0wpJDQkYwAbeAS7R_S8bpsc4oAfW5x4SEAHVPAWHMFp61rWsqyOHwzZZscPNbGN3lPntv7_UuqujI3IfaMB4buiLVxi3n6P1lT22k7FbrfLoXpVGsMHkjJXWsZtpMaYGwFGL3kWvbHV5rCoYDhH1DrfknnbH5gb6NVozKUsAyLdtFF3HICEyRFzAHTBKqgDbZ5UYTjnLpx_swfQ524vg9VaiwSm-09nZK2xRI-oBX0kljhXeisTYSxK8I8y" 
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-[#ec5b13] hover:scale-110 transition-all">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Asilbek Kurbanov</h3>
                  <p className="text-sm text-slate-500 font-medium">Bosh administrator • ID: 88291</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider">Faol</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider">Premium</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase">Ism sharifi</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="Asilbek Kurbanov" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase">Email manzili</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="email" defaultValue="asilbek@eduly.uz" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase">Telefon raqami</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="+998 90 123 45 67" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase">Lavozimi</label>
                  <input type="text" defaultValue="Bosh administrator" disabled className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl outline-none font-bold text-sm text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
                <button className="px-6 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">O'zgarishlarni saqlash</button>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Lock size={20} className="text-[#ec5b13]" />
                Xavfsizlik sozlamalari
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Ikki bosqichli autentifikatsiya</p>
                      <p className="text-xs text-slate-500">Hisobingizni qo'shimcha himoya qiling</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Parolni o'zgartirish</p>
                      <p className="text-xs text-slate-500">Oxirgi marta 3 oy oldin o'zgartirilgan</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
