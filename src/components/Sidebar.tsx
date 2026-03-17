import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Layers, 
  BookOpen, 
  CalendarCheck, 
  Wallet, 
  BarChart3, 
  Settings,
  School,
  CreditCard,
  Calendar,
  Gift,
  LifeBuoy,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'O‘quvchilar', path: '/students' },
  { icon: GraduationCap, label: 'O‘qituvchilar', path: '/teachers' },
  { icon: LifeBuoy, label: 'Support O\'qituvchilar', path: '/support-teachers' },
  { icon: Layers, label: 'Guruhlar', path: '/groups' },
  { icon: BookOpen, label: 'Kurslar', path: '/courses' },
  { icon: CalendarCheck, label: 'Davomat', path: '/attendance' },
  { icon: Wallet, label: 'To‘lovlar', path: '/payments' },
  { icon: Calendar, label: 'Jadval', path: '/schedule' },
  { icon: CreditCard, label: 'Ish haqi', path: '/salaries' },
  { icon: MessageCircle, label: 'Guruh Chatlari', path: '/chat' },
  { icon: MessageSquare, label: 'SMS Xabarnoma', path: '/sms' },
  { icon: Gift, label: 'Gamifikatsiya', path: '/gamification' },
  { icon: BarChart3, label: 'Hisobotlar', path: '/reports' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-[#ec5b13] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
          <School size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-none">Eduly</h1>
          <p className="text-xs text-slate-500">Management</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-orange-50 text-[#ec5b13] font-bold" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn(isActive ? "text-[#ec5b13]" : "text-slate-400")} />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
            isActive 
              ? "bg-orange-50 text-[#ec5b13] font-bold" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <Settings size={20} className="text-slate-400" />
          <span className="text-sm font-medium">Sozlamalar</span>
        </NavLink>
        
        <div className="mt-4 p-2 bg-slate-50 rounded-xl flex items-center gap-3">
          <div className="size-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRFOdoDi2u7SDmxIuUZ0wpJDQkYwAbeAS7R_S8bpsc4oAfW5x4SEAHVPAWHMFp61rWsqyOHwzZZscPNbGN3lPntv7_UuqujI3IfaMB4buiLVxi3n6P1lT22k7FbrfLoXpVGsMHkjJXWsZtpMaYGwFGL3kWvbHV5rCoYDhH1DrfknnbH5gb6NVozKUsAyLdtFF3HICEyRFzAHTBKqgDbZ5UYTjnLpx_swfQ524vg9VaiwSm-09nZK2xRI-oBX0kljhXeisTYSxK8I8y" 
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Asilbek K.</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
