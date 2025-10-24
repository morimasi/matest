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
      const options = createNumericOptions(num, 100000);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(num))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı hangisidir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
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
    templates: [{ id: 'system-default-M.5.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const start = 5 + i;
      const multiplier = 2;
      const adder = i % 3 + 1; // kural: 2n+1, 2n+2, 2n+3
      const n1 = start;
      const n2 = n1 * multiplier + adder;
      const n3 = n2 * multiplier + adder;
      const n4 = n3 * multiplier + adder;
      const answer = n4 * multiplier + adder;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.3", kazanim_metni: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${n1}, ${n2}, ${n3}, ${n4}, ? sayı örüntüsünde "?" yerine hangi sayı gelmelidir?`,
        secenekler: createNumericOptions(answer, 10),
        dogru_cevap: Object.keys(createNumericOptions(answer, 10)).find(k => createNumericOptions(answer, 10)[k as keyof ReturnType<typeof createNumericOptions>] === String(answer))!,
        yanlis_secenek_tipleri: ["Sadece çarpma yapma", "Yanlış kural uygulama", "Toplama hatası"],
        gercek_yasam_baglantisi: "Bir bakteri popülasyonunun artışı gibi bilimsel olaylar genellikle matematiksel örüntülerle açıklanır.",
        seviye: 'ileri', cozum_anahtari: `Örüntünün kuralı, bir önceki sayıyı ${multiplier} ile çarpıp ${adder} eklemektir. ${n4} x ${multiplier} + ${adder} = ${answer}.`
      };
    })}]
  },
  "M.5.1.2.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
    templates: [{ id: 'system-default-M.5.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 548 + i * 10;
      const num2 = 99 - (i % 3);
      const answer_text = `${num1}'e ${num2+1} ekleyip sonuçtan 1 çıkarmak`;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.1", kazanim_metni: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} + ${num2} işlemini zihinden yapmanın en pratik yolu aşağıdakilerden hangisidir?`,
        secenekler: { A: answer_text, B: `${num1}'den 1 çıkarıp sonuca ${num2+1} eklemek`, C: 'Sayıları alt alta yazıp toplamak', D: `${num1- (num1%100)} ile ${num2-(num2%10)}'u toplamak` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["İşlem sırasını karıştırma", "Zihinden işlem stratejisi olmayan yöntem", "Eksik strateji"],
        gercek_yasam_baglantisi: "Alışverişte 99 TL'lik bir ürüne yaklaşık 100 TL diyerek hesap yapmak bu stratejilerden biridir.",
        seviye: 'ileri', cozum_anahtari: `${num2}, ${num2+1}'e çok yakın olduğu için, sayıya ${num2+1} ekleyip sonra fazladan eklenen 1'i çıkarmak en kolay zihinden işlem stratejisidir.`
      };
    })}]
  },
  "M.5.1.2.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
    templates: [{ id: 'system-default-M.5.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 49 + i*3;
      const num2 = 31 + i*2;
      const est_num1 = Math.round(num1 / 10) * 10;
      const est_num2 = Math.round(num2 / 10) * 10;
      const answer = est_num1 * est_num2;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.2", kazanim_metni: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} x ${num2} işleminin tahmini sonucu kaçtır? (Sayıları en yakın onluğa yuvarlayınız.)`,
        secenekler: { A: `${answer}`, B: `${num1*num2}`, C: `${answer-100}`, D: `${answer+100}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Gerçek sonuç", "Yanlış yuvarlama", "Sadece bir sayıyı yuvarlama"],
        gercek_yasam_baglantisi: "Yaklaşık 50 kişilik bir gruba kişi başı 20 TL'lik bir hediye alınacaksa, toplam maliyeti tahmin ederek bütçe planlayabiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1} en yakın onluğa ${est_num1}, ${num2} ise ${est_num2} olarak yuvarlanır. Tahmini sonuç ${est_num1} x ${est_num2} = ${answer}'dir.`
      };
    })}]
  },
  "M.5.1.2.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir doğal sayının karesini ve küpünü hesaplar.",
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const base1 = 4 + (i % 4);
      const base2 = 5 + (i % 5);
      const cube = Math.pow(base1, 3);
      const square = Math.pow(base2, 2);
      const answer = cube + square;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${base1} sayısının küpü ile ${base2} sayısının karesinin toplamı kaçtır?`,
        secenekler: { A: `${cube}`, B: `${square}`, C: `${answer}`, D: `${Math.pow(base1+base2, 2)}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece küpü hesaplama", "Sadece kareyi hesaplama", "Yanlış üs hesaplama"],
        gercek_yasam_baglantisi: "Bir küpün hacmini (küpü) veya bir karenin alanını (karesi) hesaplarken üslü sayılar kullanılır.",
        seviye: 'orta', cozum_anahtari: `${base1}'in küpü ${base1}x${base1}x${base1}=${cube}'tür. ${base2}'nin karesi ${base2}x${base2}=${square}'dir. Toplamları ${cube} + ${square} = ${answer}'dur.`
      };
    })}]
  },
    "M.5.1.2.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Parantezli işlemleri yapar.",
    templates: [{ id: 'system-default-M.5.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const n1 = 5 + (i%3);
      const n2 = 12 + i;
      const n3 = 8 + i;
      const answer = n1 * (n2 + n3);
      const wrong_answer = n1 * n2 + n3;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.4", kazanim_metni: "Parantezli işlemleri yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${n1} x (${n2} + ${n3}) işleminin sonucu kaçtır?`,
        secenekler: { A: `${wrong_answer}`, B: `${answer}`, C: `${n1+n2+n3}`, D: `${n1 * n2}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Parantezi dikkate almama (soldan sağa işlem yapma)", "Yanlış toplama", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Birden fazla adımdan oluşan hesaplamalarda, hangi işlemin önce yapılması gerektiğini belirtmek için parantezler kullanılır.",
        seviye: 'orta', cozum_anahtari: `İşlem önceliğine göre önce parantez içi yapılır: ${n2} + ${n3} = ${n2+n3}. Daha sonra çarpma işlemi yapılır: ${n1} x ${n2+n3} = ${answer}.`
      };
    })}]
  },
  "M.5.1.2.5": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.2.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const pen_price = 15 + i;
      const pen_count = 4;
      const book_price = 25 + i;
      const book_count = 2;
      const paid = 150 + i * 10;
      const total_cost = (pen_price * pen_count) + (book_price * book_count);
      const change = paid - total_cost;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.5", kazanim_metni: "Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Tanesi ${pen_price} TL olan kalemlerden ${pen_count} tane ve tanesi ${book_price} TL olan defterlerden ${book_count} tane alan bir kişi, satıcıya ${paid} TL verirse kaç TL para üstü alır?`,
        secenekler: { A: `${change}`, B: `${total_cost}`, C: `${change+10}`, D: `${change-10}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Sadece toplam tutarı bulma", "Yanlış çarpma", "Yanlış çıkarma"],
        gercek_yasam_baglantisi: "Büyük bir alışverişin toplam tutarını hesaplamak ve ne kadar para üstü alacağımızı bulmak için dört işlem becerisine ihtiyaç duyarız.",
        seviye: 'ileri', cozum_anahtari: `Kalemlerin tutarı: ${pen_price}x${pen_count}=${pen_price*pen_count} TL. Defterlerin tutarı: ${book_price}x${book_count}=${book_price*book_count} TL. Toplam tutar: ${total_cost} TL. Para üstü: ${paid}-${total_cost}=${change} TL.`
      };
    })}]
  },
    "M.5.1.3.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirleri sıralar.",
    templates: [{ id: 'system-default-M.5.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den1 = 2 + (i % 2);
      const den2 = 4 + (i % 3);
      const den3 = 8 + (i % 4);
      const common_den = den1 * den2 * den3; // A simple way to find a common denominator
      const fractions = [{val: 1/den1, str: `1/${den1}`}, {val: 3/den2, str: `3/${den2}`}, {val: 5/den3, str: `5/${den3}`}];
      fractions.sort((a,b) => b.val - a.val);
      const answer = fractions.map(f => f.str).join(' > ');
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.1", kazanim_metni: "Kesirleri sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `1/${den1}, 3/${den2}, 5/${den3} kesirlerinin büyükten küçüğe doğru sıralanışı hangisidir?`,
        secenekler: { A: answer, B: fractions.map(f => f.str).reverse().join(' > '), C: `${fractions[1].str} > ${fractions[0].str} > ${fractions[2].str}`, D: `${fractions[2].str} > ${fractions[1].str} > ${fractions[0].str}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Paylara göre sıralama", "Paydalara göre sıralama", "Küçükten büyüğe sıralama"],
        gercek_yasam_baglantisi: "Farklı boyutlardaki pizza dilimlerinden hangisinin daha büyük olduğunu anlamak için kesirleri karşılaştırırız.",
        seviye: 'orta', cozum_anahtari: `Kesirleri sıralamak için paydalar eşitlenir veya ondalık değerlerine bakılır.`
      };
    })}]
  },
  "M.5.1.3.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
    templates: [{ id: 'system-default-M.5.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den = 4 + (i % 3);
      const num = 13 + i;
      const whole = Math.floor(num/den);
      const rem = num % den;
      const answer = `${whole} tam ${rem}/${den}`;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.2", kazanim_metni: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num}/${den} bileşik kesrinin tam sayılı kesir olarak gösterimi hangisidir?`,
        secenekler: { A: `${whole+1} tam ${rem}/${den}`, B: answer, C: `${whole} tam ${rem}/${den+1}`, D: `${rem} tam ${whole}/${den}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış bölme", "Pay ve tam kısmı karıştırma"],
        gercek_yasam_baglantisi: "Yemek tarifinde '2 buçuk bardak' (2 tam 1/2) yerine '5/2 bardak' yazılabilir. İkisinin de aynı miktar olduğunu bilmek önemlidir.",
        seviye: 'orta', cozum_anahtari: `${num}'ü ${den}'e böldüğümüzde bölüm ${whole} (tam kısım), kalan ${rem} (pay) olur. Payda değişmez. Sonuç: ${answer}.`
      };
    })}]
  },
   "M.5.1.4.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den1 = 3 + (i%2);
      const den2 = 6 + (i%2);
      const num1 = 1;
      const num2 = 5;
      const common_den = den1 * den2 / (den1 === 3 && den2 === 6 ? 3 : 1);
      const answer_num = (common_den/den1)*num1 + (common_den/den2)*num2;
      const answer = `${answer_num}/${common_den}`;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.1", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1}/${den1} + ${num2}/${den2} işleminin sonucu kaçtır?`,
        secenekler: { A: `${num1+num2}/${den1+den2}`, B: answer, C: `${num1+num2}/${common_den}`, D: `${num1*num2}/${den1*den2}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Paydaları eşitlemeden toplama", "Paydaları çarpma"],
        gercek_yasam_baglantisi: "Bir işin önce 1/4'ünü sonra 1/2'sini yaparsak, toplamda işin ne kadarını bitirdiğimizi kesirlerle toplama yaparak buluruz.",
        seviye: 'orta', cozum_anahtari: `Toplama yapmak için paydalar eşitlenir. ${num1}/${den1} kesri genişletilerek ${ (common_den/den1)*num1}/${common_den} olur. ${ (common_den/den1)*num1}/${common_den} + ${ (common_den/den2)*num2}/${common_den} = ${answer}.`
      };
    })}]
  },
  "M.5.1.4.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir basit kesir kadarını ve basit kesir kadarı verilen bir çokluğun tamamını bulur.",
    templates: [{ id: 'system-default-M.5.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 3 + (i % 2);
      const den = 5 + (i % 3);
      const part = (3 + i) * num;
      const whole = (part / num) * den;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.2", kazanim_metni: "Bir çokluğun belirtilen bir basit kesir kadarını ve basit kesir kadarı verilen bir çokluğun tamamını bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num}/${den}'ü ${part} olan sayının tamamı kaçtır?`,
        secenekler: createNumericOptions(whole, 5),
        dogru_cevap: Object.keys(createNumericOptions(whole, 5)).find(k => createNumericOptions(whole, 5)[k as keyof ReturnType<typeof createNumericOptions>] === String(whole))!,
        yanlis_secenek_tipleri: ["Sadece birim kesir kadarını bulma", "Yanlış işlem yapma"],
        gercek_yasam_baglantisi: "Bir kitabın 1/4'ünü okuduğumuzda 50 sayfaya geldiysek, kitabın tamamının kaç sayfa olduğunu bu yöntemle bulabiliriz.",
        seviye: 'ileri', cozum_anahtari: `Önce birim kesir kadarı bulunur: ${part} ÷ ${num} = ${part/num}. Sonra sayının tamamı (${den}/${den}'i) bulunur: ${part/num} x ${den} = ${whole}.`
      };
    })}]
  },
  "M.5.1.4.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den1 = 8;
      const num1 = 5 + (i % 2);
      const den2 = 4;
      const num2 = 1;
      const answer_num = num1 - (num2 * (den1/den2));
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.3", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir su deposunun ${num1}/${den1}'i doludur. Depodaki suyun ${num2}/${den2}'ü kullanılırsa, deponun kaçta kaçı dolu kalır?`,
        secenekler: { A: `${answer_num+1}/${den1}`, B: `${num1+num2*2}/${den1}`, C: `${answer_num}/${den1}`, D: `${answer_num}/${den1*2}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Paydaları eşitlemeden çıkarma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Bir pastanın yarısını yedikten sonra kalanın da yarısını yersek, geriye ne kadar kaldığını kesirlerle çıkarma yaparak buluruz.",
        seviye: 'ileri', cozum_anahtari: `İşlem yapmak için paydalar eşitlenir. 1/4 kesri 2/8'e eşittir. Kalan suyu bulmak için çıkarma yapılır: ${num1}/8 - 2/8 = ${answer_num}/8.`
      };
    })}]
  },
  "M.5.1.5.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimleri okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const whole = 12 + i;
        const decimalPart = 7 + i;
        const isTenth = i % 2 === 0;
        const text = `${numberToWordsTr(whole)} tam ${isTenth ? `onda ${numberToWordsTr(decimalPart)}` : `yüzde ${numberToWordsTr(decimalPart)}`}`;
        const answer = isTenth ? `${whole},${decimalPart}` : `${whole},${decimalPart < 10 ? '0' : ''}${decimalPart}`;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.1", kazanim_metni: "Ondalık gösterimleri okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Okunuşu "${text}" olan ondalık gösterim hangisidir?`,
            secenekler: { A: answer, B: `${whole}${decimalPart}`, C: `${whole}.${decimalPart < 10 && !isTenth ? decimalPart*10 : decimalPart}`, D: `${whole-1},${decimalPart}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Onda birler basamağı ile karıştırma", "Virgülü yanlış yere koyma", "Binde birler ile karıştırma"],
            gercek_yasam_baglantisi: "Marketlerde ürün fiyatları (örneğin 15,75 TL) genellikle ondalık gösterimlerle ifade edilir.",
            seviye: 'temel', cozum_anahtari: `"Tam" kelimesi virgüle karşılık gelir. ${isTenth ? '"Onda" bir basamak,' : '"Yüzde" iki basamak,'} anlamına gelir. Sonuç: ${answer}.`
        };
    })}]
  },
  "M.5.1.5.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerde basamak değerlerini belirler.",
    templates: [{ id: 'system-default-M.5.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num = 48.37 + i * 1.1;
        const numStr = num.toFixed(2);
        const digit = numStr[numStr.length-1];
        const answer = `0,0${digit}`;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.2", kazanim_metni: "Ondalık gösterimlerde basamak değerlerini belirler.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${numStr} sayısındaki ${digit} rakamının basamak değeri nedir?`,
            secenekler: { A: `${digit}`, B: `0,${digit}`, C: answer, D: `${digit}0` },
            dogru_cevap: 'C',
            yanlis_secenek_tipleri: ["Rakamın kendisi", "Onda birler basamağı ile karıştırma", "Onlar basamağı ile karıştırma"],
            gercek_yasam_baglantisi: "Para hesaplarken 25,50 TL'deki 50'nin 50 kuruşu ifade ettiğini bilmek basamak değeriyle ilgilidir.",
            seviye: 'orta', cozum_anahtari: `Virgülden sonraki ilk basamak onda birler, ikinci basamak yüzde birlerdir. ${digit} rakamı yüzde birler basamağında olduğu için basamak değeri ${answer}'dir.`
        };
    })}]
  },
  "M.5.1.5.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimleri verilen sayıları sıralar.",
    templates: [{ id: 'system-default-M.5.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const base = 5 + i;
      const nums = [`${base},45`, `${base},09`, `${base},5`, `${base},19`];
      const answer = `${base},5`;
      nums.sort(() => Math.random() - 0.5);
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.3", kazanim_metni: "Ondalık gösterimleri verilen sayıları sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki ondalık gösterimlerden hangisi en büyüktür?`,
        secenekler: { A: nums[0], B: nums[1], C: nums[2], D: nums[3] },
        dogru_cevap: Object.keys({ A: '', B: '', C: '', D: '' }).find(key => nums[key.charCodeAt(0) - 65] === answer)!,
        yanlis_secenek_tipleri: ["Tam kısımdan sonraki basamak sayısına aldanma", "Sadece yüzde birler basamağına bakma"],
        gercek_yasam_baglantisi: "Spor yarışmalarında atletlerin derecelerini (örneğin 9,58 saniye) karşılaştırarak kimin daha hızlı olduğunu buluruz.",
        seviye: 'orta', cozum_anahtari: `Sıralama yaparken önce tam kısımlara bakılır. Tam kısımlar eşitse, sırasıyla onda birler, yüzde birler basamaklarına bakılır. ${answer} (yani ${answer}0) en büyüktür.`
      };
    })}]
  },
    "M.5.1.5.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.5.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 12.75 + i * 0.5;
      const num2 = 8.50 + i * 0.25;
      const answer = (num1 + num2).toFixed(2);
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.4", kazanim_metni: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Manavdan ${num1.toFixed(2)} TL'ye elma ve ${num2.toFixed(2)} TL'ye portakal alan bir kişi toplam kaç TL öder?`,
        secenekler: { A: `${(parseFloat(answer) - 1).toFixed(2)}`, B: answer, C: `${(parseFloat(answer) + 1).toFixed(2)}`, D: `${(parseFloat(answer) - 0.5).toFixed(2)}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Virgülleri hizalamama hatası", "Elde hatası"],
        gercek_yasam_baglantisi: "Market alışverişi fişindeki ürünlerin fiyatlarını toplayarak toplam ödememiz gereken tutarı hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Ondalık gösterimlerle toplama yaparken virgüller alt alta gelecek şekilde yazılır ve normal toplama işlemi yapılır. ${num1.toFixed(2)} + ${num2.toFixed(2)} = ${answer}.`
      };
    })}]
  },
  "M.5.1.6.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
    templates: [{ id: 'system-default-M.5.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const percent = 10 + i * 5;
      const fraction = `${percent}/100`;
      const simplified = `${percent/5}/${100/5}`; // Basic simplification
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.1", kazanim_metni: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `%${percent} ifadesinin ondalık gösterim olarak karşılığı hangisidir?`,
        secenekler: { A: `${percent}`, B: `0,${percent < 10 ? '0' : ''}${percent}`, C: `0,${percent}`, D: `${percent/1000}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yüzdeyi sayı olarak yazma", "Yanlış virgül kaydırma"],
        gercek_yasam_baglantisi: "Mağazalardaki '%50 indirim' ifadesi, ürünün fiyatının yarısı (1/2'si veya 0,5'i) kadar indirim yapılacağı anlamına gelir.",
        seviye: 'temel', cozum_anahtari: `%${percent}, ${percent}/100 kesrine eşittir. Bu kesrin ondalık gösterimi 0,${percent < 10 ? '0' : ''}${percent}'dir.`
      };
    })}]
  },
  "M.5.1.6.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    templates: [{ id: 'system-default-M.5.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 300 + i * 20;
      const percent = 20 + i * 5;
      const answer = (num * percent) / 100;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.2", kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının %${percent}'si kaçtır?`,
        secenekler: createNumericOptions(answer, 10),
        dogru_cevap: Object.keys(createNumericOptions(answer, 10)).find(k => createNumericOptions(answer, 10)[k as keyof ReturnType<typeof createNumericOptions>] === String(answer))!,
        yanlis_secenek_tipleri: ["Yüzde oranı ile karıştırma", "Yanlış çarpma/bölme"],
        gercek_yasam_baglantisi: "200 TL'lik bir ayakkabıya %10 indirim yapıldığında ne kadar daha az ödeyeceğimizi bu yöntemle hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Bir sayının yüzdesini bulmak için sayı yüzde oranı ile çarpılır ve 100'e bölünür. (${num} x ${percent}) / 100 = ${answer}.`
      };
    })}]
  },
  "M.5.1.6.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Yüzde ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.5.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const price = 500 + i * 50;
      const discount_percent = 10 + i * 2;
      const discount_amount = (price * discount_percent) / 100;
      const final_price = price - discount_amount;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.3", kazanim_metni: "Yüzde ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Fiyatı ${price} TL olan bir bisiklete %${discount_percent} indirim uygulanırsa yeni fiyatı kaç TL olur?`,
        secenekler: { A: `${discount_amount}`, B: `${price + discount_amount}`, C: `${final_price}`, D: `${price - discount_percent}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece indirim miktarını bulma", "İndirim yerine zam yapma", "Yanlış hesaplama"],
        gercek_yasam_baglantisi: "Bir ürüne zam geldiğinde veya indirim yapıldığında yeni fiyatını hesaplamak için yüzde problemlerini çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Önce indirim miktarı bulunur: (${price} x ${discount_percent}) / 100 = ${discount_amount} TL. Sonra bu miktar ilk fiyattan çıkarılır: ${price} - ${discount_amount} = ${final_price} TL.`
      };
    })}]
  },
  "M.5.2.1.1": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Temel geometrik kavramları tanır.",
    templates: [{ id: 'system-default-M.5.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const concepts = [
          { q: "Sadece bir başlangıç noktası vardır ve diğer ucu sonsuza kadar uzar?", a: "Işın" },
          { q: "İki ucu da sonsuza kadar uzar?", a: "Doğru" },
          { q: "İki ucu da sınırlıdır?", a: "Doğru parçası" }
      ];
      const current = concepts[i % concepts.length];
      return {
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.1", kazanim_metni: "Temel geometrik kavramları tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisinin ${current.q}`,
        secenekler: { A: 'Doğru', B: 'Doğru parçası', C: 'Işın', D: 'Nokta' },
        dogru_cevap: Object.keys({ A: 'Doğru', B: 'Doğru parçası', C: 'Işın', D: 'Nokta' }).find(key => ({ A: 'Doğru', B: 'Doğru parçası', C: 'Işın', D: 'Nokta' }[key as 'A'|'B'|'C'|'D'] === current.a))!,
        yanlis_secenek_tipleri: ["İki ucu sonsuz", "İki ucu sınırlı", "Boyutsuz"],
        gercek_yasam_baglantisi: "Bir fenerden çıkan ışık demeti, başlangıç noktası fener olan ve sonsuza giden bir ışın modelidir.",
        seviye: 'temel', cozum_anahtari: `Işın, bir başlangıç noktası olan ve bir yönde sonsuza kadar uzayan noktalar kümesidir.`
      };
    })}]
  },
    "M.5.2.1.2": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Doğruya, bir noktasından veya dışındaki bir noktadan dikme çizer.",
    templates: [{ id: 'system-default-M.5.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.2", kazanim_metni: "Doğruya, bir noktasından veya dışındaki bir noktadan dikme çizer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir doğruya çizilen dikme, o doğru ile kaç derecelik bir açı yapar?`,
        secenekler: { A: '45', B: '90', C: '180', D: '0' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Dar açı", "Doğru açı", "Açı yapmaz"],
        gercek_yasam_baglantisi: "Bir duvar inşa edilirken, duvarın zemine dik (90 derece) olması için gönye veya şakul gibi araçlar kullanılır.",
        seviye: 'temel', cozum_anahtari: `Dikme, bir doğruya veya düzleme dik olan doğru demektir. Dik olmak, 90 derecelik bir açı oluşturmak anlamına gelir.`
    }))}]
  },
   "M.5.2.1.3": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Bir doğru parçasına paralel bir doğru parçası inşa eder.",
    templates: [{ id: 'system-default-M.5.2.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.1.3", kazanim_metni: "Bir doğru parçasına paralel bir doğru parçası inşa eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Paralel iki doğru için aşağıdakilerden hangisi söylenebilir?`,
        secenekler: { A: 'Bir noktada kesişirler.', B: 'Aralarındaki uzaklık her zaman sabittir ve asla kesişmezler.', C: 'Birbirlerine diktirler.', D: 'Sadece bir tanesi sonsuza uzar.' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Kesişen doğruların tanımı", "Dik doğruların tanımı", "Işının tanımı"],
        gercek_yasam_baglantisi: "Tren rayları, karşıdan karşıya geçişteki yaya çizgileri veya bir defterin satırları birbirine paraleldir.",
        seviye: 'temel', cozum_anahtari: `Aynı düzlemde olup hiçbir zaman kesişmeyen ve aralarındaki mesafe her zaman aynı olan doğrulara paralel doğrular denir.`
    }))}]
  },
   "M.5.2.2.1": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Çokgenleri isimlendirir, oluşturur ve temel elemanlarını tanır.",
    templates: [{ id: 'system-default-M.5.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const sides = 5 + (i % 4);
      const names = {5: "Beşgen", 6: "Altıgen", 7: "Yedigen", 8: "Sekizgen"};
      const answer = names[sides as keyof typeof names];
      return {
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.2.1", kazanim_metni: "Çokgenleri isimlendirir, oluşturur ve temel elemanlarını tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${sides} kenarı ve ${sides} köşesi olan çokgene ne ad verilir?`,
        secenekler: { A: 'Beşgen', B: 'Altıgen', C: 'Yedigen', D: 'Sekizgen' },
        dogru_cevap: Object.keys({ A: 'Beşgen', B: 'Altıgen', C: 'Yedigen', D: 'Sekizgen' }).find(key => ({ A: 'Beşgen', B: 'Altıgen', C: 'Yedigen', D: 'Sekizgen' }[key as 'A'|'B'|'C'|'D'] === answer))!,
        yanlis_secenek_tipleri: ["Farklı kenar sayısına sahip çokgenler"],
        gercek_yasam_baglantisi: "Arı petekleri altıgenlerden, trafik dur işaretleri ise sekizgenlerden oluşur.",
        seviye: 'temel', cozum_anahtari: `Çokgenler kenar sayılarına göre isimlendirilir. ${sides} kenarı olan çokgen ${answer}dir.`
      };
    })}]
  },
  "M.5.2.2.2": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
    templates: [{ id: 'system-default-M.5.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const a1 = 50 + i * 2;
      const a2 = 70 + i * 3;
      const answer = 180 - (a1 + a2);
      return {
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.2.2", kazanim_metni: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir üçgenin iç açılarından ikisi ${a1}° ve ${a2}° ise üçüncü açı kaç derecedir?`,
        secenekler: createNumericOptions(answer, 10),
        dogru_cevap: Object.keys(createNumericOptions(answer, 10)).find(k => createNumericOptions(answer, 10)[k as keyof ReturnType<typeof createNumericOptions>] === String(answer))!,
        yanlis_secenek_tipleri: ["Verilen açılardan biri", "İki açının toplamı"],
        gercek_yasam_baglantisi: "Bir çatının veya bir köprünün destek yapılarının sağlamlığı, üçgenlerin iç açı hesaplamalarına dayanır.",
        seviye: 'ileri', cozum_anahtari: `Bir üçgenin iç açılarının toplamı her zaman 180°'dir. Verilen iki açı toplanır (${a1}+${a2}=${a1+a2}) ve 180'den çıkarılır (180-${a1+a2}=${answer}).`
      };
    })}]
  },
  "M.5.3.1.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ölçme birimlerini (km, m, cm, mm) birbirine dönüştürür.",
    templates: [{ id: 'system-default-M.5.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const km = 2.5 + i * 0.5;
      const answer = km * 1000;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.1", kazanim_metni: "Uzunluk ölçme birimlerini (km, m, cm, mm) birbirine dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${km} kilometre kaç metredir?`,
        secenekler: { A: `${answer/100}`, B: `${answer/10}`, C: `${answer}`, D: `${answer*10}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış sıfır sayısı"],
        gercek_yasam_baglantisi: "Haritalarda veya navigasyon cihazlarında mesafeler genellikle kilometre olarak verilir, biz bunu metreye çevirerek daha iyi anlayabiliriz.",
        seviye: 'orta', cozum_anahtari: `1 kilometre 1000 metredir. ${km} kilometreyi metreye çevirmek için ${km} ile 1000 çarpılır, bu da ${answer} metre eder.`
      };
    })}]
  },
  "M.5.3.1.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçü birimlerini (yıl, ay, hafta, gün) birbirine dönüştürür.",
    templates: [{ id: 'system-default-M.5.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const weeks = 3 + i;
      const days = 4 + (i % 3);
      const answer = weeks * 7 + days;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.2", kazanim_metni: "Zaman ölçü birimlerini (yıl, ay, hafta, gün) birbirine dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${weeks} hafta ${days} gün, toplam kaç gündür?`,
        secenekler: { A: `${weeks * 7}`, B: `${weeks + days}`, C: `${answer}`, D: `${(weeks+1)*7}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece haftaları çevirme", "Toplama hatası"],
        gercek_yasam_baglantisi: "Bir projenin veya tatilin ne kadar süreceğini hesaplarken zaman birimlerini birbirine dönüştürürüz.",
        seviye: 'orta', cozum_anahtari: `1 hafta 7 gündür. ${weeks} hafta ${weeks*7} gün eder. Üzerine ${days} gün daha eklenince toplam ${weeks*7}+${days}=${answer} gün olur.`
      };
    })}]
  },
  "M.5.3.1.3": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ve zaman ölçme birimleri ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.5.3.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const speed = 80 + i * 5;
      const time = 3 + (i % 2);
      const answer = speed * time;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.1.3", kazanim_metni: "Uzunluk ve zaman ölçme birimleri ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Saatte ${speed} km hızla giden bir araba, ${time} saatte kaç kilometre yol alır?`,
        secenekler: { A: `${speed+time}`, B: `${answer}`, C: `${answer*10}`, D: `${speed* (time-1)}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir yolculuğun ne kadar süreceğini veya belirli bir sürede ne kadar yol alacağımızı hesaplamak için bu tür problemler çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Alınan yolu bulmak için hız ile zaman çarpılır: ${speed} km/saat x ${time} saat = ${answer} km.`
      };
    })}]
  },
  "M.5.3.2.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenin alanını hesaplamayı gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.5.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const short = 12 + i;
      const long = 20 + i;
      const answer = short * long;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.2.1", kazanim_metni: "Dikdörtgenin alanını hesaplamayı gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kısa kenarı ${short} cm, uzun kenarı ${long} cm olan dikdörtgen şeklindeki bir fotoğrafın alanı kaç santimetrekaredir?`,
        secenekler: { A: `${(short+long)*2}`, B: `${short+long}`, C: `${answer}`, D: `${answer*2}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Çevre ile karıştırma", "Kenarları toplama", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Odamızın zeminine halı döşetmek veya duvarımızı boyamak için ne kadar malzemeye ihtiyacımız olduğunu alan hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin alanı, kısa kenar ile uzun kenarın çarpılmasıyla bulunur: ${short} cm x ${long} cm = ${answer} cm².`
      };
    })}]
  },
  "M.5.3.2.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Üçgenin alanını hesaplar.",
    templates: [{ id: 'system-default-M.5.3.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const base = 10 + i * 2;
      const height = 8 + i * 2;
      const answer = (base * height) / 2;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.2.2", kazanim_metni: "Üçgenin alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Taban uzunluğu ${base} cm ve bu tabana ait yüksekliği ${height} cm olan bir üçgenin alanı kaç santimetrekaredir?`,
        secenekler: { A: `${base * height}`, B: `${answer}`, C: `${base + height}`, D: `${answer*2}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["İkiye bölmeyi unutma (dikdörtgen alanı gibi hesaplama)", "Toplama yapma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir yelkenli teknenin yelkeninin alanını veya bir evin üçgen şeklindeki çatısının alanını hesaplamak için bu formül kullanılır.",
        seviye: 'orta', cozum_anahtari: `Üçgenin alanı, taban uzunluğu ile o tabana ait yüksekliğin çarpımının yarısına eşittir: (${base} x ${height}) / 2 = ${answer} cm².`
      };
    })}]
  },
  "M.5.3.3.1": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenler prizmasının yüzey alanını hesaplar.",
    templates: [{ id: 'system-default-M.5.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const a = 3 + i;
      const b = 4 + i;
      const c = 5 + i;
      const answer = 2 * (a*b + a*c + b*c);
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.3.1", kazanim_metni: "Dikdörtgenler prizmasının yüzey alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ayrıt uzunlukları ${a} cm, ${b} cm ve ${c} cm olan bir dikdörtgenler prizmasının yüzey alanı kaç santimetrekaredir?`,
        secenekler: { A: `${a*b*c}`, B: `${answer}`, C: `${answer/2}`, D: `${a+b+c}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Hacim ile karıştırma", "Sadece üç yüzeyi toplama", "Kenarları toplama"],
        gercek_yasam_baglantisi: "Bir hediye kutusunu kaplamak için ne kadar kaplama kağıdına ihtiyacımız olduğunu yüzey alanı hesaplayarak buluruz.",
        seviye: 'ileri', cozum_anahtari: `Prizmanın karşılıklı yüzeyleri eştir. Yüzey alanları: 2 * (${a}x${b} + ${a}x${c} + ${b}x${c}) = ${answer} cm².`
      };
    })}]
  },
  "M.5.3.3.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenler prizmasının hacmini hesaplar.",
    templates: [{ id: 'system-default-M.5.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const a = 3 + i;
      const b = 4 + i;
      const c = 5 + i;
      const answer = a * b * c;
      const surface_area = 2 * (a*b + a*c + b*c);
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.3.2", kazanim_metni: "Dikdörtgenler prizmasının hacmini hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ayrıt uzunlukları ${a} cm, ${b} cm ve ${c} cm olan bir dikdörtgenler prizmasının hacmi kaç santimetreküptür?`,
        secenekler: { A: `${a+b+c}`, B: `${answer}`, C: `${surface_area}`, D: `${a*b}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Sadece iki ayrıtı çarpma", "Yüzey alanı ile karıştırma", "Ayrıtları toplama"],
        gercek_yasam_baglantisi: "Bir akvaryumun ne kadar su alacağını veya bir kutunun içine ne kadar kum doldurabileceğimizi hacim hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenler prizmasının hacmi, üç farklı ayrıtının uzunluklarının çarpımına eşittir: ${a} x ${b} x ${c} = ${answer} cm³.`
      };
    })}]
  },
  "M.5.4.1.1": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Araştırma soruları üretir, veri toplar ve düzenler.",
    templates: [{ id: 'system-default-M.5.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.1", kazanim_metni: "Araştırma soruları üretir, veri toplar ve düzenler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `"Okulumuzdaki 5. sınıf öğrencilerinin en sevdiği spor dalı hangisidir?" sorusu için veri toplamak isteyen bir öğrenci hangi yöntemi kullanmalıdır?`,
        secenekler: { A: 'Sadece kendi fikrini söylemeli', B: 'Öğretmenine sormalı', C: '5. sınıf öğrencilerine anket yapmalı', D: 'İnternette arama yapmalı' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Kişisel görüş", "Tek bir kişiden bilgi alma", "İlgisiz kaynaktan bilgi alma"],
        gercek_yasam_baglantisi: "Bir şirket yeni bir ürün çıkarmadan önce, potansiyel müşterilere anket yaparak hangi özellikleri daha çok sevdiklerini araştırır.",
        seviye: 'temel', cozum_anahtari: `Belirli bir grubun görüşünü öğrenmek için en doğru yöntem, o gruba yönelik bir anket veya oylama yapmaktır.`
    }))}]
  },
  "M.5.4.1.2": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Sıklık tablosu ve sütun grafiği oluşturur.",
    templates: [{ id: 'system-default-M.5.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.2", kazanim_metni: "Sıklık tablosu ve sütun grafiği oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sıklık tablosundaki verileri görsel olarak karşılaştırmak için en uygun grafik türü hangisidir?`,
        secenekler: { A: 'Çizgi grafiği', B: 'Daire grafiği', C: 'Sütun grafiği', D: 'Resim grafiği' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Zamanla değişimi gösteren", "Bütünün parçalarını gösteren", "Daha basit grafik"],
        gercek_yasam_baglantisi: "Seçim sonuçları veya farklı ürünlerin satış miktarları gibi verileri karşılaştırmak için televizyonda genellikle sütun grafikleri kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sütun grafiği, farklı kategorilerdeki veri miktarlarını sütunların uzunluklarıyla karşılaştırmak için ideal bir yöntemdir.`
    }))}]
  },
  "M.5.4.1.3": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
    templates: [{ id: 'system-default-M.5.4.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const n1 = 80 + i;
      const n2 = 90;
      const n3 = 100 - i;
      const sum = n1 + n2 + n3;
      const answer = sum / 3;
      return {
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.3", kazanim_metni: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Matematik sınavından ${n1}, ${n2} ve ${n3} alan bir öğrencinin notlarının aritmetik ortalaması kaçtır?`,
        secenekler: { A: `${Math.floor(answer)}`, B: `${Math.ceil(answer)}`, C: `${answer}`, D: `${sum}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış toplama/bölme", "Sadece toplamı bulma"],
        gercek_yasam_baglantisi: "Karne notlarımızın ortalaması veya bir takımın maç başına attığı ortalama gol sayısı aritmetik ortalama ile hesaplanır.",
        seviye: 'orta', cozum_anahtari: `Aritmetik ortalama, veri grubundaki tüm değerlerin toplamının veri sayısına bölünmesiyle bulunur. (${n1}+${n2}+${n3}) / 3 = ${sum} / 3 = ${answer}.`
      };
    })}]
  },
};
