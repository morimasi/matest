import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions, numberToWordsTr } from './helpers';

export const ARCHIVE_DATA_GRADE_5: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 5. SINIF
  // =================================================================
  "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 1234567 + i * 111111;
      const words = numberToWordsTr(num);
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı hangisidir?`,
        secenekler: { A: `${num}`, B: `${num.toString().slice(1)}`, C: `${num - 100000}`, D: `1${num.toString().slice(1)}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Basamak eksik yazma", "Yanlış bölük okuma", "Yakın sayı"],
        gercek_yasam_baglantisi: "Bir ülkenin nüfusu veya gezegenlerin uzaklıkları gibi büyük sayılarla ilgili bilgileri okurken bu beceriyi kullanırız.",
        seviye: 'temel', cozum_anahtari: `Sayılar bölüklerine göre okunur. "${words}" sayısının doğru yazılışı ${num}'dur.`
      };
    })}]
  },
  "M.5.1.1.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayıları en yakın onluğa, yüzlüğe veya binliğe yuvarlar.",
    templates: [{ id: 'system-default-M.5.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 12345 + i * 137;
      const type = i % 3; // 0: onluk, 1: yüzlük, 2: binlik
      let answer = 0;
      let typeText = '';
      if (type === 0) { answer = Math.round(num / 10) * 10; typeText = 'onluğa'; }
      else if (type === 1) { answer = Math.round(num / 100) * 100; typeText = 'yüzlüğe'; }
      else { answer = Math.round(num / 1000) * 1000; typeText = 'binliğe'; }
      const options = createNumericOptions(answer, type === 0 ? 10 : type === 1 ? 100 : 1000, 4);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.2", kazanim_metni: "Doğal sayıları en yakın onluğa, yüzlüğe veya binliğe yuvarlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının en yakın ${typeText} yuvarlanmış hali hangisidir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Yanlış basamağa yuvarlama", "Aşağı yuvarlama hatası", "Yukarı yuvarlama hatası"],
        gercek_yasam_baglantisi: "Bir stadyumdaki seyirci sayısını 'yaklaşık 45 bin kişi' olarak ifade etmek bu becerinin bir uygulamasıdır.",
        seviye: 'orta', cozum_anahtari: `En yakın ${typeText} yuvarlamak için bir önceki basamağa bakılır. 5 ve üzeri rakamlar bir üst basamağa yuvarlanır.`
      };
    })}]
  },
  "M.5.1.1.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir.",
    templates: [{ id: 'system-default-M.5.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.3", kazanim_metni: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `5, 11, 23, 47, ? sayı örüntüsünde "?" yerine hangi sayı gelmelidir?`,
        secenekler: { A: '94', B: '95', C: '96', D: '84' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece 2 ile çarpma", "Yanlış kural uygulama", "Toplama hatası"],
        gercek_yasam_baglantisi: "Bir bakteri popülasyonunun artışı gibi bilimsel olaylar genellikle matematiksel örüntülerle açıklanır.",
        seviye: 'ileri', cozum_anahtari: `Örüntünün kuralı, bir önceki sayıyı 2 ile çarpıp 1 eklemektir (2n+1). 47 x 2 = 94, 94 + 1 = 95.`
    }]}]
  },
  "M.5.1.2.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
    templates: [{ id: 'system-default-M.5.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.1", kazanim_metni: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `548 + 99 işlemini zihinden yapmanın en pratik yolu aşağıdakilerden hangisidir?`,
        secenekler: { A: '548e 100 ekleyip sonuçtan 1 çıkarmak', B: '548den 1 çıkarıp sonuca 100 eklemek', C: 'Sayıları alt alta yazıp toplamak', D: '500 ile 90ı toplamak' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["İşlem sırasını karıştırma", "Zihinden işlem stratejisi olmayan yöntem", "Eksik strateji"],
        gercek_yasam_baglantisi: "Alışverişte 99 TL'lik bir ürüne yaklaşık 100 TL diyerek hesap yapmak bu stratejilerden biridir.",
        seviye: 'ileri', cozum_anahtari: `99, 100'e çok yakın olduğu için, sayıya 100 ekleyip sonra fazladan eklenen 1'i çıkarmak en kolay zihinden işlem stratejisidir.`
    }]}]
  },
  "M.5.1.2.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
    templates: [{ id: 'system-default-M.5.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.2", kazanim_metni: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `49 x 31 işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: '1500', B: '1519', C: '1200', D: '1600' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Gerçek sonuç", "Yanlış yuvarlama", "Sadece bir sayıyı yuvarlama"],
        gercek_yasam_baglantisi: "Yaklaşık 50 kişilik bir gruba kişi başı 20 TL'lik bir hediye alınacaksa, toplam maliyeti tahmin ederek bütçe planlayabiliriz.",
        seviye: 'orta', cozum_anahtari: `49 en yakın onluğa 50, 31 ise 30 olarak yuvarlanır. Tahmini sonuç 50 x 30 = 1500'dür.`
    }]}]
  },
  "M.5.1.2.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir doğal sayının karesini ve küpünü hesaplar.",
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `4 sayısının küpü ile 5 sayısının karesinin toplamı kaçtır?`,
        secenekler: { A: '64', B: '25', C: '89', D: '27' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece küpü hesaplama", "Sadece kareyi hesaplama", "Yanlış üs hesaplama"],
        gercek_yasam_baglantisi: "Bir küpün hacmini (küpü) veya bir karenin alanını (karesi) hesaplarken üslü sayılar kullanılır.",
        seviye: 'orta', cozum_anahtari: "4'ün küpü 4x4x4=64'tür. 5'in karesi 5x5=25'tir. Toplamları 64 + 25 = 89'dur."
    }]}]
  },
    "M.5.1.2.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Parantezli işlemleri yapar.",
    templates: [{ id: 'system-default-M.5.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.4", kazanim_metni: "Parantezli işlemleri yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `5 x (12 + 8) işleminin sonucu kaçtır?`,
        secenekler: { A: '68', B: '100', C: '25', D: '60' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Parantezi dikkate almama (soldan sağa işlem yapma)", "Yanlış toplama", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Birden fazla adımdan oluşan hesaplamalarda, hangi işlemin önce yapılması gerektiğini belirtmek için parantezler kullanılır.",
        seviye: 'orta', cozum_anahtari: `İşlem önceliğine göre önce parantez içi yapılır: 12 + 8 = 20. Daha sonra çarpma işlemi yapılır: 5 x 20 = 100.`
    }]}]
  },
  "M.5.1.2.5": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.2.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.5", kazanim_metni: "Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Tanesi 15 TL olan kalemlerden 4 tane ve tanesi 25 TL olan defterlerden 2 tane alan bir kişi, satıcıya 150 TL verirse kaç TL para üstü alır?`,
        secenekler: { A: '40', B: '50', C: '60', D: '110' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Sadece toplam tutarı bulma", "Yanlış çarpma", "Yanlış çıkarma"],
        gercek_yasam_baglantisi: "Büyük bir alışverişin toplam tutarını hesaplamak ve ne kadar para üstü alacağımızı bulmak için dört işlem becerisine ihtiyaç duyarız.",
        seviye: 'ileri', cozum_anahtari: `Kalemlerin tutarı: 15x4=60 TL. Defterlerin tutarı: 25x2=50 TL. Toplam tutar: 60+50=110 TL. Para üstü: 150-110=40 TL.`
    }]}]
  },
    "M.5.1.3.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirleri sıralar.",
    templates: [{ id: 'system-default-M.5.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.1", kazanim_metni: "Kesirleri sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `1/2, 3/4, 5/8 kesirlerinin büyükten küçüğe doğru sıralanışı hangisidir?`,
        secenekler: { A: '3/4 > 5/8 > 1/2', B: '1/2 > 3/4 > 5/8', C: '5/8 > 1/2 > 3/4', D: '3/4 > 1/2 > 5/8' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Paylara göre sıralama", "Paydalara göre sıralama", "Küçükten büyüğe sıralama"],
        gercek_yasam_baglantisi: "Farklı boyutlardaki pizza dilimlerinden hangisinin daha büyük olduğunu anlamak için kesirleri karşılaştırırız.",
        seviye: 'orta', cozum_anahtari: `Kesirleri sıralamak için paydalar eşitlenir. Paydaları 8'de eşitlersek: 1/2=4/8, 3/4=6/8, 5/8. Sıralama: 6/8 > 5/8 > 4/8, yani 3/4 > 5/8 > 1/2.`
    }]}]
  },
  "M.5.1.3.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
    templates: [{ id: 'system-default-M.5.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.2", kazanim_metni: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `13/4 bileşik kesrinin tam sayılı kesir olarak gösterimi hangisidir?`,
        secenekler: { A: '2 tam 3/4', B: '3 tam 1/4', C: '4 tam 1/3', D: '1 tam 3/4' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış bölme", "Pay ve tam kısmı karıştırma"],
        gercek_yasam_baglantisi: "Yemek tarifinde '2 buçuk bardak' (2 tam 1/2) yerine '5/2 bardak' yazılabilir. İkisinin de aynı miktar olduğunu bilmek önemlidir.",
        seviye: 'orta', cozum_anahtari: `13'ü 4'e böldüğümüzde bölüm 3 (tam kısım), kalan 1 (pay) olur. Payda değişmez. Sonuç: 3 tam 1/4.`
    }]}]
  },
   "M.5.1.4.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.1", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `1/3 + 5/6 işleminin sonucu kaçtır?`,
        secenekler: { A: '6/9', B: '7/6', C: '6/6', D: '5/18' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Paydaları eşitlemeden toplama", "Paydaları çarpma"],
        gercek_yasam_baglantisi: "Bir işin önce 1/4'ünü sonra 1/2'sini yaparsak, toplamda işin ne kadarını bitirdiğimizi kesirlerle toplama yaparak buluruz.",
        seviye: 'orta', cozum_anahtari: `Toplama yapmak için paydalar eşitlenir. 1/3 kesri 2 ile genişletilerek 2/6 olur. 2/6 + 5/6 = 7/6.`
    }]}]
  },
  "M.5.1.4.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir basit kesir kadarını ve basit kesir kadarı verilen bir çokluğun tamamını bulur.",
    templates: [{ id: 'system-default-M.5.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.2", kazanim_metni: "Bir çokluğun belirtilen bir basit kesir kadarını ve basit kesir kadarı verilen bir çokluğun tamamını bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3/5'ü 27 olan sayının tamamı kaçtır?`,
        secenekler: { A: '36', B: '45', C: '54', D: '9' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece birim kesir kadarını bulma", "Yanlış işlem yapma"],
        gercek_yasam_baglantisi: "Bir kitabın 1/4'ünü okuduğumuzda 50 sayfaya geldiysek, kitabın tamamının kaç sayfa olduğunu bu yöntemle bulabiliriz.",
        seviye: 'ileri', cozum_anahtari: `Önce birim kesir kadarı bulunur: 27 ÷ 3 = 9. Sonra sayının tamamı (5/5'i) bulunur: 9 x 5 = 45.`
    }]}]
  },
  "M.5.1.4.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.3", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir su deposunun 5/8'i doludur. Depodaki suyun 1/4'ü kullanılırsa, deponun kaçta kaçı dolu kalır?`,
        secenekler: { A: '4/4', B: '4/8', C: '3/8', D: '7/8' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Paydaları eşitlemeden çıkarma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Bir pastanın yarısını yedikten sonra kalanın da yarısını yersek, geriye ne kadar kaldığını kesirlerle çıkarma yaparak buluruz.",
        seviye: 'ileri', cozum_anahtari: `İşlem yapmak için paydalar eşitlenir. 1/4 kesri 2/8'e eşittir. Kalan suyu bulmak için çıkarma yapılır: 5/8 - 2/8 = 3/8.`
    }]}]
  },
  "M.5.1.5.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimleri okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.1", kazanim_metni: "Ondalık gösterimleri okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "on iki tam yüzde yedi" olan ondalık gösterim hangisidir?`,
        secenekler: { A: '12,7', B: '12,07', C: '1,27', D: '12,107' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Onda birler basamağı ile karıştırma", "Virgülü yanlış yere koyma", "Binde birler ile karıştırma"],
        gercek_yasam_baglantisi: "Marketlerde ürün fiyatları (örneğin 15,75 TL) genellikle ondalık gösterimlerle ifade edilir.",
        seviye: 'temel', cozum_anahtari: `"Tam" kelimesi virgüle karşılık gelir. "Yüzde yedi" demek, virgülden sonra iki basamak olması ve sayının 07 şeklinde yazılması demektir. Sonuç: 12,07.`
    }]}]
  },
  "M.5.1.5.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerde basamak değerlerini belirler.",
    templates: [{ id: 'system-default-M.5.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.2", kazanim_metni: "Ondalık gösterimlerde basamak değerlerini belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `48,37 sayısındaki 7 rakamının basamak değeri nedir?`,
        secenekler: { A: '7', B: '0,7', C: '0,07', D: '70' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Rakamın kendisi", "Onda birler basamağı ile karıştırma", "Onlar basamağı ile karıştırma"],
        gercek_yasam_baglantisi: "Para hesaplarken 25,50 TL'deki 50'nin 50 kuruşu ifade ettiğini bilmek basamak değeriyle ilgilidir.",
        seviye: 'orta', cozum_anahtari: `Virgülden sonraki ilk basamak onda birler, ikinci basamak yüzde birlerdir. 7 rakamı yüzde birler basamağında olduğu için basamak değeri 0,07'dir.`
    }]}]
  },
  "M.5.1.5.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimleri verilen sayıları sıralar.",
    templates: [{ id: 'system-default-M.5.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.3", kazanim_metni: "Ondalık gösterimleri verilen sayıları sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki ondalık gösterimlerden hangisi en büyüktür?`,
        secenekler: { A: '5,45', B: '5,09', C: '5,5', D: '5,19' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Tam kısımdan sonraki basamak sayısına aldanma", "Sadece yüzde birler basamağına bakma"],
        gercek_yasam_baglantisi: "Spor yarışmalarında atletlerin derecelerini (örneğin 9,58 saniye) karşılaştırarak kimin daha hızlı olduğunu buluruz.",
        seviye: 'orta', cozum_anahtari: `Sıralama yaparken önce tam kısımlara bakılır. Tam kısımlar eşitse, sırasıyla onda birler, yüzde birler basamaklarına bakılır. 5,5 (yani 5,50) en büyüktür.`
    }]}]
  },
    "M.5.1.5.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.5.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.4", kazanim_metni: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Manavdan 12,75 TL'ye elma ve 8,50 TL'ye portakal alan bir kişi toplam kaç TL öder?`,
        secenekler: { A: '20,25', B: '21,25', C: '20,75', D: '21,50' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Virgülleri hizalamama hatası", "Elde hatası"],
        gercek_yasam_baglantisi: "Market alışverişi fişindeki ürünlerin fiyatlarını toplayarak toplam ödememiz gereken tutarı hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Ondalık gösterimlerle toplama yaparken virgüller alt alta gelecek şekilde yazılır ve normal toplama işlemi yapılır. 12,75 + 8,50 = 21,25.`
    }]}]
  },
  "M.5.1.6.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
    templates: [{ id: 'system-default-M.5.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.1", kazanim_metni: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `%40 ifadesinin kesir olarak karşılığı aşağıdakilerden hangisidir?`,
        secenekler: { A: '4/100', B: '40/10', C: '4/10', D: '1/40' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadeleştirmeden önceki hali", "Yanlış payda"],
        gercek_yasam_baglantisi: "Mağazalardaki '%50 indirim' ifadesi, ürünün fiyatının yarısı (1/2'si) kadar indirim yapılacağı anlamına gelir.",
        seviye: 'temel', cozum_anahtari: `%40, 40/100 kesrine eşittir. Bu kesir 10 ile sadeleştirildiğinde 4/10 olur.`
    }]}]
  },
  "M.5.1.6.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    templates: [{ id: 'system-default-M.5.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.2", kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `300 sayısının %20'si kaçtır?`,
        secenekler: { A: '20', B: '30', C: '60', D: '80' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yüzde oranı ile karıştırma", "Yanlış çarpma/bölme"],
        gercek_yasam_baglantisi: "200 TL'lik bir ayakkabıya %10 indirim yapıldığında ne kadar daha az ödeyeceğimizi bu yöntemle hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Bir sayının yüzdesini bulmak için sayı yüzde oranı ile çarpılır ve 100'e bölünür. (300 x 20) / 100 = 60.`
    }]}]
  },
  "M.5.1.6.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Yüzde ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.3", kazanim_metni: "Yüzde ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Fiyatı 500 TL olan bir bisiklete %10 indirim uygulanırsa yeni fiyatı kaç TL olur?`,
        secenekler: { A: '50', B: '400', C: '450', D: '550' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece indirim miktarını bulma", "İndirim yerine zam yapma", "Yanlış hesaplama"],
        gercek_yasam_baglantisi: "Bir ürüne zam geldiğinde veya indirim yapıldığında yeni fiyatını hesaplamak için yüzde problemlerini çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Önce indirim miktarı bulunur: (500 x 10) / 100 = 50 TL. Sonra bu miktar ilk fiyattan çıkarılır: 500 - 50 = 450 TL.`
    }]}]
  },
  "M.5.2.1.1": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Temel geometrik kavramları tanır.",
    templates: [{ id: 'system-default-M.5.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.1", kazanim_metni: "Temel geometrik kavramları tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisinin sadece bir başlangıç noktası vardır ve diğer ucu sonsuza kadar uzar?`,
        secenekler: { A: 'Doğru', B: 'Doğru parçası', C: 'Işın', D: 'Nokta' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["İki ucu sonsuz", "İki ucu sınırlı", "Boyutsuz"],
        gercek_yasam_baglantisi: "Bir fenerden çıkan ışık demeti, başlangıç noktası fener olan ve sonsuza giden bir ışın modelidir.",
        seviye: 'temel', cozum_anahtari: `Işın, bir başlangıç noktası olan ve bir yönde sonsuza kadar uzayan noktalar kümesidir.`
    }]}]
  },
    "M.5.2.1.2": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Doğruya, bir noktasından veya dışındaki bir noktadan dikme çizer.",
    templates: [{ id: 'system-default-M.5.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.2", kazanim_metni: "Doğruya, bir noktasından veya dışındaki bir noktadan dikme çizer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir doğruya çizilen dikme, o doğru ile kaç derecelik bir açı yapar?`,
        secenekler: { A: '45', B: '90', C: '180', D: '0' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Dar açı", "Doğru açı", "Açı yapmaz"],
        gercek_yasam_baglantisi: "Bir duvar inşa edilirken, duvarın zemine dik (90 derece) olması için gönye veya şakul gibi araçlar kullanılır.",
        seviye: 'temel', cozum_anahtari: `Dikme, bir doğruya veya düzleme dik olan doğru demektir. Dik olmak, 90 derecelik bir açı oluşturmak anlamına gelir.`
    }]}]
  },
   "M.5.2.1.3": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Bir doğru parçasına paralel bir doğru parçası inşa eder.",
    templates: [{ id: 'system-default-M.5.2.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.3", kazanim_metni: "Bir doğru parçasına paralel bir doğru parçası inşa eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Paralel iki doğru için aşağıdakilerden hangisi söylenebilir?`,
        secenekler: { A: 'Bir noktada kesişirler.', B: 'Aralarındaki uzaklık her zaman sabittir ve asla kesişmezler.', C: 'Birbirlerine diktirler.', D: 'Sadece bir tanesi sonsuza uzar.' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Kesişen doğruların tanımı", "Dik doğruların tanımı", "Işının tanımı"],
        gercek_yasam_baglantisi: "Tren rayları, karşıdan karşıya geçişteki yaya çizgileri veya bir defterin satırları birbirine paraleldir.",
        seviye: 'temel', cozum_anahtari: `Aynı düzlemde olup hiçbir zaman kesişmeyen ve aralarındaki mesafe her zaman aynı olan doğrulara paralel doğrular denir.`
    }]}]
  },
   "M.5.2.2.1": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Çokgenleri isimlendirir, oluşturur ve temel elemanlarını tanır.",
    templates: [{ id: 'system-default-M.5.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.2.1", kazanim_metni: "Çokgenleri isimlendirir, oluşturur ve temel elemanlarını tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `6 kenarı ve 6 köşesi olan çokgene ne ad verilir?`,
        secenekler: { A: 'Beşgen', B: 'Altıgen', C: 'Yedigen', D: 'Sekizgen' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Farklı kenar sayısına sahip çokgenler"],
        gercek_yasam_baglantisi: "Arı petekleri altıgenlerden, trafik dur işaretleri ise sekizgenlerden oluşur.",
        seviye: 'temel', cozum_anahtari: `Çokgenler kenar sayılarına göre isimlendirilir. 6 kenarı olan çokgen altıgendir.`
    }]}]
  },
  "M.5.2.2.2": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
    templates: [{ id: 'system-default-M.5.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.2.2", kazanim_metni: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir üçgenin iç açılarından ikisi 50° ve 70° ise üçüncü açı kaç derecedir?`,
        secenekler: { A: '50', B: '60', C: '70', D: '120' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Verilen açılardan biri", "İki açının toplamı"],
        gercek_yasam_baglantisi: "Bir çatının veya bir köprünün destek yapılarının sağlamlığı, üçgenlerin iç açı hesaplamalarına dayanır.",
        seviye: 'ileri', cozum_anahtari: `Bir üçgenin iç açılarının toplamı her zaman 180°'dir. Verilen iki açı toplanır (50+70=120) ve 180'den çıkarılır (180-120=60).`
    }]}]
  },
  "M.5.3.1.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ölçme birimlerini (km, m, cm, mm) birbirine dönüştürür.",
    templates: [{ id: 'system-default-M.5.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.1", kazanim_metni: "Uzunluk ölçme birimlerini (km, m, cm, mm) birbirine dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `2,5 kilometre kaç metredir?`,
        secenekler: { A: '25', B: '250', C: '2500', D: '25000' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış sıfır sayısı"],
        gercek_yasam_baglantisi: "Haritalarda veya navigasyon cihazlarında mesafeler genellikle kilometre olarak verilir, biz bunu metreye çevirerek daha iyi anlayabiliriz.",
        seviye: 'orta', cozum_anahtari: `1 kilometre 1000 metredir. 2,5 kilometreyi metreye çevirmek için 2,5 ile 1000 çarpılır, bu da 2500 metre eder.`
    }]}]
  },
  "M.5.3.1.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçü birimlerini (yıl, ay, hafta, gün) birbirine dönüştürür.",
    templates: [{ id: 'system-default-M.5.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.2", kazanim_metni: "Zaman ölçü birimlerini (yıl, ay, hafta, gün) birbirine dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 hafta 4 gün, toplam kaç gündür?`,
        secenekler: { A: '7', B: '21', C: '25', D: '34' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece 1 hafta", "Sadece 3 hafta", "Toplama hatası"],
        gercek_yasam_baglantisi: "Bir projenin veya tatilin ne kadar süreceğini hesaplarken zaman birimlerini birbirine dönüştürürüz.",
        seviye: 'orta', cozum_anahtari: `1 hafta 7 gündür. 3 hafta 3x7=21 gün eder. Üzerine 4 gün daha eklenince toplam 21+4=25 gün olur.`
    }]}]
  },
  "M.5.3.1.3": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ve zaman ölçme birimleri ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.5.3.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.3", kazanim_metni: "Uzunluk ve zaman ölçme birimleri ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Saatte 80 km hızla giden bir araba, 3 saatte kaç kilometre yol alır?`,
        secenekler: { A: '83', B: '240', C: '2400', D: '24' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir yolculuğun ne kadar süreceğini veya belirli bir sürede ne kadar yol alacağımızı hesaplamak için bu tür problemler çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Alınan yolu bulmak için hız ile zaman çarpılır: 80 km/saat x 3 saat = 240 km.`
    }]}]
  },
  "M.5.3.2.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenin alanını hesaplamayı gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.2.1", kazanim_metni: "Dikdörtgenin alanını hesaplamayı gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kısa kenarı 12 cm, uzun kenarı 20 cm olan dikdörtgen şeklindeki bir fotoğrafın alanı kaç santimetrekaredir?`,
        secenekler: { A: '32', B: '64', C: '240', D: '480' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Toplama yapma (çevre ile karıştırma)", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Odamızın zeminine halı döşetmek veya duvarımızı boyamak için ne kadar malzemeye ihtiyacımız olduğunu alan hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin alanı, kısa kenar ile uzun kenarın çarpılmasıyla bulunur: 12 cm x 20 cm = 240 cm².`
    }]}]
  },
  "M.5.3.2.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Üçgenin alanını hesaplar.",
    templates: [{ id: 'system-default-M.5.3.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.2.2", kazanim_metni: "Üçgenin alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Taban uzunluğu 10 cm ve bu tabana ait yüksekliği 8 cm olan bir üçgenin alanı kaç santimetrekaredir?`,
        secenekler: { A: '80', B: '40', C: '18', D: '20' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["İkiye bölmeyi unutma (dikdörtgen alanı gibi hesaplama)", "Toplama yapma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir yelkenli teknenin yelkeninin alanını veya bir evin üçgen şeklindeki çatısının alanını hesaplamak için bu formül kullanılır.",
        seviye: 'orta', cozum_anahtari: `Üçgenin alanı, taban uzunluğu ile o tabana ait yüksekliğin çarpımının yarısına eşittir: (10 x 8) / 2 = 40 cm².`
    }]}]
  },
  "M.5.3.3.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenler prizmasının yüzey alanını hesaplar.",
    templates: [{ id: 'system-default-M.5.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.3.1", kazanim_metni: "Dikdörtgenler prizmasının yüzey alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ayrıt uzunlukları 3 cm, 4 cm ve 5 cm olan bir dikdörtgenler prizmasının yüzey alanı kaç santimetrekaredir?`,
        secenekler: { A: '60', B: '94', C: '47', D: '12' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Hacim ile karıştırma", "Sadece üç yüzeyi toplama", "Kenarları toplama"],
        gercek_yasam_baglantisi: "Bir hediye kutusunu kaplamak için ne kadar kaplama kağıdına ihtiyacımız olduğunu yüzey alanı hesaplayarak buluruz.",
        seviye: 'ileri', cozum_anahtari: `Prizmanın karşılıklı yüzeyleri eştir. Yüzey alanları: (3x4)x2 + (3x5)x2 + (4x5)x2 = 24 + 30 + 40 = 94 cm².`
    }]}]
  },
  "M.5.3.3.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenler prizmasının hacmini hesaplar.",
    templates: [{ id: 'system-default-M.5.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.3.2", kazanim_metni: "Dikdörtgenler prizmasının hacmini hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ayrıt uzunlukları 3 cm, 4 cm ve 5 cm olan bir dikdörtgenler prizmasının hacmi kaç santimetreküptür?`,
        secenekler: { A: '12', B: '60', C: '94', D: '20' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece iki ayrıtı çarpma", "Yüzey alanı ile karıştırma", "Ayrıtları toplama"],
        gercek_yasam_baglantisi: "Bir akvaryumun ne kadar su alacağını veya bir kutunun içine ne kadar kum doldurabileceğimizi hacim hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenler prizmasının hacmi, üç farklı ayrıtının uzunluklarının çarpımına eşittir: 3 x 4 x 5 = 60 cm³.`
    }]}]
  },
  "M.5.4.1.1": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Araştırma soruları üretir, veri toplar ve düzenler.",
    templates: [{ id: 'system-default-M.5.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.1", kazanim_metni: "Araştırma soruları üretir, veri toplar ve düzenler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `"Okulumuzdaki 5. sınıf öğrencilerinin en sevdiği spor dalı hangisidir?" sorusu için veri toplamak isteyen bir öğrenci hangi yöntemi kullanmalıdır?`,
        secenekler: { A: 'Sadece kendi fikrini söylemeli', B: 'Öğretmenine sormalı', C: '5. sınıf öğrencilerine anket yapmalı', D: 'İnternette arama yapmalı' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Kişisel görüş", "Tek bir kişiden bilgi alma", "İlgisiz kaynaktan bilgi alma"],
        gercek_yasam_baglantisi: "Bir şirket yeni bir ürün çıkarmadan önce, potansiyel müşterilere anket yaparak hangi özellikleri daha çok sevdiklerini araştırır.",
        seviye: 'temel', cozum_anahtari: `Belirli bir grubun görüşünü öğrenmek için en doğru yöntem, o gruba yönelik bir anket veya oylama yapmaktır.`
    }]}]
  },
  "M.5.4.1.2": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Sıklık tablosu ve sütun grafiği oluşturur.",
    templates: [{ id: 'system-default-M.5.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.2", kazanim_metni: "Sıklık tablosu ve sütun grafiği oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sıklık tablosundaki verileri görsel olarak karşılaştırmak için en uygun grafik türü hangisidir?`,
        secenekler: { A: 'Çizgi grafiği', B: 'Daire grafiği', C: 'Sütun grafiği', D: 'Resim grafiği' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Zamanla değişimi gösteren", "Bütünün parçalarını gösteren", "Daha basit grafik"],
        gercek_yasam_baglantisi: "Seçim sonuçları veya farklı ürünlerin satış miktarları gibi verileri karşılaştırmak için televizyonda genellikle sütun grafikleri kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sütun grafiği, farklı kategorilerdeki veri miktarlarını sütunların uzunluklarıyla karşılaştırmak için ideal bir yöntemdir.`
    }]}]
  },
  "M.5.4.1.3": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
    templates: [{ id: 'system-default-M.5.4.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.3", kazanim_metni: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Matematik sınavından 80, 90 ve 100 alan bir öğrencinin notlarının aritmetik ortalaması kaçtır?`,
        secenekler: { A: '85', B: '90', C: '95', D: '270' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış toplama/bölme", "Sadece toplamı bulma"],
        gercek_yasam_baglantisi: "Karne notlarımızın ortalaması veya bir takımın maç başına attığı ortalama gol sayısı aritmetik ortalama ile hesaplanır.",
        seviye: 'orta', cozum_anahtari: `Aritmetik ortalama, veri grubundaki tüm değerlerin toplamının veri sayısına bölünmesiyle bulunur. (80+90+100) / 3 = 270 / 3 = 90.`
    }]}]
  },
};
