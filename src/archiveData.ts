
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
    const birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    const onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
    const yuzler = ["", "yüz", "iki yüz", "üç yüz", "dört yüz", "beş yüz", "altı yüz", "yedi yüz", "sekiz yüz", "dokuz yüz"];

    if (num === 0) return "sıfır";
    if (num >= 1000) return String(num); // Keep it simple for this context

    let result = "";
    const yuz = Math.floor(num / 100);
    const on = Math.floor((num % 100) / 10);
    const bir = num % 10;

    if (yuz > 0) result += yuzler[yuz] + " ";
    if (on > 0) result += onlar[on] + " ";
    if (bir > 0) result += birler[bir];

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
            secenekler: { A: `${answer-10}`, B: `${answer}`, C: `${answer+10}`, D: `${answer-20}` },
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
        const num = 16 + i * 2;
        const answer = Math.round(num/10) * 10;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.4", kazanim_metni: "100’den küçük doğal sayıları en yakın onluğa yuvarlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num} sayısı en yakın hangi onluğa yuvarlanır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yanlış onluğa yuvarlama", "Sayının kendisi"],
            gercek_yasam_baglantisi: "Alışverişte bir ürünün fiyatı 48 TL ise, 'yaklaşık 50 TL' diyerek zihinden hesap yapmayı kolaylaştırırız.",
            seviye: 'orta', cozum_anahtari: `Bir sayının birler basamağı 5 veya daha büyükse bir üst onluğa, daha küçükse bir alt onluğa yuvarlanır. ${num} sayısı ${answer}'a daha yakındır.`
        }
    })}]
  },
  "M.2.1.2.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    templates: [{ id: 'system-default-M.2.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 47 + (i % 10);
        const num2 = 25 + (i % 10);
        const answer = Math.min(100, num1 + num2);
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.1", kazanim_metni: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir okulda ${num1} kız öğrenci ve ${num2} erkek öğrenci vardır. Okulda toplam kaç öğrenci vardır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Elde eklemeyi unutma", "Basamak kaydırma hatası", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Market alışverişi sonrası fişteki ürünlerin toplam fiyatını hesaplamak için toplama yaparız.",
            seviye: 'orta', cozum_anahtari: `${num1} ile ${num2}'i toplarken önce birlikler, sonra onluklar toplanır. Elde varsa onluklara eklenir.`
        }
    })}]
  },
  "M.2.1.2.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    templates: [{ id: 'system-default-M.2.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 38 + i;
        const num2 = 41 + i;
        const estimatedAnswer = Math.round(num1 / 10) * 10 + Math.round(num2 / 10) * 10;
        const options = createNumericOptions(estimatedAnswer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(estimatedAnswer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.2", kazanim_metni: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
            gercek_yasam_baglantisi: "Alışveriş sepetimizdeki ürünlerin yaklaşık toplam fiyatını tahmin ederek kasada ne ödeyeceğimizi kestirebiliriz.",
            seviye: 'orta', cozum_anahtari: `Sayıları en yakın onluğa yuvarlarız: ${num1} → ${Math.round(num1/10)*10}, ${num2} → ${Math.round(num2/10)*10}. Tahmini toplam ${Math.round(num1/10)*10} + ${Math.round(num2/10)*10} = ${estimatedAnswer}.`
        }
    })}]
  },
  "M.2.1.2.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.2.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 30 + (i % 5 * 10);
        const num2 = 18 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.3", kazanim_metni: "Zihinden toplama işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + ${num2} işlemini zihinden yaparsak sonuç kaç olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış toplama", "Birlikleri unutma", "Yakın bir onluk"],
            gercek_yasam_baglantisi: "Bir oyunda hızlıca puanları toplamak için zihinden toplama becerimizi kullanırız.",
            seviye: 'orta', cozum_anahtari: `Önce onlukları toplarız (${num1} + 10 = ${num1+10}), sonra kalan birliği (${num2-10}) ekleriz (${num1+10} + ${num2-10} = ${answer}).`
        }
    })}]
  },
  "M.2.1.2.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 25 + i;
        const num2 = 15 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.4", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Kerem'in ${num1} misketi vardı. Arkadaşı ona ${num2} misket daha verdi. Kerem'in toplam kaç misketi oldu?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Çıkarma yapma", "Sadece bir sayıyı cevap verme", "Elde hatası"],
            gercek_yasam_baglantisi: "Kumbaramızdaki paraya yeni eklenen parayı ekleyerek toplam birikimimizi bulabiliriz.",
            seviye: 'ileri', cozum_anahtari: `Başlangıçtaki misket sayısına (${num1}) eklenen misket sayısı (${num2}) toplanır. ${num1} + ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.3.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
    templates: [{ id: 'system-default-M.2.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 82 + i;
        const num2 = 35 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.1", kazanim_metni: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir manavda ${num1} karpuz vardı. Gün içinde ${num2} tanesi satıldı. Geriye kaç karpuz kaldı?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onluk bozmayı unutma", "Küçükten büyüğü çıkarma", "Toplama yapma"],
            gercek_yasam_baglantisi: "Harcadığımız paradan sonra cüzdanımızda ne kadar kaldığını çıkarma işlemiyle buluruz.",
            seviye: 'orta', cozum_anahtari: `Toplam karpuz sayısından (${num1}) satılan karpuz sayısı (${num2}) çıkarılır. Onluk bozma gerekebilir. ${num1} - ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.3.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    templates: [{ id: 'system-default-M.2.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 88 - i;
        const num2 = 31 + i;
        const estimatedAnswer = Math.round(num1 / 10) * 10 - Math.round(num2 / 10) * 10;
        const options = createNumericOptions(estimatedAnswer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(estimatedAnswer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.2", kazanim_metni: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
            gercek_yasam_baglantisi: "İki ürün arasındaki fiyat farkını yaklaşık olarak tahmin etmek için bu beceriyi kullanırız.",
            seviye: 'orta', cozum_anahtari: `Sayıları en yakın onluğa yuvarlarız: ${num1} → ${Math.round(num1/10)*10}, ${num2} → ${Math.round(num2/10)*10}. Tahmini fark ${Math.round(num1/10)*10} - ${Math.round(num2/10)*10} = ${estimatedAnswer}.`
        }
    })}]
  },
  "M.2.1.3.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.2.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 70 + (i % 3 * 10);
        const num2 = 25 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.3", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} - ${num2} işlemini zihinden yaparsak sonuç kaç olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış çıkarma", "Geriye yanlış sayma", "Yakın bir onluk"],
            gercek_yasam_baglantisi: "Para üstü alırken doğru alıp almadığımızı zihinden çıkarma yaparak hızlıca kontrol edebiliriz.",
            seviye: 'orta', cozum_anahtari: `${num1}'dan önce onlukları çıkarırız (${num1} - 20 = ${num1-20}), sonra kalan birliği çıkarırız (${num1-20} - 5 = ${answer}).`
        }
    })}]
  },
  "M.2.1.3.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.3.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 95 - i;
        const num2 = 38 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.4", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `95 sayfalık bir kitabın ${38} sayfasını okuyan Elif'in okuması gereken kaç sayfası kalmıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplama yapma", "Verilen sayılardan birini cevap verme", "Onluk bozma hatası"],
            gercek_yasam_baglantisi: "Okuduğumuz bir kitabın bitmesine kaç sayfa kaldığını hesaplamak için çıkarma yaparız.",
            seviye: 'ileri', cozum_anahtari: `Toplam sayfa sayısından (${num1}) okunan sayfa sayısı (${num2}) çıkarılır. ${num1} - ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.4.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
    templates: [{ id: 'system-default-M.2.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 4 + (i % 4);
        const num2 = 5 + (i % 3);
        const repeatedSum = Array(num1).fill(num2).join(' + ');
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.1", kazanim_metni: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${repeatedSum} toplama işleminin çarpma işlemi olarak gösterimi hangisidir?`,
            secenekler: { A: `${num1} x ${num1}`, B: `${num1} x ${num2}`, C: `${num2} x ${num2}`, D: `${num1} + ${num2}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Sayıları karıştırma", "Toplama olarak bırakma", "Yanlış sayıyla çarpma"],
            gercek_yasam_baglantisi: "Her birinde aynı sayıda şeker olan birkaç paketteki toplam şeker sayısını bulmak için çarpma kullanırız.",
            seviye: 'temel', cozum_anahtari: `${num1} tane ${num2}'nin toplanması, ${num1} çarpı ${num2} demektir.`
        }
    })}]
  },
  "M.2.1.4.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpım tablosunu oluşturur.",
    templates: [{ id: 'system-default-M.2.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 3 + (i % 7);
        const num2 = 4 + (i % 6);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 8);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.2", kazanim_metni: "Çarpım tablosunu oluşturur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} x ${num2} işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yakın bir çarpım sonucu", "Toplama yapma", "Ezber hatası"],
            gercek_yasam_baglantisi: "Çarpım tablosunu bilmek, alışverişte veya yemek tariflerinde miktarları hesaplarken bize hız kazandırır.",
            seviye: 'orta', cozum_anahtari: `${num1} kere ${num2}, ${answer} eder. Bu, çarpım tablosundaki temel bir bilgidir.`
        }
    })}]
  },
  "M.2.1.4.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.4.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 6 + (i % 5);
        const num2 = 8 + (i % 4);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.3", kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Her birinde ${num2} yumurta bulunan ${num1} koli yumurta alan bir pastacı, toplam kaç yumurta almıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış sayılarla çarpma", "Yakın sonuç"],
            gercek_yasam_baglantisi: "Birkaç arkadaşımıza eşit sayıda bilye dağıtacağımızda toplam kaç bilye gerektiğini çarparak buluruz.",
            seviye: 'ileri', cozum_anahtari: `Koli sayısı (${num1}) ile her kolideki yumurta sayısı (${num2}) çarpılarak toplam yumurta sayısı bulunur: ${num1} x ${num2} = ${answer}.`
        }
    })}]
  },
  "M.2.1.5.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işleminin anlamını kavrar.",
    templates: [{ id: 'system-default-M.2.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const total = 12 + (i % 9);
        const groups = 3 + (i % 3);
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.1", kazanim_metni: "Bölme işleminin anlamını kavrar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} tane kalemi ${groups} arkadaşa eşit olarak paylaştırmak için hangi işlem yapılır?`,
            secenekler: { A: "Toplama", B: "Çıkarma", C: "Çarpma", D: "Bölme" },
            dogru_cevap: 'D',
            yanlis_secenek_tipleri: ["Ters işlem (çarpma)", "İlgisiz işlemler"],
            gercek_yasam_baglantisi: "Bir pastayı arkadaşlarımızla eşit dilimlere ayırmak bir bölme işlemidir.",
            seviye: 'temel', cozum_anahtari: "Eşit olarak paylaştırma veya gruplama durumları bölme işlemi ile çözülür."
        }
    })}]
  },
  "M.2.1.5.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    templates: [{ id: 'system-default-M.2.1.5.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const groups = 4 + (i % 3);
        const perGroup = 5 + (i % 4);
        const total = groups * perGroup;
        const options = createNumericOptions(perGroup, 3);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(perGroup)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.2", kazanim_metni: "Bölme işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} ceviz, ${groups} sincaba eşit olarak paylaştırılırsa her bir sincaba kaç ceviz düşer?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplam ceviz sayısı", "Sincap sayısı", "Çarpma yapma"],
            gercek_yasam_baglantisi: "Elimizdeki parayla tanesi belli bir fiyattan olan şekerlerden kaç tane alabileceğimizi bölme ile buluruz.",
            seviye: 'ileri', cozum_anahtari: `Toplam ceviz sayısı (${total}), sincap sayısına (${groups}) bölünür. ${total} ÷ ${groups} = ${perGroup}.`
        }
    })}]
  },
  "M.2.2.1.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
    templates: [{ id: 'system-default-M.2.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.1.1", kazanim_metni: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdaki geometrik şekillerden hangisinin köşe sayısı diğerlerinden farklıdır?`,
        secenekler: { A: "Kare", B: "Dikdörtgen", C: "Üçgen", D: "Dörtgen" },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Aynı köşe sayısına sahip şekiller"],
        gercek_yasam_baglantisi: "Binaların pencereleri (dikdörtgen), trafik levhaları (üçgen) gibi nesneleri şekillerine göre gruplayabiliriz.",
        seviye: 'temel', cozum_anahtari: "Kare, dikdörtgen ve dörtgenin 4 köşesi varken, üçgenin 3 köşesi vardır."
    }))}]
  },
  "M.2.2.2.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
    templates: [{ id: 'system-default-M.2.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.2.1", kazanim_metni: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `▲, ●, ●, ▲, ●, ●, ? örüntüsünde '?' yerine hangi şekil gelmelidir?`,
        secenekler: { A: "▲", B: "●", C: "■", D: "▲●" },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Örüntüdeki farklı bir eleman", "Örüntüde olmayan bir eleman", "Birden fazla eleman"],
        gercek_yasam_baglantisi: "Dans adımları, şarkı nakaratları veya kaldırım taşlarının dizilişi gibi tekrarlayan durumlar birer örüntüdür.",
        seviye: 'orta', cozum_anahtari: "Örüntünün kuralı 'bir üçgen, iki daire' şeklindedir. İki daireden sonra tekrar üçgen gelmelidir."
    }))}]
  },
   "M.2.3.1.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Standart uzunluk ölçme birimlerini tanır.",
    templates: [{ id: 'system-default-M.2.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.1", kazanim_metni: "Standart uzunluk ölçme birimlerini tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kapının boyunu ölçmek için en uygun standart ölçme aracı hangisidir?`,
        secenekler: { A: "Cetvel", B: "Metre", C: "Karış", D: "Adım" },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Daha küçük ölçme aracı", "Standart olmayan birimler"],
        gercek_yasam_baglantisi: "Bir mobilya alırken odamıza sığıp sığmayacağını anlamak için metreyi kullanırız.",
        seviye: 'temel', cozum_anahtari: "Kapı gibi büyük nesnelerin uzunluğunu ölçmek için metre kullanmak en uygunudur."
    }))}]
  },
  "M.2.3.1.2": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
    templates: [{ id: 'system-default-M.2.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const meters = 1 + (i % 5);
        const cm = meters * 100;
        return {
            sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.2", kazanim_metni: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${meters} metre kaç santimetredir?`,
            secenekler: { A: `${meters}`, B: `${meters*10}`, C: `${meters*100}`, D: `${meters*1000}` },
            dogru_cevap: 'C',
            yanlis_secenek_tipleri: ["Birimleri karıştırma", "Yanlış sıfır ekleme"],
            gercek_yasam_baglantisi: "Kumaş alırken veya boyumuzu ölçerken metre ve santimetre arasındaki ilişkiyi kullanırız.",
            seviye: 'orta', cozum_anahtari: `1 metre 100 santimetreye eşittir. Bu nedenle ${meters} metre, ${cm} santimetredir.`
        }
    })}]
  },
  "M.2.4.1.1": {
      gradeName: "2. Sınıf",
      unitName: "Veri İşleme", 
      kazanimName: "Veri toplar ve çetele tablosu oluşturur.",
      templates: [{ id: 'system-default-M.2.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({length: 20}, (_, i) => {
        const renk1_sayi = 5 + (i % 5);
        const renk2_sayi = 7 + (i % 4);
        const total = renk1_sayi + renk2_sayi;

        const toCetele = (num: number) => {
            const fives = '||||| '.repeat(Math.floor(num / 5));
            const ones = '|'.repeat(num % 5);
            return (fives + ones).trim();
        };

        const options = createNumericOptions(total, 5);
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === String(total))!;
        return {
          sinif: 2,
          unite_adi: "Veri İşleme",
          unite_no: 4,
          kazanim_kodu: "M.2.4.1.1",
          kazanim_metni: "Veri toplar ve çetele tablosu oluşturur.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Bir sınıftaki öğrencilerin en sevdikleri dondurma çeşitleri çetele tablosunda gösterilmiştir.\n\nÇikolatalı: ${toCetele(renk1_sayi)}\nLimonlu    : ${toCetele(renk2_sayi)}\n\nTabloya göre bu iki dondurmayı seven toplam kaç öğrenci vardır?`,
          secenekler: options,
          dogru_cevap: correctAnswerKey,
          yanlis_secenek_tipleri: ["Sadece bir grubu sayma", "Yanlış sayma", "Çıkarma yapma"],
          gercek_yasam_baglantisi: "Sınıf başkanlığı seçiminde oyları saymak için çetele tablosu kullanmak işimizi kolaylaştırır.",
          seviye: 'orta',
          cozum_anahtari: `Çikolatalı seven ${renk1_sayi}, limonlu seven ${renk2_sayi} öğrenci vardır. Toplamda ${renk1_sayi} + ${renk2_sayi} = ${total} öğrenci vardır.`
        }
      })}]
  },
  "M.2.4.1.2": {
    gradeName: "2. Sınıf",
    unitName: "Veri İşleme",
    kazanimName: "Nesne ve şekil grafiği oluşturur.",
    templates: [{ id: 'system-default-M.2.4.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const data = {
            'Elma': 3 + (i % 3),
            'Armut': 5 - (i % 2),
            'Kiraz': 4 + (i % 2)
        };
        const leastPopular = Object.keys(data).reduce((a, b) => data[a as keyof typeof data] < data[b as keyof typeof data] ? a : b);
        
        const options = { A: "Elma", B: "Armut", C: "Kiraz", D: "Muz" };
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === leastPopular) || 'A';

        return {
            sinif: 2,
            unite_adi: "Veri İşleme",
            unite_no: 4,
            kazanim_kodu: "M.2.4.1.2",
            kazanim_metni: "Nesne ve şekil grafiği oluşturur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir manavdaki meyvelerin sayısı nesne grafiği ile gösterilmiştir.\n\nElma  : ${'🍎'.repeat(data['Elma'])}\nArmut : ${'🍐'.repeat(data['Armut'])}\nKiraz : ${'🍒'.repeat(data['Kiraz'])}\n\nGrafiğe göre manavda en az sayıda olan meyve hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Daha fazla olan meyveler", "Grafikte olmayan meyve"],
            gercek_yasam_baglantisi: "Oyuncaklarımızı türlerine göre gruplayıp bir şekil grafiği çizerek en çok hangi oyuncağımız olduğunu görebiliriz.",
            seviye: 'orta',
            cozum_anahtari: `Grafikte en az nesne (${data[leastPopular as keyof typeof data]} tane) ${leastPopular} meyvesinin sırasında olduğu için cevap ${leastPopular}'dir.`
        }
    })}]
  },

  // =================================================================
  // 3. SINIF
  // =================================================================
  "M.3.1.1.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.3.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 100 + i * 13 + (i % 5) * 10;
        const numInWords = numberToWordsTr(num);
        const options = createNumericOptions(num, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(num))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.1", kazanim_metni: "Üç basamaklı doğal sayıları okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Okunuşu "${numInWords}" olan sayı hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Basamakları karıştırma", "Benzer okunuşlu sayı"],
            gercek_yasam_baglantisi: "Alışverişte fiyat etiketlerini veya binalardaki daire numaralarını doğru okumak için bu beceri gereklidir.",
            seviye: 'temel', cozum_anahtari: `"${numInWords}" sayısının rakamlarla yazılışı ${num} şeklindedir.`
        }
    })}]
  },
   "M.3.1.1.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıların basamak adlarını, basamaklarındaki rakamların basamak değerlerini belirler.",
    templates: [{ id: 'system-default-M.3.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const hundreds = 1 + (i % 9);
        const tens = (i % 8);
        const ones = (i % 7);
        const num = hundreds * 100 + tens * 10 + ones;
        const targetDigit = i % 3 === 0 ? hundreds : (i % 3 === 1 ? tens : ones);
        const targetValue = i % 3 === 0 ? hundreds * 100 : (i % 3 === 1 ? tens * 10 : ones);
        const targetBasamak = i % 3 === 0 ? "yüzler" : (i % 3 === 1 ? "onlar" : "birler");
        const options = createNumericOptions(targetValue, 50);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(targetValue))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.2", kazanim_metni: "Üç basamaklı doğal sayıların basamak adlarını, basamaklarındaki rakamların basamak değerlerini belirler.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num} sayısının ${targetBasamak} basamağındaki rakamın basamak değeri kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Rakamın kendisi (sayı değeri)", "Diğer basamağın değeri"],
            gercek_yasam_baglantisi: "Para hesaplarken 352 TL'nin 3 tane 100'lük, 5 tane 10'luk ve 2 tane 1'likten oluştuğunu bilmek önemlidir.",
            seviye: 'orta', cozum_anahtari: `${num} sayısının ${targetBasamak} basamağında ${targetDigit} rakamı vardır ve basamak değeri ${targetValue}'dir.`
        }
    })}]
  },
  "M.3.1.2.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    templates: [{ id: 'system-default-M.3.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 125 + i * 11;
        const num2 = 238 + i * 7;
        const answer = num1 + num2;
        const options = createNumericOptions(answer, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.2.1", kazanim_metni: "En çok üç basamaklı sayılarla eldesiz ve eldeli toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir çiftlikte ${num1} koyun ve ${num2} keçi bulunmaktadır. Bu çiftlikte toplam kaç hayvan vardır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeyi toplamayı unutma", "Basamakları yanlış toplama", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "İki farklı okulun öğrencilerinin toplam sayısını bulmak için toplama işlemi yaparız.",
            seviye: 'orta', cozum_anahtari: `İki sayıyı alt alta yazıp birler, onlar ve yüzler basamağını sırayla toplayarak sonuç bulunur. ${num1} + ${num2} = ${answer}.`
        }
    })}]
  },
  "M.3.1.3.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı sayılardan, en çok üç basamaklı sayıları çıkarır.",
    templates: [{ id: 'system-default-M.3.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 540 + i * 12;
        const num2 = 215 + i * 9;
        const answer = num1 - num2;
        const options = createNumericOptions(answer, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.3.1", kazanim_metni: "En çok üç basamaklı sayılardan, en çok üç basamaklı sayıları çıkarır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir fırıncı gün içinde ürettiği ${num1} ekmeğin ${num2} tanesini satmıştır. Geriye kaç ekmek kalmıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onluk bozmayı unutma", "Küçük sayıdan büyüğü çıkarma", "Toplama yapma"],
            gercek_yasam_baglantisi: "900 sayfalık bir kitabın bir kısmını okuduktan sonra kalan sayfa sayısını çıkarma ile buluruz.",
            seviye: 'orta', cozum_anahtari: `Toplam ekmek sayısından satılan ekmek sayısı çıkarılır. Onluk bozma gerekebilir. ${num1} - ${num2} = ${answer}.`
        }
    })}]
  },
  "M.3.1.4.2": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı bir doğal sayı ile bir basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.3.1.4.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 105 + i * 4;
        const num2 = 3 + (i % 7);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 50);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.4.2", kazanim_metni: "Üç basamaklı bir doğal sayı ile bir basamaklı bir doğal sayıyı çarpar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir sinema salonunda ${num1} koltuk vardır. Bu salonda ${num2} seans film gösterilirse, toplam kaç bilet satılabilir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeyi unutma", "Basamak kaydırma hatası", "Toplama yapma"],
            gercek_yasam_baglantisi: "Her birinde aynı sayıda bisküvi olan çok sayıda paketteki toplam bisküvi miktarını bulmak için çarpma kullanılır.",
            seviye: 'orta', cozum_anahtari: `Koltuk sayısı ile seans sayısı çarpılır. ${num1} x ${num2} = ${answer}.`
        }
    })}]
  },
  "M.3.1.5.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki basamaklı bir doğal sayıyı bir basamaklı bir doğal sayıya böler.",
    templates: [{ id: 'system-default-M.3.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const divisor = 3 + (i % 6);
        const quotient = 10 + (i % 10);
        const dividend = divisor * quotient;
        const options = createNumericOptions(quotient, 5);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(quotient))!;
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.5.1", kazanim_metni: "İki basamaklı bir doğal sayıyı bir basamaklı bir doğal sayıya böler.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${dividend} tane misket, ${divisor} çocuğa eşit olarak paylaştırılırsa her çocuğa kaç misket düşer?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Böleni cevap olarak verme", "Bölüneni cevap olarak verme", "Çarpma yapma"],
            gercek_yasam_baglantisi: "Büyük bir paket şekeri arkadaşlarımızla eşit paylaşmak için bölme işlemi yaparız.",
            seviye: 'orta', cozum_anahtari: `Toplam misket sayısı (${dividend}) çocuk sayısına (${divisor}) bölünür. ${dividend} ÷ ${divisor} = ${quotient}.`
        }
    })}]
  },
  "M.3.1.6.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Birim kesirleri tanır ve modellerle gösterir.",
    templates: [{ id: 'system-default-M.3.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const denominator = 2 + (i % 9);
        return {
            sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.6.1", kazanim_metni: "Birim kesirleri tanır ve modellerle gösterir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir bütünün ${denominator} eş parçasından birini gösteren kesir hangisidir?`,
            secenekler: { A: `1/${denominator+1}`, B: `${denominator}/1`, C: `1/${denominator}`, D: `1/${denominator-1}` },
            dogru_cevap: "C",
            yanlis_secenek_tipleri: ["Pay ve paydayı karıştırma", "Paydayı yanlış sayma"],
            gercek_yasam_baglantisi: "Bir pizzayı eşit dilimlere ayırdığımızda her bir dilim, pizzanın birim kesrini ifade eder.",
            seviye: 'temel', cozum_anahtari: `Bir bütünün ${denominator} eş parçasından her biri 'bir bölü ${denominator}' (1/${denominator}) olarak ifade edilir. Buna birim kesir denir.`
        }
    })}]
  },

  // =================================================================
  // 4. SINIF
  // =================================================================
  "M.4.1.1.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.4.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 1000 + i * 1521 + (i % 100);
        const numInWords = `${numberToWordsTr(Math.floor(num/1000))} bin ${numberToWordsTr(num % 1000)}`;
        const options = createNumericOptions(num, 1000);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(num))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.1", kazanim_metni: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Okunuşu "${numInWords}" olan sayı aşağıdakilerden hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Bölükleri karıştırma", "Basamak hatası"],
            gercek_yasam_baglantisi: "Bir arabanın fiyatını veya bir şehrin nüfusunu okurken büyük sayıları doğru okuma becerisi kullanılır.",
            seviye: 'temel', cozum_anahtari: `Sayılar bölüklerine göre okunur. "${numInWords}" sayısının yazılışı ${num}'dir.`
        }
    })}]
  },
   "M.4.1.2.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 1250 + i * 23;
        const num2 = 3460 + i * 18;
        const answer = num1 + num2;
        const options = createNumericOptions(answer, 100);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.2.1", kazanim_metni: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir mağaza, birinci hafta ${num1} TL, ikinci hafta ${num2} TL ciro yapmıştır. Mağazanın iki haftalık toplam cirosu ne kadardır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeleri yanlış toplama", "Basamak kaydırma", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Ailemizin aylık gelir ve giderlerini hesaplarken büyük sayılarla toplama işlemi yaparız.",
            seviye: 'orta', cozum_anahtari: `İki haftanın cirosu toplanarak toplam ciro bulunur. ${num1} + ${num2} = ${answer}.`
        }
    })}]
  },
  "M.4.1.3.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.4.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 8750 - i * 31;
        const num2 = 4380 + i * 25;
        const answer = num1 - num2;
        const options = createNumericOptions(answer, 100);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.3.1", kazanim_metni: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} nüfuslu bir ilçeden bir yılda ${num2} kişi göç etmiştir. İlçenin nüfusu kaç kişi kalmıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onluk bozma hatası", "Basamakları yanlış çıkarma", "Toplama yapma"],
            gercek_yasam_baglantisi: "Birikimimizden bir miktar para harcadığımızda ne kadar kaldığını bulmak için çıkarma yaparız.",
            seviye: 'orta', cozum_anahtari: `Başlangıçtaki nüfustan göç eden kişi sayısı çıkarılır. ${num1} - ${num2} = ${answer}.`
        }
    })}]
  },
  "M.4.1.4.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
    templates: [{ id: 'system-default-M.4.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 120 + i * 5;
        const num2 = 25 + i;
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 500);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.4.1", kazanim_metni: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir sitede her birinde ${num1} daire bulunan ${num2} blok vardır. Bu sitede toplam kaç daire vardır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Basamak kaydırma hatası", "Sadece bir basamakla çarpma", "Toplama yapma"],
            gercek_yasam_baglantisi: "Bir organizasyona katılacak kişi sayısını, otobüs sayısı ve her otobüsteki yolcu sayısını çarparak bulabiliriz.",
            seviye: 'orta', cozum_anahtari: `Blok sayısı ile her bloktaki daire sayısı çarpılarak toplam daire sayısı bulunur. ${num1} x ${num2} = ${answer}.`
        }
    })}]
  },
  "M.4.1.5.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler.",
    templates: [{ id: 'system-default-M.4.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const divisor = 12 + i;
        const quotient = 35 + i * 2;
        const dividend = divisor * quotient;
        const options = createNumericOptions(quotient, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(quotient))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.5.1", kazanim_metni: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir fabrika, ürettiği ${dividend} adet çikolatayı, her birinde ${divisor} adet olacak şekilde kutulara ayırıyor. Toplam kaç kutu çikolata elde edilir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Kalanı yanlış bulma", "Çarpma yapma", "Bölüneni cevap verme"],
            gercek_yasam_baglantisi: "Büyük bir miktar parayı belirli sayıda kişiye eşit olarak paylaştırmak için bölme işlemi kullanılır.",
            seviye: 'orta', cozum_anahtari: `Toplam çikolata sayısı (${dividend}) bir kutudaki çikolata sayısına (${divisor}) bölünür. ${dividend} ÷ ${divisor} = ${quotient}.`
        }
    })}]
  },
   "M.4.1.6.3": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
    templates: [{ id: 'system-default-M.4.1.6.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const denominator = 4 + (i % 5);
        const numerator = 1 + (i % (denominator - 2));
        const total = 20 + i * denominator;
        const answer = (total / denominator) * numerator;
        const options = createNumericOptions(answer, 5);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.6.3", kazanim_metni: "Bir çokluğun belirtilen basit kesir kadarını bulur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} liranın ${numerator}/${denominator}'i kaç liradır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Pay ile bölüp payda ile çarpma", "Sadece bölme yapma"],
            gercek_yasam_baglantisi: "Bir maaşın belirli bir kesriyle (örneğin 1/4'ü ile) kira ödendiğinde, kiranın ne kadar olduğunu bu yöntemle hesaplarız.",
            seviye: 'ileri', cozum_anahtari: `Çokluk (${total}) paydaya (${denominator}) bölünür, çıkan sonuç pay (${numerator}) ile çarpılır. (${total} ÷ ${denominator}) x ${numerator} = ${answer}.`
        }
    })}]
  },

  // =================================================================
  // 5. SINIF
  // =================================================================
  "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num = 1000000 + i * 123456 + (i % 1000);
        const millions = Math.floor(num / 1000000);
        const thousands = Math.floor((num % 1000000) / 1000);
        const ones = num % 1000;
        const numInWords = `${numberToWordsTr(millions)} milyon ${numberToWordsTr(thousands)} bin ${numberToWordsTr(ones)}`;
        const options = createNumericOptions(num, 100000);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(num))!;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Okunuşu "${numInWords}" olan sayı hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Bölükleri karıştırma", "Sıfırları eksik yazma"],
            gercek_yasam_baglantisi: "Ülkelerin nüfusunu veya büyük şirketlerin gelirlerini okurken milyonlu sayıları anlama becerisi gerekir.",
            seviye: 'temel', cozum_anahtari: `Milyonlar bölüğü, binler bölüğü ve birler bölüğü sırasıyla yazılarak sayı oluşturulur. Cevap: ${num}.`
        }
    })}]
  },
  "M.5.1.2.3": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir doğal sayının karesini ve küpünü hesaplar.",
    templates: [{ id: 'system-default-M.5.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const isSquare = i % 2 === 0;
        const base = isSquare ? 5 + (i/2) : 3 + Math.floor(i/2);
        const power = isSquare ? 2 : 3;
        const answer = Math.pow(base, power);
        const questionText = `${base} sayısının ${isSquare ? 'karesi' : 'küpü'} kaçtır?`;
        const options = createNumericOptions(answer, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.3", kazanim_metni: "Bir doğal sayının karesini ve küpünü hesaplar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: questionText,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sayıyı üs ile çarpma", "Yanlış üs alma"],
            gercek_yasam_baglantisi: "Bir odanın alanını (kare) veya bir kutunun hacmini (küp) hesaplarken bu kavramları kullanırız.",
            seviye: 'orta', cozum_anahtari: `Bir sayının karesi kendisiyle iki kez, küpü ise üç kez çarpılmasıdır. ${base}^${power} = ${answer}.`
        }
    })}]
  },
   "M.5.1.2.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Parantezli işlemleri yapar.",
    templates: [{ id: 'system-default-M.5.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 10 + i;
        const num2 = 3 + (i % 4);
        const num3 = 5 + (i % 5);
        const answer = num1 + (num2 * num3);
        const wrongAnswer = (num1 + num2) * num3; // işlem önceliği hatası
        const options = createNumericOptions(answer, 15);
        options.C = String(wrongAnswer); // çeldirici
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.2.4", kazanim_metni: "Parantezli işlemleri yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${num1} + (${num2} x ${num3}) işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["İşlem önceliğini yok sayma", "Yanlış işlem yapma"],
            gercek_yasam_baglantisi: "Birden fazla adımı olan bir problemi çözerken hangi işlemi önce yapacağımızı belirlemek için parantezler kullanılır.",
            seviye: 'orta', cozum_anahtari: `İşlem önceliğine göre önce parantez içindeki işlem yapılır (${num2} x ${num3} = ${num2*num3}). Sonra toplama yapılır: ${num1} + ${num2*num3} = ${answer}.`
        }
    })}]
  },
  "M.5.1.3.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
    templates: [{ id: 'system-default-M.5.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const tam = 2 + (i % 5);
        const payda = 3 + (i % 4);
        const pay = 1 + (i % (payda - 1));
        const bilesikPay = tam * payda + pay;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.3.2", kazanim_metni: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${tam} tam ${pay}/${payda} kesrinin bileşik kesir olarak yazılışı hangisidir?`,
            secenekler: { A: `${bilesikPay}/${payda}`, B: `${tam*pay}/${payda}`, C: `${tam+pay}/${payda}`, D: `${bilesikPay}/${tam}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Yanlış işlemle dönüştürme", "Paydayı değiştirme"],
            gercek_yasam_baglantisi: "Yemek tariflerinde 2 buçuk (2 1/2) su bardağı unu, 5 tane yarım bardak (5/2) olarak da düşünebiliriz.",
            seviye: 'orta', cozum_anahtari: `Tam sayılı kesri bileşik kesre çevirmek için tam kısım ile payda çarpılır ve sonuca pay eklenir. (${tam} x ${payda}) + ${pay} = ${bilesikPay}. Sonuç paya yazılır, payda aynı kalır.`
        }
    })}]
  },
  "M.5.1.4.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Kesirlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.4.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const payda = 9 + (i % 10);
        const pay1 = 2 + (i % 3);
        const pay2 = 3 + (i % 3);
        const cevapPay = pay1 + pay2;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.4.1", kazanim_metni: "Kesirlerle toplama ve çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${pay1}/${payda} + ${pay2}/${payda} işleminin sonucu kaçtır?`,
            secenekler: { A: `${cevapPay}/${payda}`, B: `${cevapPay}/${payda*2}`, C: `${pay1+pay2}/${payda+payda}`, D: `${pay1*pay2}/${payda}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Paydaları da toplama", "Payları çarpma"],
            gercek_yasam_baglantisi: "Bir pastanın önce 1/8'ini, sonra 2/8'ini yediğimizde toplamda ne kadar yediğimizi kesirlerle toplama yaparak buluruz.",
            seviye: 'orta', cozum_anahtari: `Paydaları eşit kesirler toplanırken paylar toplanır paya yazılır, ortak payda ise aynen paydaya yazılır. Sonuç ${cevapPay}/${payda}.`
        }
    })}]
  },
  "M.5.1.5.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimleri okur ve yazar.",
    templates: [{ id: 'system-default-M.5.1.5.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const tam = 5 + i;
        const onda = 1 + (i % 9);
        const okunus = `${numberToWordsTr(tam)} tam onda ${numberToWordsTr(onda)}`;
        const cevap = `${tam},${onda}`;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.1", kazanim_metni: "Ondalık gösterimleri okur ve yazar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Okunuşu "${okunus}" olan ondalık gösterim hangisidir?`,
            secenekler: { A: cevap, B: `${tam}${onda}`, C: `${tam},0${onda}`, D: `${onda},${tam}` },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Virgülü unutma", "Yanlış basamağa yazma", "Tam ve ondalık kısmı karıştırma"],
            gercek_yasam_baglantisi: "Marketlerde ürün fiyatları (örneğin 5,75 TL) veya boyumuz (1,65 m) gibi değerler ondalık gösterimle ifade edilir.",
            seviye: 'temel', cozum_anahtari: `'${okunus}' ifadesinde 'tam' kelimesinden önceki kısım virgülün soluna, 'onda' kelimesinden sonraki kısım ise virgülün sağına yazılır.`
        }
    })}]
  },
  "M.5.1.5.4": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
    templates: [{ id: 'system-default-M.5.1.5.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const num1_tam = 12 + i;
        const num1_ondalik = 25 + i * 2;
        const num2_tam = 8 + i;
        const num2_ondalik = 31 + i * 3;
        const num1 = parseFloat(`${num1_tam}.${num1_ondalik}`);
        const num2 = parseFloat(`${num2_tam}.${num2_ondalik}`);
        const answer = (num1 + num2).toFixed(2).replace('.',',');
        const wrongAnswer = String(num1+num2).replace('.',','); // Leading zero error
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.5.4", kazanim_metni: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Ayşe marketten ${num1_tam},${num1_ondalik} TL'ye peynir ve ${num2_tam},${num2_ondalik} TL'ye zeytin almıştır. Ayşe toplam kaç TL ödemelidir?`,
            secenekler: { A: answer, B: wrongAnswer, C: String(num1+num2+1).replace('.',','), D: String(num1-num2).replace('.',',') },
            dogru_cevap: 'A',
            yanlis_secenek_tipleri: ["Virgülleri hizalamama", "Toplama hatası", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Alışveriş fişindeki birden fazla ondalıklı fiyatı toplayarak toplam borcumuzu hesaplarız.",
            seviye: 'orta', cozum_anahtari: `Ondalık gösterimlerle toplama yaparken virgüller alt alta gelecek şekilde yazılır ve normal toplama işlemi yapılır. Sonuçta virgül yine aynı hizadan konulur. Cevap: ${answer}.`
        }
    })}]
  },
  "M.5.1.6.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
    templates: [{ id: 'system-default-M.5.1.6.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const yuzde = 10 + i * 4;
        const ondalik = yuzde / 100;
        const kesir = `${yuzde}/100`;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.1", kazanim_metni: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `%${yuzde} ifadesinin kesir olarak gösterimi hangisidir?`,
            secenekler: { A: `${yuzde}/10`, B: `100/${yuzde}`, C: kesir, D: `${yuzde}/1000` },
            dogru_cevap: 'C',
            yanlis_secenek_tipleri: ["Paydayı yanlış yazma", "Pay ve paydayı ters yazma"],
            gercek_yasam_baglantisi: "Mağazalardaki '%50 indirim' gibi ifadeler, bir ürünün fiyatının yarısı kadar indirim yapıldığını gösterir (50/100).",
            seviye: 'temel', cozum_anahtari: `Yüzde ifadesi, paydası 100 olan bir kesir olarak yazılabilir. %${yuzde} = ${kesir}.`
        }
    })}]
  },
  "M.5.1.6.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    templates: [{ id: 'system-default-M.5.1.6.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 20 }, (_, i) => {
        const total = 200 + i * 20;
        const yuzde = 10 + i * 2;
        const answer = total * (yuzde / 100);
        const options = createNumericOptions(answer, 20);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer))!;
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.2", kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `${total} sayısının %${yuzde}'si kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sayıyı 100'e bölüp yüzdeyle çarpmama", "Yanlış çarpma/bölme"],
            gercek_yasam_baglantisi: "Bir ürüne yapılacak indirimin miktarını hesaplamak için ürün fiyatının indirim yüzdesini buluruz.",
            seviye: 'ileri', cozum_anahtari: `Bir sayının yüzdesini bulmak için sayı 100'e bölünür ve yüzde oranı ile çarpılır. (${total} / 100) * ${yuzde} = ${answer}.`
        }
    })}]
  },
};
