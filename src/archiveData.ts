

import { ArchiveQuiz, DetailedQuestion } from './types';

// Helper function to create realistic options for calculation questions
const createNumericOptions = (correctAnswer: number, range = 5, count = 4) => {
  const options: number[] = [correctAnswer];
  // Ensure the range is at least 1 to avoid infinite loops
  const step = Math.max(1, Math.floor(Math.random() * range) + 1);

  // Generate distractors
  while (options.length < count) {
    const randomFactor = Math.random() < 0.5 ? -1 : 1;
    let newOption = correctAnswer + (randomFactor * step * (options.length)); // Vary the distance
    if (newOption < 0) newOption = correctAnswer + options.length; // Avoid negative numbers for simple cases
    
    // Final check for uniqueness and non-negativity
    if (!options.includes(newOption) && newOption >= 0) {
      options.push(newOption);
    } else {
       // If a duplicate is generated, try a slightly different value
       options.push(correctAnswer + options.length + (Math.floor(Math.random() * 3)));
    }
  }

  // Shuffle the options to randomize position of the correct answer
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    A: String(options[0]),
    B: String(options[1]),
    C: String(options[2]),
    D: String(options[3]),
  };
};

const numberToWordsTr = (num: number): string => {
    if (num === 0) return "sıfır";
    
    const birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    const onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];

    const processGroup = (n: number) => {
        if (n === 0) return "";
        const yuzlerBas = Math.floor(n / 100);
        const onlarBas = Math.floor((n % 100) / 10);
        const birlerBas = n % 10;
        let str = "";
        if (yuzlerBas > 0) {
            str += (yuzlerBas === 1 ? "" : birler[yuzlerBas]) + " yüz ";
        }
        if (onlarBas > 0) {
            str += onlar[onlarBas] + " ";
        }
        if (birlerBas > 0) {
            str += birler[birlerBas] + " ";
        }
        return str;
    };

    const milyonlar = Math.floor(num / 1000000);
    const binler = Math.floor((num % 1000000) / 1000);
    const birlerGrubu = num % 1000;

    let result = "";
    if (milyonlar > 0) {
        result += processGroup(milyonlar) + "milyon ";
    }
    if (binler > 0) {
        if (binler === 1) result += "bin ";
        else result += processGroup(binler) + "bin ";
    }
    if (birlerGrubu > 0) {
        result += processGroup(birlerGrubu);
    }

    return result.trim();
};


export const ARCHIVE_DATA: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 1. SINIF
  // =================================================================
  "M.1.1.1.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
    templates: [{ id: 'system-default-M.1.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const count = 5 + (i % 15);
        const options = createNumericOptions(count);
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === String(count))!;
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.1", kazanim_metni: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir tabakta ${count} tane çilek vardır. Bu sayıyı gösteren rakam hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Bir eksik sayma", "Bir fazla sayma", "Yakın bir sayı"],
            gercek_yasam_baglantisi: "Alışverişte para sayarken veya oyuncaklarımızı sayarken nesneleri doğru saymak önemlidir.",
            seviye: 'temel', cozum_anahtari: `Tabaktaki ${count} çilek, ${count} rakamı ile gösterilir.`
        }
    })}]
  },
  "M.1.1.1.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20’ye kadar olan sayıları ileriye ve geriye doğru birer birer ritmik sayar.",
    templates: [{ id: 'system-default-M.1.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const start = 8 + (i % 10);
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.2", kazanim_metni: "20’ye kadar olan sayıları ileriye ve geriye doğru birer birer ritmik sayar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${start}, ${start + 1}, ___, ${start + 3} ritmik saymasında boş bırakılan yere hangi sayı gelmelidir?`,
            secenekler: { A: `${start}`, B: `${start + 2}`, C: `${start + 4}`, D: `${start + 1}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Önceki sayı", "Sonraki sayı", "Tekrarlanan sayı"],
            gercek_yasam_baglantisi: "Sıraya girerken veya bir oyunda sıra sayarken ritmik sayma becerisini kullanırız.",
            seviye: 'temel', cozum_anahtari: `${start + 1}'den sonra birer ritmik sayarken ${start + 2} gelir.`
        }
    })}]
  },
  "M.1.1.1.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Rakamları okur ve yazar.",
    templates: [{ id: 'system-default-M.1.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 10 + (i % 10);
        const words = ["on", "on bir", "on iki", "on üç", "on dört", "on beş", "on altı", "on yedi", "on sekiz", "on dokuz"];
        const options = createNumericOptions(num);
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === String(num)) || 'A';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.3", kazanim_metni: "Rakamları okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Yazıyla "${words[num - 10]}" olarak okunan sayı hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Benzer okunuşlu sayı", "Rakamların yerini karıştırma"],
            gercek_yasam_baglantisi: "Kitaplardaki sayfa numaralarını veya otobüs numaralarını okumak için rakamları tanımamız gerekir.",
            seviye: 'temel', cozum_anahtari: `"${words[num - 10]}" sayısının rakamla yazılışı ${num}'dur.`
        }
    })}]
  },
   "M.1.1.1.4": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20 içinde iki sayıyı karşılaştırır ve aralarındaki ilişkiyi “büyük”, “küçük”, “eşit” ifadeleriyle belirtir.",
    templates: [{ id: 'system-default-M.1.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 5 + (i % 15);
        let num2 = 5 + ((i + 5) % 15);
        if (num1 === num2) num2 = (num2 + 1) % 20;
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.4", kazanim_metni: "20 içinde iki sayıyı karşılaştırır ve aralarındaki ilişkiyi “büyük”, “küçük”, “eşit” ifadeleriyle belirtir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Ali'nin ${num1} bilyesi, Veli'nin ${num2} bilyesi var. Ali'nin bilye sayısı Veli'nin bilye sayısından ..... . Cümlesindeki boşluğa ne gelmelidir?`,
            secenekler: { A: "daha fazladır", B: "daha azdır", C: "eşittir", D: "yakındır" },
            dogru_cevap: num1 > num2 ? 'A' : (num1 < num2 ? 'B' : 'C'),
            yanlis_secenek_tipleri: ["Tersi ilişki", "Eşitlik varsayımı", "İlgisiz kavram"],
            gercek_yasam_baglantisi: "İki arkadaşın bilye sayılarını karşılaştırarak kimin daha fazla olduğunu bulabiliriz.",
            seviye: 'orta', cozum_anahtari: `Sayı doğrusunda ${num1}, ${num2}'den ${num1 > num2 ? 'sonra' : 'önce'} geldiği için daha ${num1 > num2 ? 'büyüktür' : 'küçüktür'}.`
        }
    })}]
  },
  "M.1.1.1.5": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sıra bildiren sayıları sözlü olarak ifade eder.",
    templates: [{ id: 'system-default-M.1.1.1.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const rank = 5 + (i % 10);
        const ranks = ["birinci", "ikinci", "üçüncü", "dördüncü", "beşinci", "altıncı", "yedinci", "sekizinci", "dokuzuncu", "onuncu", "on birinci", "on ikinci", "on üçüncü", "on dördüncü", "on beşinci"];
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.5", kazanim_metni: "Sıra bildiren sayıları sözlü olarak ifade eder.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir yarışta Ali ${rank}. olmuştur. Ondan hemen sonra gelen Ayşe kaçıncı olmuştur?`,
            secenekler: { A: ranks[rank-2], B: ranks[rank], C: ranks[rank+1], D: ranks[rank-1] },
            dogru_cevap: "B",
            yanlis_secenek_tipleri: ["Önceki sıra", "İki sonraki sıra", "Aynı sıra"],
            gercek_yasam_baglantisi: "Apartmanda oturduğumuz katı veya bir sırada beklerken yerimizi belirtmek için sıra sayılarını kullanırız.",
            seviye: 'temel', cozum_anahtari: `${ranks[rank-1]} sıradan sonra ${ranks[rank]} sıra gelir.`
        }
    })}]
  },
  "M.1.1.2.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminin anlamını kavrar.",
    templates: [{ id: 'system-default-M.1.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.1", kazanim_metni: "Toplama işleminin anlamını kavrar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${5+(i%5)} elmaya ${3+(i%3)} elma daha eklersek, bu durumu hangi işlemle ifade ederiz?`,
        secenekler: { A: "Çıkarma", B: "Toplama", C: "Çarpma", D: "Bölme" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Ters işlem", "İleri düzey işlem"],
        gercek_yasam_baglantisi: "Toplama, iki veya daha fazla grup nesneyi bir araya getirdiğimizde toplam miktarı bulmamızı sağlar.",
        seviye: 'temel', cozum_anahtari: "Ekleme, artırma gibi durumlar toplama işlemi ile ifade edilir."
    }))}]
  },
    "M.1.1.2.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
    templates: [{ id: 'system-default-M.1.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 7 + (i % 5);
        const num2 = 8 + (i % 4);
        const answer = Math.min(20, num1 + num2);
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'B';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.2", kazanim_metni: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ${num2} işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeyi unutma", "Yanlış sayma", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Kumbaramıza para eklediğimizde toplam ne kadar paramız olduğunu toplama ile buluruz.",
            seviye: 'orta', cozum_anahtari: `${num1} ile ${num2}'i topladığımızda sonuç ${answer} olur.`
        }
    })}]
  },
    "M.1.1.2.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminde verilmeyen toplananı bulur.",
    templates: [{ id: 'system-default-M.1.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const total = 12 + (i % 8);
        const num1 = 5 + (i % 5);
        const answer = total - num1;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'C';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.3", kazanim_metni: "Toplama işleminde verilmeyen toplananı bulur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ? = ${total} işleminde '?' yerine hangi sayı gelmelidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Verilen sayıyı tekrar etme", "Toplamı cevap olarak verme", "Toplama yapma"],
            gercek_yasam_baglantisi: "Bir hedef için ne kadar daha para biriktirmemiz gerektiğini hesaplarken bu beceriyi kullanırız.",
            seviye: 'orta', cozum_anahtari: `Toplamdan (${total}) verilen toplananı (${num1}) çıkararak verilmeyen toplananı (${answer}) buluruz.`
        }
    })}]
  },
  "M.1.1.2.4": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.1.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 10;
        const num2 = 3 + (i % 7);
        const answer = num1 + num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.4", kazanim_metni: "Zihinden toplama işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} sayısına ${num2} eklersek sonuç kaç olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yanlış onluk sayma", "Çıkarma yapma", "Yakın sayı"],
            gercek_yasam_baglantisi: "Alışverişte hızlıca para üstü hesaplarken veya oyunlarda puanları toplarken zihinden işlem yaparız.",
            seviye: 'orta', cozum_anahtari: `10'un üzerine ${num2} saymak en kolay yoldur. Sonuç ${answer}.`
        }
    })}]
  },
  "M.1.1.3.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işleminin anlamını kavrar.",
    templates: [{ id: 'system-default-M.1.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.3.1", kazanim_metni: "Çıkarma işleminin anlamını kavrar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${10+(i%5)} tane cevizimin ${3+(i%3)} tanesini yedim. Kalan cevizlerimi bulmak için hangi işlemi yapmalıyım?`,
        secenekler: { A: "Toplama", B: "Çıkarma", C: "Sayma", D: "Karşılaştırma" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Ters işlem", "İşlem olmayan seçenekler"],
        gercek_yasam_baglantisi: "Harcadığımız paradan sonra ne kadar paramız kaldığını bulmak için çıkarma işlemi yaparız.",
        seviye: 'temel', cozum_anahtari: "Azalma, eksilme gibi durumlar çıkarma işlemi ile ifade edilir."
    }))}]
  },
  "M.1.1.3.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20’ye kadar (20 dâhil) olan doğal sayılarla çıkarma işlemini yapar.",
    templates: [{ id: 'system-default-M.1.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 15 + (i % 5);
        const num2 = 4 + (i % 5);
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'D';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.3.2", kazanim_metni: "20’ye kadar (20 dâhil) olan doğal sayılarla çıkarma işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ${num2} işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Geriye yanlış sayma", "Toplama yapma", "Yakın sayı"],
            gercek_yasam_baglantisi: "Elimizdeki bilyelerden birkaçını arkadaşımıza verince kalan bilye sayısını çıkarma ile buluruz.",
            seviye: 'orta', cozum_anahtari: `${num1}'den ${num2} geri saydığımızda sonuç ${answer} olur.`
        }
    })}]
  },
  "M.1.1.3.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işleminde verilmeyen terimleri bulur.",
    templates: [{ id: 'system-default-M.1.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 18 - (i % 8);
        const answer = 5 + (i % 5);
        const result = num1 - answer;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'B';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.3.3", kazanim_metni: "Çıkarma işleminde verilmeyen terimleri bulur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ? = ${result} işleminde '?' yerine hangi sayı gelmelidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Başlangıç sayısını verme", "Sonucu verme", "Toplama yapma"],
            gercek_yasam_baglantisi: "Ne kadar para harcadığımızı bulmak için, başlangıçtaki paramızdan kalan paramızı çıkarırız.",
            seviye: 'ileri', cozum_anahtari: `Eksilenden (${num1}) farkı (${result}) çıkararak çıkanı (${answer}) bulabiliriz.`
        }
    })}]
  },
  "M.1.2.1.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Uzamsal ilişkileri ifade eder.",
    templates: [{ id: 'system-default-M.1.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.1.1", kazanim_metni: "Uzamsal ilişkileri ifade eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kitap, kalemin solundadır. Buna göre kalem, kitabın neresindedir?`,
        secenekler: { A: "altında", B: "üstünde", C: "sağında", D: "solunda" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["İlgisiz konum", "Zıt konum", "Aynı konumu tekrar etme"],
        gercek_yasam_baglantisi: "Bir adres tarif ederken 'marketin sağındaki sokak' gibi ifadelerle yönümüzü buluruz.",
        seviye: 'temel', cozum_anahtari: "Eğer kitap kalemin solunda ise, kalem de kitabın sağında yer alır."
    }))}]
  },
  "M.1.2.2.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Geometrik cisimleri tanır ve isimlendirir.",
    templates: [{ id: 'system-default-M.1.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.2.1", kazanim_metni: "Geometrik cisimleri tanır ve isimlendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir futbol topu hangi geometrik cisme benzer?`,
        secenekler: { A: "Küp", B: "Küre", C: "Silindir", D: "Koni" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Köşeli cisimler", "Farklı yuvarlak cisimler"],
        gercek_yasam_baglantisi: "Çevremizdeki nesneleri (kutu, top, konserve kutusu) geometrik cisimlere benzeterek tanıyabiliriz.",
        seviye: 'temel', cozum_anahtari: "Futbol topu yuvarlak olduğu için küreye benzer."
    }))}]
  },
  "M.1.2.2.2": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri tanır ve isimlendirir.",
    templates: [{ id: 'system-default-M.1.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.2.2", kazanim_metni: "Geometrik şekilleri tanır ve isimlendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 kenarı ve 3 köşesi olan geometrik şekil hangisidir?`,
        secenekler: { A: "Kare", B: "Dikdörtgen", C: "Daire", D: "Üçgen" },
        dogru_cevap: "D",
        yanlis_secenek_tipleri: ["4 kenarlı şekiller", "Kenarı olmayan şekil"],
        gercek_yasam_baglantisi: "Trafik işaretleri veya evlerin çatıları gibi nesnelerin şekillerini tanımak önemlidir.",
        seviye: 'temel', cozum_anahtari: "Üçgenin 3 kenarı ve 3 köşesi vardır."
    }))}]
  },
  "M.1.2.3.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
    templates: [{ id: 'system-default-M.1.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.3.1", kazanim_metni: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kırmızı boncuk, Mavi boncuk, Kırmızı boncuk, Mavi boncuk, ? ...  Örüntüsünde sıradaki boncuk ne renk olmalıdır?`,
        secenekler: { A: "Sarı", B: "Kırmızı", C: "Mavi", D: "Yeşil" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Örüntüde olmayan renk", "Önceki renk"],
        gercek_yasam_baglantisi: "Müzikteki ritimler, kazağımızdaki desenler veya çitlerin dizilişi birer örüntüdür.",
        seviye: 'orta', cozum_anahtari: "Örüntü 'Kırmızı, Mavi' şeklinde tekrar etmektedir. Mavi'den sonra Kırmızı gelmelidir."
    }))}]
  },
  "M.1.3.1.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Uzunlukları standart olmayan birimlerle ölçer.",
    templates: [{ id: 'system-default-M.1.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.1.1", kazanim_metni: "Uzunlukları standart olmayan birimlerle ölçer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kitabımızın boyunu ölçmek için hangisini kullanmak en mantıklıdır?`,
        secenekler: { A: "Adım", B: "Kulaç", C: "Karış", D: "Kepçe" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["Çok büyük birimler", "İlgisiz nesne"],
        gercek_yasam_baglantisi: "Elimizdeki bir iple bir masanın kenarını ölçerek, ipi başka yere taşıyıp karşılaştırma yapabiliriz.",
        seviye: 'temel', cozum_anahtari: "Kitap gibi küçük nesneleri ölçmek için karış uygun bir standart olmayan ölçü birimidir."
    }))}]
  },
  "M.1.3.1.2": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Nesneleri uzunlukları yönünden karşılaştırır ve sıralar.",
    templates: [{ id: 'system-default-M.1.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.1.2", kazanim_metni: "Nesneleri uzunlukları yönünden karşılaştırır ve sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kalem, bir silgi ve bir cetvel arasında en uzun olan genellikle hangisidir?`,
        secenekler: { A: "Silgi", B: "Kalem", C: "Cetvel", D: "Hepsi eşit" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["En kısa olan", "Ortada olan", "Yanlış varsayım"],
        gercek_yasam_baglantisi: "Boy sırasına girerken veya farklı uzunluktaki ipleri sıralarken bu beceriyi kullanırız.",
        seviye: 'temel', cozum_anahtari: "Genellikle bir cetvel, bir kalemden ve silgiden daha uzundur."
    }))}]
  },
  "M.1.3.2.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Paralarımızı tanır.",
    templates: [{ id: 'system-default-M.1.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.2.1", kazanim_metni: "Paralarımızı tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi en değerli madeni paramızdır?`,
        secenekler: { A: "10 Kuruş", B: "25 Kuruş", C: "50 Kuruş", D: "1 Lira" },
        dogru_cevap: "D",
        yanlis_secenek_tipleri: ["Daha küçük değerli paralar"],
        gercek_yasam_baglantisi: "Markete gittiğimizde ürün almak için paraları tanımamız ve doğru miktarı vermemiz gerekir.",
        seviye: 'temel', cozum_anahtari: "1 Lira, kuruşlardan daha değerlidir. 1 Lira, 100 kuruşa eşittir."
    }))}]
  },
  "M.1.3.3.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçme birimlerini tanır.",
    templates: [{ id: 'system-default-M.1.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.3.1", kazanim_metni: "Zaman ölçme birimlerini tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okula gittiğimiz zaman dilimi genellikle hangisidir?`,
        secenekler: { A: "Gece", B: "Sabah", C: "Akşam", D: "Öğlen" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Okul dışı zaman dilimleri"],
        gercek_yasam_baglantisi: "Günlük planlarımızı 'sabah kahvaltı, öğlen okul, akşam uyku' gibi zaman birimlerine göre yaparız.",
        seviye: 'temel', cozum_anahtari: "Okul günü genellikle sabah saatlerinde başlar."
    }))}]
  },
  "M.1.3.3.2": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Tam saatleri okur.",
    templates: [{ id: 'system-default-M.1.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const hour = 1 + (i % 11);
      return {
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.3.2", kazanim_metni: "Tam saatleri okur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Akrep ${hour} sayısını, yelkovan ise 12'yi gösteriyorsa saat kaçtır?`,
        secenekler: { A: `Saat ${hour === 1 ? 12 : hour - 1}`, B: `Saat ${hour}`, C: `Saat ${hour === 12 ? 1 : hour + 1}`, D: "Saat 12" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Bir saat önce", "Bir saat sonra", "Yelkovanın gösterdiği sayı"],
        gercek_yasam_baglantisi: "Ders zilinin ne zaman çalacağını veya sevdiğimiz çizgi filmin ne zaman başlayacağını bilmek için saati okuruz.",
        seviye: 'temel', cozum_anahtari: `Yelkovan 12'nin üzerindeyken, akrebin gösterdiği sayı tam saati belirtir. Bu durumda saat ${hour}'dir.`
      }
    })}]
  },
  "M.1.4.1.1": {
      gradeName: "1. Sınıf", unitName: "Veri İşleme", kazanimName: "En çok iki veri grubuna ait basit tabloları okur.",
      templates: [{ id: 'system-default-M.1.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({length: 20}, (_, i) => {
        const inek = 5+i % 5;
        const tavuk = 8+i % 5;
        const options = createNumericOptions(tavuk);
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === String(tavuk))!;
        return {
          sinif: 1, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.1.4.1.1", kazanim_metni: "En çok iki veri grubuna ait basit tabloları okur.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Bir çiftlikteki hayvanların sayısı tabloda gösterilmiştir.\n\n+----------+--------+\n| Hayvan   | Sayısı |\n+----------+--------+\n| İnek     |    ${inek}    |\n| Tavuk    |    ${tavuk}    |\n+----------+--------+\n\nTabloya göre çiftlikte kaç tane tavuk vardır?`,
          secenekler: options,
          dogru_cevap: correctAnswerKey,
          yanlis_secenek_tipleri: ["Diğer hayvanın sayısı", "Yakın sayı", "Yanlış satırı okuma"],
          gercek_yasam_baglantisi: "Sınıf listesi veya ders programı gibi tabloları okuyarak bilgileri kolayca bulabiliriz.",
          seviye: 'temel', cozum_anahtari: `Tabloda 'Tavuk' satırının karşısında ${tavuk} yazdığı için doğru cevap budur.`
      }
    })}]
  },

  // =================================================================
  // 2. SINIF
  // =================================================================
   "M.2.1.1.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
    templates: [{ id: 'system-default-M.2.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const start = 20+(i*5 % 30);
        const answer = start + 30; // 4. sayı
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.1", kazanim_metni: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${start}'den başlayarak ileriye doğru onar ritmik sayarken dördüncü söylenen sayı hangisidir?`,
            secenekler: { A: `${start-10}`, B: `${start}`, C: `${start+10}`, D: `${start-20}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Üçüncü sayı", "Beşinci sayı", "İkinci sayı"],
            gercek_yasam_baglantisi: "Para sayarken (10'ar TL) veya saatleri söylerken (5'er dakika) ritmik sayma kullanırız.",
            seviye: 'temel', cozum_anahtari: `${start}'den başlayarak onar sayma: ${start+10} (2.), ${start+20} (3.), ${start+30} (4.). Doğru cevap ${answer}'dir.`
        }
    })}]
  },
  "M.2.1.1.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıların basamaklarını adlandırır, basamaklarındaki rakamların basamak değerlerini belirtir.",
    templates: [{ id: 'system-default-M.2.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: (Array.from({ length: 20 }, (_, i) => {
        const tensDigit = 2 + (i % 8);
        const onesDigit = 1 + (i % 9);
        if (tensDigit === onesDigit) return null; // basit tekrarı önle
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
        if(new Set(nums).size < 3) return null; // ensure unique
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
        const num = 16 + i * 3;
        if (num % 10 === 5) return null; // Avoid ambiguous cases for simplicity in templates
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
    templates: [{ id: 'system-default-M.2.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.3.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
            seviye: 'temel', cozum_anahtari: "Eşit olarak paylaştırma veya gruplama durumları bölme işlemi ile ifade edilir."
        }
    })}]
  },
   "M.2.1.5.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const questionType = i % 3;
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
    templates: [{ id: 'system-default-M.2.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const item = i % 2 === 0 ? 'sıramızın boyu' : 'sınıfın kapısının eni';
      const unit = i % 2 === 0 ? 'santimetre' : 'metre';
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
    templates: [{ id: 'system-default-M.2.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const price = 3 + i;
      const paid = 10;
      const change = paid - price;
      const options = createNumericOptions(change, 2);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(change))!;
      return {
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.3.1", kazanim_metni: "Paralarımızla ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Tanesi ${price} TL olan bir çikolatadan bir tane alan Ali, satıcıya 10 TL verirse kaç TL para üstü alır?`,
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
    templates: [{ id: 'system-default-M.2.3.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.2.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const red = 5 + i;
      const blue = 3 + i;
      const answer = red;
      const options = createNumericOptions(answer, 3);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 2, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.2.4.1.1", kazanim_metni: "Veri toplar ve çetele tablosu oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kutudaki bilyelerin renklerine göre çetele tablosu aşağıdadır.\n\nKırmızı: |||||${'||'.slice(0, red-5)}\nMavi: |||${'|'.slice(0, blue-3)}\n\nBu kutuda kaç tane kırmızı bilye vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer rengin sayısı", "Yanlış sayma"],
        gercek_yasam_baglantisi: "Sınıf başkanlığı seçiminde adayların aldığı oyları saymak için çetele tablosu kullanabiliriz.",
        seviye: 'temel', cozum_anahtari: `Çetele tablosunda her dört çizgiden sonra beşinci çizgi üzerlerine yan çizilir. Kırmızı bilye sayısı ${answer}'dir.`
      };
    })}]
  },
  "M.2.4.1.2": {
    gradeName: "2. Sınıf", unitName: "Veri İşleme", kazanimName: "Nesne ve şekil grafiği oluşturur.",
    templates: [{ id: 'system-default-M.2.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const elma = 3 + i;
      const cilek = 5 + i;
      const answer = cilek;
      const options = createNumericOptions(answer, 3);
      const correctAnswerKey = Object.keys(options).find(k => options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 2, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.2.4.1.2", kazanim_metni: "Nesne ve şekil grafiği oluşturur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir grup öğrencinin en sevdiği meyveler nesne grafiği ile gösterilmiştir.\n\nElma  : ${'🍎'.repeat(elma)}\nÇilek : ${'🍓'.repeat(cilek)}\n(Her nesne 1 öğrenciyi göstermektedir.)\n\nGrafiğe göre çileği seven kaç öğrenci vardır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Diğer meyveyi sevenlerin sayısı", "Yanlış sayma"],
        gercek_yasam_baglantisi: "Hava durumu takviminde güneşli ve yağmurlu günleri saymak için nesne grafiği kullanabiliriz.",
        seviye: 'orta', cozum_anahtari: `Grafikte çilek sırasında ${cilek} tane çilek nesnesi bulunmaktadır. Bu, ${cilek} öğrenci demektir.`
      };
    })}]
  },
  
  // =================================================================
  // 3. SINIF
  // =================================================================
  "M.3.1.1.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.3.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 123 + i * 25;
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
        const nums = [456 - i*10, 654 + i*10, 546];
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
    })}]
  },
   "M.3.1.1.4": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "1000’e kadar olan doğal sayıları en yakın onluğa ve yüzlüğe yuvarlar.",
    templates: [{ id: 'system-default-M.3.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const num = 458 + i * 5;
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
        yanlis_secenek_tipleri: ["Sadece iki kenarı toplama", "Tek kenar uzunluğunu cevap sanma", "Çarpma yerine toplama"],
        gercek_yasam_baglantisi: "Bir bahçenin etrafına tel çekmek için ne kadar tel gerektiğini hesaplarken çevre uzunluğunu kullanırız.",
        seviye: 'orta', cozum_anahtari: `Karenin dört kenarı da eşit olduğu için çevre uzunluğu, bir kenar uzunluğunun 4 ile çarpılmasıyla bulunur: ${side} x 4 = ${answer} cm.`
      };
    })}]
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

  // =================================================================
  // 4. SINIF
  // =================================================================
   "M.4.1.1.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.4.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const num = 12345 + i * 1111;
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
  "M.4.1.1.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
    templates: [{ id: 'system-default-M.4.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.2.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.3.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.4.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.4.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.5.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler.",
    templates: [{ id: 'system-default-M.4.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.6.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Basit, bileşik ve tam sayılı kesirleri tanır ve modellerle gösterir.",
    templates: [{ id: 'system-default-M.4.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.1.7.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.7.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
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
  "M.4.3.2.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Kare ve dikdörtgenin çevre uzunlukları ile kenar uzunlukları arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.4.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const short = 10 + i;
        const long = 20 + i;
        const answer = 2 * (short + long);
        const options = createNumericOptions(answer, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.2.1", kazanim_metni: "Kare ve dikdörtgenin çevre uzunlukları ile kenar uzunlukları arasındaki ilişkiyi açıklar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Kısa kenarı ${short} cm, uzun kenarı ${long} cm olan bir dikdörtgenin çevre uzunluğu kaç cm'dir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece iki kenarı toplama", "Kenarları çarpma", "Yanlış formül kullanma"],
            gercek_yasam_baglantisi: "Odamızın veya bir fotoğraf çerçevesinin etrafının uzunluğunu hesaplamak için çevre formülünü kullanırız.",
            seviye: 'orta', cozum_anahtari: `Dikdörtgenin çevresi, kısa kenar ile uzun kenarın toplamının 2 ile çarpılmasıyla bulunur: 2 x (${short} + ${long}) = ${answer} cm.`
        };
    })}]
  },
  "M.4.3.3.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenin alanını hesaplar.",
    templates: [{ id: 'system-default-M.4.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const short = 8 + i;
        const long = 15 + i;
        const answer = short * long;
        const options = createNumericOptions(answer, 30);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.3.1", kazanim_metni: "Dikdörtgenin alanını hesaplar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Kısa kenarı ${short} cm, uzun kenarı ${long} cm olan bir dikdörtgen şeklindeki bir bahçenin alanı kaç santimetrekaredir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Çevre hesaplama", "Kenarları toplama", "Yanlış çarpma"],
            gercek_yasam_baglantisi: "Bir duvarı boyamak için ne kadar boya gerektiğini veya bir odaya ne kadar halı döşeneceğini alan hesaplayarak buluruz.",
            seviye: 'orta', cozum_anahtari: `Dikdörtgenin alanı, kısa kenar ile uzun kenarın çarpılmasıyla bulunur: ${short} x ${long} = ${answer} cm².`
        };
    })}]
  },
  "M.4.4.1.1": {
    gradeName: "4. Sınıf", unitName: "Veri İşleme", kazanimName: "Sütun grafiği oluşturur ve yorumlar.",
    templates: [{ id: 'system-default-M.4.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const pazartesi = 20 + i;
        const sali = 35 - i;
        const carsamba = 25;
        const answer = pazartesi + sali + carsamba;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.4.4.1.1", kazanim_metni: "Sütun grafiği oluşturur ve yorumlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir kitapçının üç günlük kitap satış sayıları sütun grafiğinde gösterilmiştir.\n\nPazartesi: ████ (${pazartesi})\nSalı      : ███████ (${sali})\nÇarşamba  : █████ (${carsamba})\n\nBu kitapçı üç günde toplam kaç kitap satmıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece en yüksek sütunu okuma", "Sadece iki günü toplama", "Yanlış toplama"],
            gercek_yasam_baglantisi: "Gazetelerdeki veya haberlerdeki seçim sonuçları, ekonomik veriler gibi bilgiler genellikle sütun grafikleriyle gösterilir.",
            seviye: 'orta', cozum_anahtari: `Toplam kitap sayısını bulmak için üç günün satış sayıları toplanır: ${pazartesi} + ${sali} + ${carsamba} = ${answer}.`
        };
    })}]
  },
  // =================================================================
  // 5. SINIF
  // =================================================================
  "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const num = 1234567 + i * 10101;
      const words = numberToWordsTr(num);
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "${words}" olan sayı aşağıdakilerden hangisidir?`,
        secenekler: { A: `${num}`, B: `${num - 1000}`, C: `${num + 1000}`, D: `1${(num%1000000)}` },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Yakın sayılar", "Milyonlar basamağını yanlış okuma"],
        gercek_yasam_baglantisi: "Ülkelerin nüfusları veya büyük şirketlerin gelirleri gibi çok büyük sayıları ifade etmek için milyonlu sayılar kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sayılar bölüklerine ayrılarak okunur. Milyonlar, binler ve birler bölüğü olarak. Doğru yazılış ${num}'dur.`
      };
    })}]
  },
  "M.5.1.2.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir doğal sayının karesini ve küpünü hesaplar.",
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const isSquare = i % 2 === 0;
      const base = isSquare ? (5 + i) : (3 + (i % 5));
      const answer = isSquare ? base * base : base * base * base;
      const options = createNumericOptions(answer, base*2, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki işlemlerden hangisinin sonucu ${base} sayısının ${isSquare ? 'karesine' : 'küpüne'} eşittir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Sayıyı 2 veya 3 ile çarpma", "Kare yerine küp hesaplama", "Küp yerine kare hesaplama"],
        gercek_yasam_baglantisi: "Alan hesaplamalarında (kare) ve hacim hesaplamalarında (küp) bir sayının kendisiyle tekrar tekrar çarpımını kullanırız.",
        seviye: 'orta', cozum_anahtari: `Bir sayının karesi kendisiyle iki kez, küpü ise üç kez çarpılmasıyla bulunur. ${base} sayısının ${isSquare ? 'karesi' : 'küpü'} ${answer}'dir.`
      };
    })}]
  },
  "M.5.1.2.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Parantezli işlemleri yapar.",
    templates: [{ id: 'system-default-M.5.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const a = 12 + i;
      const b = 5 + (i%4);
      const c = 3 + (i%3);
      const answer = a * (b + c);
      const wrongAnswer = a * b + c; // Common mistake
      const options = createNumericOptions(answer, 10, 4);
      if(!Object.values(options).includes(String(wrongAnswer))) {
          options.C = String(wrongAnswer);
      }
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.4", kazanim_metni: "Parantezli işlemleri yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${a} x (${b} + ${c}) işleminin sonucu kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["İşlem önceliğine uymama", "Yanlış toplama", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Birden fazla adımdan oluşan hesaplamalarda (örneğin, birden fazla ürünün toplam fiyatına KDV eklemek) hangi işlemin önce yapılacağını belirlemek için parantezler kullanılır.",
        seviye: 'orta', cozum_anahtari: `İşlem önceliğine göre önce parantez içindeki işlem yapılır (${b} + ${c} = ${b+c}). Sonra çarpma yapılır: ${a} x ${b+c} = ${answer}.`
      };
    })}]
  },
  "M.5.1.3.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
    templates: [{ id: 'system-default-M.5.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const isTamToBilesik = i % 2 === 0;
      const tam = 2 + (i%5);
      const pay = 3 + (i%4);
      const payda = pay + 1 + (i%2);
      const bilesikPay = tam * payda + pay;
      
      // FIX: Explicitly typed variables to prevent TypeScript from inferring an incorrect type for `options`.
      // The `options` variable was being inferred as `{}`, which is not assignable to `secenekler`.
      let questionText: string;
      let options: { A: string; B: string; C: string; D: string; };
      let correctAnswerKey: string;

      if(isTamToBilesik){
        questionText = `${tam} tam ${pay}/${payda} kesrinin bileşik kesir olarak yazılışı hangisidir?`;
        options = {A: `${bilesikPay}/${payda}`, B: `${tam*pay + payda}/${pay}`, C: `${bilesikPay}/${tam}`, D: `${tam+pay}/${payda}`};
        correctAnswerKey = 'A';
      } else {
        questionText = `${bilesikPay}/${payda} kesrinin tam sayılı kesir olarak yazılışı hangisidir?`;
        options = {A: `${tam} tam ${pay}/${payda}`, B: `${pay} tam ${tam}/${payda}`, C: `${tam-1} tam ${pay+payda}/${payda}`, D: `${tam} tam ${pay-1}/${payda}`};
        correctAnswerKey = 'A';
      }

      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.2", kazanim_metni: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: questionText,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Dönüşüm kuralını yanlış uygulama", "Pay ve paydayı karıştırma"],
        gercek_yasam_baglantisi: "Yemek tariflerinde 2.5 bardak un yerine 5/2 bardak un demek gibi farklı gösterimleri anlamak, ölçüleri doğru kullanmamızı sağlar.",
        seviye: 'orta', cozum_anahtari: `Tam sayılı kesri bileşik kesre çevirirken tam kısım ile payda çarpılır ve pay eklenir. Bileşik kesri tam sayılı kesre çevirirken pay paydaya bölünür.`
      };
    })}]
  },
   "M.5.1.5.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.5.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const num1 = 12.45 + i * 0.5;
      const num2 = 3.8 + i * 0.2;
      const answer = (num1 + num2).toFixed(2);
      const options = {A: answer, B: (num1+num2+0.1).toFixed(2), C: (num1-num2).toFixed(2), D: String(1245+38)};
      const correctAnswerKey = 'A';
      
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.4", kazanim_metni: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir manavda ${num1} kg elma ve ${num2} kg portakal satılmıştır. Toplam kaç kg meyve satılmıştır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Virgülleri hizalamama hatası", "Çıkarma yapma", "Virgülü yok sayma"],
        gercek_yasam_baglantisi: "Market alışverişi fişindeki küsuratlı fiyatları toplayarak toplam ne kadar ödeyeceğimizi hesaplarız.",
        seviye: 'orta', cozum_anahtari: `Ondalık gösterimlerle toplama yaparken virgüller alt alta gelecek şekilde yazılır ve normal toplama işlemi yapılır. ${num1} + ${num2} = ${answer}.`
      };
    })}]
  },
  "M.5.1.6.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    templates: [{ id: 'system-default-M.5.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const total = 200 + i * 20;
      const percentage = 10 + (i % 5) * 5; // 10, 15, 20, 25, 30
      const answer = total * (percentage / 100);
      const options = createNumericOptions(answer, 20, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.2", kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${total} sayısının %${percentage}'i kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Yüzdeyi yanlış hesaplama", "Sayıya yüzdeyi ekleme"],
        gercek_yasam_baglantisi: "Mağazalardaki indirimleri hesaplarken bir ürünün fiyatının belirtilen yüzdesi kadar ne kadar indirim yapılacağını buluruz.",
        seviye: 'orta', cozum_anahtari: `Bir sayının yüzdesini bulmak için sayı yüzde ile çarpılır ve 100'e bölünür. (${total} x ${percentage}) / 100 = ${answer}.`
      };
    })}]
  },
  "M.5.2.2.2": {
    gradeName: "5. Sınıf", unitName: "Geometri", kazanimName: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
    templates: [{ id: 'system-default-M.5.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const angle1 = 60 + i;
      const angle2 = 50 + i;
      const answer = 180 - angle1 - angle2;
      const options = createNumericOptions(answer, 10, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.5.2.2.2", kazanim_metni: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir üçgenin iç açılarından ikisi ${angle1} derece ve ${angle2} derece ise üçüncü açı kaç derecedir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["İç açılar toplamını yanlış bilme (100 veya 360 alma)", "Toplama hatası", "Çıkarma hatası"],
        gercek_yasam_baglantisi: "Mimarlar ve mühendisler, binaların ve köprülerin sağlam olması için açıları doğru hesaplamak zorundadır.",
        seviye: 'orta', cozum_anahtari: `Bir üçgenin iç açıları toplamı 180 derecedir. Verilen iki açıyı toplayıp 180'den çıkararak verilmeyen açı bulunur: 180 - (${angle1} + ${angle2}) = ${answer}.`
      };
    })}]
  },
  "M.5.3.2.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Üçgenin alanını hesaplar.",
    templates: [{ id: 'system-default-M.5.3.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const base = 10 + i * 2;
      const height = 8 + i;
      const answer = (base * height) / 2;
      const wrongAnswer = base * height; // Common mistake
      const options = createNumericOptions(answer, 10, 4);
      if(!Object.values(options).includes(String(wrongAnswer))) {
          options.C = String(wrongAnswer);
      }
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.2.2", kazanim_metni: "Üçgenin alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Taban uzunluğu ${base} cm ve bu tabana ait yüksekliği ${height} cm olan bir üçgenin alanı kaç santimetrekaredir?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["İkiye bölmeyi unutma", "Taban ile yüksekliği toplama", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir yelkenlinin yelkeninin ne kadar kumaştan yapıldığını veya bir çatının ne kadar kiremitle kaplanacağını hesaplamak için üçgenin alanı kullanılır.",
        seviye: 'orta', cozum_anahtari: `Üçgenin alanı, taban uzunluğu ile o tabana ait yüksekliğin çarpımının yarısına eşittir: (${base} x ${height}) / 2 = ${answer} cm².`
      };
    })}]
  },
  "M.5.3.3.2": {
    gradeName: "5. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenler prizmasının hacmini hesaplar.",
    templates: [{ id: 'system-default-M.5.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const a = 5 + (i%5);
      const b = 6 + (i%4);
      const c = 7 + (i%3);
      const answer = a * b * c;
      const options = createNumericOptions(answer, 20, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.5.3.3.2", kazanim_metni: "Dikdörtgenler prizmasının hacmini hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ayrıt uzunlukları ${a} cm, ${b} cm ve ${c} cm olan bir dikdörtgenler prizması şeklindeki kutunun hacmi kaç santimetreküptür?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Ayrıtları toplama (Yüzey alanı ile karıştırma)", "Sadece iki ayrıtı çarpma", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Bir buzdolabının içine ne kadar yiyecek sığacağını veya bir havuzun ne kadar su alacağını hacim hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenler prizmasının hacmi, üç farklı ayrıtının uzunluklarının çarpımına eşittir: ${a} x ${b} x ${c} = ${answer} cm³.`
      };
    })}]
  },
  "M.5.4.1.3": {
    gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
    templates: [{ id: 'system-default-M.5.4.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
      const data = [10 + i, 20 + i, 30 - i];
      const sum = data.reduce((a, b) => a + b, 0);
      const answer = sum / data.length;
      const options = createNumericOptions(answer, 5, 4);
      const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
      return {
        sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.3", kazanim_metni: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ali'nin matematik sınavlarından aldığı notlar ${data.join(', ')}'dir. Ali'nin notlarının aritmetik ortalaması kaçtır?`,
        secenekler: options,
        dogru_cevap: correctAnswerKey,
        yanlis_secenek_tipleri: ["Verileri toplama ama bölmeme", "Veri sayısına yanlış bölme", "En büyük veya en küçük değeri seçme"],
        gercek_yasam_baglantisi: "Bir öğrencinin karne notu, o dersten aldığı tüm notların aritmetik ortalaması alınarak hesaplanır.",
        seviye: 'orta', cozum_anahtari: `Aritmetik ortalama, veri grubundaki sayıların toplamının veri sayısına bölünmesiyle bulunur: (${data.join(' + ')}) / ${data.length} = ${answer}.`
      };
    })}]
  }
};