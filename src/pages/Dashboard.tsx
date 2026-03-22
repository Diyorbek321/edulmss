import React from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CalendarDays,
  CreditCard,
  ArrowRight,
  Send,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

const data = [
  { name: '1 May', value: 150 },
  { name: '8 May', value: 130 },
  { name: '15 May', value: 160 },
  { name: '22 May', value: 120 },
  { name: '30 May', value: 180 },
];

const kpis = [
  { 
    label: 'Bugungi tushum', 
    value: '1,200,000', 
    unit: 'UZS', 
    trend: '+12%', 
    icon: CreditCard, 
    color: 'bg-emerald-100 text-emerald-600' 
  },
  { 
    label: 'Oylik tushum', 
    value: '45,000,000', 
    unit: 'UZS', 
    trend: '+5.2%', 
    icon: CalendarDays, 
    color: 'bg-blue-100 text-blue-600' 
  },
  { 
    label: 'Qarzdorlar soni', 
    value: '24', 
    unit: 'ta o\'quvchi', 
    trend: 'Yuqori xavf', 
    icon: AlertTriangle, 
    color: 'bg-red-100 text-red-600' 
  },
  { 
    label: 'Kutilayotgan to\'lovlar', 
    value: '8,500,000', 
    unit: 'UZS', 
    trend: 'Oktyabr', 
    icon: TrendingUp, 
    color: 'bg-orange-100 text-[#ec5b13]' 
  },
];

const transactions = [
  { id: 1, name: 'Alisher Navoiy', amount: '450,000', type: 'Click', date: '12.10.2023', status: 'Muvaffaqiyatli', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjzXzRfZ_S4znD0vWOaBFoV-u-fmjui_kRJ7rlN1F0ey74_tOI-Tbj196PU9c9N1ByWX7jdZkixybLNDETHS46_qCv-vOmoE1r-gC9g0cIHLLyrwwhmYCxT3t-BdueB1WS6KCf_G3ml6HkrnZOfZEGxeAACHJHU8vklqefnL7u3lgtYtTQpS9S2bsWLve_SOU8WkqFJD5msQoeZPeYn5FvBTvwVhFd_CtZNpf7dPSsGAsKpAI5RPps5kI2vprP-HblB6-W7KC4H8m7' },
  { id: 2, name: 'Zuhra Karimo', amount: '500,000', type: 'Cash', date: '12.10.2023', status: 'Muvaffaqiyatli', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVMnlNtSq6jbddU-dRLPRq3d8ISfnExTECD5l1nXsdmSQlUvVH8wCpeJAo2MgMhPYe3JWdBF3YOlfVb974y8EAHT11BAlTAcWhs1dopkfJkpk-XRsqRsmCqgz3w8ik3j5G9nwwbNqPzr0pcnxMOkIcu4lTA2OfnrquVAR74kT_knl4r76hPXEdfKmThmB7qYjNkxWb7W4FJC2m5ew4j4OfH9AXOskHauGTZ7sZXR4k_NVSfXIynZtlyU_gDzw4C8naVSOKDceZqzyO' },
  { id: 3, name: 'Jasur Jumayev', amount: '300,000', type: 'Payme', date: '11.10.2023', status: 'Kutilmoqda', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV2oC8rvW037ooWUGcg312TAvm5-w3eHmR3QLxE5-8YiCk-qWS_cEEWeqTSZ0vhxafQtpz0lcQvfVhL7BKy3NOTEwXnQvPdYGr5i6WTxVFsY_Pr6avDPDUG3RecC4Q-HFjH__ZnenyDUp-qFpzKxEz3w_ZiglzpPyO6sDi7hpZp4JdgBlpBdCKTnnve3Nhbcv_4GELajZYnDWtD-xOrV7Y8qNtnS6rx59eSyRb57ZqfFncMAufuFfuXHDhOwwytHM0QtVXaMPq5kAA' },
  { id: 4, name: 'Malika Ergasheva', amount: '450,000', type: 'Card', date: '11.10.2023', status: 'Muvaffaqiyatli', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMmDm-zx51oUHxokRmfmCBFlF_73x5ZyvNqnrLd9RA3IvGvoZJ0zOgrNGnwOvfJFZ7Nl9cbCk0nuNZ5p7Ev4RYaOo-FruOnrYeeuRp464L2ybBe44weQu_V417nAFaxXkC38NoKUeKygjpMlaeLf-blAI3qbkzvxiF_X1tV5fJR797VAP7Cpb5gJ9-0m9AqNiCx68cce9oAhB6G2F8XeIEdGnrYNkwQqLF5UrHQCfWZS3Gm8BJ0c6C8kGCkw7pqNhqOfDUMWDA9nL' },
];

const debtors = [
  { name: 'Sardor Azimov', amount: '850,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEgShRT7iSl9eU2zONcs8uKHroIp97Ng85KM8IU3UvzumGtwNlbHb08kJE7XCMvoNRkRFidYxeFg2poh78JBIjZU21lRESfJACa8Dm1_gIZ6jXHrkC-84OssKCErPplj6KY_8uLyQ5CBnONzxo4chQSOjZCOKlTD0kgoC9FLnOXARx8Pxf8cJHbQnIla5TDbdEYO1oLjod6JlOlGDotFQ7vHkGL7ugueklWS-iqlx1Jw57Asl39OmfyFPx-XX4SFK64Qsw-dL5VMNH' },
  { name: 'Lola Tursunova', amount: '450,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_DKEqAfffVmiWngxFru_R_IcLJvlI05TEiOEJ6WfXAhCX2ZxoqHP_MENFBZsM5awqVlMmfY9OMg-_-rWG4I5nvnM3isr3-vhuIfkNxUNez76LnO3v4NcEZLxfDqtoeBg7G8lR0FSz30TdeyK-atwiq8nnpgpM5xltLbk0FGISjrN3vQRo3qvGke69MoStXuS6kAeOrAgmDqD4ozeO3lE8NFADsidCeNc1ihvAzZ9uzeFMi-yHfk5-Z4RDIDVjMYJCiiftflZfVVpD' },
  { name: 'Bekzod Karimov', amount: '1,200,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuJKAm9QPSvHCKeXAbcRSgxk3ImZPK73OG--PmRnXH1FsOyOAABcwk5jEZW0Me5JBVfPWCzXh6Mp60bPvxfd9oUWdtdPcaDiBTngp_Dj-OXYP7XBY5LDxP-MjSFag_etkAjOJjJamYWyU1PwKf6jeKbzhtKXSx2mcdwErZ-Eo4iJjIhJvD0l3ahZL4CBNbZL0i00fSzE_S9lH5YqdeDPohOp-F20qNSwiitVFmBidtAwuA-O7hpOjgHuL2AC3bTxaCBd1zevSNu-JN' },
  { name: 'Nigora Alieva', amount: '300,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzgTJOLHuTNU-YAKR2wghkhH_fY9rbsEojyb5-Rg5DP8fzV6k1aycsE59H1xA7pNGcBj6uwDYNmiMY_yAlCYDWbP2zk9jSWKCWmyG7rsBUQGlXBP19QiJx1oQpO12oara3ejCE_GFlm4rNPZGXkd0PHZx5ClhwauOpXfqXno-H3RCU-zGasWnBdeMvfzEgvzLr47SSmIeBVXVzZK3h1s1jOBaiMgljMct3V1v2VM2AC4FQOzdj211yjDlZ8hQJpAEjrtVltPfmewBU' },
];

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        {/* KPI Cards */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-2 rounded-xl", kpi.color)}>
                    <kpi.icon size={24} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-0.5 px-2 py-1 rounded-lg",
                    kpi.trend.includes('+') ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50"
                  )}>
                    {kpi.trend.includes('+') && <TrendingUp size={12} />}
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-bold">{kpi.label}</p>
                <h3 className="text-2xl font-black mt-1 text-slate-900">
                  {kpi.value} <span className="text-sm font-normal text-slate-400">{kpi.unit}</span>
                </h3>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-8">
            {isAdmin && (
              <>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Tushum (Oxirgi 30 kun)</h2>
                      <p className="text-sm text-slate-500">Umumiy moliyaviy o'sish ko'rsatkichi</p>
                    </div>
                    <select className="bg-slate-100 border-none rounded-xl text-xs font-bold py-2 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer">
                      <option>Oxirgi 30 kun</option>
                      <option>Oxirgi 7 kun</option>
                    </select>
                  </div>
                  
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec5b13" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#ec5b13" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                          dy={10}
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#ec5b13" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Oxirgi tranzaksiyalar</h2>
                    <button className="text-[#ec5b13] text-sm font-bold hover:underline flex items-center gap-1">
                      Hammasini ko'rish <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">O‘quvchi</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Summa</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">To'lov turi</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Sana</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Holati</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {transactions.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => navigate(`/students/${t.id}`)}
                                className="flex items-center gap-3 text-left hover:text-[#ec5b13] transition-colors"
                              >
                                <img className="size-9 rounded-full border border-slate-200 object-cover" src={t.avatar} alt={t.name} />
                                <span className="font-bold text-sm text-slate-700 group-hover:text-[#ec5b13]">{t.name}</span>
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-black text-slate-900">{t.amount} UZS</td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{t.type}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{t.date}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                t.status === 'Muvaffaqiyatli' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                              )}>
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Debtors List */}
            {isAdmin && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-red-500" />
                    Qarzdorlar ro'yxati
                  </h2>
                  <button className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                    <MoreVertical size={18} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {debtors.map((debtor, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <img className="size-11 rounded-xl object-cover shadow-sm" src={debtor.avatar} alt={debtor.name} />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{debtor.name}</h4>
                          <p className="text-xs text-red-500 font-black">{debtor.amount} UZS</p>
                        </div>
                      </div>
                      <button className="p-2 text-[#ec5b13] bg-orange-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-[#ec5b13] hover:text-white shadow-sm" title="Xabarnoma yuborish">
                        <Send size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:bg-slate-50 hover:border-[#ec5b13]/30 hover:text-[#ec5b13] transition-all">
                  Hammani ko'rish
                </button>
              </div>
            )}

            {/* Quick Stats / Today's Lessons Preview */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4">Bugungi darslar</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-sm font-bold">IELTS Intensive</p>
                      <p className="text-[10px] text-slate-400">14:00 - 15:30 • Room 302</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-orange-500 animate-pulse"></div>
                    <div>
                      <p className="text-sm font-bold">Mathematics SAT</p>
                      <p className="text-[10px] text-slate-400">16:00 - 17:30 • Room 101</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">
                  Jadvalni ko'rish
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 size-32 bg-[#ec5b13] rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
