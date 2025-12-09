import { LucideIcon } from 'lucide-react';

export interface SpecialDay {
  month: number;
  day: number;
  name: string;
  type: string;
}

export interface HistoricalEvent {
  year: number;
  month: number;
  day: number;
  title: string;
  desc: string;
}

export interface AstroEvent {
  monthIndex: number;
  day: number;
  name: string;
  icon: string;
}

export interface CycleYearInfo {
  name: string;
  icon: LucideIcon;
}

export interface Cycle {
  name: string;
  baseColor: string;
  color: string;
  bg: string;
  bar: string;
  from: string;
  desc: string;
  border: string;
}

export interface Generation {
  name: string;
  icon: string;
}

export interface Era {
  name: string;
}

export interface TimeHierarchy {
  eon: number;
  era: Era;
  eraIndex: number;
  yearInEra: number;
  nesil: Generation;
  nesilIndex: number;
  yearInNesil: number;
  dongu: Cycle;
  donguIndex: number;
  yil: number;
  yilInfo: CycleYearInfo;
  globalEraCount: number;
  globalGenerationCount: number;
  globalCycleCount: number;
}

export interface ConvertedDate {
  year: number;
  hierarchy: TimeHierarchy;
  holiday?: SpecialDay;
  gregorianDate: Date;
  monthName?: string;
  monthIndex?: number;
  day?: number;
  weekday?: string;
  isSpecial: boolean;
  specialDay?: string;
  astroEvent?: AstroEvent;
}
