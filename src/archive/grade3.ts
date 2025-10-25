import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions, numberToWordsTr } from './helpers';

export const ARCHIVE_DATA_GRADE_3: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 3. SINIF
  // =================================================================
  "M.3.1.1.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.3.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 123 + i * 33;
      const words = numberToWordsTr(num);
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.1", kazanim_metni: "Üç basamaklı doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı aşağıdakilerden hangisidir?`,
        secenekler: { A: `${num}`, B: `${num - 10}`, C: `${num + 10}`, D: `${(num % 100) * 10 + Math.floor(num/100)}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yakın sayılar", "Basamakları karıştırılmış sayı"],
        gercek_yasam_baglantisi: "Banka dekontları, faturalar veya apartman numaraları gibi yerlerde üç basamaklı sayıları doğru okumak önemlidir.",
        seviye: 'temel', cozum_anahtari: `"${words}" sayısının rakamlarla yazılışı ${num}'tür.`
      };
    })}]
  },
  "M.3.1.1.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıların basamak adlarını, basamaklarındaki rakamların basamak değerlerini belirler.",
    templates: [{ id: 'system-default-M.3.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const hundreds = 2 + (i % 8);
      const tens = 1 + (i % 9);
      const ones = (i % 7);
      const num = hundreds * 100 + tens * 10 + ones;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.2", kazanim_metni: "Üç basamaklı doğal sayıların basamak adlarını, basamaklarındaki rakamların basamak değerlerini belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının onlar basamağındaki rakamın basamak değeri kaçtır?`,
        secenekler: { A: `${tens}`, B: `${tens * 10}`, C: `${hundreds}`, D: `${hundreds * 100}` },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Rakamın sayı değeri", "Yüzler basamağındaki rakam", "Yüzler basamağının değeri"],
        gercek_yasam_baglantisi: "Bir alışverişte 254 TL öderken, 2 tane 100'lük, 5 tane 10'luk ve 4 tane 1'lik verdiğimizi bilmek basamak değerini anlamaktır.",
        seviye: 'orta', cozum_anahtari: `${num} sayısının onlar basamağında ${tens} rakamı bulunur ve basamak değeri ${tens * 10}'dur.`
      };
    })}]
  },
  "M.3.1.1.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "1000’e kadar olan doğal sayıları karşılaştırır ve sıralar.",
    templates: [{ id: 'system-default-M.3.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const nums = [456 - i*10, 654 + i*10, 546 + i*5];
        if (new Set(nums).size < 3) { // Regenerate if not unique
             nums[1] += 1;
             nums[2] -= 1;
        }
        const sorted = [...nums].sort((a,b) => a-b);
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.3", kazanim_metni: "1000’e kadar olan doğal sayıları karşılaştırır ve sıralar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${nums[0]}, ${nums[1]}, ${nums[2]} sayılarının küçükten büyüğe doğru sıralanışı hangisidir?`,
            secenekler: { A: `${sorted.join(' < ')}`, B: `${sorted.slice().reverse().join(' < ')}`, C: `${[sorted[1], sorted[0], sorted[2]].join(' < ')}`, D: `${sorted.join(' > ')}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Büyükten küçüğe sıralama", "Yanlış sıralama", "Yanlış sembol kullanma"],
            gercek_yasam_baglantisi: "Farklı mağazalardaki fiyatları karşılaştırıp en ucuzunu bulmak için sayıları sıralama becerisini kullanırız.",
            seviye: 'orta', cozum_anahtari: "Sayıları sıralarken önce yüzler basamağına bakılır. Yüzler basamağı küçük olan sayı daha küçüktür."
        }
    }).filter(Boolean) as DetailedQuestion[]}]
  },
   "M.3.1.1.4": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "1000’e kadar olan doğal sayıları en yakın onluğa ve yüzlüğe yuvarlar.",
    templates: [{ id: 'system-default-M.3.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 458 + i * 15;
      const nearestTen = Math.round(num / 10) * 10;
      const nearestHundred = Math.round(num / 100) * 100;
      const isTen = i % 2 === 0;
      const answer = isTen ? nearestTen : nearestHundred;
      const options = createNumericOptions(answer, isTen ? 10 : 100);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;

      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.4", kazanim_metni: "1000’e kadar olan doğal sayıları en yakın onluğa ve yüzlüğe yuvarlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num} sayısının en yakın ${isTen ? 'onluğa' : 'yüzlüğe'} yuvarlanmış hali hangisidir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer basamağa yuvarlama", "Yanlış kural uygulama", "Sayıyı olduğu gibi bırakma"],
        gercek_yasam_baglantisi: "Bir stadyumdaki seyirci sayısını 'yaklaşık 500 kişi' diyerek ifade etmek, sayıları yuvarlama becerisidir.",
        seviye: 'orta', cozum_anahtari: `En yakın onluğa yuvarlarken birler basamağına, en yakın yüzlüğe yuvarlarken onlar basamağına bakılır.`
      };
    })}]
  },
   "M.3.1.1.5": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "1000 içinde altışar, yedişer, sekizer, dokuzar ileriye ritmik sayar.",
    templates: [{ id: 'system-default-M.3.1.1.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const step = 6 + (i % 4); // 6, 7, 8, 9
      const start = step * (5 + i);
      const sequence = [start, start + step, '...', start + 3 * step];
      const answer = start + 2 * step;
      const options = createNumericOptions(answer, step);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.5", kazanim_metni: "1000 içinde altışar, yedişer, sekizer, dokuzar ileriye ritmik sayar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${start}'dan başlayarak ${step}'ar ritmik sayarken boşluğa hangi sayı gelmelidir: ${sequence[0]}, ${sequence[1]}, ___, ${sequence[3]}?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Bir önceki sayı", "Bir sonraki sayı", "Yanlış adımla sayma"],
        gercek_yasam_baglantisi: "Haftanın günlerini sayarken (yedişer) veya bir düzine (altışarlı iki grup) nesneyi sayarken ritmik sayma kullanırız.",
        seviye: 'temel', cozum_anahtari: `Sayı dizisi ${step}'ar artmaktadır. ${start + step}'e ${step} ekleyince ${answer} bulunur.`
      };
    })}]
  },
   "M.3.1.2.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    templates: [{ id: 'system-default-M.3.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 148 + i * 11;
      const num2 = 279 + i * 13;
      const answer = num1 + num2;
      const options = createNumericOptions(answer, 15);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.1", kazanim_metni: "En çok üç basamaklı sayılarla eldesiz ve eldeli toplama işlemini yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kütüphanede ${num1} hikaye kitabı ve ${num2} masal kitabı vardır. Kütüphanede toplam kaç kitap vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Eldeyi unutma hatası", "Basamakları kaydırarak toplama", "Çıkarma yapma"],
        gercek_yasam_baglantisi: "İki farklı okulun öğrenci sayılarını birleştirerek toplam öğrenci sayısını bulmak için toplama işlemi yaparız.",
        seviye: 'orta', cozum_anahtari: `Toplam kitap sayısını bulmak için iki sayı toplanır. ${num1} + ${num2} = ${answer}.`
      };
    })}]
  },
  "M.3.1.2.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    templates: [{ id: 'system-default-M.3.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 348 + i * 5;
      const num2 = 471 - i * 5;
      const estimate = Math.round(num1 / 100) * 100 + Math.round(num2 / 100) * 100;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.2", kazanim_metni: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} + ${num2} işleminin tahmini sonucu kaçtır? (Sayıları en yakın yüzlüğe yuvarlayınız.)`,
        secenekler: { A: `${estimate}`, B: `${estimate - 100}`, C: `${estimate + 100}`, D: `${num1 + num2}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yanlış yuvarlama", "Gerçek sonuç", "Tahminden uzak değer"],
        gercek_yasam_baglantisi: "Alışveriş sepetimizdeki ürünlerin toplam fiyatını kasaya gitmeden önce yaklaşık olarak hesaplamak için tahmin etme becerisini kullanırız.",
        seviye: 'orta', cozum_anahtari: `${num1} en yakın yüzlüğe ${Math.round(num1 / 100) * 100} olarak, ${num2} ise ${Math.round(num2 / 100) * 100} olarak yuvarlanır. Tahmini toplam ${estimate}'dir.`
      };
    })}]
  },
  "M.3.1.2.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminin özelliklerini kullanır.",
    templates: [{ id: 'system-default-M.3.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 125 + i * 10;
      const num2 = 248 + i * 5;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.3", kazanim_metni: "Toplama işleminin özelliklerini kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} + ${num2} = ${num2} + ? eşitliğinde '?' yerine hangi sayı gelmelidir?`,
        secenekler: { A: `${num1}`, B: `${num2}`, C: `${num1+num2}`, D: `${num1-10}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Diğer toplanan", "İki sayının toplamı", "Yakın bir sayı"],
        gercek_yasam_baglantisi: "Sayıları toplarken yerlerini değiştirsek bile sonucun değişmeyeceğini bilmek, hesaplamalarda bize kolaylık sağlar.",
        seviye: 'temel', cozum_anahtari: `Toplama işleminde toplananların yer değiştirmesi (değişme özelliği) sonucu değiştirmez. Bu yüzden '?' yerine ${num1} gelmelidir.`
      };
    })}]
  },
  "M.3.1.2.4": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 350 + i * 10;
      const num2 = 175 + i * 5;
      const answer = num1 + num2;
      const options = createNumericOptions(answer, 20);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.4", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir okulda birinci gün ${num1} sayfa kitap okuma etkinliği, ikinci gün ise ${num2} sayfa kitap okuma etkinliği yapılmıştır. İki günde toplam kaç sayfa kitap okunmuştur?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Çıkarma yapma", "Elde hatası", "Sayıları yanlış okuma"],
        gercek_yasam_baglantisi: "Kumbaramıza farklı zamanlarda attığımız paraları toplayarak toplamda ne kadar biriktirdiğimizi buluruz.",
        seviye: 'ileri', cozum_anahtari: `İki günde okunan toplam sayfa sayısını bulmak için ${num1} ile ${num2} toplanır. Sonuç ${answer}'dir.`
      };
    })}]
  },
   "M.3.1.3.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı sayılardan, en çok üç basamaklı sayıları çıkarır.",
    templates: [{ id: 'system-default-M.3.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 812 - i * 15;
      const num2 = 345 + i * 10;
      const answer = num1 - num2;
      const options = createNumericOptions(answer, 15);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.1", kazanim_metni: "En çok üç basamaklı sayılardan, en çok üç basamaklı sayıları çıkarır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir çiftçi ${num1} kg elma topladı. Elmaların ${num2} kg'ını sattı. Geriye kaç kg elması kaldı?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Onluk bozmayı unutma", "Küçük sayıdan büyüğü çıkarma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Biriktirdiğimiz paradan bir oyuncak aldığımızda, ne kadar paramız kaldığını hesaplamak için çıkarma yaparız.",
        seviye: 'orta', cozum_anahtari: `Kalan elma miktarını bulmak için toplam miktardan satılan miktar çıkarılır. ${num1} - ${num2} = ${answer}.`
      };
    })}]
  },
  "M.3.1.3.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.3.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = (4 + i) * 100;
      const num2 = 55 + i*5;
      const answer = num1 - num2;
      const options = createNumericOptions(answer, 10);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.2", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} - ${num2} işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Onluk bozma hatası", "Yanlış geri sayma"],
        gercek_yasam_baglantisi: "100 TL ile alışveriş yaptıktan sonra para üstünü hızlıca zihinden hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1}'den önce ${Math.floor(num2/10)*10} çıkarıp, sonra bulunan sonuçtan ${num2%10} daha çıkararak sonuca ulaşılır.`
      };
    })}]
  },
  "M.3.1.3.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const start = 950 - i * 10;
      const end = 480 + i * 5;
      const answer = start - end;
      const options = createNumericOptions(answer, 20);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.3", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir su deposunda ${start} litre su bulunmaktadır. Sulama için ${end} litre su kullanılmıştır. Depoda kaç litre su kalmıştır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Toplama yapma", "Onluk bozma hatası"],
        gercek_yasam_baglantisi: "Okunacak bir kitabın kaç sayfasının kaldığını bulmak için çıkarma problemi çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Kalan su miktarını bulmak için başlangıçtaki miktardan kullanılan miktar çıkarılır: ${start} - ${end} = ${answer}.`
      };
    })}]
  },
  "M.3.1.4.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işleminin özelliklerini kullanır.",
    templates: [{ id: 'system-default-M.3.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const n1 = 15 + i;
      const n2 = 4 + i;
      const n3 = 7 + i;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.1", kazanim_metni: "Çarpma işleminin özelliklerini kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki işlemlerden hangisinin sonucu (${n1} x ${n2}) x ${n3} işleminin sonucuna eşittir?`,
        secenekler: { A: `${n1} x (${n2} x ${n3})`, B: `${n1} + ${n2} + ${n3}`, C: `(${n1} + ${n2}) x ${n3}`, D: `${n1} x ${n2} + ${n3}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Farklı işlemler kullanma", "İşlem önceliğini değiştirme"],
        gercek_yasam_baglantisi: "Çarpma işleminin özelliklerini bilmek, büyük sayıları zihinden daha kolay çarpmamıza yardımcı olur.",
        seviye: 'orta', cozum_anahtari: `Çarpma işleminin birleşme özelliği sayesinde, sayıları farklı gruplayarak çarpmak sonucu değiştirmez.`
      };
    })}]
  },
   "M.3.1.4.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı bir doğal sayı ile bir basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.3.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 125 + i * 4;
      const num2 = 3 + (i % 5);
      const answer = num1 * num2;
      const options = createNumericOptions(answer, 20);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.2", kazanim_metni: "Üç basamaklı bir doğal sayı ile bir basamaklı bir doğal sayıyı çarpar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sinema salonunda ${num1} koltuk vardır. Bu salonda ${num2} seans film gösterilirse, toplam kaç bilet satılmış olur? (Her seansın tam dolduğu varsayılacaktır)`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Eldeyi unutma hatası", "Sadece bir basamakla çarpma", "Toplama yapma"],
        gercek_yasam_baglantisi: "Her birinde 150 sayfa olan 5 kitabı okuduğumuzda toplam kaç sayfa okuduğumuzu çarparak buluruz.",
        seviye: 'orta', cozum_anahtari: `Toplam bilet sayısını bulmak için koltuk sayısı ile seans sayısı çarpılır. ${num1} x ${num2} = ${answer}.`
      };
    })}]
  },
  "M.3.1.4.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.3.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 25 + i;
      const num2 = 15 + i;
      const answer = num1 * num2;
      const options = createNumericOptions(answer, 30);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.3", kazanim_metni: "İki basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sınıfta ${num1} sıra vardır ve her sırada ${num2} öğrenci oturmaktadır. Sınıf mevcudu kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Basamak kaydırma hatası", "Toplama yapma"],
        gercek_yasam_baglantisi: "Her birinde 24 yumurta olan 12 kolideki toplam yumurta sayısını bulmak için çarpma yaparız.",
        seviye: 'orta', cozum_anahtari: `Toplam öğrenci sayısını bulmak için sıra sayısı ile her sıradaki öğrenci sayısı çarpılır: ${num1} x ${num2} = ${answer}.`
      };
    })}]
  },
  "M.3.1.4.4": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çarpma işlemi yapar.",
    templates: [{ id: 'system-default-M.3.1.4.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 45 + i * 2;
      const num2 = 10;
      const answer = num1 * num2;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.4", kazanim_metni: "Zihinden çarpma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} x 10 işleminin sonucu kaçtır?`,
        secenekler: { A: `${num1}0`, B: `${num1}`, C: `${num1}00`, D: `${num1 + 10}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Sıfır eklemeyi unutma", "Fazla sıfır ekleme", "Toplama yapma"],
        gercek_yasam_baglantisi: "10 tane 50 kuruşun kaç TL yaptığını zihinden çarparak hızlıca bulabiliriz.",
        seviye: 'orta', cozum_anahtari: `Bir sayıyı 10 ile zihinden çarpmak için sayının sonuna bir tane sıfır eklenir.`
      };
    })}]
  },
  "M.3.1.4.5": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.4.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num1 = 8 + i;
      const num2 = 12;
      const answer = num1 * num2;
      const options = createNumericOptions(answer, 10);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.5", kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Günde ${num1} sayfa kitap okuyan bir öğrenci, ${num2} günde toplam kaç sayfa kitap okur?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Her gün belirli bir miktar para biriktirirsek, bir ay sonunda ne kadar paramız olacağını çarparak hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `Toplam okunan sayfa sayısını bulmak için günlük okunan sayfa sayısı ile gün sayısı çarpılır: ${num1} x ${num2} = ${answer}.`
      };
    })}]
  },
  "M.3.1.5.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki basamaklı bir doğal sayıyı bir basamaklı bir doğal sayıya böler.",
    templates: [{ id: 'system-default-M.3.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const divisor = 3 + (i % 5);
      const quotient = 12 + i;
      const dividend = divisor * quotient;
      const options = createNumericOptions(quotient, 5);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(quotient))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.1", kazanim_metni: "İki basamaklı bir doğal sayıyı bir basamaklı bir doğal sayıya böler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${dividend} tane misket ${divisor} arkadaşa eşit olarak paylaştırılırsa her birine kaç misket düşer?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Bölen ile karıştırma", "Çarpma yapma", "Yanlış bölme"],
        gercek_yasam_baglantisi: "Bir paket bisküviyi 3 kardeş arasında eşit olarak paylaşmak için bölme işlemi yaparız.",
        seviye: 'orta', cozum_anahtari: `Eşit paylaştırma bir bölme problemidir. ${dividend} ÷ ${divisor} = ${quotient}.`
      };
    })}]
  },
  "M.3.1.5.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işleminde kalanı yorumlar.",
    templates: [{ id: 'system-default-M.3.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const divisor = 5 + (i % 3);
      const dividend = 27 + i * 2;
      const answer = dividend % divisor;
      const options = createNumericOptions(answer, 2);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.2", kazanim_metni: "Bölme işleminde kalanı yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${dividend} ceviz, her birinde ${divisor} ceviz olacak şekilde poşetlere dolduruluyor. Geriye kaç ceviz artar?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Bölümü cevap sanma", "Böleni cevap sanma"],
        gercek_yasam_baglantisi: "Oyuncakları kutulara eşit sayıda yerleştirdiğimizde dışarıda kalan oyuncak sayısı, bölme işlemindeki kalandır.",
        seviye: 'ileri', cozum_anahtari: `${dividend} sayısı ${divisor}'e bölündüğünde bölüm ${Math.floor(dividend/divisor)}, kalan ise ${answer}'dir. Soruda artan cevizler sorulduğu için cevap kalandır.`
      };
    })}]
  },
  "M.3.1.5.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const groups = 4 + (i%2);
      const answer = 24 - i;
      const total = groups * answer;
      const options = createNumericOptions(answer, 5);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.3", kazanim_metni: "Bölme işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${total} yolcusu olan bir tren, ${groups} vagonludur. Her vagonda eşit sayıda yolcu olduğuna göre, bir vagonda kaç yolcu vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Çarpma yapma", "Yanlış bölme"],
        gercek_yasam_baglantisi: "Bir gezi için toplanan parayı katılımcı sayısına bölerek kişi başı maliyeti hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `Yolcular vagonlara eşit paylaştırıldığı için bölme işlemi yapılır: ${total} ÷ ${groups} = ${answer}.`
      };
    })}]
  },
  "M.3.1.6.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Birim kesirleri tanır ve modellerle gösterir.",
    templates: [{ id: 'system-default-M.3.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const denominator = 3 + i;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.1", kazanim_metni: "Birim kesirleri tanır ve modellerle gösterir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir bütünün ${denominator} eş parçasından birini gösteren kesir hangisidir?`,
            secenekler: { A: `1/${denominator}`, B: `${denominator}/1`, C: `1/${denominator-1}`, D: `2/${denominator}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Pay ve paydanın yerini karıştırma", "Yanlış payda", "Birim kesir olmayan"],
            gercek_yasam_baglantisi: "Bir pizzayı 8 arkadaş paylaştığımızda her birimize düşen bir dilim, pizzanın 1/8'idir.",
            seviye: 'temel', cozum_anahtari: `Bir bütünün eş parçalarından birini gösteren kesirlere birim kesir denir. Payı her zaman 1 olur.`
        };
    })}]
  },
  "M.3.1.6.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir bütünün belirtilen birim kesir kadarını belirler.",
    templates: [{ id: 'system-default-M.3.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const den = 4 + (i % 5);
      const total = den * (5 + i);
      const answer = total / den;
      const options = createNumericOptions(answer, 3);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.2", kazanim_metni: "Bir bütünün belirtilen birim kesir kadarını belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${total} liranın 1/${den}'i kaç liradır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Çarpma yapma", "Bütünü cevap sanma"],
        gercek_yasam_baglantisi: "Harçlığımızın 1/3'ü ile dondurma almak istediğimizde ne kadar harcayacağımızı bu şekilde hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Bir bütünün birim kesir kadarını bulmak için bütün, kesrin paydasına bölünür: ${total} ÷ ${den} = ${answer}.`
      };
    })}]
  },
  "M.3.1.6.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Paydası 10 ve 100 olan kesirleri birim kesir olarak ifade eder.",
    templates: [{ id: 'system-default-M.3.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 3 + i;
      const den = i % 2 === 0 ? 10 : 100;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.3", kazanim_metni: "Paydası 10 ve 100 olan kesirleri birim kesir olarak ifade eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num}/${den} kesri kaç tane 1/${den} birim kesrinden oluşur?`,
        secenekler: { A: `${den}`, B: '1', C: `${num}`, D: `${num+den}` },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Paydayı cevap sanma", "Birim kesrin payını cevap sanma", "Toplama yapma"],
        gercek_yasam_baglantisi: `10 dilime ayrılmış bir pastanın ${num} dilimini yediğimizde, ${num} tane 1/10'luk parça yemiş oluruz.`,
        seviye: 'orta', cozum_anahtari: `Bir kesrin payı, o kesrin kaç tane birim kesirden oluştuğunu gösterir. ${num}/${den} kesri, ${num} tane 1/${den}'dan oluşur.`
      };
    })}]
  },
  "M.3.2.1.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Nokta, doğru, doğru parçası ve ışını açıklar.",
    templates: [{ id: 'system-default-M.3.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const concepts = [
            { question: "İki ucu da sınırsız uzayan düz çizgiye ne ad verilir?", answer: "Doğru" },
            { question: "İki ucu sınırlı olan düz çizgi parçasına ne ad verilir?", answer: "Doğru parçası" },
            { question: "Bir ucu sınırlı, diğer ucu sonsuza uzayan düz çizgiye ne ad verilir?", answer: "Işın" },
            { question: "Kalemin ucunun kağıtta bıraktığı ize ne denir?", answer: "Nokta" }
        ];
        const current = concepts[i % concepts.length];
        return {
            sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.1.1", kazanim_metni: "Nokta, doğru, doğru parçası ve ışını açıklar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: current.question,
            secenekler: { A: 'Doğru parçası', B: 'Işın', C: 'Doğru', D: 'Nokta' },
            dogru_cevap: Object.keys({ A: 'Doğru parçası', B: 'Işın', C: 'Doğru', D: 'Nokta' }).find(key => ({ A: 'Doğru parçası', B: 'Işın', C: 'Doğru', D: 'Nokta' }[key as 'A'|'B'|'C'|'D'] === current.answer))!,
            yanlis_secenek_tipleri: ["Uçları sınırlı olan", "Bir ucu sınırlı olan", "Boyutu olmayan"],
            gercek_yasam_baglantisi: "Yollar, tren rayları doğrulara; bir cetvelin kenarı doğru parçasına; bir fenerden çıkan ışık ise ışına benzetilebilir.",
            seviye: 'temel', cozum_anahtari: `İki ucu sınırlı olan çizgiye doğru parçası, bir ucu sınırlı olana ışın, iki ucu da sınırsız olana doğru denir.`
        };
    })}]
  },
  "M.3.2.1.2": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Düzlem ve düzlemsel şekilleri açıklar.",
    templates: [{ id: 'system-default-M.3.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const items = ["Bir top", "Bir ip", "Bir masanın yüzeyi", "Bir yıldız", "Bir halının yüzeyi", "Bir bardak"];
      const correct = "Bir masanın yüzeyi";
      return {
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.1.2", kazanim_metni: "Düzlem ve düzlemsel şekilleri açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi bir düzlem modeli olarak kabul edilebilir?`,
        secenekler: { A: items[i % 4], B: items[(i+1) % 4], C: correct, D: items[(i+2) % 4] }, // Ensure correct answer is always present
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Üç boyutlu cisim", "Tek boyutlu çizgi", "Nokta"],
        gercek_yasam_baglantisi: "Yazdığımız defterin sayfası, yürüdüğümüz zemin veya duvardaki tablo birer düzlem modelidir.",
        seviye: 'temel', cozum_anahtari: `Düzlem, pürüzsüz ve sonsuza kadar uzanan bir yüzeydir. Masanın veya halının yüzeyi buna iyi bir örnektir.`
      };
    })}]
  },
  "M.3.2.2.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Açıları isimlendirir ve sınıflandırır.",
    templates: [{ id: 'system-default-M.3.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const concepts = [
          { question: "Dik açıdan daha küçük olan açılara ne ad verilir?", answer: "Dar açı" },
          { question: "Ölçüsü 90 derece olan açıya ne ad verilir?", answer: "Dik açı" },
          { question: "Dik açıdan büyük, doğru açıdan küçük açılara ne ad verilir?", answer: "Geniş açı" }
      ];
      const current = concepts[i % concepts.length];
      return {
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.2.1", kazanim_metni: "Açıları isimlendirir ve sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: current.question,
        secenekler: { A: 'Geniş açı', B: 'Dik açı', C: 'Doğru açı', D: 'Dar açı' },
        dogru_cevap: Object.keys({ A: 'Geniş açı', B: 'Dik açı', C: 'Doğru açı', D: 'Dar açı' }).find(key => ({ A: 'Geniş açı', B: 'Dik açı', C: 'Doğru açı', D: 'Dar açı' }[key as 'A'|'B'|'C'|'D'] === current.answer))!,
        yanlis_secenek_tipleri: ["Dik açıdan büyük olan", "180 derece olan", "360 derece olan"],
        gercek_yasam_baglantisi: "Bir kitabın köşesi dik açıdır, makasın ağzı açıldığında dar açı, kapının açılmasıyla geniş açı oluşabilir.",
        seviye: 'orta', cozum_anahtari: `Ölçüsü 0 ile 90 derece arasında olan açılara dar açı, 90 derece olanlara dik açı, 90 ile 180 derece arasında olanlara geniş açı denir.`
      };
    })}]
  },
  "M.3.2.2.2": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Üçgen, kare, dikdörtgeni kenarlarına ve açılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.3.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const concepts = [
          { question: "Karşılıklı kenarları birbirine eşit ve tüm açıları dik açı olan geometrik şekil hangisidir?", answer: "Dikdörtgen" },
          { question: "Tüm kenarları birbirine eşit ve tüm açıları dik açı olan geometrik şekil hangisidir?", answer: "Kare" },
          { question: "Üç kenarı ve üç açısı olan geometrik şekil hangisidir?", answer: "Üçgen" }
      ];
      const current = concepts[i % concepts.length];
      return {
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.2.2", kazanim_metni: "Üçgen, kare, dikdörtgeni kenarlarına ve açılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: current.question,
        secenekler: { A: 'Üçgen', B: 'Dikdörtgen', C: 'Kare', D: 'Yamuk' },
        dogru_cevap: Object.keys({ A: 'Üçgen', B: 'Dikdörtgen', C: 'Kare', D: 'Yamuk' }).find(key => ({ A: 'Üçgen', B: 'Dikdörtgen', C: 'Kare', D: 'Yamuk' }[key as 'A'|'B'|'C'|'D'] === current.answer))!,
        yanlis_secenek_tipleri: ["Farklı kenar sayısı", "Açıları dik olmayan", "Sadece iki kenarı paralel olan"],
        gercek_yasam_baglantisi: "Evimizdeki kapılar, pencereler, kitaplar genellikle dikdörtgen şeklindedir.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin tanımı, karşılıklı kenarları eşit ve tüm açıları 90 derece olan dörtgendir. Karenin ise tüm kenarları eşittir.`
      };
    })}]
  },
  "M.3.2.3.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Tekrarlayan bir geometrik örüntü oluşturur ve örüntünün kuralını açıklar.",
    templates: [{ id: 'system-default-M.3.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const rules = [
          { pattern: "Sarı, Mavi, Mavi", rule: "Bir sarı, iki mavi", options: { A: 'Bir sarı, bir mavi', B: 'İki sarı, bir mavi', C: 'Bir sarı, iki mavi', D: 'İki sarı, iki mavi' }, answer: 'C' },
          { pattern: "Yeşil, Kırmızı", rule: "Bir yeşil, bir kırmızı", options: { A: 'Bir yeşil, bir kırmızı', B: 'İki yeşil, bir kırmızı', C: 'Bir yeşil, iki kırmızı', D: 'İki yeşil, iki kırmızı' }, answer: 'A' },
          { pattern: "A, A, B", rule: "İki A, bir B", options: { A: 'Bir A, bir B', B: 'İki A, bir B', C: 'Bir A, iki B', D: 'İki A, iki B' }, answer: 'B' }
      ];
      const current = rules[i % rules.length];
      return {
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.3.1", kazanim_metni: "Tekrarlayan bir geometrik örüntü oluşturur ve örüntünün kuralını açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${current.pattern}, ${current.pattern}, ... şeklinde devam eden örüntünün kuralı nedir?`,
        secenekler: current.options,
        dogru_cevap: current.answer,
        yanlis_secenek_tipleri: ["Yanlış tekrar sayısı"],
        gercek_yasam_baglantisi: "Bir kolyeye boncuk dizerken veya bir duvara fayans döşerken belirli bir kurala göre örüntüler oluşturulur.",
        seviye: 'orta', cozum_anahtari: `Örüntüde '${current.rule}' kuralı sürekli tekrar eder.`
      };
    })}]
  },
  "M.3.2.4.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Düzlemsel şekillerin simetri doğrularını belirler ve çizer.",
    templates: [{ id: 'system-default-M.3.2.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const shapes = [
            { name: 'Kare', lines: '4' }, 
            { name: 'Dikdörtgen', lines: '2' }, 
            { name: 'Daire', lines: 'Sonsuz' }, 
            { name: 'Kelebek (şekli)', lines: '1' }
        ];
        const current = shapes[i % shapes.length];
        return {
            sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.4.1", kazanim_metni: "Düzlemsel şekillerin simetri doğrularını belirler ve çizer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir ${current.name.toLowerCase()} şeklinin kaç tane simetri doğrusu vardır?`,
            secenekler: { A: '1', B: '2', C: '4', D: 'Sonsuz' },
            dogru_cevap: Object.keys({ A: '1', B: '2', C: '4', D: 'Sonsuz' }).find(key => ({ A: '1', B: '2', C: '4', D: 'Sonsuz' }[key as 'A'|'B'|'C'|'D'] === current.lines))!,
            yanlis_secenek_tipleri: ["Başka bir şeklin simetri sayısı", "Yanlış sayma"],
            gercek_yasam_baglantisi: "Bir kağıdı katlayıp keserek simetrik şekiller oluşturmak, simetri doğrusu kavramının bir uygulamasıdır.",
            seviye: 'orta', cozum_anahtari: `Karenin 4, dikdörtgenin 2, dairenin sonsuz, dikey duran bir kelebeğin 1 simetri doğrusu vardır.`
        };
    })}]
  },
  "M.3.3.1.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Metre ve santimetre arasındaki ilişkiyi fark eder ve birbiri cinsinden yazar.",
    templates: [{ id: 'system-default-M.3.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const m = 2 + i;
      const cm = 10 + i * 5;
      const answer = m * 100 + cm;
      return {
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.1.1", kazanim_metni: "Metre ve santimetre arasındaki ilişkiyi fark eder ve birbiri cinsinden yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${m} metre ${cm} santimetre, toplam kaç santimetredir?`,
        secenekler: { A: `${answer}`, B: `${m}${cm}`, C: `${m+cm}`, D: `${answer*10}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Toplama yapma"],
        gercek_yasam_baglantisi: "Boyumuzu ifade ederken hem metre hem de santimetre kullanırız, örneğin '1 metre 35 santimetre' gibi.",
        seviye: 'orta', cozum_anahtari: `1 metre 100 santimetre olduğu için, ${m} metre ${m*100} santimetredir. Üzerine ${cm} santimetre daha eklenince toplam ${answer} santimetre olur.`
      };
    })}]
  },
  "M.3.3.1.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Kilometrenin kullanım alanlarını belirtir.",
    templates: [{ id: 'system-default-M.3.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const contexts = [
          { q: "Ankara ile İstanbul arasındaki mesafe", a: "Kilometre" },
          { q: "Bir kalemin boyu", a: "Santimetre" },
          { q: "Sınıf tahtasının eni", a: "Metre" },
          { q: "İki şehir arasındaki yol", a: "Kilometre" }
      ];
      const current = contexts[i % contexts.length];
      const options = { A: 'Metre', B: 'Santimetre', C: 'Kilogram', D: 'Kilometre' };
      const correctAnswerKey = (Object.keys(options) as Array<keyof typeof options>).find(key => options[key] === current.a);
      
      return {
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.1.2", kazanim_metni: "Kilometrenin kullanım alanlarını belirtir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${current.q} ölçmek için en uygun birim hangisidir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey!,
        yanlis_secenek_tipleri: ["Daha küçük/büyük uzunluk birimleri", "Ağırlık birimi"],
        gercek_yasam_baglantisi: "Şehirler arası yolculuk planlarken mesafeleri kilometre cinsinden ifade ederiz.",
        seviye: 'temel',
        cozum_anahtari: "Uzun mesafeler, örneğin şehirler arası yollar, kilometre (km) ile ölçülür. Kalem gibi küçük nesneler santimetre, oda gibi daha büyük alanlar ise metre ile ölçülür."
      };
    })}]
  },
};
