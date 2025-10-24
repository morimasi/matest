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
        if (new Set(nums).size < 3) return null;
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
    templates: [{ id: 'system-default-M.3.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.3", kazanim_metni: "Toplama işleminin özelliklerini kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `125 + 248 = 248 + ? eşitliğinde '?' yerine hangi sayı gelmelidir?`,
        secenekler: { A: '125', B: '248', C: '373', D: '123' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Diğer toplanan", "İki sayının toplamı", "Yakın bir sayı"],
        gercek_yasam_baglantisi: "Sayıları toplarken yerlerini değiştirsek bile sonucun değişmeyeceğini bilmek, hesaplamalarda bize kolaylık sağlar.",
        seviye: 'temel', cozum_anahtari: `Toplama işleminde toplananların yer değiştirmesi (değişme özelliği) sonucu değiştirmez. Bu yüzden '?' yerine 125 gelmelidir.`
    }]}]
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
    templates: [{ id: 'system-default-M.3.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.1", kazanim_metni: "Çarpma işleminin özelliklerini kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki işlemlerden hangisinin sonucu (15 x 4) x 7 işleminin sonucuna eşittir?`,
        secenekler: { A: '15 x (4 x 7)', B: '15 + 4 + 7', C: '(15 + 4) x 7', D: '15 x 4 + 7' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Farklı işlemler kullanma", "İşlem önceliğini değiştirme"],
        gercek_yasam_baglantisi: "Çarpma işleminin özelliklerini bilmek, büyük sayıları zihinden daha kolay çarpmamıza yardımcı olur.",
        seviye: 'orta', cozum_anahtari: `Çarpma işleminin birleşme özelliği sayesinde, sayıları farklı gruplayarak çarpmak sonucu değiştirmez.`
    }]}]
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
    templates: [{ id: 'system-default-M.3.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.3", kazanim_metni: "Paydası 10 ve 100 olan kesirleri birim kesir olarak ifade eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `7/10 kesri kaç tane 1/10 birim kesrinden oluşur?`,
        secenekler: { A: '10', B: '1', C: '7', D: '17' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Paydayı cevap sanma", "Birim kesrin payını cevap sanma", "Toplama yapma"],
        gercek_yasam_baglantisi: "10 dilime ayrılmış bir pastanın 7 dilimini yediğimizde, 7 tane 1/10'luk parça yemiş oluruz.",
        seviye: 'orta', cozum_anahtari: `Bir kesrin payı, o kesrin kaç tane birim kesirden oluştuğunu gösterir. 7/10 kesri, 7 tane 1/10'dan oluşur.`
    }]}]
  },
  "M.3.2.1.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Nokta, doğru, doğru parçası ve ışını açıklar.",
    templates: [{ id: 'system-default-M.3.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.1.1", kazanim_metni: "Nokta, doğru, doğru parçası ve ışını açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `İki ucu da sınırsız uzayan düz çizgiye ne ad verilir?`,
        secenekler: { A: 'Doğru parçası', B: 'Işın', C: 'Doğru', D: 'Nokta' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Uçları sınırlı olan", "Bir ucu sınırlı olan", "Boyutu olmayan"],
        gercek_yasam_baglantisi: "Yollar, tren rayları doğrulara; bir cetvelin kenarı doğru parçasına; bir fenerden çıkan ışık ise ışına benzetilebilir.",
        seviye: 'temel', cozum_anahtari: `İki ucu sınırlı olan çizgiye doğru parçası, bir ucu sınırlı olana ışın, iki ucu da sınırsız olana doğru denir.`
    }]}]
  },
  "M.3.2.1.2": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Düzlem ve düzlemsel şekilleri açıklar.",
    templates: [{ id: 'system-default-M.3.2.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.1.2", kazanim_metni: "Düzlem ve düzlemsel şekilleri açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi bir düzlem modeli olarak kabul edilebilir?`,
        secenekler: { A: 'Bir top', B: 'Bir ip', C: 'Bir masanın yüzeyi', D: 'Bir yıldız' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Üç boyutlu cisim", "Tek boyutlu çizgi", "Nokta"],
        gercek_yasam_baglantisi: "Yazdığımız defterin sayfası, yürüdüğümüz zemin veya duvardaki tablo birer düzlem modelidir.",
        seviye: 'temel', cozum_anahtari: `Düzlem, pürüzsüz ve sonsuza kadar uzanan bir yüzeydir. Masanın yüzeyi buna iyi bir örnektir.`
    }]}]
  },
  "M.3.2.2.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Açıları isimlendirir ve sınıflandırır.",
    templates: [{ id: 'system-default-M.3.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.2.1", kazanim_metni: "Açıları isimlendirir ve sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Dik açıdan daha küçük olan açılara ne ad verilir?`,
        secenekler: { A: 'Geniş açı', B: 'Doğru açı', C: 'Tam açı', D: 'Dar açı' },
        dogru_cevap: 'D',
        yanlis_secenek_tipleri: ["Dik açıdan büyük olan", "180 derece olan", "360 derece olan"],
        gercek_yasam_baglantisi: "Bir kitabın köşesi dik açıdır, makasın ağzı açıldığında dar açı, kapının açılmasıyla geniş açı oluşabilir.",
        seviye: 'orta', cozum_anahtari: `Ölçüsü 0 ile 90 derece arasında olan açılara dar açı, 90 derece olanlara dik açı, 90 ile 180 derece arasında olanlara geniş açı denir.`
    }]}]
  },
  "M.3.2.2.2": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Üçgen, kare, dikdörtgeni kenarlarına ve açılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.3.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.2.2", kazanim_metni: "Üçgen, kare, dikdörtgeni kenarlarına ve açılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Karşılıklı kenarları birbirine eşit ve tüm açıları dik açı olan geometrik şekil hangisidir?`,
        secenekler: { A: 'Üçgen', B: 'Dikdörtgen', C: 'Eşkenar Dörtgen', D: 'Yamuk' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Farklı kenar sayısı", "Açıları dik olmayan", "Sadece iki kenarı paralel olan"],
        gercek_yasam_baglantisi: "Evimizdeki kapılar, pencereler, kitaplar genellikle dikdörtgen şeklindedir.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin tanımı, karşılıklı kenarları eşit ve tüm açıları 90 derece olan dörtgendir. Karenin ise tüm kenarları eşittir.`
    }]}]
  },
  "M.3.2.3.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Tekrarlayan bir geometrik örüntü oluşturur ve örüntünün kuralını açıklar.",
    templates: [{ id: 'system-default-M.3.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.3.1", kazanim_metni: "Tekrarlayan bir geometrik örüntü oluşturur ve örüntünün kuralını açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Sarı, Mavi, Mavi, Sarı, Mavi, Mavi, ... şeklinde devam eden örüntünün kuralı nedir?`,
        secenekler: { A: 'Bir sarı, bir mavi', B: 'İki sarı, bir mavi', C: 'Bir sarı, iki mavi', D: 'İki sarı, iki mavi' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış tekrar sayısı"],
        gercek_yasam_baglantisi: "Bir kolyeye boncuk dizerken veya bir duvara fayans döşerken belirli bir kurala göre örüntüler oluşturulur.",
        seviye: 'orta', cozum_anahtari: `Örüntüde bir sarı boncuğu iki mavi boncuk takip etmektedir. Bu grup sürekli tekrar eder.`
    }]}]
  },
  "M.3.2.4.1": {
    gradeName: "3. Sınıf", unitName: "Geometri", kazanimName: "Düzlemsel şekillerin simetri doğrularını belirler ve çizer.",
    templates: [{ id: 'system-default-M.3.2.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const shape = ['Kare', 'Dikdörtgen', 'Daire', 'Kelebek'][i % 4];
        let answer = '';
        if (shape === 'Kare') answer = '4';
        else if (shape === 'Dikdörtgen') answer = '2';
        else if (shape === 'Daire') answer = 'Sonsuz';
        else answer = '1';
        return {
            sinif: 3, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.3.2.4.1", kazanim_metni: "Düzlemsel şekillerin simetri doğrularını belirler ve çizer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir ${shape.toLowerCase()} şeklinin kaç tane simetri doğrusu vardır?`,
            secenekler: { A: '1', B: '2', C: '4', D: 'Sonsuz' },
            dogru_cevap: Object.keys({ A: '1', B: '2', C: '4', D: 'Sonsuz' }).find(key => ({ A: '1', B: '2', C: '4', D: 'Sonsuz' }[key as 'A'|'B'|'C'|'D'] === answer))!,
            yanlis_secenek_tipleri: ["Başka bir şeklin simetri sayısı", "Yanlış sayma"],
            gercek_yasam_baglantisi: "Bir kağıdı ortadan katlayıp kestiğimizde açınca çıkan simetrik şekiller, bu konunun bir uygulamasıdır.",
            seviye: 'orta', cozum_anahtari: `Karenin 4, dikdörtgenin 2, dairenin sonsuz, kelebeğin (dikey olarak) 1 simetri doğrusu vardır.`
        };
    })}]
  },
  "M.3.3.1.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Metre ve santimetre arasındaki ilişkiyi fark eder ve birbiri cinsinden yazar.",
    templates: [{ id: 'system-default-M.3.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.1.1", kazanim_metni: "Metre ve santimetre arasındaki ilişkiyi fark eder ve birbiri cinsinden yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `4 metre 25 santimetre, toplam kaç santimetredir?`,
        secenekler: { A: '425', B: '4025', C: '29', D: '4.25' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Toplama yapma"],
        gercek_yasam_baglantisi: "Boyumuzu ifade ederken hem metre hem de santimetre kullanırız, örneğin '1 metre 35 santimetre' gibi.",
        seviye: 'orta', cozum_anahtari: `1 metre 100 santimetre olduğu için, 4 metre 400 santimetredir. Üzerine 25 santimetre daha eklenince toplam 425 santimetre olur.`
    }]}]
  },
  "M.3.3.1.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Kilometrenin kullanım alanlarını belirtir.",
    templates: [{ id: 'system-default-M.3.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.1.2", kazanim_metni: "Kilometrenin kullanım alanlarını belirtir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ankara ile İstanbul arasındaki mesafeyi ölçmek için en uygun birim hangisidir?`,
        secenekler: { A: 'Santimetre', B: 'Metre', C: 'Kilometre', D: 'Karış' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Çok küçük birimler", "Standart olmayan birim"],
        gercek_yasam_baglantisi: "Şehirler arası yolculuklarda ne kadar yol gittiğimizi trafik tabelalarındaki kilometre bilgisiyle takip ederiz.",
        seviye: 'temel', cozum_anahtari: `Çok uzun mesafeleri (şehirler arası yollar gibi) ölçmek için kilometre birimi kullanılır.`
    }]}]
  },
  "M.3.3.1.3": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ölçme birimleriyle ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.1.3", kazanim_metni: "Uzunluk ölçme birimleriyle ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir terzi 5 metrelik kumaşın 2 metre 40 santimetresini kullanmıştır. Geriye ne kadar kumaş kalmıştır?`,
        secenekler: { A: '3 m 60 cm', B: '2 m 60 cm', C: '7 m 40 cm', D: '2 m 40 cm' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yakın ama yanlış sonuç", "Toplama yapma", "Kullanılan miktarı cevap sanma"],
        gercek_yasam_baglantisi: "Evimize perde alırken pencerenin boyutunu ölçüp, ne kadar kumaş gerektiğini hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `5 metre, 500 santimetredir. 2 metre 40 santimetre ise 240 santimetredir. 500 - 240 = 260 santimetre, bu da 2 metre 60 santimetredir.`
    }]}]
  },
   "M.3.3.2.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Şekillerin çevre uzunluğunu hesaplar.",
    templates: [{ id: 'system-default-M.3.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const side = 15 + i;
      const answer = side * 4;
      const options = createNumericOptions(answer, 10);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.2.1", kazanim_metni: "Şekillerin çevre uzunluğunu hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kenar uzunluğu ${side} cm olan bir karenin çevre uzunluğu kaç cm'dir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Sadece iki kenarı toplama", "Tek kenar uzunluğunu cevap sanma", "Alan hesaplama"],
        gercek_yasam_baglantisi: "Bir bahçenin etrafına tel çekmek için ne kadar tel gerektiğini hesaplarken çevre uzunluğunu kullanırız.",
        seviye: 'orta', cozum_anahtari: `Karenin dört kenarı da eşit olduğu için çevre uzunluğu, bir kenar uzunluğunun 4 ile çarpılmasıyla bulunur: ${side} x 4 = ${answer} cm.`
      };
    })}]
  },
  "M.3.3.2.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Çevre uzunlukları ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.2.2", kazanim_metni: "Çevre uzunlukları ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Çevresi 80 cm olan bir karenin bir kenar uzunluğu kaç santimetredir?`,
        secenekler: { A: '80', B: '40', C: '20', D: '10' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Çevrenin kendisi", "2'ye bölme", "8'e bölme"],
        gercek_yasam_baglantisi: "Kare şeklindeki bir tarlanın etrafı için belli miktarda tel kullanılmışsa, bir kenarının ne kadar olduğunu bulabiliriz.",
        seviye: 'ileri', cozum_anahtari: `Karenin dört kenarı eşit olduğu için, çevresi verilen bir karenin bir kenarını bulmak için çevre uzunluğu 4'e bölünür: 80 ÷ 4 = 20 cm.`
    }]}]
  },
  "M.3.3.3.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Alanın, standart olmayan birimlerle ölçülebileceğini fark eder.",
    templates: [{ id: 'system-default-M.3.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.3.1", kazanim_metni: "Alanın, standart olmayan birimlerle ölçülebileceğini fark eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Odamızın zeminini kaplamak için aşağıdaki standart olmayan birimlerden hangisini kullanmak en mantıklı olurdu?`,
        secenekler: { A: 'Silgi', B: 'Kitap', C: 'Karış', D: 'Posta pulu' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Çok küçük birimler", "Alan ölçmek için uygun olmayan birim"],
        gercek_yasam_baglantisi: "Bir masanın yüzeyinin kaç tane defterle kaplanabileceğini bularak masanın alanını defter birimiyle ölçmüş oluruz.",
        seviye: 'temel', cozum_anahtari: `Alan, bir yüzeyin kapladığı yerdir. Zemini kaplamak için kitap gibi daha büyük ve düz birimler kullanmak silgi veya puldan daha mantıklıdır.`
    }]}]
  },
  "M.3.3.4.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Saat, dakika ve saniye arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.3.3.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.4.1", kazanim_metni: "Saat, dakika ve saniye arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `1 dakika kaç saniyedir?`,
        secenekler: { A: '30', B: '60', C: '90', D: '100' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yarım dakika", "Bir buçuk dakika", "Yaygın yanlış bilgi"],
        gercek_yasam_baglantisi: "Bir şarkının süresini veya bir yarışta koşucunun derecesini dakika ve saniye olarak ifade ederiz.",
        seviye: 'temel', cozum_anahtari: `Zaman ölçüsü birimlerinden 1 saat 60 dakikaya, 1 dakika ise 60 saniyeye eşittir.`
    }]}]
  },
  "M.3.3.4.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçme birimleriyle ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const hours = 2 + (i % 3);
      const minutes = hours * 60;
      const options = createNumericOptions(minutes, 30);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(minutes))!;
      return {
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.4.2", kazanim_metni: "Zaman ölçme birimleriyle ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${hours} saat kaç dakikadır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Yanlış çarpma", "Saat ile karıştırma", "Saniye ile karıştırma"],
        gercek_yasam_baglantisi: "Bir filmin kaç dakika süreceğini veya bir yolculuğun ne kadar zaman alacağını hesaplarken zaman ölçülerini kullanırız.",
        seviye: 'orta', cozum_anahtari: `1 saat 60 dakika olduğu için, ${hours} saatin kaç dakika olduğunu bulmak için ${hours} ile 60 çarpılır: ${hours} x 60 = ${minutes} dakika.`
      };
    })}]
  },
  "M.3.3.5.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Lira ve kuruş ilişkisini gösterir.",
    templates: [{ id: 'system-default-M.3.3.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.5.1", kazanim_metni: "Lira ve kuruş ilişkisini gösterir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 tane 50 kuruş, 2 tane 25 kuruş ve 5 tane 10 kuruş toplam kaç lira kaç kuruş eder?`,
        secenekler: { A: '2 TL 50 kr.', B: '2 TL 25 kr.', C: '3 TL', D: '2 TL 75 kr.' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yanlış hesaplama", "Sadece bir tür madeni parayı hesaplama"],
        gercek_yasam_baglantisi: "Kumbaraımızdaki bozuk paraları sayarak toplam ne kadar paramız olduğunu lira ve kuruş cinsinden hesaplarız.",
        seviye: 'orta', cozum_anahtari: `3x50=150 kr, 2x25=50 kr, 5x10=50 kr. Toplam: 150+50+50 = 250 kuruş. 100 kuruş 1 TL olduğu için 250 kuruş, 2 TL 50 kuruştur.`
    }]}]
  },
  "M.3.3.5.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Paralarımızla ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.5.2", kazanim_metni: "Paralarımızla ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Tanesi 2 TL 50 kuruş olan kalemlerden 3 tane alan bir kişi, satıcıya 10 TL verirse ne kadar para üstü alır?`,
        secenekler: { A: '7 TL 50 kr.', B: '3 TL 50 kr.', C: '2 TL 50 kr.', D: '1 TL 50 kr.' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Alınan ürünlerin toplam fiyatı", "Yanlış çıkarma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Market alışverişi yaptıktan sonra fişi kontrol edip doğru para üstü alıp almadığımızı hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `Önce toplam tutar hesaplanır: 3 x 2.50 TL = 7.50 TL. Sonra para üstü bulunur: 10 TL - 7.50 TL = 2.50 TL.`
    }]}]
  },
  "M.3.3.6.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Kilogram ve gram arasındaki ilişkiyi fark eder.",
    templates: [{ id: 'system-default-M.3.3.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.6.1", kazanim_metni: "Kilogram ve gram arasındaki ilişkiyi fark eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `2 kilogram 300 gram, toplam kaç gram eder?`,
        secenekler: { A: '230', B: '302', C: '2300', D: '500' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Toplama yapma"],
        gercek_yasam_baglantisi: "Pazardan aldığımız 1.5 kg elmanın kaç gram olduğunu bilmek, yemek tariflerinde doğru ölçü kullanmamıza yardımcı olur.",
        seviye: 'orta', cozum_anahtari: `1 kilogram 1000 gramdır. 2 kilogram 2000 gram eder. Üzerine 300 gram eklenince toplam 2300 gram olur.`
    }]}]
  },
  "M.3.3.6.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Tartma ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.6.2", kazanim_metni: "Tartma ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Manavdan 2 kg elma, 3 kg portakal ve 500 gram çilek alan bir kişi toplam kaç gram meyve almıştır?`,
        secenekler: { A: '5500', B: '5005', C: '10', D: '550' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Birimleri dikkate almadan toplama"],
        gercek_yasam_baglantisi: "Marketten aldığımız farklı ağırlıktaki ürünlerin poşette toplam ne kadar ağırlık yapacağını hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `Tüm birimleri grama çevirmek gerekir. 2 kg = 2000 g, 3 kg = 3000 g. Toplam: 2000 + 3000 + 500 = 5500 gram.`
    }]}]
  },
  "M.3.3.7.1": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Litre ve yarım litreyi kullanır.",
    templates: [{ id: 'system-default-M.3.3.7.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.7.1", kazanim_metni: "Litre ve yarım litreyi kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `4 litre su, kaç tane yarım litrelik şişeyi tam olarak doldurur?`,
        secenekler: { A: '2', B: '4', C: '6', D: '8' },
        dogru_cevap: 'D',
        yanlis_secenek_tipleri: ["Yarıya bölme", "Aynı sayıyı cevap sanma"],
        gercek_yasam_baglantisi: "Büyük bir şişedeki suyu küçük bardaklara paylaştırırken litre ve yarım litre kavramlarını kullanırız.",
        seviye: 'orta', cozum_anahtari: `1 litrede 2 tane yarım litre vardır. Bu nedenle 4 litrede 4 x 2 = 8 tane yarım litre bulunur.`
    }]}]
  },
  "M.3.3.7.2": {
    gradeName: "3. Sınıf", unitName: "Ölçme", kazanimName: "Sıvı ölçme ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.3.3.7.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.3.3.7.2", kazanim_metni: "Sıvı ölçme ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir inek günde 8 litre süt veriyor. Bu inek bir haftada toplam kaç litre süt verir?`,
        secenekler: { A: '15', B: '40', C: '56', D: '70' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış sayıyla çarpma (örn: 5 gün)"],
        gercek_yasam_baglantisi: "Bir arabanın deposunun ne kadar benzin aldığını ve bir bidonun ne kadar su aldığını hesaplarken sıvı ölçülerini kullanırız.",
        seviye: 'ileri', cozum_anahtari: `Bir hafta 7 gündür. Toplam süt miktarını bulmak için günlük miktar ile gün sayısı çarpılır: 8 x 7 = 56 litre.`
    }]}]
  },
  "M.3.4.1.1": {
    gradeName: "3. Sınıf", unitName: "Veri İşleme", kazanimName: "Nesne ve şekil grafikleri oluşturur ve yorumlar.",
    templates: [{ id: 'system-default-M.3.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 3, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.3.4.1.1", kazanim_metni: "Nesne ve şekil grafikleri oluşturur ve yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sınıftaki öğrencilerin göz renkleri şekil grafiğinde gösterilmiştir.\n\nMavi: 🔵🔵🔵🔵\nYeşil: 🟢🟢\nKahverengi: 🟤🟤🟤🟤🟤\n\n(Her şekil 2 öğrenciyi göstermektedir.)\n\nBu sınıfta toplam kaç öğrenci vardır?`,
        secenekler: { A: '11', B: '22', C: '10', D: '20' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Her şekli 1 sayma", "Sadece bir grubu sayma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir takvimdeki güneşli, bulutlu ve yağmurlu günleri işaretleyerek o ayın hava durumu grafiğini oluşturabiliriz.",
        seviye: 'orta', cozum_anahtari: `Toplam şekil sayısı 4 + 2 + 5 = 11'dir. Her şekil 2 öğrenciyi gösterdiği için toplam öğrenci sayısı 11 x 2 = 22'dir.`
    }]}]
  },
  "M.3.4.1.2": {
    gradeName: "3. Sınıf", unitName: "Veri İşleme", kazanimName: "Sıklık tablosu oluşturur.",
    templates: [{ id: 'system-default-M.3.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const math = 8 + i;
      const turkish = 12 - i;
      const science = 10;
      const mostPopular = Math.max(math, turkish, science);
      let answerText = '';
      if (mostPopular === math) answerText = 'Matematik';
      else if (mostPopular === turkish) answerText = 'Türkçe';
      else answerText = 'Fen Bilimleri';
      
      return {
        sinif: 3, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.3.4.1.2", kazanim_metni: "Sıklık tablosu oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sınıftaki öğrencilerin en sevdiği dersler sıklık tablosunda verilmiştir.\n\n+---------------+----------------+\n| Ders          | Öğrenci Sayısı |\n+---------------+----------------+\n| Matematik     |       ${math}        |\n| Türkçe        |       ${turkish}        |\n| Fen Bilimleri |       ${science}        |\n+---------------+----------------+\n\nTabloya göre en çok sevilen ders hangisidir?`,
        secenekler: { A: 'Matematik', B: 'Türkçe', C: 'Fen Bilimleri', D: 'Müzik' },
        dogru_cevap: Object.keys({ A: 'Matematik', B: 'Türkçe', C: 'Fen Bilimleri', D: 'Müzik' }).find(key => ({ A: 'Matematik', B: 'Türkçe', C: 'Fen Bilimleri', D: 'Müzik' }[key as 'A'|'B'|'C'|'D'] === answerText))!,
        yanlis_secenek_tipleri: ["En az sevilen ders", "Diğer derslerden biri", "Tabloda olmayan bir ders"],
        gercek_yasam_baglantisi: "Bir marketteki ürünlerin satış sayılarını gösteren tablolar, hangi ürünün daha popüler olduğunu anlamamızı sağlar.",
        seviye: 'temel', cozum_anahtari: `Tabloda en büyük sayı ${mostPopular} olup bu sayı ${answerText} dersine aittir. Bu yüzden en çok sevilen ders odur.`
      };
    })}]
  },
};
