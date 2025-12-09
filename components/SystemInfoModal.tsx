import React from 'react';
import { X, Coins, Briefcase, CalendarCheck, HelpCircle } from 'lucide-react';
import CivilizationLogo from './CivilizationLogo';

interface Props {
  onClose: () => void;
}

const SystemInfoModal: React.FC<Props> = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-[60] flex items-end sm:items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
          <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 shrink-0 shadow-md rounded-xl overflow-hidden border border-slate-100">
                      <CivilizationLogo className="w-full h-full" />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-slate-800">Medeniyet Takvimi</h3>
                      <p className="text-xs text-slate-500 font-medium">M.Ö. 3200 + Gündönümü</p>
                  </div>
              </div>
              <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5"/>
              </button>
          </div>
          <div className="space-y-6 text-sm text-slate-600 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <section>
                    <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <Coins className="w-4 h-4" />
                        <h3 className="font-bold">Maaşlar ve Ödemeler</h3>
                    </div>
                    <p className="text-xs leading-relaxed bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                        Her ay 28 gündür. Ödeme günleri (örn: her ayın 1'i) <strong>asla hafta sonuna denk gelmez</strong>, her zaman Pazartesidir.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-2 text-emerald-600">
                        <Briefcase className="w-4 h-4" />
                        <h3 className="font-bold">İş Günü ve Tatiller</h3>
                    </div>
                    <p className="text-xs leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                        <strong>Dünya Günü</strong> ve <strong>Ay Günü</strong> takvim dışı ücretli tatildir. İş düzeni 13 aya yayılır.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-2 text-amber-600">
                        <CalendarCheck className="w-4 h-4" />
                        <h3 className="font-bold">Hafta Numaraları</h3>
                    </div>
                    <p className="text-xs leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                        Yıl 52 haftadır. 1. Ay: 1-4. Haftalar, 2. Ay: 5-8. Haftalar...
                    </p>
                </section>
          </div>
          <button onClick={onClose} className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition-colors">Tamam</button>
      </div>
  </div>
);

export default SystemInfoModal;
