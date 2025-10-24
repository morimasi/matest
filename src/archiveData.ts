

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
            str += (yuzlerBas === 1 ? "yüz" : birler[yuzlerBas] + " yüz");
        }
        if (onlarBas > 0) {
            str += " " + onlar[onlarBas];
        }
        if (birlerBas > 0) {
            str += " " + birler[birlerBas];
        }
        return str.trim();
    };

    const milyonlar = Math.floor(num / 1000000);
    const binler = Math.floor((num % 1000000) / 1000);
    const birlerGrubu = num % 1000;

    let result = "";
    if (milyonlar > 0) {
        result += processGroup(milyonlar) + " milyon ";
    }
    if (binler > 0) {
        if (binler === 1) result += "bin ";
        else result += processGroup(binler) + " bin ";
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
            secenekler: { A: `${start-10}`, B: `${start+30}`, C: `${start+40}`, D: `${start+20}` },
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
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.4", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir okulda birinci gün ${num1} sayfa kitap okuma etkinliği, ikinci gün ise ${num2} sayfa kitap okuma etkinliği yapılmıştır. İki günde toplam kaç sayfa kitap okunmuştur?`,
        secenekler: createNumericOptions(answer, 20),
        dogru_cevap: Object.keys(createNumericOptions(answer, 20)).find(k => createNumericOptions(answer, 20)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'A',
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
      const num2 = 55;
      const answer = num1 - num2;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.2", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${num1} - ${num2} işleminin zihinden yapılışının sonucu kaçtır?`,
        secenekler: createNumericOptions(answer, 10),
        dogru_cevap: Object.keys(createNumericOptions(answer, 10)).find(k => createNumericOptions(answer, 10)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'B',
        yanlis_secenek_tipleri: ["Onluk bozma hatası", "Yanlış geri sayma"],
        gercek_yasam_baglantisi: "100 TL ile alışveriş yaptıktan sonra para üstünü hızlıca zihinden hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `${num1}'den önce 50 çıkarıp (${num1-50}), sonra bulunan sonuçtan 5 daha çıkararak (${num1-50-5}) sonuca ulaşılır.`
      };
    })}]
  },
  "M.3.1.3.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const start = 950 - i * 10;
      const end = 480 + i * 5;
      const answer = start - end;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.3", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir su deposunda ${start} litre su bulunmaktadır. Sulama için ${end} litre su kullanılmıştır. Depoda kaç litre su kalmıştır?`,
        secenekler: createNumericOptions(answer, 20),
        dogru_cevap: Object.keys(createNumericOptions(answer, 20)).find(k => createNumericOptions(answer, 20)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'C',
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
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.3", kazanim_metni: "İki basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir sınıfta ${num1} sıra vardır ve her sırada ${num2} öğrenci oturmaktadır. Sınıf mevcudu kaçtır?`,
        secenekler: createNumericOptions(answer, 30),
        dogru_cevap: Object.keys(createNumericOptions(answer, 30)).find(k => createNumericOptions(answer, 30)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'A',
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
      const num1 = 8;
      const num2 = 12;
      const answer = num1 * num2;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.5", kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Günde ${num1} sayfa kitap okuyan bir öğrenci, ${num2} günde toplam kaç sayfa kitap okur?`,
        secenekler: createNumericOptions(answer, 10),
        dogru_cevap: Object.keys(createNumericOptions(answer, 10)).find(k => createNumericOptions(answer, 10)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'D',
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
      const divisor = 5;
      const dividend = 27 + i;
      const answer = dividend % divisor;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.2", kazanim_metni: "Bölme işleminde kalanı yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${dividend} ceviz, her birinde ${divisor} ceviz olacak şekilde poşetlere dolduruluyor. Geriye kaç ceviz artar?`,
        secenekler: createNumericOptions(answer, 2),
        dogru_cevap: Object.keys(createNumericOptions(answer, 2)).find(k => createNumericOptions(answer, 2)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'A',
        yanlis_secenek_tipleri: ["Bölümü cevap sanma", "Böleni cevap sanma"],
        gercek_yasam_baglantisi: "Oyuncakları kutulara eşit sayıda yerleştirdiğimizde dışarıda kalan oyuncak sayısı, bölme işlemindeki kalandır.",
        seviye: 'ileri', cozum_anahtari: `${dividend} sayısı ${divisor}'e bölündüğünde bölüm 5, kalan ise ${answer}'dir. Soruda artan cevizler sorulduğu için cevap kalandır.`
      };
    })}]
  },
  "M.3.1.5.3": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.3.1.5.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
      const total = 96 - i * 3;
      const groups = 4;
      const answer = total / groups;
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.3", kazanim_metni: "Bölme işlemi gerektiren problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${total} yolcusu olan bir tren, ${groups} vagonludur. Her vagonda eşit sayıda yolcu olduğuna göre, bir vagonda kaç yolcu vardır?`,
        secenekler: createNumericOptions(answer, 5),
        dogru_cevap: Object.keys(createNumericOptions(answer, 5)).find(k => createNumericOptions(answer, 5)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'B',
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
      return {
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.2", kazanim_metni: "Bir bütünün belirtilen birim kesir kadarını belirler.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${total} liranın 1/${den}'i kaç liradır?`,
        secenekler: createNumericOptions(answer, 3),
        dogru_cevap: Object.keys(createNumericOptions(answer, 3)).find(k => createNumericOptions(answer, 3)[k as 'A'|'B'|'C'|'D'] === String(answer)) || 'C',
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
        yanlis_secenek_tipleri: ["Sadece iki kenarı toplama", "Tek kenar uzunluğunu cevap sanma", "Çarpma yerine toplama"],
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
        yanlis_secenek_tipleri: ["Karenin simetri doğrusu sayısı", "Dairenin simetri doğrusu sayısı"],
        gercek_yasam_baglantisi: "Bir kağıdı katlayıp kestiğimizde simetrik şekiller elde ederiz. Katlama çizgisi simetri doğrusudur.",
        seviye: 'orta', cozum_anahtari: `Kare olmayan bir dikdörtgenin, karşılıklı kenarlarının orta noktalarını birleştiren 2 tane simetri doğrusu vardır.`
    }]}]
  },
  "M.4.3.1.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Uzunluk ölçme birimleri ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.4.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.1.1", kazanim_metni: "Uzunluk ölçme birimleri ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Ali'nin boyu 1 metre 45 santimetredir. Kardeşi Ahmet'in boyu ise Ali'den 12 santimetre daha kısadır. Ahmet'in boyu ne kadardır?`,
        secenekler: { A: '1 m 33 cm', B: '1 m 57 cm', C: '1 m 23 cm', D: '133 m' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış çıkarma", "Birimleri yanlış yazma"],
        gercek_yasam_baglantisi: "İki şehir arasındaki mesafeyi ve ne kadar yol kaldığını hesaplarken uzunluk ölçü birimleriyle problem çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Ahmet daha kısa olduğu için çıkarma işlemi yapılır. 145 cm'den 12 cm çıkarılırsa 133 cm kalır. Bu da 1 metre 33 santimetredir.`
    }]}]
  },
  "M.4.3.1.2": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Metre, santimetre ve milimetre arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.4.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.1.2", kazanim_metni: "Metre, santimetre ve milimetre arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `5 santimetre kaç milimetredir?`,
        secenekler: { A: '5', B: '50', C: '500', D: '0.5' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Birim çevirme hatası (100 ile çarpma)", "Bölme yapma"],
        gercek_yasam_baglantisi: "Bir marangoz hassas ölçümler yaparken hem santimetre hem de milimetre kullanır.",
        seviye: 'temel', cozum_anahtari: `1 santimetre 10 milimetreye eşittir. Bu yüzden 5 santimetre 5 x 10 = 50 milimetredir.`
    }]}]
  },
  "M.4.3.1.3": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Kilometre ve metre arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.4.3.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.1.3", kazanim_metni: "Kilometre ve metre arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 kilometre 250 metre, toplam kaç metredir?`,
        secenekler: { A: '325', B: '3250', C: '30250', D: '550' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Sıfırları yanlış yerleştirme"],
        gercek_yasam_baglantisi: "Koşu parkurunun 2.5 kilometre olması, 2500 metre koşulacağı anlamına gelir.",
        seviye: 'orta', cozum_anahtari: `1 kilometre 1000 metredir. 3 kilometre 3000 metre eder. Üzerine 250 metre eklenince toplam 3250 metre olur.`
    }]}]
  },
  "M.4.3.2.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Kare ve dikdörtgenin çevre uzunlukları ile kenar uzunlukları arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.4.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.2.1", kazanim_metni: "Kare ve dikdörtgenin çevre uzunlukları ile kenar uzunlukları arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kısa kenarı 15 cm, uzun kenarı 25 cm olan bir dikdörtgenin çevresi kaç santimetredir?`,
        secenekler: { A: '40', B: '65', C: '80', D: '375' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece iki kenarı toplama", "Yanlış toplama", "Alan hesaplama"],
        gercek_yasam_baglantisi: "Dikdörtgen şeklindeki bir fotoğraf çerçevesinin etrafına kurdele sarmak için ne kadar kurdele gerektiğini çevre hesaplayarak buluruz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin çevresi, iki kısa kenar ile iki uzun kenarın toplamına eşittir. Çevre = 2 x (kısa kenar + uzun kenar) = 2 x (15 + 25) = 2 x 40 = 80 cm.`
    }]}]
  },
  "M.4.3.2.2": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Çevre uzunluğu ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.4.3.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.2.2", kazanim_metni: "Çevre uzunluğu ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Çevre uzunluğu 120 metre olan kare şeklindeki bir bahçenin bir kenar uzunluğu kaç metredir?`,
        secenekler: { A: '60', B: '40', C: '30', D: '20' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["2'ye bölme", "3'e bölme", "6'ya bölme"],
        gercek_yasam_baglantisi: "Kare şeklindeki bir masanın etrafına ne kadar süsleme şeridi gerektiğini hesaplarken çevre problemleri çözeriz.",
        seviye: 'ileri', cozum_anahtari: `Karenin 4 kenarı da eşit olduğu için bir kenar uzunluğunu bulmak için çevre uzunluğu 4'e bölünür. 120 ÷ 4 = 30 metre.`
    }]}]
  },
  "M.4.3.2.3": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Üçgenin çevre uzunluğunu hesaplar.",
    templates: [{ id: 'system-default-M.4.3.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.2.3", kazanim_metni: "Üçgenin çevre uzunluğunu hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kenar uzunlukları 12 cm, 15 cm ve 18 cm olan bir üçgenin çevre uzunluğu kaç santimetredir?`,
        secenekler: { A: '30', B: '33', C: '45', D: '27' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["İki kenarı toplama", "Yanlış toplama"],
        gercek_yasam_baglantisi: "Üçgen şeklindeki bir parkın etrafında bir tur yürüyüş yapıldığında ne kadar mesafe katedildiği çevre hesaplayarak bulunur.",
        seviye: 'orta', cozum_anahtari: `Bir üçgenin çevre uzunluğu, üç kenar uzunluğunun toplanmasıyla bulunur. 12 + 15 + 18 = 45 cm.`
    }]}]
  },
  "M.4.3.3.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Dikdörtgenin alanını hesaplar.",
    templates: [{ id: 'system-default-M.4.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.3.1", kazanim_metni: "Dikdörtgenin alanını hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kısa kenarı 8 metre, uzun kenarı 12 metre olan dikdörtgen şeklindeki bir odanın alanı kaç metrekaredir?`,
        secenekler: { A: '20', B: '40', C: '96', D: '100' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Çevre hesaplama (toplama)", "Yanlış çarpma"],
        gercek_yasam_baglantisi: "Odamızın zeminine halı almak istediğimizde, odanın alanını hesaplayarak doğru boyutta bir halı seçebiliriz.",
        seviye: 'orta', cozum_anahtari: `Dikdörtgenin alanı, kısa kenar ile uzun kenarın çarpılmasıyla bulunur. 8 x 12 = 96 metrekare.`
    }]}]
  },
  "M.4.3.3.2": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Alanı ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.4.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.3.2", kazanim_metni: "Alanı ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Alanı 50 metrekare olan dikdörtgen bir bahçenin uzun kenarı 10 metre ise kısa kenarı kaç metredir?`,
        secenekler: { A: '5', B: '15', C: '40', D: '500' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Çevre ile karıştırma", "Çıkarma yapma", "Çarpma yapma"],
        gercek_yasam_baglantisi: "Bir duvarı boyamak için ne kadar boya gerektiğini, duvarın alanını ve boyanın ne kadar alanı kapladığını bilerek hesaplarız.",
        seviye: 'ileri', cozum_anahtari: `Dikdörtgenin alanı uzun kenar ile kısa kenarın çarpımıdır. Kısa kenarı bulmak için alan, uzun kenara bölünür: 50 ÷ 10 = 5 metre.`
    }]}]
  },
  "M.4.3.4.1": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçü birimleri arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.4.3.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.4.1", kazanim_metni: "Zaman ölçü birimleri arasındaki ilişkiyi açıklar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 dakika 15 saniye, toplam kaç saniyedir?`,
        secenekler: { A: '48', B: '180', C: '195', D: '315' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Yanlış birim çevirme", "Sadece dakikayı çevirme"],
        gercek_yasam_baglantisi: "Bir yarışmayı 130 saniyede bitiren bir sporcunun süresini '2 dakika 10 saniye' olarak ifade ederiz.",
        seviye: 'orta', cozum_anahtari: `1 dakika 60 saniyedir. 3 dakika, 3 x 60 = 180 saniyedir. Üzerine 15 saniye daha eklenince toplam 195 saniye olur.`
    }]}]
  },
  "M.4.3.4.2": {
    gradeName: "4. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçme birimleri ile ilgili problemleri çözer.",
    templates: [{ id: 'system-default-M.4.3.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.4.3.4.2", kazanim_metni: "Zaman ölçme birimleri ile ilgili problemleri çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Saat 14:40'ta başlayan bir film, 1 saat 30 dakika sürdüğüne göre film saat kaçta biter?`,
        secenekler: { A: '15:10', B: '16:00', C: '16:10', D: '15:70' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece saati ekleme", "Yanlış toplama", "Dakikayı 60'tan büyük bırakma"],
        gercek_yasam_baglantisi: "Bir yolculuğa çıktığımızda, başlangıç saatini ve yolculuk süresini bilerek varış saatimizi hesaplayabiliriz.",
        seviye: 'ileri', cozum_anahtari: `14:40'a önce 1 saat eklenir, saat 15:40 olur. Sonra 30 dakika eklenir. 40 + 30 = 70 dakika. 70 dakika, 1 saat 10 dakikadır. 15:00'e 1 saat 10 dakika eklenince 16:10 bulunur.`
    }]}]
  },
  "M.4.4.1.1": {
    gradeName: "4. Sınıf", unitName: "Veri İşleme", kazanimName: "Sütun grafiği oluşturur ve yorumlar.",
    templates: [{ id: 'system-default-M.4.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.4.4.1.1", kazanim_metni: "Sütun grafiği oluşturur ve yorumlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kitaplıktaki kitap türleri sütun grafiği ile gösterilmiştir.\n\nHikaye:     ████████ (8)\nRoman:      ██████ (6)\nŞiir:       ███ (3)\n\nGrafiğe göre kitaplıkta en az bulunan kitap türü hangisidir?`,
        secenekler: { A: 'Hikaye', B: 'Roman', C: 'Şiir', D: 'Masal' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["En çok olan", "Diğerlerinden biri", "Grafikte olmayan"],
        gercek_yasam_baglantisi: "Haberlerde veya gazetelerde seçim sonuçları, hava durumu tahminleri gibi veriler genellikle sütun grafikleriyle gösterilir.",
        seviye: 'temel', cozum_anahtari: `Grafikte en kısa sütun 'Şiir' türüne aittir. Bu, en az sayıda olanın şiir kitabı olduğunu gösterir.`
    }]}]
  },
  "M.4.4.1.2": {
    gradeName: "4. Sınıf", unitName: "Veri İşleme", kazanimName: "Sütun grafiği, tablo ve diğer grafiklerle gösterilen bilgileri kullanarak günlük hayatla ilgili problemler çözer.",
    templates: [{ id: 'system-default-M.4.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 4, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.4.4.1.2", kazanim_metni: "Sütun grafiği, tablo ve diğer grafiklerle gösterilen bilgileri kullanarak günlük hayatla ilgili problemler çözer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir manavın bir günde sattığı meyve miktarları grafikte gösterilmiştir.\n\nElma:   ██████████ (10 kg)\nArmut:  ██████ (6 kg)\nMuz:    ████████ (8 kg)\n\nGrafiğe göre manav, elmadan armuttan kaç kg daha fazla satmıştır?`,
        secenekler: { A: '2', B: '4', C: '16', D: '6' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış çıkarma", "Toplama yapma", "Armut miktarını cevap sanma"],
        gercek_yasam_baglantisi: "Bir ay boyunca biriktirdiğimiz ve harcadığımız parayı bir grafikte göstererek ne kadar tasarruf ettiğimizi hesaplayabiliriz.",
        seviye: 'ileri', cozum_anahtari: `Grafiğe göre 10 kg elma ve 6 kg armut satılmıştır. Aradaki farkı bulmak için çıkarma işlemi yapılır: 10 - 6 = 4 kg.`
    }]}]
  },

  // =================================================================
  // 5. SINIF
  // =================================================================
  "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okunuşu "iki milyon yüz kırk beş bin üç yüz yirmi" olan sayı hangisidir?`,
        secenekler: { A: '2 145 320', B: '214 532', C: '20 145 320', D: '2 145 032' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Milyon bölüğünü atlama", "Yanlış bölük", "Basamak değeri hatası"],
        gercek_yasam_baglantisi: "Bir ülkenin nüfusu veya büyük bir şirketin geliri gibi çok büyük sayıları ifade etmek için milyonlu sayılar kullanılır.",
        seviye: 'temel', cozum_anahtari: `Sayı, bölüklerine göre yazılır. Milyonlar bölüğünde 2, binler bölüğünde 145 ve birler bölüğünde 320 vardır.`
    }]}]
  },
  "M.5.1.1.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayıları en yakın onluğa, yüzlüğe veya binliğe yuvarlar.",
    templates: [{ id: 'system-default-M.5.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.2", kazanim_metni: "Doğal sayıları en yakın onluğa, yüzlüğe veya binliğe yuvarlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `8752 sayısını en yakın binliğe yuvarladığımızda hangi sayıyı elde ederiz?`,
        secenekler: { A: '8000', B: '8700', C: '8800', D: '9000' },
        dogru_cevap: 'D',
        yanlis_secenek_tipleri: ["Aşağı yuvarlama", "En yakın yüzlüğe yuvarlama", "En yakın onluğa yuvarlama"],
        gercek_yasam_baglantisi: "Bir stadyumdaki seyirci sayısını 'yaklaşık 9000 kişi' olarak ifade etmek, sayıları yuvarlama becerisidir.",
        seviye: 'orta', cozum_anahtari: `Bir sayıyı en yakın binliğe yuvarlarken yüzler basamağındaki rakama bakılır. 7 rakamı 5'ten büyük olduğu için sayı bir üst binliğe, yani 9000'e yuvarlanır.`
    }]}]
  },
  "M.5.1.1.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir.",
    templates: [{ id: 'system-default-M.5.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.3", kazanim_metni: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Adım sayısı ile adım sayısı arasındaki ilişki "adım sayısının 4 katının 3 eksiği" olan bir sayı örüntüsünün 5. adımı kaçtır?`,
        secenekler: { A: '17', B: '20', C: '23', D: '19' },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Sadece 4 ile çarpma", "Çarpma yerine toplama", "Hesaplama hatası"],
        gercek_yasam_baglantisi: "Bir apartmandaki kat sayısına göre daire numarasını bulmak veya bir taksinin ücretini kilometreye göre hesaplamak örüntü kuralı bulmaya örnektir.",
        seviye: 'ileri', cozum_anahtari: `Kurala göre adım sayısı (5) önce 4 ile çarpılır (5 x 4 = 20), sonra sonuçtan 3 çıkarılır (20 - 3 = 17).`
    }]}]
  },
  "M.5.1.2.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
    templates: [{ id: 'system-default-M.5.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.1", kazanim_metni: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `48 + 35 işlemini zihinden yaparken "48'e önce 30 ekleyip sonra 5 eklemek" stratejisini kullanan bir öğrenci hangi sonucu bulur?`,
        secenekler: { A: '73', B: '78', C: '83', D: '85' },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Sadece onlukları toplama", "Yanlış toplama"],
        gercek_yasam_baglantisi: "Alışverişte 52 TL'lik bir ürüne 29 TL'lik başka bir ürün eklediğimizde toplamı zihinden (52+30-1 gibi) hesaplayabiliriz.",
        seviye: 'orta', cozum_anahtari: `Bu stratejide önce onluklar eklenir: 48 + 30 = 78. Sonra birlikler eklenir: 78 + 5 = 83. Bu, sayıları parçalayarak toplama stratejisidir.`
    }]}]
  },
  "M.5.1.2.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
    templates: [{ id: 'system-default-M.5.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.2", kazanim_metni: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `312 x 18 işleminin tahmini sonucu aşağıdakilerden hangisidir? (Sayıları en yakın yüzlüğe ve onluğa yuvarlayınız)`,
        secenekler: { A: '3000', B: '6000', C: '6200', D: '5616' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Yanlış yuvarlama", "Gerçek sonuç"],
        gercek_yasam_baglantisi: "Yaklaşık 28 öğrencinin olduğu 22 sınıflı bir okulun toplam öğrenci sayısını tahmin etmek için bu beceriyi kullanırız.",
        seviye: 'orta', cozum_anahtari: `312 en yakın yüzlüğe 300, 18 en yakın onluğa 20 olarak yuvarlanır. Tahmini sonuç 300 x 20 = 6000'dir.`
    }]}]
  },
  "M.5.1.2.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir doğal sayının karesini ve küpünü hesaplar.",
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: [{
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `4'ün küpü ile 5'in karesinin toplamı kaçtır?`,
        secenekler: { A: '21', B: '89', C: '64', D: '25' },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Küp ve kareyi karıştırma", "Sadece birini hesaplama"],
        gercek_yasam_baglantisi: "Alan hesaplamalarında