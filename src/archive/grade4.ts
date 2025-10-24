import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions, numberToWordsTr } from './helpers';

export const ARCHIVE_DATA_GRADE_4: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 4. SINIF
  // =================================================================
   "M.4.1.1.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.4.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 12345 + i * 11111;
      const words = numberToWordsTr(num);
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.1", kazanim_metni: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı hangisidir?`,
        secenekler: { A: `${num}`, B: `${num.toString().split('').reverse().join('')}`, C: `${num - 100}`, D: `${num + 1000}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Rakamları ters yazma", "Yakın sayı", "Büyük sayı"],
        gercek_yasam_baglantisi: "Bir arabanın fiyatını veya bir şehrin nüfusunu okurken büyük sayıları doğru bir şekilde anlamamız gerekir.",
        seviye: 'temel', cozum_anahtari: `Sayılar bölüklerine ayrılarak okunur. "${words}" sayısının doğru yazılışı ${num}'dur.`
      };
    })}]
  },
  "M.4.1.1.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlar basamağına kadar olan doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.4.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 512307 + i * 10101;
      const words = numberToWordsTr(num);
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.2", kazanim_metni: "Milyonlar basamağına kadar olan doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı hangisidir?`,
        secenekler: createNumericOptions(num, 10000),
        dogru_cevap: Object.keys(createNumericOptions(num, 10000)).find(k => createNumericOptions(num, 10000)[k as keyof ReturnType<typeof createNumericOptions>] === String(num)) || 'A',
        yanlis_secenek_tipleri: ["Basamakları yanlış yerleştirme", "Bölükleri karıştırma", "Sıfırı atlama"],
        gercek_yasam_baglantisi: "Bir ülkenin nüfusunu veya bir şirketin yıllık gelirini okuyup yazarken bu beceri kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sayı bölüklerine göre yazılır: "${words}" sayısının doğru yazılışı ${num}'dur.`
      };
    })}]
  },
  "M.4.1.1.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
    templates: [{ id: 'system-default-M.4.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 5432 + i * 17;
      const nearestTen = Math.round(num / 10) * 10;
      const nearestHundred = Math.round(num / 100) * 100;
      const isTen = i % 2 === 0;
      const answer = isTen ? nearestTen : nearestHundred;
      const options = createNumericOptions(answer, isTen ? 10 : 100, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;

      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.3", kazanim_metni: "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının en yakın ${isTen ? 'onluğa' : 'yüzlüğe'} yuvarlanmış hali hangisidir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer basamağa yuvarlama", "Aşağı yuvarlama hatası", "Yukarı yuvarlama hatası"],
        gercek_yasam_baglantisi: "Bir market alışverişinin toplam tutarını yaklaşık olarak tahmin etmek için sayıları yuvarlarız.",
        seviye: 'orta', cozum_anahtari: `Bir sayıyı en yakın onluğa yuvarlamak için birler basamağına, yüzlüğe yuvarlamak için onlar basamağına bakılır. 5 ve üzeri rakamlar bir üst basamağa yuvarlanır.`
      };
    })}]
  },
  "M.4.1.1.4": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sayı örüntülerindeki ilişkiyi bulur ve örüntüyü genişletir.",
    templates: [{ id: 'system-default-M.4.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const start = 23 + i*2;
      const step = 8 + (i % 3);
      const answer = start + 4 * step;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.4", kazanim_metni: "Sayı örüntülerindeki ilişkiyi bulur ve örüntüyü genişletir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${start}, ${start+step}, ${start+2*step}, ${start+3*step}, ? sayı örüntüsünde "?" yerine hangi sayı gelmelidir?`,
        secenekler: { A: `${answer-1}`, B: `${answer}`, C: `${answer+1}`, D: `${answer+step}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Farklı bir adımla ilerleme", "Toplama hatası"],
        gercek_yasam_baglantisi: "Büyüyen bir bitkinin boyunu her hafta ölçerek bir sonraki haftaki boyunu tahmin etmek bir örüntü problemidir.",
        seviye: 'orta', cozum_anahtari: `Örüntüdeki sayılar ${step}'er ${step}'er artmaktadır. ${start+3*step}'ye ${step} eklediğimizde ${answer} bulunur.`
      };
    })}]
  },
  "M.4.1.2.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 1234 + i * 25;
      const num2 = 5678 - i * 30;
      const answer = num1 + num2;
      const options = createNumericOptions(answer, 100, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.1", kazanim_metni: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir okulda ${num1} kız öğrenci ve ${num2} erkek öğrenci bulunmaktadır. Bu okulda toplam kaç öğrenci vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Eldeleri yanlış toplama", "Basamak kaydırma hatası", "Çıkarma yapma"],
        gercek_yasam_baglantisi: "İki farklı mahallenin nüfuslarını birleştirerek toplam nüfusu bulmak için toplama işlemi yaparız.",
        seviye: 'orta', cozum_anahtari: `Toplam öğrenci sayısını bulmak için kız ve erkek öğrenci sayıları toplanır: ${num1} + ${num2} = ${answer}.`
      };
    })}]
  },
  "M.4.1.2.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 450 + i * 10;
      const num2 = 230 - i * 5;
      const answer = num1 + num2;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.2", kazanim_metni: "Zihinden toplama işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} + ${num2} işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: { A: `${answer-100}`, B: `${answer-10}`, C: `${answer}`, D: `${answer+10}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece yüzlükleri toplama", "Onlukları yanlış toplama"],
        gercek_yasam_baglantisi: "Alışveriş yaparken iki ürünün fiyatını hızlıca toplayarak yaklaşık tutarı hesaplamak için zihinden toplama kullanırız.",
        seviye: 'orta', cozum_anahtari: `Önce yüzlükler toplanır (${Math.floor(num1/100)*100} + ${Math.floor(num2/100)*100}), sonra onluklar toplanır (${num1%100} + ${num2%100}). Sonuçlar birleştirilir: ${answer}.`
      };
    })}]
  },
  "M.4.1.2.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.4.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 1350 + i*15;
      const num2 = 1475 - i*10;
      const answer = num1 + num2;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.3", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir çiftçi tarlasından ilk gün ${num1} kg, ikinci gün ${num2} kg domates toplamıştır. Çiftçi iki günde toplam kaç kg domates toplamıştır?`,
        secenekler: createNumericOptions(answer, 100),
        dogru_cevap: Object.keys(createNumericOptions(answer, 100)).find(k => createNumericOptions(answer, 100)[k as keyof ReturnType<typeof createNumericOptions>] === String(answer)) || 'A',
        yanlis_secenek_tipleri: ["Elde hatası", "Yanlış toplama"],
        gercek_yasam_baglantisi: "Birkaç günlük harçlığımızı birleştirerek toplamda ne kadar paramız olduğunu hesaplamak bir toplama problemidir.",
        seviye: 'ileri', cozum_anahtari: `İki gün boyunca toplanan domates miktarını bulmak için iki değer toplanır: ${num1} + ${num2} = ${answer} kg.`
      };
    })}]
  },
  "M.4.1.3.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 9876 - i * 40;
      const num2 = 4321 + i * 20;
      const answer = num1 - num2;
      const options = createNumericOptions(answer, 100, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.1", kazanim_metni: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir depoda ${num1} litre su vardı. Depodan ${num2} litre su kullanıldı. Depoda kaç litre su kalmıştır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Onluk bozmadan çıkarma hatası", "Basamakları yanlış çıkarma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Bir yolun ne kadarını gittiğimizi ve ne kadar kaldığını hesaplamak için çıkarma işlemi kullanırız.",
        seviye: 'orta', cozum_anahtari: `Kalan su miktarını bulmak için toplam sudan kullanılan su çıkarılır: ${num1} - ${num2} = ${answer}.`
      };
    })}]
  },
  "M.4.1.3.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 800 + i*100;
      const num2 = 350 + i*10;
      const answer = num1 - num2;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.2", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} - ${num2} işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: { A: `${answer-50}`, B: `${answer}`, C: `${answer+50}`, D: `${answer+100}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Onlukları yanlış çıkarma", "Yüzlükleri yanlış çıkarma"],
        gercek_yasam_baglantisi: "200 TL'den 40 TL'lik bir harcama yaptığımızda kalan parayı zihinden hızlıca hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1}'den önce ${Math.floor(num2/100)*100} çıkarılır, ardından kalan onluklar çıkarılır.`
      };
    })}]
  },
  "M.4.1.3.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.4.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 4500 + i*50;
      const num2 = 1250 + i*25;
      const answer = num1 - num2;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.3", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir stadyumda ${num1} seyirci vardı. Maçın devre arasında ${num2} seyirci stadyumdan ayrıldı. Stadyumda kaç seyirci kalmıştır?`,
        secenekler: { A: `${answer}`, B: `${answer+100}`, C: `${answer-100}`, D: `${num1+num2}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Onluk bozma hatası", "Toplama yapma"],
        gercek_yasam_baglantisi: "Biriktirdiğimiz paradan istediğimiz bir şeyi aldığımızda geriye ne kadar kaldığını çıkarma problemiyle buluruz.",
        seviye: 'ileri', cozum_anahtari: `Kalan seyirci sayısını bulmak için toplam seyirciden ayrılan seyirci sayısı çıkarılır: ${num1} - ${num2} = ${answer}.`
      };
    })}]
  },
  "M.4.1.4.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.4.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 125 + i * 5;
      const num2 = 25 + i;
      const answer = num1 * num2;
      const options = createNumericOptions(answer, 200, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.4.1", kazanim_metni: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir apartmanda ${num2} daire vardır ve her dairenin aylık aidatı ${num1} TL'dir. Apartmanın bir aylık toplam aidat geliri kaç TL'dir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Çarpma sırasında basamak kaydırma hatası", "Eldeleri eklememe", "Toplama yapma"],
        gercek_yasam_baglantisi: "Bir sitedeki tüm dairelerin toplam aidat gelirini hesaplamak için çarpma işlemi yapılır.",
        seviye: 'orta', cozum_anahtari: `Toplam geliri bulmak için daire sayısı ile aylık aidat çarpılır: ${num1} x ${num2} = ${answer}.`
      };
    })}]
  },
  "M.4.1.4.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işleminin sonucunu tahmin eder.",
    templates: [{ id: 'system-default-M.4.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 48 + i;
      const num2 = 22 + i;
      const answer = (Math.round(num1 / 10) * 10) * (Math.round(num2 / 10) * 10);
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.4.2", kazanim_metni: "Çarpma işleminin sonucunu tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} x ${num2} işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: `${answer - 100}`, B: `${answer}`, C: `${num1*num2}`, D: `${answer + 100}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
        gercek_yasam_baglantisi: "Her birinde yaklaşık 30 yumurta olan 18 kolideki toplam yumurta sayısını tahmin ederek hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1} en yakın onluğa ${Math.round(num1 / 10) * 10}, ${num2} ise ${Math.round(num2 / 10) * 10} olarak yuvarlanır. Tahmini sonuç ${Math.round(num1 / 10) * 10} x ${Math.round(num2 / 10) * 10} = ${answer}'dir.`
      };
    })}]
  },
  "M.4.1.5.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler.",
    templates: [{ id: 'system-default-M.4.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const divisor = 12 + i;
      const quotient = 55 + i;
      const dividend = divisor * quotient;
      const options = createNumericOptions(quotient, 5, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(quotient))!;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.1", kazanim_metni: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${dividend} adet şeker, ${divisor} öğrenciye eşit olarak paylaştırılırsa her bir öğrenci kaç şeker alır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Kalanı yanlış hesaplama", "Bölme işleminde hata yapma", "Çarpma yapma"],
        gercek_yasam_baglantisi: "Bir miktar parayı belirli sayıda kişi arasında eşit olarak paylaştırmak için bölme işlemi kullanılır.",
        seviye: 'orta', cozum_anahtari: `Eşit paylaştırma yapıldığı için bölme işlemi yapılır: ${dividend} ÷ ${divisor} = ${quotient}.`
      };
    })}]
  },
  "M.4.1.5.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işleminin sonucunu tahmin eder.",
    templates: [{ id: 'system-default-M.4.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 812 + i * 20;
      const num2 = 19 + i;
      const answer = Math.round((Math.round(num1 / 10) * 10) / (Math.round(num2 / 10) * 10));
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.2", kazanim_metni: "Bölme işleminin sonucunu tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} ÷ ${num2} işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: `${answer}`, B: `${answer + 5}`, C: `${Math.floor(num1/num2)}`, D: `${answer - 5}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Gerçek sonuca yakın değer", "Sadece bir sayıyı yuvarlama"],
        gercek_yasam_baglantisi: "Yaklaşık 600 TL'lik bir masrafı 3 kişi paylaştığında kişi başı ne kadar düşeceğini tahmin edebiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1} en yakın onluğa ${Math.round(num1 / 10) * 10}, ${num2} ise ${Math.round(num2 / 10) * 10} olarak yuvarlanır. Tahmini sonuç yaklaşık ${answer}'dır.`
      };
    })}]
  },
  "M.4.1.5.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden bölme işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = (56 + i) * 100;
      const divisor = i % 2 === 0 ? 100 : 10;
      const answer = num1 / divisor;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.3", kazanim_metni: "Zihinden bölme işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} ÷ ${divisor} işleminin sonucu kaçtır?`,
        secenekler: { A: `${num1 / (divisor/10)}`, B: `${answer}`, C: `${answer/10}`, D: `${num1*10}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Bir sıfır silme", "Sıfır ekleme"],
        gercek_yasam_baglantisi: "300 TL'yi 10'ar TL'lik banknotlara ayırdığımızda kaç tane banknot olacağını zihinden bölerek buluruz.",
        seviye: 'orta', cozum_anahtari: `Bir sayıyı ${divisor}'e bölmek için sayının sonundan ${divisor === 100 ? 'iki' : 'bir'} sıfır silinir. ${num1} ÷ ${divisor} = ${answer}.`
      };
    })}]
  },
  "M.4.1.6.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Basit, bileşik ve tam sayılı kesirleri tanır ve modellerle gösterir.",
    templates: [{ id: 'system-default-M.4.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const type = i % 3; // 0: basit, 1: bileşik, 2: tam sayılı
        let question = '';
        let answer = '';
        if (type === 0) { question = "Aşağıdakilerden hangisi basit kesirdir?"; answer = 'A';}
        else if (type === 1) { question = "Aşağıdakilerden hangisi bileşik kesirdir?"; answer = 'B';}
        else { question = "Aşağıdakilerden hangisi tam sayılı kesirdir?"; answer = 'C';}
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.1", kazanim_metni: "Basit, bileşik ve tam sayılı kesirleri tanır ve modellerle gösterir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: question,
            secenekler: { A: `${3+i}/${5+i}`, B: `${7+i}/${4+i}`, C: `${2+i} tam 1/3`, D: `${5+i}` },
            dogru_cevap: answer,
            yanlis_secenek_tipleri: ["Farklı kesir türleri"],
            gercek_yasam_baglantisi: "Yemek tariflerinde '1 tam 1/2 (bir buçuk) bardak un' gibi ifadelerle kesirleri kullanırız.",
            seviye: 'temel', cozum_anahtari: "Payı paydasından küçük kesirler basit, büyük veya eşit olanlar bileşik, tam kısmı olanlar ise tam sayılı kesirdir."
        };
    })}]
  },
  "M.4.1.6.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirleri karşılaştırır ve sıralar.",
    templates: [{ id: 'system-default-M.4.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den = 8 + i;
      const nums = [1, 3, 5, 2].sort(() => 0.5 - Math.random());
      const maxNum = Math.max(...nums);
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.2", kazanim_metni: "Kesirleri karşılaştırır ve sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki kesirlerden hangisi en büyüktür?`,
        secenekler: { A: `${nums[0]}/${den}`, B: `${nums[1]}/${den}`, C: `${nums[2]}/${den}`, D: `${nums[3]}/${den}` },
        dogru_cevap: Object.keys({ A: '', B: '', C: '', D: '' }).find(key => `${nums[key.charCodeAt(0) - 65]}/${den}` === `${maxNum}/${den}`)!,
        yanlis_secenek_tipleri: ["En küçük kesir", "Diğer kesirler"],
        gercek_yasam_baglantisi: "Aynı pizzadan bir arkadaşımız bir dilim, biz ise üç dilim yersek kimin daha çok yediğini kesirleri karşılaştırarak anlarız.",
        seviye: 'orta', cozum_anahtari: `Paydaları eşit olan kesirlerden payı en büyük olan kesir (${maxNum}/${den}) en büyüktür.`
      };
    })}]
  },
  "M.4.1.6.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
    templates: [{ id: 'system-default-M.4.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den = 5 + (i%3);
      const num = 2 + (i%2);
      const whole = (7+i) * den;
      const answer = (whole / den) * num;
      return {
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.3", kazanim_metni: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${whole} cevizin ${num}/${den}'si kaç ceviz eder?`,
        secenekler: createNumericOptions(answer, 5),
        dogru_cevap: Object.keys(createNumericOptions(answer, 5)).find(k => createNumericOptions(answer, 5)[k as keyof ReturnType<typeof createNumericOptions>] === String(answer))!,
        yanlis_secenek_tipleri: ["Sadece birim kesir kadarını bulma", "Yanlış çarpma/bölme"],
        gercek_yasam_baglantisi: "Harçlığımızın 1/4'ünü biriktirmek istediğimizde ne kadar para ayırmamız gerektiğini bu yöntemle buluruz.",
        seviye: 'ileri', cozum_anahtari: `Önce çokluğun birim kesir kadarı bulunur (${whole} ÷ ${den} = ${whole/den}), sonra bu sonuç kesrin payı ile çarpılır (${whole/den} x ${num} = ${answer}).`
      };
    })}]
  },
  "M.4.1.7.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.7.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const den = 9 + (i%4);
        const num1 = 2 + (i%3);
        const num2 = 3 + (i%3);
        const answerNum = num1 + num2;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.7.1", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir pastanın ${num1}/${den}'ini Ali, ${num2}/${den}'sini Ayşe yemiştir. İkisi birlikte pastanın kaçta kaçını yemiştir?`,
            secenekler: { A: `${answerNum}/${den}`, B: `${answerNum}/${den*2}`, C: `${num1+num2}/${den-num1}`, D: `${answerNum-1}/${den}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Paydaları da toplama", "Yanlış payda hesaplama", "Payları yanlış toplama"],
            gercek_yasam_baglantisi: "Bir yolun önce 1/4'ünü sonra 2/4'ünü gittiğimizde toplam ne kadarını gittiğimizi kesirlerle toplama yaparak buluruz.",
            seviye: 'orta', cozum_anahtari: `Paydaları eşit kesirler toplanırken paylar toplanır, payda ortak olarak yazılır. ${num1}/${den} + ${num2}/${den} = ${answerNum}/${den}.`
        };
    })}]
  },
  "M.4.2.1.1": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Açının kenarlarını ve köşesini isimlendirir.",
    templates: [{ id: 'system-default-M.4.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const item = i % 2 === 0 ? "akrep ve yelkovanının" : "bir makasın kollarının";
        return {
            sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.1", kazanim_metni: "Açının kenarlarını ve köşesini isimlendirir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir saatin ${item} oluşturduğu açıda, iki kolun birleştiği merkez noktasına ne ad verilir?`,
            secenekler: { A: 'Kenar', B: 'Köşe', C: 'Açı', D: 'Doğru' },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Açıyı oluşturan ışınlar", "Açının kendisi"],
            gercek_yasam_baglantisi: "Bir kapının açılmasıyla oluşan açıda, kapının menteşeleri köşe, kapı ve duvar kenar görevi görür.",
            seviye: 'temel', cozum_anahtari: `Açıyı oluşturan iki ışının başlangıç noktasına açının köşesi, ışınlara ise açının kenarları (kolları) denir.`
        };
    })}]
  },
  "M.4.2.1.2": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Açıları standart olmayan birimlerle ölçer ve standart açı ölçme birimlerinin gerekliliğini açıklar.",
    templates: [{ id: 'system-default-M.4.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.2", kazanim_metni: "Açıları standart olmayan birimlerle ölçer ve standart açı ölçme birimlerinin gerekliliğini açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir açıyı ölçerken herkesin farklı sonuçlar bulmaması için neye ihtiyaç duyarız?`,
        secenekler: { A: 'Daha büyük açılara', B: 'Standart bir ölçme birimine', C: 'Farklı renkli kalemlere', D: 'Daha uzun kenarlara' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["İlgisiz kavramlar"],
        gercek_yasam_baglantisi: "Bir inşaat planında açıların herkes tarafından aynı anlaşılması için 'derece' gibi standart birimler kullanılır.",
        seviye: 'orta', cozum_anahtari: `Standart olmayan birimler (parmak, karış vb.) kişiden kişiye değiştiği için, herkesin aynı sonucu bulabileceği standart birimlere (derece gibi) ihtiyaç vardır.`
    }))}]
  },
  "M.4.2.1.3": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Açıları standart birimlerle ölçer.",
    templates: [{ id: 'system-default-M.4.2.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.3", kazanim_metni: "Açıları standart birimlerle ölçer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir karenin her bir iç açısının ölçüsü kaç derecedir?`,
        secenekler: { A: '45', B: '60', C: '90', D: '180' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Dar açı ölçüsü", "Geniş açı ölçüsü", "Doğru açı ölçüsü"],
        gercek_yasam_baglantisi: "Bir resim çerçevesinin köşelerinin tam 90 derece olması, çerçevenin düzgün durmasını sağlar.",
        seviye: 'temel', cozum_anahtari: `Kare ve dikdörtgen gibi şekillerin tüm iç açıları 90 derecedir ve bunlara dik açı denir. Açı ölçer (gönye) ile ölçülebilir.`
    }))}]
  },
  "M.4.2.2.1": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Üçgenleri kenar uzunluklarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.4.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const types = [
          { q: "Bütün kenar uzunlukları birbirinden farklı olan", a: "Çeşitkenar üçgen"},
          { q: "İki kenar uzunluğu birbirine eşit olan", a: "İkizkenar üçgen"},
          { q: "Bütün kenar uzunlukları birbirine eşit olan", a: "Eşkenar üçgen"}
      ];
      const current = types[i % types.length];
      return {
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.1", kazanim_metni: "Üçgenleri kenar uzunluklarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${current.q} üçgene ne ad verilir?`,
        secenekler: { A: 'Eşkenar üçgen', B: 'İkizkenar üçgen', C: 'Çeşitkenar üçgen', D: 'Dik üçgen' },
        dogru_cevap: Object.keys({ A: 'Eşkenar üçgen', B: 'İkizkenar üçgen', C: 'Çeşitkenar üçgen', D: 'Dik üçgen' }).find(key => ({ A: 'Eşkenar üçgen', B: 'İkizkenar üçgen', C: 'Çeşitkenar üçgen', D: 'Dik üçgen' }[key as 'A'|'B'|'C'|'D'] === current.a))!,
        yanlis_secenek_tipleri: ["Tüm kenarları eşit olan", "İki kenarı eşit olan", "Açısına göre sınıflandırma"],
        gercek_yasam_baglantisi: "Çevremizdeki üçgen şeklindeki nesneler (çatı, sandviç dilimi vb.) kenar uzunluklarına göre farklılık gösterebilir.",
        seviye: 'temel', cozum_anahtari: `Üç kenarı da eşitse eşkenar, iki kenarı eşitse ikizkenar, tüm kenarları farklıysa çeşitkenar üçgen denir.`
      };
    })}]
  },
  "M.4.2.2.2": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Üçgenleri açılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.4.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const types = [
          { q: "Bir açısı 90 dereceden büyük olan", a: "Geniş açılı üçgen" },
          { q: "Bütün açıları 90 dereceden küçük olan", a: "Dar açılı üçgen" },
          { q: "Bir açısı tam 90 derece olan", a: "Dik açılı üçgen" }
      ];
      const current = types[i % types.length];
      return {
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.2", kazanim_metni: "Üçgenleri açılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${current.q} üçgene ne ad verilir?`,
        secenekler: { A: 'Dar açılı üçgen', B: 'Dik açılı üçgen', C: 'Geniş açılı üçgen', D: 'Eşkenar üçgen' },
        dogru_cevap: Object.keys({ A: 'Dar açılı üçgen', B: 'Dik açılı üçgen', C: 'Geniş açılı üçgen', D: 'Eşkenar üçgen' }).find(key => ({ A: 'Dar açılı üçgen', B: 'Dik açılı üçgen', C: 'Geniş açılı üçgen', D: 'Eşkenar üçgen' }[key as 'A'|'B'|'C'|'D'] === current.a))!,
        yanlis_secenek_tipleri: ["Tüm açıları dar olan", "Bir açısı dik olan", "Kenarına göre sınıflandırma"],
        gercek_yasam_baglantisi: "Bazı binaların mimarisinde estetik amaçlı geniş açılı üçgenler kullanılır.",
        seviye: 'temel', cozum_anahtari: `Tüm açıları 90 dereceden küçükse dar açılı, bir açısı 90 derece ise dik açılı, bir açısı 90 dereceden büyükse geniş açılı üçgen denir.`
      };
    })}]
  },
  "M.4.2.2.3": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Kare ve dikdörtgenin kenar ve açı özelliklerini belirler.",
    templates: [{ id: 'system-default-M.4.2.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.3", kazanim_metni: "Kare ve dikdörtgenin kenar ve açı özelliklerini belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi hem kare hem de dikdörtgen için ortak bir özelliktir?`,
        secenekler: { A: 'Bütün kenarları eşittir.', B: 'Bütün açıları dik açıdır.', C: 'İki kısa, iki uzun kenarı vardır.', D: 'Köşegenleri birbirini dik keser.' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece karenin özelliği", "Sadece dikdörtgenin özelliği"],
        gercek_yasam_baglantisi: "Bir marangoz, kare veya dikdörtgen bir masa yaparken tüm köşelerin 90 derece olduğundan emin olmalıdır.",
        seviye: 'orta', cozum_anahtari: `Hem karenin hem de dikdörtgenin bütün iç açıları 90 derecedir. Ancak sadece karenin tüm kenarları eşittir.`
    }))}]
  },
  "M.4.2.3.1": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Düzlemsel şekillerin simetri doğrularını belirler.",
    templates: [{ id: 'system-default-M.4.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const shapes = [
          { name: "Dikdörtgen", answer: "2" },
          { name: "Kare", answer: "4" },
          { name: "Eşkenar üçgen", answer: "3" },
          { name: "Daire", answer: "Sonsuz" }
        ];
        const current = shapes[i % shapes.length];
        const options = { A: "1", B: "2", C: "4", D: "Sonsuz" };
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === current.answer) || 'A';
      return {
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.3.1", kazanim_metni: "Düzlemsel şekillerin simetri doğrularını belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir ${current.name.toLowerCase()}'in kaç tane simetri doğrusu vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Başka bir şeklin simetri sayısı", "Yanlış sayma"],
        gercek_yasam_baglantisi: "Bir kağıdı katlayıp keserek simetrik şekiller oluşturmak, simetri doğrusu kavramının bir uygulamasıdır.",
        seviye: 'orta',
        cozum_anahtari: "Dikdörtgenin 2, karenin 4, eşkenar üçgenin 3 ve dairenin sonsuz sayıda simetri doğrusu vardır."
      };
    })}]
  },
};
