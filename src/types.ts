export type QuestionType = 'coktan_secmeli' | 'dogru_yanlis' | 'bosluk_doldurma';
export type DifficultyLevel = 'otomatik' | 'temel' | 'orta' | 'ileri';

export interface ChartDataItem {
  etiket: string;
  deger?: number;
  nesne?: string; // Nesne grafikleri için, örn: '🍎'
  birim?: string; // Geometri için, örn: 'cm', '°'
  x?: number; // Sürükle-bırak için x koordinatı
  y?: number; // Sürükle-bırak için y koordinatı
}

export interface ChartData {
  tip: 'siklik_tablosu' | 'nesne_grafiği' | 'sutun_grafiği' | 'ucgen' | 'dikdortgen' | 'kare' | 'besgen' | 'altıgen' | 'kup' | 'dogru_parcasi' | 'isin' | 'dogru' | 'paralel_dogrular' | 'kesisen_dogrular' | 'dik_kesisen_doğrular';
  baslik: string;
  veri: ChartDataItem[];
  not?: string; // örn: "Her nesne 1 öğrenciyi göstermektedir."
  x?: number; // Şeklin genel x-koordinatı
  y?: number; // Şeklin genel y-koordinatı
}

export interface DetailedQuestion {
  sinif: number;
  unite_adi: string;
  unite_no: number;
  kazanim_kodu: string;
  kazanim_metni: string;
  soru_tipi: QuestionType;
  soru_metni: string;
  grafik_verisi?: ChartData; // Grafik verisi için yeni alan
  secenekler?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  dogru_cevap: string;
  yanlis_secenek_tipleri?: string[];
  gercek_yasam_baglantisi: string;
  seviye: 'temel' | 'orta' | 'ileri';
  cozum_anahtari: string;
}

export interface Kazanim {
  id: string;
  name: string;
}

export interface Unit {
  id: string;
  name: string;
  kazanimlar: Kazanim[];
}

export interface Grade {
  id: number;
  name: string;
  units: Unit[];
}

export interface SavedQuiz {
  id: string;
  createdAt: string;
  gradeName: string;
  questions: DetailedQuestion[];
  customName?: string;
}

export interface QuizTemplate {
  id: string;
  createdAt: string;
  questions: DetailedQuestion[];
  isSystemTemplate?: boolean;
}

export interface ArchiveQuiz {
  gradeName: string;
  unitName: string;
  kazanimName: string;
  templates: QuizTemplate[];
}