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
  MessageCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: Users, label: 'O‘quvchilar', path: '/students', roles: ['ADMIN', 'TEACHER'] },
  { icon: GraduationCap, label: 'O‘qituvchilar', path: '/teachers', roles: ['ADMIN'] },
  { icon: LifeBuoy, label: 'Support O\'qituvchilar', path: '/support-teachers', roles: ['ADMIN'] },
  { icon: Layers, label: 'Guruhlar', path: '/groups', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: BookOpen, label: 'Kurslar', path: '/courses', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: CalendarCheck, label: 'Davomat', path: '/attendance', roles: ['ADMIN', 'TEACHER'] },
  { icon: Wallet, label: 'To‘lovlar', path: '/payments', roles: ['ADMIN', 'STUDENT'] },
  { icon: Calendar, label: 'Jadval', path: '/schedule', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: CreditCard, label: 'Ish haqi', path: '/salaries', roles: ['ADMIN', 'TEACHER'] },
  { icon: MessageCircle, label: 'Guruh Chatlari', path: '/chat', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: MessageSquare, label: 'SMS Xabarnoma', path: '/sms', roles: ['ADMIN'] },
  { icon: Gift, label: 'Gamifikatsiya', path: '/gamification', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { icon: BarChart3, label: 'Hisobotlar', path: '/reports', roles: ['ADMIN'] },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

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
      
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {filteredNavItems.map((item) => (
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
        
        <div className="mt-4 p-2 bg-slate-50 rounded-xl flex items-center gap-3 relative group">
          <div className="size-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200 flex items-center justify-center text-slate-500 font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name || user?.email || 'Foydalanuvchi'}</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{user?.role || 'Mehmon'}</p>
          </div>
          <button 
            onClick={logout}
            className="absolute right-2 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
            title="Chiqish"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
