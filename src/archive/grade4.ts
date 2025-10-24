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
      const words = numberToWordsTr(Math.floor(num / 1000)) + " bin " + numberToWordsTr(num % 1000);
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
    templates: [{ id: 'system-default-M.4.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.2", kazanim_metni: "Milyonlar basamağına kadar olan doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "beş yüz on iki bin üç yüz yedi" olan sayı hangisidir?`,
        secenekler: { A: '512 307', B: '51 237', C: '5 123 007', D: '512 037' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Basamakları yanlış yerleştirme", "Bölükleri karıştırma", "Sıfırı atlama"],
        gercek_yasam_baglantisi: "Bir ülkenin nüfusunu veya bir şirketin yıllık gelirini okuyup yazarken bu beceri kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sayı bölüklerine göre yazılır: "beş yüz on iki bin" (512) ve "üç yüz yedi" (307). Birleştirince 512 307 olur.`
    }]}]
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
    templates: [{ id: 'system-default-M.4.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.4", kazanim_metni: "Sayı örüntülerindeki ilişkiyi bulur ve örüntüyü genişletir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `23, 31, 39, 47, ? sayı örüntüsünde "?" yerine hangi sayı gelmelidir?`,
        secenekler: { A: '54', B: '55', C: '56', D: '57' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Farklı bir adımla ilerleme", "Toplama hatası"],
        gercek_yasam_baglantisi: "Büyüyen bir bitkinin boyunu her hafta ölçerek bir sonraki haftaki boyunu tahmin etmek bir örüntü problemidir.",
        seviye: 'orta', cozum_anahtari: `Örüntüdeki sayılar 8'er 8'er artmaktadır. 47'ye 8 eklediğimizde 55 bulunur.`
    }]}]
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
    templates: [{ id: 'system-default-M.4.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.2", kazanim_metni: "Zihinden toplama işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `450 + 230 işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: { A: '600', B: '650', C: '680', D: '700' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece yüzlükleri toplama", "Onlukları yanlış toplama"],
        gercek_yasam_baglantisi: "Alışveriş yaparken iki ürünün fiyatını hızlıca toplayarak yaklaşık tutarı hesaplamak için zihinden toplama kullanırız.",
        seviye: 'orta', cozum_anahtari: `Önce yüzlükler toplanır (400 + 200 = 600), sonra onluklar toplanır (50 + 30 = 80). Sonuçlar birleştirilir: 600 + 80 = 680.`
    }]}]
  },
  "M.4.1.2.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.4.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.3", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir çiftçi tarlasından ilk gün 1350 kg, ikinci gün 1475 kg domates toplamıştır. Çiftçi iki günde toplam kaç kg domates toplamıştır?`,
        secenekler: { A: '2725', B: '2825', C: '2800', D: '2750' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Elde hatası", "Yanlış toplama"],
        gercek_yasam_baglantisi: "Birkaç günlük harçlığımızı birleştirerek toplamda ne kadar paramız olduğunu hesaplamak bir toplama problemidir.",
        seviye: 'ileri', cozum_anahtari: `İki gün boyunca toplanan domates miktarını bulmak için iki değer toplanır: 1350 + 1475 = 2825 kg.`
    }]}]
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
    templates: [{ id: 'system-default-M.4.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.2", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `800 - 350 işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: { A: '400', B: '450', C: '500', D: '550' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Onlukları yanlış çıkarma", "Yüzlükleri yanlış çıkarma"],
        gercek_yasam_baglantisi: "200 TL'den 40 TL'lik bir harcama yaptığımızda kalan parayı zihinden hızlıca hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `800'den önce 300 çıkarılır (sonuç 500), ardından 50 daha çıkarılır. 500 - 50 = 450.`
    }]}]
  },
  "M.4.1.3.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.4.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.3", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir stadyumda 4500 seyirci vardı. Maçın devre arasında 1250 seyirci stadyumdan ayrıldı. Stadyumda kaç seyirci kalmıştır?`,
        secenekler: { A: '3250', B: '3350', C: '3000', D: '5750' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Onluk bozma hatası", "Toplama yapma"],
        gercek_yasam_baglantisi: "Biriktirdiğimiz paradan istediğimiz bir şeyi aldığımızda geriye ne kadar kaldığını çıkarma problemiyle buluruz.",
        seviye: 'ileri', cozum_anahtari: `Kalan seyirci sayısını bulmak için toplam seyirciden ayrılan seyirci sayısı çıkarılır: 4500 - 1250 = 3250.`
    }]}]
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
    templates: [{ id: 'system-default-M.4.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.4.2", kazanim_metni: "Çarpma işleminin sonucunu tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `48 x 22 işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: '800', B: '1000', C: '1056', D: '1200' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
        gercek_yasam_baglantisi: "Her birinde yaklaşık 30 yumurta olan 18 kolideki toplam yumurta sayısını tahmin ederek hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `48 en yakın onluğa 50 olarak, 22 ise 20 olarak yuvarlanır. Tahmini sonuç 50 x 20 = 1000'dir.`
    }]}]
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
    templates: [{ id: 'system-default-M.4.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.2", kazanim_metni: "Bölme işleminin sonucunu tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `812 ÷ 19 işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: '40', B: '41', C: '42', D: '80' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Gerçek sonuca yakın değer", "Sadece bir sayıyı yuvarlama"],
        gercek_yasam_baglantisi: "Yaklaşık 600 TL'lik bir masrafı 3 kişi paylaştığında kişi başı ne kadar düşeceğini tahmin edebiliriz.",
        seviye: 'orta', cozum_anahtari: `812 en yakın onluğa 810, 19 ise 20 olarak yuvarlanır. 810 ÷ 20 yaklaşık olarak 800 ÷ 20 = 40'tır.`
    }]}]
  },
  "M.4.1.5.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden bölme işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.3", kazanim_metni: "Zihinden bölme işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `5600 ÷ 100 işleminin sonucu kaçtır?`,
        secenekler: { A: '560', B: '56', C: '5.6', D: '560000' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Bir sıfır silme", "Sıfır ekleme"],
        gercek_yasam_baglantisi: "300 TL'yi 10'ar TL'lik banknotlara ayırdığımızda kaç tane banknot olacağını zihinden bölerek buluruz.",
        seviye: 'orta', cozum_anahtari: `Bir sayıyı 100'e bölmek için sayının sonundan iki sıfır silinir. 5600 ÷ 100 = 56.`
    }]}]
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
            secenekler: { A: '3/5', B: '7/4', C: '2 tam 1/3', D: '5' },
            dogru_cevap: answer,
            yanlis_secenek_tipleri: ["Farklı kesir türleri"],
            gercek_yasam_baglantisi: "Yemek tariflerinde '1 tam 1/2 (bir buçuk) bardak un' gibi ifadelerle kesirleri kullanırız.",
            seviye: 'temel', cozum_anahtari: "Payı paydasından küçük kesirler basit, büyük veya eşit olanlar bileşik, tam kısmı olanlar ise tam sayılı kesirdir."
        };
    })}]
  },
  "M.4.1.6.2": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirleri karşılaştırır ve sıralar.",
    templates: [{ id: 'system-default-M.4.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.2", kazanim_metni: "Kesirleri karşılaştırır ve sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki kesirlerden hangisi en büyüktür?`,
        secenekler: { A: '1/8', B: '3/8', C: '5/8', D: '2/8' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["En küçük kesir", "Diğer kesirler"],
        gercek_yasam_baglantisi: "Aynı pizzadan bir arkadaşımız bir dilim, biz ise üç dilim yersek kimin daha çok yediğini kesirleri karşılaştırarak anlarız.",
        seviye: 'orta', cozum_anahtari: `Paydaları eşit olan kesirlerden payı en büyük olan kesir en büyüktür.`
    }]}]
  },
  "M.4.1.6.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
    templates: [{ id: 'system-default-M.4.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.3", kazanim_metni: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `35 cevizin 2/5'si kaç ceviz eder?`,
        secenekler: { A: '7', B: '10', C: '14', D: '21' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece birim kesir kadarını bulma", "Yanlış çarpma/bölme"],
        gercek_yasam_baglantisi: "Harçlığımızın 1/4'ünü biriktirmek istediğimizde ne kadar para ayırmamız gerektiğini bu yöntemle buluruz.",
        seviye: 'ileri', cozum_anahtari: `Önce çokluğun birim kesir kadarı bulunur (35 ÷ 5 = 7), sonra bu sonuç kesrin payı ile çarpılır (7 x 2 = 14).`
    }]}]
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
    templates: [{ id: 'system-default-M.4.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.1", kazanim_metni: "Açının kenarlarını ve köşesini isimlendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir saatin akrep ve yelkovanının oluşturduğu açıda, iki kolun birleştiği merkez noktasına ne ad verilir?`,
        secenekler: { A: 'Kenar', B: 'Köşe', C: 'Açı', D: 'Doğru' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Açıyı oluşturan ışınlar", "Açının kendisi"],
        gercek_yasam_baglantisi: "Bir kapının açılmasıyla oluşan açıda, kapının menteşeleri köşe, kapı ve duvar kenar görevi görür.",
        seviye: 'temel', cozum_anahtari: `Açıyı oluşturan iki ışının başlangıç noktasına açının köşesi, ışınlara ise açının kenarları (kolları) denir.`
    }]}]
  },
  "M.4.2.1.2": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Açıları standart olmayan birimlerle ölçer ve standart açı ölçme birimlerinin gerekliliğini açıklar.",
    templates: [{ id: 'system-default-M.4.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.2", kazanim_metni: "Açıları standart olmayan birimlerle ölçer ve standart açı ölçme birimlerinin gerekliliğini açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir açıyı ölçerken herkesin farklı sonuçlar bulmaması için neye ihtiyaç duyarız?`,
        secenekler: { A: 'Daha büyük açılara', B: 'Standart bir ölçme birimine', C: 'Farklı renkli kalemlere', D: 'Daha uzun kenarlara' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["İlgisiz kavramlar"],
        gercek_yasam_baglantisi: "Bir inşaat planında açıların herkes tarafından aynı anlaşılması için 'derece' gibi standart birimler kullanılır.",
        seviye: 'orta', cozum_anahtari: `Standart olmayan birimler (parmak, karış vb.) kişiden kişiye değiştiği için, herkesin aynı sonucu bulabileceği standart birimlere (derece gibi) ihtiyaç vardır.`
    }]}]
  },
  "M.4.2.1.3": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Açıları standart birimlerle ölçer.",
    templates: [{ id: 'system-default-M.4.2.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.1.3", kazanim_metni: "Açıları standart birimlerle ölçer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir karenin her bir iç açısının ölçüsü kaç derecedir?`,
        secenekler: { A: '45', B: '60', C: '90', D: '180' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Dar açı ölçüsü", "Geniş açı ölçüsü", "Doğru açı ölçüsü"],
        gercek_yasam_baglantisi: "Bir resim çerçevesinin köşelerinin tam 90 derece olması, çerçevenin düzgün durmasını sağlar.",
        seviye: 'temel', cozum_anahtari: `Kare ve dikdörtgen gibi şekillerin tüm iç açıları 90 derecedir ve bunlara dik açı denir. Açı ölçer (gönye) ile ölçülebilir.`
    }]}]
  },
  "M.4.2.2.1": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Üçgenleri kenar uzunluklarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.4.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.1", kazanim_metni: "Üçgenleri kenar uzunluklarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bütün kenar uzunlukları birbirinden farklı olan üçgene ne ad verilir?`,
        secenekler: { A: 'Eşkenar üçgen', B: 'İkizkenar üçgen', C: 'Çeşitkenar üçgen', D: 'Dik üçgen' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Tüm kenarları eşit olan", "İki kenarı eşit olan", "Açısına göre sınıflandırma"],
        gercek_yasam_baglantisi: "Çevremizdeki üçgen şeklindeki nesneler (çatı, sandviç dilimi vb.) kenar uzunluklarına göre farklılık gösterebilir.",
        seviye: 'temel', cozum_anahtari: `Üç kenarı da eşitse eşkenar, iki kenarı eşitse ikizkenar, tüm kenarları farklıysa çeşitkenar üçgen denir.`
    }]}]
  },
  "M.4.2.2.2": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Üçgenleri açılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.4.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.2", kazanim_metni: "Üçgenleri açılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir açısı 90 dereceden büyük olan üçgene ne ad verilir?`,
        secenekler: { A: 'Dar açılı üçgen', B: 'Dik açılı üçgen', C: 'Geniş açılı üçgen', D: 'Eşkenar üçgen' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Tüm açıları dar olan", "Bir açısı dik olan", "Kenarına göre sınıflandırma"],
        gercek_yasam_baglantisi: "Bazı binaların mimarisinde estetik amaçlı geniş açılı üçgenler kullanılır.",
        seviye: 'temel', cozum_anahtari: `Tüm açıları 90 dereceden küçükse dar açılı, bir açısı 90 derece ise dik açılı, bir açısı 90 dereceden büyükse geniş açılı üçgen denir.`
    }]}]
  },
  "M.4.2.2.3": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Kare ve dikdörtgenin kenar ve açı özelliklerini belirler.",
    templates: [{ id: 'system-default-M.4.2.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.2.3", kazanim_metni: "Kare ve dikdörtgenin kenar ve açı özelliklerini belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi hem kare hem de dikdörtgen için ortak bir özelliktir?`,
        secenekler: { A: 'Bütün kenarları eşittir.', B: 'Bütün açıları dik açıdır.', C: 'İki kısa, iki uzun kenarı vardır.', D: 'Köşegenleri birbirini dik keser.' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece karenin özelliği", "Sadece dikdörtgenin özelliği"],
        gercek_yasam_baglantisi: "Bir marangoz, kare veya dikdörtgen bir masa yaparken tüm köşelerin 90 derece olduğundan emin olmalıdır.",
        seviye: 'orta', cozum_anahtari: `Hem karenin hem de dikdörtgenin bütün iç açıları 90 derecedir. Ancak sadece karenin tüm kenarları eşittir.`
    }]}]
  },
  "M.4.2.3.1": {
    gradeName: "4. Sınıf", unitName: "Geometri", kazanimName: "Düzlemsel şekillerin simetri doğrularını belirler.",
    templates: [{ id: 'system-default-M.4.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.4.2.3.1", kazanim_metni: "Düzlemsel şekillerin simetri doğrularını belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir dikdörtgenin kaç tane simetri doğrusu vardır?`,
        secenekler: { A: '1', B: '2', C: '4', D: 'Sonsuz' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Karenin simetri sayısı", "Dairenin simetri sayısı", "Simetrisi olmayan"],
        gercek_yasam_baglantisi: "Bir kağıdı katlayıp keserek simetrik şekiller oluşturmak, simetri doğrusu kavramının bir uygulamasıdır.",
        seviye: 'orta',
        cozum_anahtari: "Dikdörtgenin, karşılıklı kenarlarının orta noktalarını birleştiren iki tane simetri doğrusu vardır."
    }]}]
  },
};
