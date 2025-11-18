import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions, numberToWordsTr } from './helpers';

export const ARCHIVE_DATA_GRADE_5: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 5. SINIF
  // =================================================================
  "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.5.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.5.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.5.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.5.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const num1 = 48 + i*3;
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
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, 
    // FIX: Property 'questions' was missing here, which is required by the QuizTemplate type. Added the question generation logic.
    questions: Array.from({ length: 20 }, (_, i) => {
      const type = i % 2 === 0 ? 'karesi' : 'küpü';
      const num = type === 'karesi' ? 4 + (i % 10) : 3 + (i % 5);
      const answer = type === 'karesi' ? num * num : num * num * num;
      const options = createNumericOptions(answer, 10);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının ${type} kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Yanlış üs alma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Bir karenin alanını hesaplarken karesini, bir küpün hacmini hesaplarken küpünü alma işlemini kullanırız.",
        seviye: 'orta', cozum_anahtari: `${num}'in ${type}, ${type === 'karesi' ? `${num}x${num}` : `${num}x${num}x${num}`} işlemine eşittir ve sonuç ${answer}'dir.`
      };
    })}]
  },
};
