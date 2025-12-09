import React from 'react';
import { SHORT_WEEKDAYS, ASTRONOMICAL_EVENTS } from '../constants';

interface Props {
  name: string;
  index: number;
}

const MiniMonth: React.FC<Props> = ({ name, index }) => {
  const startWeek = (index - 1) * 4 + 1;
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-100 h-full flex flex-col shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-slate-700 text-sm">{index}. {name}</span>
      </div>
      <div className="grid grid-cols-[20px_repeat(7,1fr)] gap-1 text-[10px] text-center mb-1 text-slate-400 font-medium">
        <div>#</div>
        {SHORT_WEEKDAYS.map(d => <div key={d}>{d[0]}</div>)}
      </div>
      <div className="flex-1 grid grid-cols-[20px_repeat(7,1fr)] gap-1 text-center">
        {[0, 1, 2, 3].map(weekIdx => (
           <React.Fragment key={weekIdx}>
              <div className="flex items-center justify-center text-[9px] font-mono text-indigo-300 font-bold bg-indigo-50/50 rounded-l">
                  {startWeek + weekIdx}
              </div>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const dayNum = (weekIdx * 7) + dayIdx + 1;
                  const astro = ASTRONOMICAL_EVENTS.find(e => e.monthIndex === index - 1 && e.day === dayNum);
                  return (
                      <div key={dayNum} className={`text-xs p-0.5 rounded flex items-center justify-center relative ${astro ? 'bg-amber-100 font-bold text-amber-700' : 'text-slate-600 bg-slate-50'}`}>
                        {dayNum}
                        {astro && <span className="absolute -top-1 -right-1 text-[8px]" title={astro.name}>{astro.icon}</span>}
                      </div>
                  );
              })}
           </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MiniMonth;
