import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  id: string;
  currentView: string;
  setView: (view: string) => void;
}

const NavButton: React.FC<Props> = ({ icon: Icon, label, id, currentView, setView }) => (
  <button 
      onClick={() => setView(id)}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all active:scale-95 ${currentView === id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
  >
      <Icon className={`w-6 h-6 ${currentView === id ? 'fill-current' : ''}`} strokeWidth={currentView === id ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default NavButton;
