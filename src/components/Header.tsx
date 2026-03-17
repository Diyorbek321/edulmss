import React from 'react';
import { Search, Bell, PlusCircle } from 'lucide-react';

export const Header = ({ title }: { title?: string }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="bg-[#ec5b13] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95">
          <PlusCircle size={18} />
          <span>Qo'shish</span>
        </button>
        
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
