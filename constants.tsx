import { Sparkles, Flame, Zap, Wind } from 'lucide-react';
import { SpecialDay, HistoricalEvent, AstroEvent, CycleYearInfo, Cycle, Generation, Era } from './types';

export const EPOCH_OFFSET = 3200; 

export const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", 
  "Sol", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export const WEEKDAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
export const SHORT_WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export const SPECIAL_DAYS_DB: SpecialDay[] = [
  { month: 0, day: 1, name: "Yılbaşı", type: "global" },
  { month: 3, day: 23, name: "Ulusal Egemenlik ve Çocuk Bayramı", type: "tr" },
  { month: 4, day: 1, name: "Emek ve Dayanışma Günü", type: "global" },
  { month: 4, day: 19, name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", type: "tr" },
  { month: 6, day: 15, name: "Demokrasi ve Milli Birlik Günü", type: "tr" },
  { month: 7, day: 30, name: "Zafer Bayramı", type: "tr" },
  { month: 9, day: 29, name: "Cumhuriyet Bayramı", type: "tr" },
  { month: 10, day: 10, name: "Atatürk'ü Anma Günü", type: "tr" },
  { month: 4, day: 29, name: "İstanbul'un Fethi", type: "tr" },
  { month: 0, day: 10, name: "İdareciler Günü", type: "meb" },
  { month: 2, day: 8, name: "Dünya Kadınlar Günü", type: "global" },
  { month: 2, day: 12, name: "İstiklal Marşı'nın Kabulü", type: "meb" },
  { month: 2, day: 14, name: "Tıp Bayramı", type: "tr" },
  { month: 2, day: 18, name: "Çanakkale Zaferi", type: "meb" },
  { month: 2, day: 21, name: "Nevruz / Orman Haftası", type: "meb" },
  { month: 2, day: 27, name: "Dünya Tiyatrolar Günü", type: "global" },
  { month: 3, day: 15, name: "Turizm Haftası", type: "meb" },
  { month: 4, day: 5, name: "Hıdırellez", type: "tr" },
  { month: 4, day: 10, name: "Engelliler Haftası", type: "meb" },
  { month: 5, day: 5, name: "Dünya Çevre Günü", type: "global" },
  { month: 8, day: 19, name: "Gaziler Günü", type: "tr" },
  { month: 8, day: 25, name: "İtfaiyecilik Haftası", type: "meb" },
  { month: 9, day: 4, name: "Hayvanları Koruma Günü", type: "global" },
  { month: 9, day: 13, name: "Ankara'nın Başkent Oluşu", type: "tr" },
  { month: 9, day: 24, name: "Birleşmiş Milletler Günü", type: "global" },
  { month: 9, day: 29, name: "Kızılay Haftası", type: "meb" },
  { month: 10, day: 24, name: "Öğretmenler Günü", type: "meb" },
  { month: 11, day: 3, name: "Dünya Engelliler Günü", type: "global" },
  { month: 11, day: 10, name: "İnsan Hakları Günü", type: "global" },
  { month: 11, day: 12, name: "Yerli Malı Haftası", type: "meb" }
];

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  { year: 1453, month: 4, day: 29, title: "İstanbul'un Fethi", desc: "Fatih Sultan Mehmet İstanbul'u fethetti." },
  { year: 1923, month: 9, day: 29, title: "Cumhuriyetin İlanı", desc: "Türkiye Cumhuriyeti kuruldu." },
  { year: 1919, month: 4, day: 19, title: "Samsun'a Çıkış", desc: "Milli Mücadele'nin başlangıcı." },
  { year: 1071, month: 7, day: 26, title: "Malazgirt Zaferi", desc: "Anadolu'nun kapıları açıldı." },
  { year: 1299, month: 0, day: 27, title: "Osmanlı'nın Kuruluşu", desc: "Osmanlı Beyliği'nin kuruluşu." },
  { year: 571, month: 3, day: 20, title: "Hz. Muhammed'in Doğumu", desc: "İslam peygamberinin doğumu." },
  { year: 2000, month: 0, day: 1, title: "Milenyum", desc: "21. Yüzyılın başlangıcı." }
];

export const ASTRONOMICAL_EVENTS: AstroEvent[] = [
  { monthIndex: 0, day: 1, name: "Kış Gündönümü", icon: "❄️" },
  { monthIndex: 3, day: 8, name: "Bahar Ekinoksu", icon: "🌱" },
  { monthIndex: 6, day: 15, name: "Yaz Gündönümü", icon: "☀️" },
  { monthIndex: 9, day: 22, name: "Güz Ekinoksu", icon: "🍂" }
];

export const CYCLE_YEAR_INFO: CycleYearInfo[] = [
  { name: "Kıvılcım Yılı", icon: Sparkles },
  { name: "Alev Yılı", icon: Flame },
  { name: "Kor Yılı", icon: Zap },
  { name: "Kül Yılı", icon: Wind }
];

export const CYCLES: Cycle[] = [
  { name: "Kızıl Döngü", baseColor: "red", color: "text-red-600", bg: "bg-red-50", bar: "bg-red-500", from: "from-red-600", desc: "Enerji", border: "border-red-200" },
  { name: "Turuncu Döngü", baseColor: "orange", color: "text-orange-600", bg: "bg-orange-50", bar: "bg-orange-500", from: "from-orange-600", desc: "Üretim", border: "border-orange-200" },
  { name: "Sarı Döngü", baseColor: "yellow", color: "text-yellow-600", bg: "bg-yellow-50", bar: "bg-yellow-500", from: "from-yellow-600", desc: "Bilinç", border: "border-yellow-200" },
  { name: "Yeşil Döngü", baseColor: "emerald", color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", from: "from-emerald-600", desc: "Denge", border: "border-emerald-200" },
  { name: "Mavi Döngü", baseColor: "blue", color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-500", from: "from-blue-600", desc: "Bilgi", border: "border-blue-200" },
  { name: "Çivit Döngü", baseColor: "indigo", color: "text-indigo-600", bg: "bg-indigo-50", bar: "bg-indigo-500", from: "from-indigo-600", desc: "Sezgi", border: "border-indigo-200" },
  { name: "Mor Döngü", baseColor: "violet", color: "text-violet-600", bg: "bg-violet-50", bar: "bg-violet-500", from: "from-violet-600", desc: "Dönüşüm", border: "border-violet-200" }
];

export const GENERATIONS: Generation[] = [
  { name: "Kök", icon: "🌱" },
  { name: "Filiz", icon: "🌿" },
  { name: "Gövde", icon: "🪵" },
  { name: "Dal", icon: "🎋" },
  { name: "Yaprak", icon: "🍃" },
  { name: "Çiçek", icon: "🌸" },
  { name: "Tohum", icon: "🌰" }
];

export const ERAS: Era[] = [
  { name: "Uyanış" },
  { name: "Yükseliş" },
  { name: "Denge" },
  { name: "Altın" },
  { name: "Bilgelik" },
  { name: "Ahenk" },
  { name: "Sonsuzluk" }
];
