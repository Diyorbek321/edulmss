import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Gift, 
  Coins, 
  ShoppingBag, 
  Edit2, 
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/Modal';

interface Reward {
  id: string;
  name: string;
  cost: number;
  stock: number;
  image: string;
}

const initialRewards: Reward[] = [
  { id: '1', name: 'Brendlangan daftar', cost: 50, stock: 100, image: 'https://picsum.photos/seed/notebook/400/300' },
  { id: '2', name: 'Ruchka', cost: 20, stock: 250, image: 'https://picsum.photos/seed/pen/400/300' },
  { id: '3', name: 'Ingliz tili lug\'ati', cost: 150, stock: 30, image: 'https://picsum.photos/seed/book/400/300' },
  { id: '4', name: '1 oylik bepul dars', cost: 1000, stock: 5, image: 'https://picsum.photos/seed/class/400/300' },
  { id: '5', name: 'AirPods Pro', cost: 5000, stock: 2, image: 'https://picsum.photos/seed/airpods/400/300' },
];

const recentPurchases = [
  { id: '1', student: 'Alisher Sadullayev', reward: 'Brendlangan daftar', cost: 50, date: 'Bugun, 14:30' },
  { id: '2', student: 'Malika Karimova', reward: 'Ruchka', cost: 20, date: 'Kecha, 16:15' },
  { id: '3', student: 'Javohir Orifov', reward: '1 oylik bepul dars', cost: 1000, date: '25.02.2026' },
];

export const Gamification = () => {
  const [activeTab, setActiveTab] = useState('Mukofotlar');
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    cost: 0,
    stock: 0,
    image: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setEditingReward(null);
    setFormData({ name: '', cost: 0, stock: 0, image: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (reward: Reward) => {
    setEditingReward(reward);
    setFormData({
      name: reward.name,
      cost: reward.cost,
      stock: reward.stock,
      image: reward.image
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Haqiqatan ham bu mukofotni o\'chirmoqchimisiz?')) {
      setRewards(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editingReward) {
      setRewards(prev => prev.map(r => r.id === editingReward.id ? { ...r, ...formData } : r));
    } else {
      const newReward: Reward = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        image: formData.image || `https://picsum.photos/seed/${Math.random()}/400/300`
      };
      setRewards(prev => [...prev, newReward]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Gamifikatsiya</h2>
            <p className="text-sm text-slate-500 mt-1">O'quvchilar uchun tangalar va mukofotlar tizimi</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-2xl mr-4">
              <button 
                onClick={() => setActiveTab('Mukofotlar')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === 'Mukofotlar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Mukofotlar
              </button>
              <button 
                onClick={() => setActiveTab('Xaridlar')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === 'Xaridlar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Xaridlar tarixi
              </button>
            </div>
            {activeTab === 'Mukofotlar' && (
              <button 
                onClick={handleAddClick}
                className="flex items-center gap-2 bg-[#ec5b13] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95 text-sm"
              >
                <Plus size={18} />
                <span>+ Mukofot qo'shish</span>
              </button>
            )}
          </div>
        </div>

        {activeTab === 'Mukofotlar' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditClick(reward)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(reward.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-slate-900 mb-2 line-clamp-2">{reward.name}</h3>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Narxi</span>
                      <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <Coins size={16} />
                        <span className="font-black">{reward.cost} tanga</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qoldiq</span>
                      <span className="text-sm font-black text-slate-900">{reward.stock} ta</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">O'quvchilar xaridlari</h3>
                  <p className="text-xs text-slate-500 font-bold">Tangalar evaziga olingan mukofotlar tarixi</p>
                </div>
              </div>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ec5b13] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="O'quvchi qidirish..." 
                  className="w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder:text-slate-400 text-sm outline-none transition-all"
                />
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                      {purchase.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{purchase.student}</p>
                      <p className="text-xs text-slate-500">{purchase.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{purchase.reward}</p>
                      <div className="flex items-center gap-1 text-amber-500 justify-end mt-0.5">
                        <Coins size={12} />
                        <span className="text-xs font-black">-{purchase.cost} tanga</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Reward Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingReward ? "Mukofotni tahrirlash" : "Yangi mukofot qo'shish"}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Bekor qilish</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#ec5b13] text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">Saqlash</button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer w-full h-48 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center hover:border-orange-300 hover:bg-orange-50/50 transition-all">
              {formData.image ? (
                <img src={formData.image} alt="Reward" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon size={32} className="text-slate-300 mb-2" />
                  <span className="text-xs font-bold text-slate-400">Rasm yuklash</span>
                </>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-sm font-bold">Rasmni o'zgartirish</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Mukofot nomi</label>
            <div className="relative">
              <Gift className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                placeholder="Masalan: Brendlangan daftar" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Narxi (Tanga)</label>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="number" 
                  value={formData.cost || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                  placeholder="50" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase">Soni (Qoldiq)</label>
              <div className="relative">
                <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="number" 
                  value={formData.stock || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold text-sm" 
                  placeholder="100" 
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
