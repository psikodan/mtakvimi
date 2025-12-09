import { 
  EPOCH_OFFSET, 
  ERAS, 
  GENERATIONS, 
  CYCLES, 
  CYCLE_YEAR_INFO, 
  SPECIAL_DAYS_DB, 
  MONTH_NAMES, 
  WEEKDAYS, 
  ASTRONOMICAL_EVENTS 
} from '../constants';
import { TimeHierarchy, ConvertedDate } from '../types';

export const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const yearStr = year.toString().padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${yearStr}-${month}-${day}`;
};

export const isCivilizationLeapYear = (civYear: number): boolean => {
  const startGregYear = civYear - EPOCH_OFFSET - 1; 
  const targetFebYear = startGregYear + 1;
  return (targetFebYear % 4 === 0 && targetFebYear % 100 !== 0) || (targetFebYear % 400 === 0);
};

export const getTimeHierarchy = (year: number): TimeHierarchy => {
  const totalYears = year;
  const eonCount = Math.floor((totalYears - 1) / 1372) + 1;
  const yearInEon = (totalYears - 1) % 1372;
  
  const eraIndex = Math.floor(yearInEon / 196);
  const yearInEra = yearInEon % 196;
  const nesilIndex = Math.floor(yearInEra / 28);
  const yearInNesil = yearInEra % 28;
  const donguIndex = Math.floor(yearInNesil / 4);
  const yearInDongu = (yearInNesil % 4) + 1;

  // Cumulative Counters
  const globalEraCount = Math.floor((totalYears - 1) / 196) + 1;
  const globalGenerationCount = Math.floor((totalYears - 1) / 28) + 1;
  const globalCycleCount = Math.floor((totalYears - 1) / 4) + 1;

  return {
    eon: eonCount,
    era: ERAS[eraIndex],
    eraIndex: eraIndex,
    yearInEra: yearInEra + 1,
    nesil: GENERATIONS[nesilIndex],
    nesilIndex: nesilIndex,
    yearInNesil: yearInNesil + 1,
    dongu: CYCLES[donguIndex],
    donguIndex: donguIndex,
    yil: yearInDongu,
    yilInfo: CYCLE_YEAR_INFO[yearInDongu - 1],
    globalEraCount,
    globalGenerationCount,
    globalCycleCount
  };
};

export const convertDate = (date: Date): ConvertedDate => {
  const gregYear = date.getFullYear();
  const thisYearSolstice = new Date();
  thisYearSolstice.setFullYear(gregYear, 11, 21); // Dec 21
  thisYearSolstice.setHours(0,0,0,0);
  
  let yearStart: Date;
  let civYear: number;

  if (date < thisYearSolstice) {
    yearStart = new Date();
    yearStart.setFullYear(gregYear - 1, 11, 21);
    yearStart.setHours(0,0,0,0);
    civYear = gregYear + EPOCH_OFFSET;
  } else {
    yearStart = thisYearSolstice;
    civYear = gregYear + EPOCH_OFFSET + 1;
  }

  const diffTime = date.getTime() - yearStart.getTime();
  const dayIndexTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  const dayOfYear = dayIndexTotal + 1;

  const isLeap = isCivilizationLeapYear(civYear);
  const hierarchy = getTimeHierarchy(civYear);
  const specialDayInfo = SPECIAL_DAYS_DB.find(d => d.month === date.getMonth() && d.day === date.getDate());

  const commonResult = {
      year: civYear,
      hierarchy,
      holiday: specialDayInfo,
      gregorianDate: date
  };

  if (isLeap && dayOfYear === 169) {
      return { ...commonResult, specialDay: "Ay Günü", isSpecial: true, monthName: "Yıl Ortası" };
  }

  const worldDayIndex = isLeap ? 366 : 365;
  if (dayOfYear === worldDayIndex) {
      return { ...commonResult, specialDay: "Dünya Günü", isSpecial: true, monthName: "Yıl Sonu" };
  }

  let adjustedDayIndex = dayIndexTotal;
  if (isLeap && dayOfYear > 169) adjustedDayIndex = dayIndexTotal - 1;

  const monthIndex = Math.floor(adjustedDayIndex / 28);
  const dayOfMonth = (adjustedDayIndex % 28) + 1;

  if (monthIndex >= 13) return { ...commonResult, specialDay: "Dünya Günü", isSpecial: true };

  const astroEvent = ASTRONOMICAL_EVENTS.find(e => e.monthIndex === monthIndex && e.day === dayOfMonth);

  return {
    ...commonResult,
    monthName: MONTH_NAMES[monthIndex],
    monthIndex: monthIndex,
    day: dayOfMonth,
    weekday: WEEKDAYS[(dayOfMonth - 1) % 7],
    isSpecial: false,
    astroEvent: astroEvent || undefined
  };
};
