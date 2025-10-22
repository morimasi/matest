export interface DetailedQuestion {
  sinif: number;
  unite_adi: string;
  unite_no: number;
  kazanim_kodu: string;
  kazanim_metni: string;
  soru_metni: string;
  secenekler: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  dogru_cevap: 'A' | 'B' | 'C' | 'D';
  yanlis_secenek_tipleri: string[];
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
}