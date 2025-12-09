import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, ChevronRight, ChevronLeft, 
  Calendar as CalendarIcon, Grid, 
  Hourglass, Infinity as InfinityIcon, 
  Search, History, Flag, 
  RefreshCw, ArrowRight, HelpCircle
} from 'lucide-react';

import { 
  MONTH_NAMES, SHORT_WEEKDAYS, 
  HISTORICAL_EVENTS 
} from './constants';
import { ConvertedDate } from './types';
import { 
  convertDate, 
  getLocalDateString, 
  isCivilizationLeapYear 
} from './utils/calendarUtils';

import CivilizationLogo from './components/CivilizationLogo';
import NavButton from './components/NavButton';
import MiniMonth from './components/MiniMonth';
import SystemInfoModal from './components/SystemInfoModal';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [convertedDate, setConvertedDate] = useState<ConvertedDate | null>(null);
  const [view, setView] = useState<string>('converter'); 
  const [searchQuery, setSearchQuery] = useState<string>("1453");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConvertedDate(convertDate(selectedDate));
    if(scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [selectedDate]);

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if(!val) return;
      const [y, m, d] = val.split('-').map(Number);
      const newDate = new Date();
      newDate.setFullYear(y, m - 1, d);
      newDate.setHours(12, 0, 0, 0);
      setSelectedDate(newDate);
  };

  const handleGoToToday = () => setSelectedDate(new Date());

  const handleJumpToHistory = () => {
    const yearVal = parseInt(searchQuery);
    if (!isNaN(yearVal) && yearVal > -5000 && yearVal < 10000) {
        const newDate = new Date();
        newDate.setFullYear(yearVal, 0, 1);
        newDate.setHours(12,0,0,0);
        setSelectedDate(newDate);
        setView('converter');
    }
  };

  const handleYearChange = (years: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() + years);
    setSelectedDate(newDate);
  }

  const handleCivilizationDayClick = (clickedDay: number) => {
    if (!convertedDate || convertedDate.isSpecial) return;

    const gregYear = selectedDate.getFullYear();
    const thisYearSolstice = new Date();
    thisYearSolstice.setFullYear(gregYear, 11, 21);
    thisYearSolstice.setHours(0,0,0,0);

    let yearStart;
    if (selectedDate < thisYearSolstice) {
      yearStart = new Date();
      yearStart.setFullYear(gregYear - 1, 11, 21);
      yearStart.setHours(0,0,0,0);
    } else {
      yearStart = thisYearSolstice;
    }

    let targetDayIndex = (convertedDate.monthIndex! * 28) + (clickedDay - 1);
    const isLeap = isCivilizationLeapYear(convertedDate.year);
    if (isLeap && convertedDate.monthIndex! >= 6) { 
        targetDayIndex += 1;
    }

    const newDate = new Date(yearStart.getTime() + (targetDayIndex * 24 * 60 * 60 * 1000));
    newDate.setHours(12, 0, 0, 0);
    setSelectedDate(newDate);
  };

  const searchHistoryList = () => {
    if (!searchQuery) return [];
    const query = searchQuery.toString().toLowerCase();
    return HISTORICAL_EVENTS.filter(e => 
        e.year.toString().includes(query) || 
        e.title.toLowerCase().includes(query) || 
        e.desc.toLowerCase().includes(query)
    );
  };

  if (!convertedDate) return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium animate-pulse">Takvim Yükleniyor...</div>;

  const isToday = selectedDate.getDate() === new Date().getDate() && 
                  selectedDate.getMonth() === new Date().getMonth() && 
                  selectedDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden text-slate-800 font-sans">
      
      {showInfoModal && <SystemInfoModal onClose={() => setShowInfoModal(false)} />}

      {/* Header */}
      <header className="flex-none bg-white border-b border-slate-100 px-4 py-3 flex justify-between items-center z-40 shadow-sm pt-safe">
        <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-indigo-900">
               <CivilizationLogo className="w-full h-full" />
            </div>
            <h1 className="font-bold text-lg text-slate-800 leading-none tracking-tight">Medeniyet<br/><span className="text-xs font-normal text-slate-500">Takvimi</span></h1>
        </div>
        <button onClick={() => setShowInfoModal(true)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-50">
            <HelpCircle className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto pb-24 p-4 scroll-smooth no-scrollbar">
        
        {view === 'converter' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Date Picker */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sticky top-0 z-30">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tarih Seç</label>
                    <div className="flex items-center gap-3">
                        <button onClick={() => handleDateChange(-1)} className="p-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg text-slate-500"><ChevronLeft className="w-5 h-5"/></button>
                        <div className="flex-1 relative">
                            <input 
                                type="date" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-shadow"
                                value={getLocalDateString(selectedDate)}
                                onChange={handleDateInputChange}
                            />
                            <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                        </div>
                        <button onClick={() => handleDateChange(1)} className="p-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg text-slate-500"><ChevronRight className="w-5 h-5"/></button>
                    </div>
                    {!isToday && (
                        <button onClick={handleGoToToday} className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 py-2 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-lg">
                            <RefreshCw className="w-3 h-3" /> Bugüne Dön
                        </button>
                    )}
                </div>

                {/* Main Card */}
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-xl shadow-indigo-100/50 text-center ${convertedDate.hierarchy.dongu.from} to-slate-900 transition-colors duration-500`}>
                    <div className="relative z-10">
                        {convertedDate.isSpecial ? (
                            <>
                                <div className="text-3xl font-bold mb-1 tracking-tight">{convertedDate.specialDay}</div>
                                <div className="text-indigo-100 text-sm opacity-80 mb-4">{convertedDate.monthName}</div>
                            </>
                        ) : (
                            <>
                                <div className="text-7xl font-bold tracking-tighter mb-0 leading-none">{convertedDate.day}</div>
                                <div className="text-2xl font-medium text-white/90 mb-1 tracking-tight">{convertedDate.monthName}</div>
                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md mb-6 border border-white/10 shadow-inner">
                                    {convertedDate.weekday}
                                </div>
                            </>
                        )}
                        <div className="text-4xl font-light text-white/80 font-mono tracking-wide">{convertedDate.year}</div>
                        
                        {convertedDate.astroEvent && (
                            <div className="mt-6 bg-white/20 rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-medium animate-pulse border border-white/30 backdrop-blur-sm">
                                <span className="text-lg">{convertedDate.astroEvent.icon}</span> {convertedDate.astroEvent.name}
                            </div>
                        )}
                    </div>
                </div>

                {/* Hierarchy Stats */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm grid grid-cols-3 divide-x divide-slate-100 text-center">
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Çağ</div>
                        <div className="font-bold text-indigo-600 text-lg leading-none mb-1">{convertedDate.hierarchy.globalEraCount}</div>
                        <div className="text-[10px] text-slate-500 truncate px-1 font-medium">{convertedDate.hierarchy.era.name}</div>
                        <div className="text-[9px] text-indigo-400 font-medium mt-0.5">({convertedDate.hierarchy.eon}. Kez)</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Nesil</div>
                        <div className="font-bold text-emerald-600 text-lg leading-none mb-1">{convertedDate.hierarchy.globalGenerationCount}</div>
                        <div className="text-[10px] text-slate-500 truncate px-1 font-medium">{convertedDate.hierarchy.nesil.name}</div>
                        <div className="text-[9px] text-emerald-500 font-medium mt-0.5">({convertedDate.hierarchy.globalEraCount}. Kez)</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Döngü</div>
                        <div className="font-bold text-amber-600 text-lg leading-none mb-1">{convertedDate.hierarchy.globalCycleCount}</div>
                        <div className="text-[10px] text-slate-500 truncate px-1 font-medium">{convertedDate.hierarchy.dongu.name}</div>
                        <div className="text-[9px] text-amber-500 font-medium mt-0.5">({convertedDate.hierarchy.globalGenerationCount}. Kez)</div>
                    </div>
                </div>

                {/* Special Day Alert */}
                {convertedDate.holiday && (
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 shadow-sm">
                        <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm">
                            <Flag className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Önemli Gün</div>
                            <div className="font-bold text-slate-800 leading-tight">{convertedDate.holiday.name}</div>
                        </div>
                    </div>
                )}

                {/* Calendar Grid */}
                {!convertedDate.isSpecial && (
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Grid className="w-4 h-4 text-indigo-500"/> Ayın Görünümü
                            </h3>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-medium">28 Gün</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {SHORT_WEEKDAYS.map(d => <div key={d} className="text-center text-[10px] text-slate-400 font-bold uppercase">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1.5">
                            {Array.from({length: 28}).map((_, i) => {
                                const dayNum = i + 1;
                                const isSelected = dayNum === convertedDate.day;
                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => handleCivilizationDayClick(dayNum)}
                                        className={`
                                            h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200
                                            ${isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-110' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}
                                        `}
                                    >
                                        {dayNum}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )}

        {view === 'year' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-0 z-30">
                    <button onClick={() => handleYearChange(-1)} className="p-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg text-slate-600"><ChevronLeft className="w-5 h-5"/></button>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-800 font-mono tracking-tight">{convertedDate.year}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Medeniyet Yılı</div>
                    </div>
                    <button onClick={() => handleYearChange(1)} className="p-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg text-slate-600"><ChevronRight className="w-5 h-5"/></button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {MONTH_NAMES.map((m, i) => (
                        <MiniMonth key={m} name={m} index={i + 1} />
                    ))}
                </div>
                
                <div className="bg-slate-800 text-white p-5 rounded-2xl space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-emerald-400 font-bold text-sm">Dünya Günü</span>
                        <span className="text-xs opacity-60 font-medium">Yıl Sonu</span>
                    </div>
                    {isCivilizationLeapYear(convertedDate.year) && (
                        <div className="flex items-center justify-between">
                            <span className="text-amber-400 font-bold text-sm">Ay Günü</span>
                            <span className="text-xs opacity-60 font-medium">Yıl Ortası (Artık Gün)</span>
                        </div>
                    )}
                </div>
            </div>
        )}

        {view === 'hierarchy' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <InfinityIcon className="w-14 h-14 text-indigo-600 mx-auto mb-3" />
                    <div className="text-5xl font-bold text-slate-800 tracking-tighter mb-1">{convertedDate.hierarchy.eon}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Büyük Devir (Eon)</div>
                </div>

                <div className="space-y-2 relative pl-6 border-l-2 border-slate-200 ml-4">
                    <div className="relative group">
                        <div className="absolute -left-[31px] top-4 w-4 h-4 bg-indigo-600 rounded-full border-4 border-slate-50 shadow-sm z-10"></div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-indigo-600 font-bold mb-1 tracking-wide">{convertedDate.hierarchy.eraIndex + 1}. ÇAĞ <span className="text-slate-300 font-normal ml-1">196 Yıl</span></div>
                            <div className="text-2xl font-bold text-slate-800">{convertedDate.hierarchy.era.name}</div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -left-[31px] top-4 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-50 shadow-sm z-10"></div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-emerald-600 font-bold mb-1 tracking-wide">{convertedDate.hierarchy.nesilIndex + 1}. NESİL <span className="text-slate-300 font-normal ml-1">28 Yıl</span></div>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl bg-slate-50 p-2 rounded-lg">{convertedDate.hierarchy.nesil.icon}</span>
                                <div className="text-2xl font-bold text-slate-800">{convertedDate.hierarchy.nesil.name}</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -left-[31px] top-4 w-4 h-4 bg-amber-500 rounded-full border-4 border-slate-50 shadow-sm z-10"></div>
                        <div className={`p-5 rounded-2xl border shadow-sm bg-white ${convertedDate.hierarchy.dongu.border} hover:shadow-md transition-shadow`}>
                            <div className={`text-xs font-bold mb-1 tracking-wide ${convertedDate.hierarchy.dongu.color}`}>{convertedDate.hierarchy.donguIndex + 1}. DÖNGÜ <span className="text-slate-300 font-normal ml-1">4 Yıl</span></div>
                            <div className={`text-2xl font-bold ${convertedDate.hierarchy.dongu.color} mb-4`}>{convertedDate.hierarchy.dongu.name}</div>
                            
                            <div className="flex gap-1.5">
                                {[1,2,3,4].map(y => (
                                    <div key={y} className={`h-2 flex-1 rounded-full transition-colors ${y <= convertedDate.hierarchy.yil ? convertedDate.hierarchy.dongu.bar : 'bg-slate-100'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -left-[31px] top-4 w-4 h-4 bg-slate-800 rounded-full border-4 border-slate-50 shadow-sm z-10"></div>
                        <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-xl shadow-slate-200">
                            <div className="text-xs text-slate-400 font-bold mb-1 tracking-wide">{convertedDate.hierarchy.yil}. YIL</div>
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const Icn = convertedDate.hierarchy.yilInfo.icon;
                                    return <div className="bg-white/10 p-2 rounded-lg"><Icn className="w-6 h-6 text-white" /></div>
                                })()}
                                <div className="text-xl font-bold">{convertedDate.hierarchy.yilInfo.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {view === 'history' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-0 z-30">
                    <div className="relative">
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                            placeholder="Yıl veya Olay (Örn: 1453)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleJumpToHistory} className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2.5 rounded-xl font-bold text-sm shadow-sm shadow-indigo-200">
                            Yıla Git
                        </button>
                        {!isToday && (
                            <button onClick={handleGoToToday} className="flex-none px-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors rounded-xl font-bold text-sm border border-emerald-100">
                                Bugün
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    {searchHistoryList().length > 0 ? (
                        searchHistoryList().map((event, idx) => {
                            const eDate = new Date();
                            eDate.setFullYear(event.year, event.month, event.day);
                            eDate.setHours(12,0,0,0);
                            const cDate = convertDate(eDate);

                            return (
                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-lg font-bold text-slate-800 leading-tight">{event.title}</div>
                                            <div className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded inline-block mt-1.5 border border-indigo-100">{cDate.year} Yılı</div>
                                        </div>
                                        <div className="text-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 min-w-[64px]">
                                            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{cDate.monthName?.substring(0,3)}</div>
                                            <div className="text-2xl font-bold text-slate-800 leading-none mt-0.5">{cDate.day}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-2.5 mt-1">
                                        {event.desc}
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setSelectedDate(eDate);
                                            setView('converter');
                                        }}
                                        className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-xl mt-1"
                                    >
                                        Takvimde Gör <ArrowRight className="w-3.5 h-3.5"/>
                                    </button>
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center py-16 opacity-50">
                            <History className="w-16 h-16 mx-auto mb-3 text-slate-300"/>
                            <p className="text-slate-500 font-medium">Sonuç bulunamadı.</p>
                        </div>
                    )}
                </div>
            </div>
        )}

      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center z-50 pb-safe">
          <NavButton icon={Calculator} label="Çevir" id="converter" currentView={view} setView={setView} />
          <NavButton icon={Grid} label="Yıl" id="year" currentView={view} setView={setView} />
          <NavButton icon={Hourglass} label="Döngü" id="hierarchy" currentView={view} setView={setView} />
          <NavButton icon={History} label="Tarih" id="history" currentView={view} setView={setView} />
      </nav>

    </div>
  );
};

export default App;
