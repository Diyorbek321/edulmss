import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Filter,
  User
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';
import { SMSTemplateManager, SMSTemplate } from '@/src/components/SMSTemplateManager';

interface SMSHistory {
  id: string;
  recipient: string;
  phone: string;
  message: string;
  type: 'Qarzdorlik' | 'Davomat' | 'E\'lon' | 'Boshqa';
  status: 'Yuborildi' | 'Kutilmoqda' | 'Xatolik';
  date: string;
}

const initialHistory: SMSHistory[] = [
  { id: '1', recipient: 'Jasur Sadullayev (Ota)', phone: '+998 90 123 45 67', message: 'Hurmatli ota-ona, farzandingiz Alisherning oylik to\'lovidan 250,000 so\'m qarzdorligi mavjud. Iltimos to\'lovni amalga oshiring.', type: 'Qarzdorlik', status: 'Yuborildi', date: 'Bugun, 10:30' },
  { id: '2', recipient: 'Zuhra Karimova (Ona)', phone: '+998 93 456 78 90', message: 'Hurmatli ota-ona, farzandingiz Malika bugun darsga sababsiz kelmadi.', type: 'Davomat', status: 'Yuborildi', date: 'Kecha, 15:45' },
  { id: '3', recipient: 'Barcha o\'quvchilar', phone: 'Ko\'p (154 ta)', message: 'Diqqat! Ertaga markazimizda bayram munosabati bilan darslar bo\'lmaydi.', type: 'E\'lon', status: 'Yuborildi', date: '25.02.2026' },
];

const initialTemplates: SMSTemplate[] = [
  { id: 't1', title: 'Qarzdorlik eslatmasi', content: 'Hurmatli ota-ona, farzandingiz [Ism]ning oylik to\'lovidan [Summa] so\'m qarzdorligi mavjud. Iltimos to\'lovni amalga oshiring.' },
  { id: 't2', title: 'Davomat (Kelmadi)', content: 'Hurmatli ota-ona, farzandingiz [Ism] bugun darsga sababsiz kelmadi.' },
  { id: 't3', title: 'Dars vaqti o\'zgardi', content: 'Hurmatli o\'quvchi, bugungi darsingiz vaqti [Vaqt] ga o\'zgartirildi.' },
];

export const SMS = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('Yangi xabar');
  const [history, setHistory] = useState<SMSHistory[]>(initialHistory);
  const [templates, setTemplates] = useState<SMSTemplate[]>(initialTemplates);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    recipientType: 'individual', // individual, group, all, debtors
    recipient: '',
    type: 'Boshqa',
    message: ''
  });

  useEffect(() => {
    const phone = searchParams.get('phone');
    const name = searchParams.get('name');
    
    if (phone || name) {
      setFormData(prev => ({
        ...prev,
        recipientType: 'individual',
        recipient: name ? `${name} (${phone})` : phone || ''
      }));
      setActiveTab('Yangi xabar');
    }
  }, [searchParams]);

  const handleSendSMS = () => {
    if (!formData.message) return;

    let phoneStr = '+998 XX XXX XX XX';
    if (formData.recipientType === 'individual') {
      const match = formData.recipient.match(/\(([^)]+)\)/);
      if (match) {
        phoneStr = match[1];
      } else if (formData.recipient.includes('+')) {
        phoneStr = formData.recipient;
      }
    } else {
      phoneStr = 'Ko\'p';
    }

    const newSMS: SMSHistory = {
      id: Math.random().toString(),
      recipient: formData.recipientType === 'all' ? 'Barcha o\'quvchilar' : 
                 formData.recipientType === 'debtors' ? 'Barcha qarzdorlar' : 
                 formData.recipient.replace(/\s*\([^)]+\)/, '') || 'Noma\'lum',
      phone: phoneStr,
      message: formData.message,
      type: formData.type as any,
      status: 'Yuborildi',
      date: 'Hozir'
    };

    setHistory(prev => [newSMS, ...prev]);
    setFormData({ recipientType: 'individual', recipient: '', type: 'Boshqa', message: '' });
    setActiveTab('Tarix');
    alert('SMS muvaffaqiyatli yuborildi!');
  };

  const applyTemplate = (content: string) => {
    setFormData(prev => ({ ...prev, message: content }));
    setIsTemplateModalOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Yuborildi': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Kutilmoqda': return <Clock size={16} className="text-amber-500" />;
      case 'Xatolik': return <AlertCircle size={16} className="text-rose-500" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Qarzdorlik': return 'bg-rose-100 text-rose-700';
      case 'Davomat': return 'bg-amber-100 text-amber-700';
      case 'E\'lon': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSaveTemplate = (template: SMSTemplate) => {
    setTemplates(prev => {
      const exists = prev.find(t => t.id === template.id);
      if (exists) {
        return prev.map(t => t.id === template.id ? template : t);
      }
      return [...prev, template];
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">SMS Xabarnoma</h2>
            <p className="text-sm text-slate-500 mt-1">Ota-onalar va o'quvchilarga SMS yuborish tizimi</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('Yangi xabar')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'Yangi xabar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Yangi xabar
            </button>
            <button 
              onClick={() => setActiveTab('Tarix')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'Tarix' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Yuborilganlar tarixi
            </button>
            <button 
              onClick={() => setActiveTab('Shablonlar')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'Shablonlar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Shablonlar
            </button>
          </div>
        </div>

        {activeTab === 'Yangi xabar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">1. Qabul qiluvchini tanlang</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'individual', label: 'Bitta o\'quvchi', icon: User },
                      { id: 'group', label: 'Guruh', icon: Users },
                      { id: 'debtors', label: 'Qarzdorlar', icon: AlertCircle },
                      { id: 'all', label: 'Barchaga', icon: MessageSquare },
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, recipientType: type.id, recipient: '' }))}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                          formData.recipientType === type.id 
                            ? "border-[#ec5b13] bg-orange-50 text-[#ec5b13]" 
                            : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                        )}
                      >
                        <type.icon size={24} />
                        <span className="text-xs font-bold">{type.label}</span>
                      </button>
                    ))}
                  </div>

                  {formData.recipientType === 'individual' && (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="O'quvchi ismini qidiring..." 
                        value={formData.recipient}
                        onChange={e => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm"
                      />
                    </div>
                  )}

                  {formData.recipientType === 'group' && (
                    <select 
                      value={formData.recipient}
                      onChange={e => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
                    >
                      <option value="">Guruhni tanlang</option>
                      <option value="English IELTS #12">English IELTS #12</option>
                      <option value="Foundation #4">Foundation #4</option>
                    </select>
                  )}
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">2. Xabar matni</h3>
                    <button 
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="text-xs font-bold text-[#ec5b13] hover:underline"
                    >
                      Shablonlardan tanlash
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <select 
                      value={formData.type}
                      onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full md:w-1/3 px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm cursor-pointer"
                    >
                      <option value="Boshqa">Boshqa (Oddiy xabar)</option>
                      <option value="Qarzdorlik">Qarzdorlik eslatmasi</option>
                      <option value="Davomat">Davomat (Kelmadi)</option>
                      <option value="E'lon">E'lon</option>
                    </select>

                    <div className="relative">
                      <textarea 
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Xabar matnini kiriting..."
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium text-sm resize-none h-40"
                      />
                      <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">
                        {formData.message.length} / 160 belgi (1 SMS)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={handleSendSMS}
                    disabled={!formData.message || (formData.recipientType !== 'all' && formData.recipientType !== 'debtors' && !formData.recipient)}
                    className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
                  >
                    <Send size={18} />
                    <span>Xabarni yuborish</span>
                  </button>
                </div>

              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">SMS Balans</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-black text-slate-900">4,250</span>
                  <span className="text-sm font-bold text-slate-500 mb-1.5">ta SMS qoldi</span>
                </div>
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                  Paket sotib olish
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Ma'lumot</h3>
                <ul className="space-y-3 text-sm font-medium text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-1.5 rounded-full bg-[#ec5b13] flex-shrink-0"></div>
                    <p>Bitta SMS uzunligi lotin alifbosida 160 belgi, kirill alifbosida 70 belgidan iborat.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-1.5 rounded-full bg-[#ec5b13] flex-shrink-0"></div>
                    <p>O'quvchi ismini avtomatik qo'yish uchun [Ism] tegidan foydalaning.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-1.5 rounded-full bg-[#ec5b13] flex-shrink-0"></div>
                    <p>Qarzdorlik summasi uchun [Summa] tegidan foydalaning.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : activeTab === 'Tarix' ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
              <div className="relative group flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Qabul qiluvchi yoki matn bo'yicha qidirish..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder:text-slate-400 text-sm outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold text-sm">
                <Filter size={18} />
                <span>Filtrlar</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Qabul qiluvchi</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Xabar matni</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Turi</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider">Sana</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-slate-900">{item.recipient}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 max-w-md truncate" title={item.message}>
                          {item.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", getTypeColor(item.type))}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">
                        {item.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {getStatusIcon(item.status)}
                          <span className="text-xs font-bold text-slate-700">{item.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8">
            <SMSTemplateManager 
              templates={templates} 
              onSave={handleSaveTemplate} 
              onDelete={handleDeleteTemplate} 
            />
          </div>
        )}
      </main>

      {/* Templates Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="SMS Shablonlar"
        footer={
          <button onClick={() => setIsTemplateModalOpen(false)} className="w-full py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Yopish</button>
        }
      >
        <div className="space-y-4">
          {templates.map(template => (
            <div key={template.id} className="p-4 rounded-2xl border border-slate-200 hover:border-[#ec5b13]/30 hover:bg-orange-50/30 transition-all group cursor-pointer" onClick={() => applyTemplate(template.content)}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-black text-slate-900">{template.title}</h4>
                <button className="text-xs font-bold text-[#ec5b13] opacity-0 group-hover:opacity-100 transition-opacity">Tanlash</button>
              </div>
              <p className="text-sm text-slate-600">{template.content}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
