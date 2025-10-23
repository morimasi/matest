
import { DetailedQuestion } from './types';

export interface ArchiveQuiz {
  gradeName: string;
  unitName: string;
  kazanimName: string;
  questions: DetailedQuestion[];
}

export const ARCHIVE_DATA: Record<string, ArchiveQuiz> = {
  // 1. SINIF ÖRNEK VERİLERİ
  "M.1.1.1.1": {
    gradeName: "1. Sınıf",
    unitName: "Sayılar ve İşlemler",
    kazanimName: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
      sinif: 1,
      unite_adi: "Sayılar ve İşlemler",
      unite_no: 1,
      kazanim_kodu: "M.1.1.1.1",
      kazanim_metni: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
      soru_tipi: 'coktan_secmeli',
      soru_metni: `Soru ${i+1}: Ali'nin sepetinde ${i+3} tane elma var. Sepetteki elma sayısını gösteren rakam aşağıdakilerden hangisidir?`,
      secenekler: {
        A: `${i+2}`,
        B: `${i+3}`,
        C: `${i+4}`,
        D: `${i+5}`
      },
      dogru_cevap: 'B',
      yanlis_secenek_tipleri: ["Bir eksik sayı", "Bir fazla sayı", "İki fazla sayı"],
      gercek_yasam_baglantisi: "Çevremizdeki nesneleri sayarak miktarını anlamak, alışveriş yaparken veya oyuncaklarımızı paylaşırken bize yardımcı olur.",
      seviye: 'temel',
      cozum_anahtari: `Sepetteki elma sayısı ${i+3} olduğu için doğru rakam da ${i+3}'tür.`
    }))
  },
  "M.1.1.2.2": {
    gradeName: "1. Sınıf",
    unitName: "Sayılar ve İşlemler",
    kazanimName: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
      sinif: 1,
      unite_adi: "Sayılar ve İşlemler",
      unite_no: 1,
      kazanim_kodu: "M.1.1.2.2",
      kazanim_metni: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
      soru_tipi: 'coktan_secmeli',
      soru_metni: `Soru ${i+1}: Bir dalda 8 kuş vardı. Dala ${i+2} kuş daha kondu. Dalda toplam kaç kuş oldu?`,
      secenekler: {
        A: `${8 + i+1}`,
        B: `${8 + i+2}`,
        C: `${8 + i+3}`,
        D: `10`
      },
      dogru_cevap: 'B',
      yanlis_secenek_tipleri: ["Bir eksik toplama", "Bir fazla toplama", "İlgisiz sayı"],
      gercek_yasam_baglantisi: "Oyuncaklarımızı veya şekerlerimizi arkadaşlarımızla birleştirdiğimizde toplam sayıyı bulmak için toplama yaparız.",
      seviye: 'orta',
      cozum_anahtari: `Başlangıçtaki 8 kuşa, sonradan gelen ${i+2} kuş eklenince toplam 8 + ${i+2} = ${8+i+2} kuş olur.`
    }))
  },

  // 3. SINIF ÖRNEK VERİLERİ
  "M.3.1.4.5": {
    gradeName: "3. Sınıf",
    unitName: "Sayılar ve İşlemler",
    kazanimName: "Çarpma işlemi gerektiren problemleri çözer.",
    questions: Array.from({ length: 20 }, (_, i) => ({
      sinif: 3,
      unite_adi: "Sayılar ve İşlemler",
      unite_no: 1,
      kazanim_kodu: "M.3.1.4.5",
      kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
      soru_tipi: 'coktan_secmeli',
      soru_metni: `Soru ${i+1}: Bir kutuda 6 tane kalem vardır. Zeynep, bu kutulardan 4 tane alırsa toplam kaç kalemi olur?`,
      secenekler: {
        A: "10",
        B: "20",
        C: "24",
        D: "30"
      },
      dogru_cevap: 'C',
      yanlis_secenek_tipleri: ["Toplama hatası (6+4)", "Yakın onluğa yuvarlama", "Çarpım tablosu hatası"],
      gercek_yasam_baglantisi: "Her birinde aynı sayıda ürün olan paketlerin toplam sayısını bulmak için çarpma işlemi kullanılır, örneğin yumurta kolileri.",
      seviye: 'orta',
      cozum_anahtari: "Her kutuda 6 kalem varsa ve 4 kutu alınırsa, toplam kalem sayısı 4 kere 6'dır. 4 x 6 = 24 kalem."
    }))
  },
  "M.3.4.1.2": {
    gradeName: "3. Sınıf",
    unitName: "Veri İşleme",
    kazanimName: "Sıklık tablosu oluşturur.",
    questions: Array.from({ length: 20 }, (_, i) => ({
      sinif: 3,
      unite_adi: "Veri İşleme",
      unite_no: 4,
      kazanim_kodu: "M.3.4.1.2",
      kazanim_metni: "Sıklık tablosu oluşturur.",
      soru_tipi: 'coktan_secmeli',
      soru_metni: `Soru ${i+1}: 
Aşağıdaki sıklık tablosu bir sınıftaki öğrencilerin en sevdiği renkleri göstermektedir.
+---------+----------+
| Renk    | Öğrenci  |
|         | Sayısı   |
+---------+----------+
| Mavi    |     8    |
| Kırmızı |     ${5+i}    |
| Sarı    |     6    |
+---------+----------+
Tabloya göre en çok sevilen renk hangisidir ve kaç öğrenci tarafından sevilmektedir?`,
      secenekler: {
        A: "Mavi, 8",
        B: `Kırmızı, ${5+i}`,
        C: "Sarı, 6",
        D: "Mavi, 6"
      },
      dogru_cevap: 'B',
      yanlis_secenek_tipleri: ["En az sevilen renk", "Yanlış sayı ile eşleştirme", "Diğer bir seçeneğin sayısı"],
      gercek_yasam_baglantisi: "Tablolar, anket sonuçları veya seçim sonuçları gibi bilgileri düzenli bir şekilde göstererek anlamamızı kolaylaştırır.",
      seviye: 'temel',
      cozum_anahtari: `Tabloya bakıldığında en yüksek öğrenci sayısı ${5+i} ile Kırmızı rengine aittir.`
    }))
  },
  
  // 5. SINIF ÖRNEK VERİLERİ
  "M.5.1.6.2": {
    gradeName: "5. Sınıf",
    unitName: "Sayılar ve İşlemler",
    kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    questions: Array.from({ length: 20 }, (_, i) => ({
      sinif: 5,
      unite_adi: "Sayılar ve İşlemler",
      unite_no: 1,
      kazanim_kodu: "M.5.1.6.2",
      kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
      soru_tipi: 'coktan_secmeli',
      soru_metni: `Soru ${i+1}: 200 sayısının %25'i kaçtır?`,
      secenekler: {
        A: "25",
        B: "50",
        C: "75",
        D: "100"
      },
      dogru_cevap: 'B',
      yanlis_secenek_tipleri: ["Yüzde sembolünü sayı olarak alma", "Yanlış oranlama", "İki katını alma"],
      gercek_yasam_baglantisi: "Mağazalardaki indirimleri hesaplarken veya bir yemeğin besin değerlerini anlarken yüzdeleri kullanırız.",
      seviye: 'orta',
      cozum_anahtari: "Bir sayının %25'i o sayının çeyreği (1/4'ü) demektir. 200'ü 4'e bölersek 50 buluruz. Alternatif olarak, (200 * 25) / 100 = 50 işlemi yapılır."
    }))
  }
};
