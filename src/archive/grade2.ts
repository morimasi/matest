import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions } from './helpers';

export const ARCHIVE_DATA_GRADE_2: Record<string, ArchiveQuiz> = {
   "M.2.1.1.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
    templates: [{ id: 'system-default-M.2.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const step = [1, 5, 10][i % 3];
        const start = 20 + (i * 3 % 40);
        const answer = start + 3 * step;
        const options = createNumericOptions(answer, step * 2);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.1", kazanim_metni: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${start}'den başlayarak ileriye doğru ${step}'er ritmik sayarken dördüncü söylenen sayı hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Üçüncü sayı", "Beşinci sayı", "İkinci sayı"],
            gercek_yasam_baglantisi: "Para sayarken (5'er, 10'ar TL) veya saatleri söylerken (5'er dakika) ritmik sayma kullanırız.",
            seviye: 'temel', cozum_anahtari: `${start}'den başlayarak ${step}'er sayma: ${start+step} (2.), ${start+2*step} (3.), ${start+3*step} (4.). Doğru cevap ${answer}'dir.`
        }
    })}]
  },
  "M.2.1.1.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıların basamaklarını adlandırır, basamaklarındaki rakamların basamak değerlerini belirtir.",
    templates: [{ id: 'system-default-M.2.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: (Array.from({ length: 20 }, (_, i) => {
        const tensDigit = 2 + (i % 8);
        const onesDigit = 1 + (i % 9);
        if (tensDigit === onesDigit) return null; 
        const num = tensDigit * 10 + onesDigit;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.2", kazanim_metni: "100’den küçük doğal sayıların basamaklarını adlandırır, basamaklarındaki rakamların basamak değerlerini belirtir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num} sayısındaki ${tensDigit} rakamının basamak değeri kaçtır?`,
            secenekler: { A: `${tensDigit}`, B: `${tensDigit*10}`, C: `${onesDigit}`, D: `${num}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Rakamın kendisi", "Diğer basamaktaki rakam", "Sayının kendisi"],
            gercek_yasam_baglantisi: "Para ile uğraşırken 52 TL'nin 5 onluk ve 2 birlikten oluştuğunu bilmek, doğru hesap yapmamızı sağlar.",
            seviye: 'orta', cozum_anahtari: `${num} sayısında ${tensDigit} rakamı onlar basamağında olduğu için basamak değeri ${tensDigit*10}'dur.`
        }
    }).filter(Boolean) as DetailedQuestion[])}]
  },
    "M.2.1.1.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıları karşılaştırır ve sıralar.",
    templates: [{ id: 'system-default-M.2.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: (Array.from({ length: 20 }, (_, i) => {
        const nums = Array.from({length: 3}, () => Math.floor(Math.random() * 80) + 10);
        if(new Set(nums).size < 3) return null;
        const sorted = [...nums].sort((a,b) => b-a);
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.3", kazanim_metni: "100’den küçük doğal sayıları karşılaştırır ve sıralar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${nums.join(', ')} sayılarının büyükten küçüğe doğru sıralanışı hangisidir?`,
            secenekler: { A: `${sorted.join(', ')}`, B: `${sorted.slice().reverse().join(', ')}`, C: `${[sorted[0], sorted[2], sorted[1]].join(', ')}`, D: `${[sorted[1], sorted[0], sorted[2]].join(', ')}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Küçükten büyüğe sıralama", "Yanlış sıralama"],
            gercek_yasam_baglantisi: "Yarışma sonuçlarını veya fiyatları karşılaştırırken sayıları doğru sıralamak önemlidir.",
            seviye: 'orta', cozum_anahtari: "Sayıları karşılaştırırken önce onlar basamağına bakılır. Onlar basamağı büyük olan sayı daha büyüktür."
        }
    }).filter(Boolean) as DetailedQuestion[])}]
  },
  "M.2.1.1.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıları en yakın onluğa yuvarlar.",
    templates: [{ id: 'system-default-M.2.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 16 + i * 4;
        if (num % 10 === 5) return null;
        const answer = Math.round(num/10) * 10;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.4", kazanim_metni: "100’den küçük doğal sayıları en yakın onluğa yuvarlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num} sayısı en yakın hangi onluğa yuvarlanır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yanlış yuvarlama kuralı uygulama", "Diğer onluğa yuvarlama", "Birler basamağını onluk olarak alma"],
            gercek_yasam_baglantisi: "Alışverişte yaklaşık hesap yaparken sayıları yuvarlamak işimizi kolaylaştırır.",
            seviye: 'orta', cozum_anahtari: `Bir sayının birler basamağı 5 veya daha büyükse sayı bir üst onluğa, 5'ten küçükse kendi onluğuna yuvarlanır. Bu nedenle ${num}, ${answer}'e yuvarlanır.`
        };
    }).filter(Boolean) as DetailedQuestion[] }]
  },
  "M.2.1.2.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    templates: [{ id: 'system-default-M.2.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 28 + i * 3;
        const num2 = 35 + i * 2;
        const answer = num1 + num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.1", kazanim_metni: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Ayşe'nin ${num1} çiçeği vardı. Arkadaşı ona ${num2} çiçek daha verdi. Ayşe'nin toplam kaç çiçeği oldu?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeyi eklememe hatası", "Yanlış toplama", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "İki farklı poşetteki misketleri birleştirince toplam misket sayısını bulmak için toplama yaparız.",
            seviye: 'orta', cozum_anahtari: `${num1} ile ${num2}'i toplarken önce birlikler, sonra onluklar toplanır. Eldeye dikkat edilmelidir. Sonuç ${answer} olur.`
        }
    })}]
  },
  "M.2.1.2.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    templates: [{ id: 'system-default-M.2.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 28 + i;
        const num2 = 41 + i;
        const estimate = Math.round(num1/10)*10 + Math.round(num2/10)*10;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.2", kazanim_metni: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: {A: `${estimate-10}`, B: `${estimate}`, C: `${estimate+10}`, D: `${num1+num2}`},
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Yanlış onluğa yuvarlama", "Gerçek sonuç", "Çok uzak tahmin"],
            gercek_yasam_baglantisi: "Markette alacaklarımızın toplam fiyatını yaklaşık olarak hesaplamak için tahmin etme becerisini kullanırız.",
            seviye: 'orta', cozum_anahtari: `${num1} sayısı ${Math.round(num1/10)*10}'a, ${num2} sayısı ${Math.round(num2/10)*10}'a yuvarlanır. Toplamları ${estimate} olur.`
        }
    })}]
  },
  "M.2.1.2.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.2.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 40 + i*5;
        const num2 = 25 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer, 5);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.3", kazanim_metni: "Zihinden toplama işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ${num2} işleminin zihinden yapılışı sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış toplama", "Birlikleri yanlış toplama"],
            gercek_yasam_baglantisi: "Oyun oynarken iki zarda gelen sayıları hızlıca toplamak için zihinden işlem yaparız.",
            seviye: 'orta', cozum_anahtari: `Önce onluklar toplanır (${num1}+${Math.floor(num2/10)*10}), sonra birlikler eklenir.`
        }
    })}]
  },
   "M.2.1.2.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 45 + i;
        const num2 = 27 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.4", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir otobüste ${num1} yolcu vardı. İlk durakta ${num2} yolcu daha bindi. Otobüste toplam kaç yolcu oldu?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sayıları yanlış toplama", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Doğum günü partisine gelen misafirlerin sayısını hesaplamak için toplama problemi çözeriz.",
            seviye: 'ileri', cozum_anahtari: `Otobüsteki yolcu sayısı arttığı için toplama işlemi yapılır. ${num1} + ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.3.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
    templates: [{ id: 'system-default-M.2.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 73 + i;
        const num2 = 25 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.1", kazanim_metni: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir manavda ${num1} elma vardı. Bunların ${num2} tanesi satıldı. Geriye kaç elma kaldı?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onluk bozmadan çıkarma", "Toplama yapma", "Küçükten büyüğü çıkarma"],
            gercek_yasam_baglantisi: "Harçlığımızdan bir şey aldığımızda ne kadar paramız kaldığını çıkarma işlemiyle buluruz.",
            seviye: 'orta', cozum_anahtari: `Satış yapıldığı için elma sayısı azalır, çıkarma yapılır. ${num1} - ${num2} = ${answer}. Onluk bozmak gerekir.`
        }
    })}]
  },
  "M.2.1.3.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    templates: [{ id: 'system-default-M.2.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 88 - i;
        const num2 = 32 + i;
        const estimate = Math.round(num1/10)*10 - Math.round(num2/10)*10;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.2", kazanim_metni: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: {A: `${estimate-10}`, B: `${estimate+10}`, C: `${estimate}`, D: `${num1-num2}`},
            dogru_cevap: 'C',
            yanlis_secenek_tipleri: ["Yanlış onluğa yuvarlama", "Gerçek sonuç", "Toplama tahmini yapma"],
            gercek_yasam_baglantisi: "Bir mesafenin ne kadarını yürüdüğümüzü ve ne kadar kaldığını yaklaşık olarak hesaplarken tahmin kullanırız.",
            seviye: 'orta', cozum_anahtari: `${num1} sayısı ${Math.round(num1/10)*10}'a, ${num2} sayısı ${Math.round(num2/10)*10}'a yuvarlanır. Farkları ${estimate} olur.`
        }
    })}]
  },
  "M.2.1.3.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.2.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 80 + i;
        const num2 = 35 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer, 5);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.3", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ${num2} işleminin zihinden yapılışı sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış çıkarma", "Geriye yanlış sayma"],
            gercek_yasam_baglantisi: "Para üstü alırken doğru alıp almadığımızı kontrol etmek için zihinden çıkarma yaparız.",
            seviye: 'orta', cozum_anahtari: `${num1}'den önce 30 çıkarılır (${num1-30}), sonra kalan 5 çıkarılır (${num1-30-5}). Sonuç ${answer}.`
        }
    })}]
  },
   "M.2.1.3.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.3.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 92 - i;
        const num2 = 58 - i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.4", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir ağaçta ${num1} kuş vardı. Bir süre sonra ${num2} kuş uçup gitti. Ağaçta kaç kuş kaldı?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sayıları yanlış çıkarma", "Toplama yapma"],
            gercek_yasam_baglantisi: "Okuduğumuz bir kitabın kaç sayfasının kaldığını bulmak için çıkarma problemi çözeriz.",
            seviye: 'ileri', cozum_anahtari: `Ağaçtaki kuş sayısı azaldığı için çıkarma işlemi yapılır. ${num1} - ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.4.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
    templates: [{ id: 'system-default-M.2.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 4 + (i%5);
        const count = 3 + (i%2);
        const addition = Array(count).fill(num).join(' + ');
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.1", kazanim_metni: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${addition} toplama işleminin çarpma işlemi olarak gösterimi hangisidir?`,
            secenekler: { A: `${count} x ${num}`, B: `${num} x ${num}`, C: `${count} + ${num}`, D: `${count-1} x ${num}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Sayıyı kendisiyle çarpma", "Toplama olarak yazma", "Yanlış sayıda çarpma"],
            gercek_yasam_baglantisi: "Her birinde 3 şeker olan 4 paketteki toplam şeker sayısını 3+3+3+3 veya 4x3 ile bulabiliriz.",
            seviye: 'temel', cozum_anahtari: `${count} tane ${num}'ün toplanması, ${count} kere ${num} demektir. Bu da ${count} x ${num} olarak yazılır.`
        }
    })}]
  },
   "M.2.1.4.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpım tablosunu oluşturur.",
    templates: [{ id: 'system-default-M.2.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 3 + (i % 7);
        const num2 = 5 + (i % 5);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 5);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.2", kazanim_metni: "Çarpım tablosunu oluşturur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} x ${num2} işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yakın çarpım sonucu", "Toplama yapma"],
            gercek_yasam_baglantisi: "Çarpım tablosunu bilmek, alışverişte veya yemek tariflerinde miktarları hesaplarken bize hız kazandırır.",
            seviye: 'orta', cozum_anahtari: `${num1} kere ${num2}, ${answer} eder. Bu, çarpım tablosundaki temel bir bilgidir.`
        }
    })}]
  },
  "M.2.1.4.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 6 + i;
        const num2 = 5;
        const answer = num1 * num2;
        const options = createNumericOptions(answer, num1);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.3", kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir kutuda ${num1} kalem vardır. ${num2} kutuda toplam kaç kalem olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çarpma"],
            gercek_yasam_baglantisi: "Her arkadaşımıza eşit sayıda şeker vermek istediğimizde toplam kaç şekere ihtiyacımız olduğunu çarparak buluruz.",
            seviye: 'ileri', cozum_anahtari: `Her kutuda eşit sayıda kalem olduğu için toplamı bulmak için çarpma yapılır. ${num2} x ${num1} = ${answer}.`
        }
    })}]
  },
  "M.2.1.5.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işleminin anlamını kavrar.",
    templates: [{ id: 'system-default-M.2.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const total = 12 + i*2;
        const groups = 3 + (i%2);
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.1", kazanim_metni: "Bölme işleminin anlamını kavrar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} elmayı ${groups} arkadaşa eşit olarak paylaştırırsak, bu durumu hangi işlemle ifade ederiz?`,
            secenekler: { A: "Toplama", B: "Çıkarma", C: "Çarpma", D: "Bölme" },
            dogru_cevap: 'D',
            yanlis_secenek_tipleri: ["Ters işlemler", "İlgisiz işlem"],
            gercek_yasam_baglantisi: "Bir pastayı eşit dilimlere ayırmak veya oyuncakları arkadaşlarımızla eşit paylaşmak bölme işlemidir.",
            seviye: 'temel',
            cozum_anahtari: "Eşit olarak paylaştırma veya gruplama durumları bölme işlemi ile ifade edilir."
        }
    })}]
  },
   "M.2.1.5.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const groups = 4 + (i%3);
        const answer = 5 + i;
        const total = groups * answer;
        const options = createNumericOptions(answer, 3);
        const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.2", kazanim_metni: "Bölme işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} ceviz, ${groups} tabağa eşit olarak paylaştırılırsa her tabakta kaç ceviz olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Çarpma yapma", "Yanlış bölme"],
            gercek_yasam_baglantisi: "Bir deste kalemi kardeşimizle eşit paylaşmak için bölme problemi çözeriz.",
            seviye: 'ileri', cozum_anahtari: `Eşit paylaştırma olduğu için bölme yapılır. ${total} / ${groups} = ${answer}.`
        }
    })}]
  },
  "M.2.2.1.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.2.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const questionType = i % 3; // 0: kare, 1: üçgen, 2: daire
        let questionText = '';
        const options = { A: 'Kare', B: 'Üçgen', C: 'Daire', D: 'Altıgen' };
        let correctAnswerKey = 'A';

        if (questionType === 0) {
            questionText = '4 kenarı ve 4 köşesi olan şekil hangisidir?';
            correctAnswerKey = 'A';
        } else if (questionType === 1) {
            questionText = '3 kenarı ve 3 köşesi olan şekil hangisidir?';
            correctAnswerKey = 'B';
        } else {
            questionText = 'Kenarı ve köşesi olmayan şekil hangisidir?';
            correctAnswerKey = 'C';
        }
        
        return {
            sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.1.1", kazanim_metni: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: questionText,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Farklı kenar sayısı", "Farklı köşe sayısı", "Müfredat dışı şekil"],
            gercek_yasam_baglantisi: "Bir trafik levhasının veya bir pencerenin şeklini kenar ve köşe sayısına göre tanıyabiliriz.",
            seviye: 'temel', cozum_anahtari: `Karenin 4, üçgenin 3, dairenin ise 0 kenarı ve köşesi vardır.`
        };
    })}]
  },
  "M.2.2.2.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
    templates: [{ id: 'system-default-M.2.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      return {
        sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.2.1", kazanim_metni: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `▲, ■, ●, ▲, ■, ●, ? örüntüsünde sıradaki şekil hangisidir?`,
        secenekler: { A: '■', B: '●', C: '▲', D: '◆' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Örüntüdeki diğer elemanlar", "Örüntüde olmayan eleman"],
        gercek_yasam_baglantisi: "Kaldırım taşlarının dizilişi, şarkılardaki nakaratlar ve günler birer örüntüdür.",
        seviye: 'orta', cozum_anahtari: `Örüntü ▲, ■, ● şeklinde üçlü bir grup olarak tekrar etmektedir. Son şekil ● olduğuna göre, başa dönüp ▲ gelmelidir.`
      };
    })}]
  },
  "M.2.3.1.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Standart uzunluk ölçme birimlerini tanır.",
    templates: [{ id: 'system-default-M.2.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.1", kazanim_metni: "Standart uzunluk ölçme birimlerini tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi bir uzunluk ölçme birimidir?`,
        secenekler: { A: 'Kilogram', B: 'Litre', C: 'Metre', D: 'Saat' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Ağırlık birimi", "Sıvı ölçme birimi", "Zaman ölçme birimi"],
        gercek_yasam_baglantisi: "Boyumuzu ölçtürürken veya bir mobilyanın odaya sığıp sığmayacağını anlamak için metre ve santimetre kullanırız.",
        seviye: 'temel', cozum_anahtari: `Metre ve santimetre standart uzunluk ölçme birimleridir. Kilogram ağırlık, litre sıvı, saat ise zaman ölçer.`
      };
    })}]
  },
  "M.2.3.1.2": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.2.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const meters = i + 1;
      const centimeters = meters * 100;
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.2", kazanim_metni: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${meters} metre kaç santimetredir?`,
        secenekler: { A: `${meters}`, B: `${meters * 10}`, C: `${centimeters}`, D: `${centimeters * 10}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Birimleri karıştırma", "Yanlış sıfır ekleme"],
        gercek_yasam_baglantisi: "Bir terzinin kumaş ölçerken veya bir marangozun tahta keserken metre ve santimetreyi bir arada kullanması gerekir.",
        seviye: 'orta', cozum_anahtari: `1 metre 100 santimetreye eşittir. Bu yüzden ${meters} metreyi bulmak için ${meters} ile 100'ü çarparız.`
      };
    })}]
  },
  "M.2.3.2.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Tam, yarım ve çeyrek saatleri okur.",
    templates: [{ id: 'system-default-M.2.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 12 }, (_, i) => {
      const type = i % 3; // 0: tam, 1: yarım, 2: çeyrek
      const hour = 1 + (i % 12);
      let questionText = '';
      let correctAnswer = '';

      if (type === 0) { // Tam saat
        questionText = `Saat tam ${hour} ise yelkovan hangi sayının üzerindedir?`;
        correctAnswer = '12';
      } else if (type === 1) { // Yarım saat (buçuk)
        questionText = `Saat ${hour} buçuk ise yelkovan hangi sayının üzerindedir?`;
        correctAnswer = '6';
      } else { // Çeyrek geçiyor
        questionText = `Saat ${hour}'i çeyrek geçiyorsa yelkovan hangi sayının üzerindedir?`;
        correctAnswer = '3';
      }
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.2.1", kazanim_metni: "Tam, yarım ve çeyrek saatleri okur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: questionText,
        secenekler: { A: '12', B: '3', C: '6', D: '9' },
        dogru_cevap: Object.keys({ A: '12', B: '3', C: '6', D: '9' }).find(key => ({ A: '12', B: '3', C: '6', D: '9' }[key as 'A'|'B'|'C'|'D'] === correctAnswer))!,
        yanlis_secenek_tipleri: ["Diğer zaman diliminin yelkovan konumu", "Akrep ile karıştırma"],
        gercek_yasam_baglantisi: "Okula geç kalmamak veya servisi kaçırmamak için saatleri doğru okumak çok önemlidir.",
        seviye: 'orta', cozum_anahtari: `Tam saatlerde yelkovan 12'yi, buçuklarda 6'yı, çeyrek geçelerde 3'ü gösterir.`
      };
    })}]
  },
  "M.2.3.3.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Paralarımızla ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.2.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const price = 3 + i;
      const paid = 10 + (Math.floor(i/4) * 5); // Paid amount increases to keep change sensible
      const change = paid - price;
      const options = createNumericOptions(change, 2);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(change))!;
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.3.1", kazanim_metni: "Paralarımızla ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Tanesi ${price} TL olan bir çikolatadan bir tane alan Ali, satıcıya ${paid} TL verirse kaç TL para üstü alır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çıkarma", "Verilen parayı cevap sanma"],
        gercek_yasam_baglantisi: "Kantin veya market alışverişi yaparken ne kadar para üstü alacağımızı hesaplamak için bu beceriyi kullanırız.",
        seviye: 'ileri', cozum_anahtari: `Para üstünü bulmak için ödenen paradan (${paid} TL) ürünün fiyatı (${price} TL) çıkarılır. ${paid} - ${price} = ${change} TL.`
      };
    })}]
  },
  "M.2.3.4.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Nesneleri gram ve kilogram birimleriyle tartar.",
    templates: [{ id: 'system-default-M.2.3.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const item = i % 2 === 0 ? 'bir karpuz' : 'bir silgi';
      const unit = i % 2 === 0 ? 'kilogram' : 'gram';
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.4.1", kazanim_metni: "Nesneleri gram ve kilogram birimleriyle tartar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir ${item} tartmak için hangi ölçü birimini kullanmak daha uygundur?`,
        secenekler: { A: 'Gram', B: 'Kilogram', C: 'Metre', D: 'Litre' },
        dogru_cevap: unit === 'gram' ? 'A' : 'B',
        yanlis_secenek_tipleri: ["Uygun olmayan ağırlık birimi", "Uzunluk birimi", "Sıvı ölçme birimi"],
        gercek_yasam_baglantisi: "Manavdan elma alırken kilogram, kuyumcudan altın alırken gram ölçü birimi kullanılır.",
        seviye: 'temel', cozum_anahtari: `Ağır nesneler (karpuz, insan) için kilogram, hafif nesneler (silgi, yüzük) için gram kullanılır.`
      };
    })}]
  },
  "M.2.4.1.1": {
    gradeName: "2. Sınıf", unitName: "Veri İşleme", kazanimName: "Veri toplar ve çetele tablosu oluşturur.",
    templates: [{ id: 'system-default-M.2.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const red = 5 + i;
      const blue = 3 + i;
      const answer = red;
      const options = createNumericOptions(answer, 3);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 2, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.2.4.1.1", kazanim_metni: "Veri toplar ve çetele tablosu oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kutudaki bilyelerin renklerine göre oluşturulan sıklık tablosu aşağıdadır. Bu kutuda kaç tane kırmızı bilye vardır?`,
        grafik_verisi: {
          tip: 'siklik_tablosu',
          baslik: 'Kutudaki Bilyeler',
          veri: [
            { etiket: 'Kırmızı', deger: red },
            { etiket: 'Mavi', deger: blue }
          ]
        },
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer rengin sayısı", "Yanlış sayma"],
        gercek_yasam_baglantisi: "Sınıf başkanlığı seçiminde adayların aldığı oyları saymak için çetele tablosu kullanabiliriz.",
        seviye: 'temel', cozum_anahtari: `Çetele veya sıklık tablosunda 'Kırmızı' satırının karşısındaki sayıya bakılır. Cevap ${answer}'dir.`
      };
    })}]
  },
  "M.2.4.1.2": {
    gradeName: "2. Sınıf", unitName: "Veri İşleme", kazanimName: "Nesne ve şekil grafiği oluşturur.",
    templates: [{ id: 'system-default-M.2.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const elma = 3 + i;
      const cilek = 5 + i;
      const answer = cilek;
      const options = createNumericOptions(answer, 3);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 2, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.2.4.1.2", kazanim_metni: "Nesne ve şekil grafiği oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir grup öğrencinin en sevdiği meyveler nesne grafiği ile gösterilmiştir. Grafiğe göre çileği seven kaç öğrenci vardır?`,
        grafik_verisi: {
          tip: 'nesne_grafiği',
          baslik: 'En Sevilen Meyveler',
          veri: [
            { etiket: 'Elma', deger: elma, nesne: '🍎' },
            { etiket: 'Çilek', deger: cilek, nesne: '🍓' }
          ],
          not: 'Her nesne 1 öğrenciyi göstermektedir.'
        },
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer meyveyi sevenlerin sayısı", "Yanlış sayma"],
        gercek_yasam_baglantisi: "Hava durumu takviminde güneşli ve yağmurlu günleri saymak için nesne grafiği kullanabiliriz.",
        seviye: 'orta', cozum_anahtari: `Grafikte 'Çilek' satırında ${cilek} tane nesne bulunmaktadır. Bu, ${cilek} öğrenci demektir.`
      };
    })}]
  },
};
