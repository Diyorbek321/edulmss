import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';

const revenueData = [
  { name: 'Yan', revenue: 45000000, expenses: 32000000 },
  { name: 'Feb', revenue: 52000000, expenses: 34000000 },
  { name: 'Mar', revenue: 48000000, expenses: 31000000 },
  { name: 'Apr', revenue: 61000000, expenses: 38000000 },
  { name: 'May', revenue: 55000000, expenses: 35000000 },
  { name: 'Iyun', revenue: 67000000, expenses: 40000000 },
];

const studentGrowth = [
  { name: 'Yan', count: 120 },
  { name: 'Feb', count: 135 },
  { name: 'Mar', count: 142 },
  { name: 'Apr', count: 158 },
  { name: 'May', count: 175 },
  { name: 'Iyun', count: 194 },
];

const courseDistribution = [
  { name: 'Ingliz tili', value: 45 },
  { name: 'Matematika', value: 25 },
  { name: 'Web Dev', value: 20 },
  { name: 'Rus tili', value: 10 },
];

const COLORS = ['#ec5b13', '#3b82f6', '#10b981', '#f59e0b'];

export const Reports = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Hisobotlar</h2>
            <p className="text-sm text-slate-500 mt-1">Markaz faoliyatining statistik tahlili</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex items-center">
              <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Haftalik</button>
              <button className="px-4 py-2 text-sm font-bold bg-orange-50 text-[#ec5b13] rounded-xl transition-all">Oylik</button>
              <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Yillik</button>
            </div>
            <button className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm">
              <Download size={18} />
              <span>PDF Yuklash</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 text-[#ec5b13] rounded-xl">
                <Wallet size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                <ArrowUpRight size={14} />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-bold">Umumiy tushum</p>
            <h3 className="text-2xl font-black mt-1 text-slate-900">328,000,000 <span className="text-xs font-normal text-slate-400">UZS</span></h3>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Users size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                <ArrowUpRight size={14} />
                <span>+8.2%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-bold">Faol o'quvchilar</p>
            <h3 className="text-2xl font-black mt-1 text-slate-900">194 <span className="text-xs font-normal text-slate-400">ta</span></h3>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                <ArrowUpRight size={14} />
                <span>+15.3%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-bold">Sof foyda</p>
            <h3 className="text-2xl font-black mt-1 text-slate-900">118,000,000 <span className="text-xs font-normal text-slate-400">UZS</span></h3>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <Calendar size={24} />
              </div>
              <div className="flex items-center gap-1 text-rose-500 text-xs font-black">
                <ArrowDownRight size={14} />
                <span>-2.1%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-bold">Davomat (o'rtacha)</p>
            <h3 className="text-2xl font-black mt-1 text-slate-900">88.4 <span className="text-xs font-normal text-slate-400">%</span></h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900">Moliya dinamikasi</h3>
                <p className="text-sm text-slate-500">Oxirgi 6 oylik tushum va xarajatlar</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec5b13" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ec5b13" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#ec5b13" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Growth Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900">O'quvchilar o'sishi</h3>
                <p className="text-sm text-slate-500">Yangi qo'shilgan o'quvchilar soni</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#ec5b13" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Distribution */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900">Kurslar bo'yicha taqsimot</h3>
                <p className="text-sm text-slate-500">O'quvchilarning kurslar bo'yicha foizi</p>
              </div>
            </div>
            <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 pr-8">
                {courseDistribution.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="size-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                      <span className="text-xs text-slate-500">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity / Insights */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Sun'iy intellekt tahlili</h3>
            <div className="space-y-6">
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
                    <TrendingUp size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900">O'sish tendensiyasi</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Oxirgi 3 oyda Ingliz tili kurslariga talab 24% ga oshdi. Yangi guruhlar ochish tavsiya etiladi.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Users size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900">O'quvchilar faolligi</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Davomat ko'rsatkichi 88% ni tashkil etmoqda. Bu o'tgan oyga nisbatan biroz pastroq.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <Wallet size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900">Moliyaviy holat</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To'lovlar o'z vaqtida amalga oshirilmoqda. Qarzdorlik darajasi 5% dan past.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
