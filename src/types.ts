export type QuestionType = 'coktan_secmeli' | 'dogru_yanlis' | 'bosluk_doldurma';

export interface ChartData {
  type: 'sutun_grafik' | 'siklik_tablosu' | 'nesne_grafik';
  title?: string;
  data: {
    label: string;
    value: number;
    symbol?: string; 
  }[];
}

export interface DetailedQuestion {
  sinif: number;
  unite_adi: string;
  unite_no: number;
  kazanim_kodu: string;
  kazanim_metni: string;
  soru_tipi: QuestionType;
  soru_metni: string;
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
  grafik_verisi?: ChartData;
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
  id:string;
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