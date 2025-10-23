
import { ArchiveQuiz } from './types';

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

export const ARCHIVE_DATA: Record<string, ArchiveQuiz> = {
  // =================================================================
  // 1. SINIF
  // =================================================================
  "M.1.1.1.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.1.1.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20’ye kadar olan sayıları ileriye ve geriye doğru birer birer ritmik sayar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.1.1.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Rakamları okur ve yazar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
   "M.1.1.1.4": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20 içinde iki sayıyı karşılaştırır ve aralarındaki ilişkiyi “büyük”, “küçük”, “eşit” ifadeleriyle belirtir.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 5 + (i % 15);
        const num2 = (num1 + 5) % 20;
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
    })
  },
  "M.1.1.1.5": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sıra bildiren sayıları sözlü olarak ifade eder.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const rank = 5 + (i % 10);
        const ranks = ["birinci", "ikinci", "üçüncü", "dördüncü", "beşinci", "altıncı", "yedinci", "sekizinci", "dokuzuncu", "onuncu", "on birinci", "on ikinci", "on üçüncü", "on dördüncü", "on beşinci"];
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.5", kazanim_metni: "Sıra bildiren sayıları sözlü olarak ifade eder.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir yarışta Ali ${rank}. olmuştur. Ondan hemen sonra gelen Ayşe kaçıncı olmuştur?`,
            secenekler: { A: ranks[rank-2], B: ranks[rank-1], C: ranks[rank], D: ranks[rank+1] },
            dogru_cevap: "C",
            yanlis_secenek_tipleri: ["Önceki sıra", "Aynı sıra", "İki sonraki sıra"],
            gercek_yasam_baglantisi: "Apartmanda oturduğumuz katı veya bir sırada beklerken yerimizi belirtmek için sıra sayılarını kullanırız.",
            seviye: 'temel', cozum_anahtari: `${ranks[rank-1]} sıradan sonra ${ranks[rank]} sıra gelir.`
        }
    })
  },
  "M.1.1.2.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminin anlamını kavrar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.1", kazanim_metni: "Toplama işleminin anlamını kavrar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${5+(i%5)} elmaya ${3+(i%3)} elma daha eklersek, bu durumu hangi işlemle ifade ederiz?`,
        secenekler: { A: "Çıkarma", B: "Toplama", C: "Çarpma", D: "Bölme" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Ters işlem", "İleri düzey işlem"],
        gercek_yasam_baglantisi: "Toplama, iki veya daha fazla grup nesneyi bir araya getirdiğimizde toplam miktarı bulmamızı sağlar.",
        seviye: 'temel', cozum_anahtari: "Ekleme, artırma gibi durumlar toplama işlemi ile ifade edilir."
    }))
  },
    "M.1.1.2.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 7 + (i % 5);
        const num2 = 8 + (i % 4);
        const answer = num1 + num2 > 20 ? 19 : num1 + num2;
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
    })
  },
    "M.1.1.2.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminde verilmeyen toplananı bulur.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.1.2.4": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.1.3.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işleminin anlamını kavrar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.3.1", kazanim_metni: "Çıkarma işleminin anlamını kavrar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `${10+(i%5)} tane cevizimin ${3+(i%3)} tanesini yedim. Kalan cevizlerimi bulmak için hangi işlemi yapmalıyım?`,
        secenekler: { A: "Toplama", B: "Çıkarma", C: "Sayma", D: "Karşılaştırma" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Ters işlem", "İşlem olmayan seçenekler"],
        gercek_yasam_baglantisi: "Harcadığımız paradan sonra ne kadar paramız kaldığını bulmak için çıkarma işlemi yaparız.",
        seviye: 'temel', cozum_anahtari: "Azalma, eksilme gibi durumlar çıkarma işlemi ile ifade edilir."
    }))
  },
  "M.1.1.3.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "20’ye kadar (20 dâhil) olan doğal sayılarla çıkarma işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.1.3.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işleminde verilmeyen terimleri bulur.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.2.1.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Uzamsal ilişkileri ifade eder.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.1.1", kazanim_metni: "Uzamsal ilişkileri ifade eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kitap, kalemin solundadır. Buna göre kalem, kitabın neresindedir?`,
        secenekler: { A: "altında", B: "üstünde", C: "sağında", D: "solunda" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["İlgisiz konum", "Zıt konum", "Aynı konumu tekrar etme"],
        gercek_yasam_baglantisi: "Bir adres tarif ederken 'marketin sağındaki sokak' gibi ifadelerle yönümüzü buluruz.",
        seviye: 'temel', cozum_anahtari: "Eğer kitap kalemin solunda ise, kalem de kitabın sağında yer alır."
    }))
  },
  "M.1.2.2.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Geometrik cisimleri tanır ve isimlendirir.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.2.1", kazanim_metni: "Geometrik cisimleri tanır ve isimlendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir futbol topu hangi geometrik cisme benzer?`,
        secenekler: { A: "Küp", B: "Küre", C: "Silindir", D: "Koni" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Köşeli cisimler", "Farklı yuvarlak cisimler"],
        gercek_yasam_baglantisi: "Çevremizdeki nesneleri (kutu, top, konserve kutusu) geometrik cisimlere benzeterek tanıyabiliriz.",
        seviye: 'temel', cozum_anahtari: "Futbol topu yuvarlak olduğu için küreye benzer."
    }))
  },
  "M.1.2.2.2": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri tanır ve isimlendirir.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.2.2", kazanim_metni: "Geometrik şekilleri tanır ve isimlendirir.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `3 kenarı ve 3 köşesi olan geometrik şekil hangisidir?`,
        secenekler: { A: "Kare", B: "Dikdörtgen", C: "Daire", D: "Üçgen" },
        dogru_cevap: "D",
        yanlis_secenek_tipleri: ["4 kenarlı şekiller", "Kenarı olmayan şekil"],
        gercek_yasam_baglantisi: "Trafik işaretleri veya evlerin çatıları gibi nesnelerin şekillerini tanımak önemlidir.",
        seviye: 'temel', cozum_anahtari: "Üçgenin 3 kenarı ve 3 köşesi vardır."
    }))
  },
  "M.1.2.3.1": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.3.1", kazanim_metni: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kırmızı boncuk, Mavi boncuk, Kırmızı boncuk, Mavi boncuk, ? ...  Örüntüsünde sıradaki boncuk ne renk olmalıdır?`,
        secenekler: { A: "Sarı", B: "Kırmızı", C: "Mavi", D: "Yeşil" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Örüntüde olmayan renk", "Önceki renk"],
        gercek_yasam_baglantisi: "Müzikteki ritimler, kazağımızdaki desenler veya çitlerin dizilişi birer örüntüdür.",
        seviye: 'orta', cozum_anahtari: "Örüntü 'Kırmızı, Mavi' şeklinde tekrar etmektedir. Mavi'den sonra Kırmızı gelmelidir."
    }))
  },
  "M.1.3.1.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Uzunlukları standart olmayan birimlerle ölçer.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.1.1", kazanim_metni: "Uzunlukları standart olmayan birimlerle ölçer.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Kitabımızın boyunu ölçmek için hangisini kullanmak en mantıklıdır?`,
        secenekler: { A: "Adım", B: "Kulaç", C: "Karış", D: "Kepçe" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["Çok büyük birimler", "İlgisiz nesne"],
        gercek_yasam_baglantisi: "Elimizdeki bir iple bir masanın kenarını ölçerek, ipi başka yere taşıyıp karşılaştırma yapabiliriz.",
        seviye: 'temel', cozum_anahtari: "Kitap gibi küçük nesneleri ölçmek için karış uygun bir standart olmayan ölçü birimidir."
    }))
  },
  "M.1.3.1.2": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Nesneleri uzunlukları yönünden karşılaştırır ve sıralar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.1.2", kazanim_metni: "Nesneleri uzunlukları yönünden karşılaştırır ve sıralar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Bir kalem, bir silgi ve bir cetvel arasında en uzun olan genellikle hangisidir?`,
        secenekler: { A: "Silgi", B: "Kalem", C: "Cetvel", D: "Hepsi eşit" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["En kısa olan", "Ortada olan", "Yanlış varsayım"],
        gercek_yasam_baglantisi: "Boy sırasına girerken veya farklı uzunluktaki ipleri sıralarken bu beceriyi kullanırız.",
        seviye: 'temel', cozum_anahtari: "Genellikle bir cetvel, bir kalemden ve silgiden daha uzundur."
    }))
  },
  "M.1.3.2.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Paralarımızı tanır.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.2.1", kazanim_metni: "Paralarımızı tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Aşağıdakilerden hangisi en değerli madeni paramızdır?`,
        secenekler: { A: "10 Kuruş", B: "25 Kuruş", C: "50 Kuruş", D: "1 Lira" },
        dogru_cevap: "D",
        yanlis_secenek_tipleri: ["Daha küçük değerli paralar"],
        gercek_yasam_baglantisi: "Markete gittiğimizde ürün almak için paraları tanımamız ve doğru miktarı vermemiz gerekir.",
        seviye: 'temel', cozum_anahtari: "1 Lira, kuruşlardan daha değerlidir. 1 Lira, 100 kuruşa eşittir."
    }))
  },
  "M.1.3.3.1": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Zaman ölçme birimlerini tanır.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.1.3.3.1", kazanim_metni: "Zaman ölçme birimlerini tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Okula gittiğimiz zaman dilimi genellikle hangisidir?`,
        secenekler: { A: "Gece", B: "Sabah", C: "Akşam", D: "Öğlen" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Okul dışı zaman dilimleri"],
        gercek_yasam_baglantisi: "Günlük planlarımızı 'sabah kahvaltı, öğlen okul, akşam uyku' gibi zaman birimlerine göre yaparız.",
        seviye: 'temel', cozum_anahtari: "Okul günü genellikle sabah saatlerinde başlar."
    }))
  },
  "M.1.3.3.2": {
    gradeName: "1. Sınıf", unitName: "Ölçme", kazanimName: "Tam saatleri okur.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.1.4.1.1": {
      gradeName: "1. Sınıf", unitName: "Veri İşleme", kazanimName: "En çok iki veri grubuna ait basit tabloları okur.",
      questions: Array.from({length: 20}, (_, i) => {
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
    })
  },

  // =================================================================
  // 2. SINIF
  // =================================================================
   "M.2.1.1.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    })
  },
  "M.2.1.1.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıların basamaklarını adlandırır, basamaklarındaki rakamların basamak değerlerini belirtir.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    }).filter(Boolean) as ArchiveQuiz['questions']
  },
    "M.2.1.1.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıları karşılaştırır ve sıralar.",
    questions: Array.from({ length: 20 }, (_, i) => {
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
    }).filter(Boolean) as ArchiveQuiz['questions']
  },
  "M.2.1.1.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’den küçük doğal sayıları en yakın onluğa yuvarlar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num = 16 + i;
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
    })
  },
  "M.2.1.2.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 47 + (i % 10);
        const num2 = 25 + (i % 10);
        const answer = num1 + num2 >= 100 ? 99 : num1+num2;
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
    })
  },
  "M.2.1.2.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 38 + i;
        const num2 = 41 + i;
        const estimatedAnswer = Math.round(num1 / 10) * 10 + Math.round(num2 / 10) * 10;
        const options = createNumericOptions(estimatedAnswer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(estimatedAnswer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.2", kazanim_metni: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${num1} + ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
            gercek_yasam_baglantisi: "Alışveriş sepetimizdeki ürünlerin yaklaşık toplam fiyatını tahmin ederek kasada ne ödeyeceğimizi kestirebiliriz.",
            seviye: 'orta', cozum_anahtari: `Sayıları en yakın onluğa yuvarlarız: ${num1} → ${Math.round(num1/10)*10}, ${num2} → ${Math.round(num2/10)*10}. Tahmini toplam ${Math.round(num1/10)*10} + ${Math.round(num2/10)*10} = ${estimatedAnswer}.`
        }
    })
  },
  "M.2.1.2.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden toplama işlemi yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 30 + (i % 5 * 10);
        const num2 = 18 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.3", kazanim_metni: "Zihinden toplama işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${num1} + ${num2} işlemini zihinden yaparsak sonuç kaç olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış toplama", "Birlikleri unutma", "Yakın bir onluk"],
            gercek_yasam_baglantisi: "Bir oyunda hızlıca puanları toplamak için zihinden toplama becerimizi kullanırız.",
            seviye: 'orta', cozum_anahtari: `Önce onlukları toplarız (${num1} + 10 = ${num1+10}), sonra kalan birliği (${num2-10}) ekleriz (${num1+10} + ${num2-10} = ${answer}).`
        }
    })
  },
  "M.2.1.2.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işlemi gerektiren problemleri çözer.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 25 + i;
        const num2 = 15 + i;
        const answer = num1 + num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.4", kazanim_metni: "Toplama işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: Kerem'in ${num1} misketi vardı. Arkadaşı ona ${num2} misket daha verdi. Kerem'in toplam kaç misketi oldu?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Çıkarma yapma", "Sadece bir sayıyı cevap verme", "Elde hatası"],
            gercek_yasam_baglantisi: "Kumbaramızdaki paraya yeni eklenen parayı ekleyerek toplam birikimimizi bulabiliriz.",
            seviye: 'ileri', cozum_anahtari: `Başlangıçtaki misket sayısına (${num1}) eklenen misket sayısı (${num2}) toplanır. ${num1} + ${num2} = ${answer}.`
        }
    })
  },
  "M.2.1.3.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 82 + i;
        const num2 = 35 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.1", kazanim_metni: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: Bir manavda ${num1} karpuz vardı. Gün içinde ${num2} tanesi satıldı. Geriye kaç karpuz kaldı?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onluk bozmayı unutma", "Küçükten büyüğü çıkarma", "Toplama yapma"],
            gercek_yasam_baglantisi: "Harcadığımız paradan sonra cüzdanımızda ne kadar kaldığını çıkarma işlemiyle buluruz.",
            seviye: 'orta', cozum_anahtari: `Toplam karpuz sayısından (${num1}) satılan karpuz sayısı (${num2}) çıkarılır. Onluk bozma gerekebilir. ${num1} - ${num2} = ${answer}.`
        }
    })
  },
  "M.2.1.3.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 88 - i;
        const num2 = 31 + i;
        const estimatedAnswer = Math.round(num1 / 10) * 10 - Math.round(num2 / 10) * 10;
        const options = createNumericOptions(estimatedAnswer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(estimatedAnswer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.2", kazanim_metni: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${num1} - ${num2} işleminin tahmini sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Sadece bir sayıyı yuvarlama", "Gerçek sonuç", "Yanlış yuvarlama"],
            gercek_yasam_baglantisi: "İki ürün arasındaki fiyat farkını yaklaşık olarak tahmin etmek için bu beceriyi kullanırız.",
            seviye: 'orta', cozum_anahtari: `Sayıları en yakın onluğa yuvarlarız: ${num1} → ${Math.round(num1/10)*10}, ${num2} → ${Math.round(num2/10)*10}. Tahmini fark ${Math.round(num1/10)*10} - ${Math.round(num2/10)*10} = ${estimatedAnswer}.`
        }
    })
  },
  "M.2.1.3.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Zihinden çıkarma işlemi yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 70 + (i % 3 * 10);
        const num2 = 25 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.3", kazanim_metni: "Zihinden çıkarma işlemi yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${num1} - ${num2} işlemini zihinden yaparsak sonuç kaç olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Onlukları yanlış çıkarma", "Geriye yanlış sayma", "Yakın bir onluk"],
            gercek_yasam_baglantisi: "Para üstü alırken doğru alıp almadığımızı zihinden çıkarma yaparak hızlıca kontrol edebiliriz.",
            seviye: 'orta', cozum_anahtari: `${num1}'dan önce onlukları çıkarırız (${num1} - 20 = ${num1-20}), sonra kalan birliği çıkarırız (${num1-20} - 5 = ${answer}).`
        }
    })
  },
  "M.2.1.3.4": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çıkarma işlemi gerektiren problemleri çözer.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 95 - i;
        const num2 = 38 + i;
        const answer = num1 - num2;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.3.4", kazanim_metni: "Çıkarma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: 95 sayfalık bir kitabın ${38} sayfasını okuyan Elif'in okuması gereken kaç sayfası kalmıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplama yapma", "Verilen sayılardan birini cevap verme", "Onluk bozma hatası"],
            gercek_yasam_baglantisi: "Okuduğumuz bir kitabın bitmesine kaç sayfa kaldığını hesaplamak için çıkarma yaparız.",
            seviye: 'ileri', cozum_anahtari: `Toplam sayfa sayısından (${num1}) okunan sayfa sayısı (${num2}) çıkarılır. ${num1} - ${num2} = ${answer}.`
        }
    })
  },
  "M.2.1.4.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 4 + (i % 4);
        const num2 = 5 + (i % 3);
        const repeatedSum = Array(num1).fill(num2).join(' + ');
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.1", kazanim_metni: "Çarpma işleminin tekrarlı toplama olduğunu anlar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${repeatedSum} toplama işleminin çarpma işlemi olarak gösterimi hangisidir?`,
            secenekler: { A: `${num1} x ${num1}`, B: `${num1} x ${num2}`, C: `${num2} x ${num2}`, D: `${num1} + ${num2}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Sayıları karıştırma", "Toplama olarak bırakma", "Yanlış sayıyla çarpma"],
            gercek_yasam_baglantisi: "Her birinde aynı sayıda şeker olan birkaç paketteki toplam şeker sayısını bulmak için çarpma kullanırız.",
            seviye: 'temel', cozum_anahtari: `${num1} tane ${num2}'nin toplanması, ${num1} çarpı ${num2} demektir.`
        }
    })
  },
  "M.2.1.4.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpım tablosunu oluşturur.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 3 + (i % 7);
        const num2 = 4 + (i % 6);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 8);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.2", kazanim_metni: "Çarpım tablosunu oluşturur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${num1} x ${num2} işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yakın bir çarpım sonucu", "Toplama yapma", "Ezber hatası"],
            gercek_yasam_baglantisi: "Çarpım tablosunu bilmek, alışverişte veya yemek tariflerinde miktarları hesaplarken bize hız kazandırır.",
            seviye: 'orta', cozum_anahtari: `${num1} kere ${num2}, ${answer} eder. Bu, çarpım tablosundaki temel bir bilgidir.`
        }
    })
  },
  "M.2.1.4.3": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Çarpma işlemi gerektiren problemleri çözer.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const num1 = 6 + (i % 5);
        const num2 = 8 + (i % 4);
        const answer = num1 * num2;
        const options = createNumericOptions(answer, 10);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.4.3", kazanim_metni: "Çarpma işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: Her birinde ${num2} yumurta bulunan ${num1} koli yumurta alan bir pastacı, toplam kaç yumurta almıştır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplama yapma", "Yanlış sayılarla çarpma", "Yakın sonuç"],
            gercek_yasam_baglantisi: "Birkaç arkadaşımıza eşit sayıda bilye dağıtacağımızda toplam kaç bilye gerektiğini çarparak buluruz.",
            seviye: 'ileri', cozum_anahtari: `Koli sayısı (${num1}) ile her kolideki yumurta sayısı (${num2}) çarpılarak toplam yumurta sayısı bulunur: ${num1} x ${num2} = ${answer}.`
        }
    })
  },
  "M.2.1.5.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işleminin anlamını kavrar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const total = 12 + (i % 9);
        const groups = 3 + (i % 3);
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.1", kazanim_metni: "Bölme işleminin anlamını kavrar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${total} tane kalemi ${groups} arkadaşa eşit olarak paylaştırmak için hangi işlem yapılır?`,
            secenekler: { A: "Toplama", B: "Çıkarma", C: "Çarpma", D: "Bölme" },
            dogru_cevap: 'D',
            yanlis_secenek_tipleri: ["Ters işlem (çarpma)", "İlgisiz işlemler"],
            gercek_yasam_baglantisi: "Bir pastayı arkadaşlarımızla eşit dilimlere ayırmak bir bölme işlemidir.",
            seviye: 'temel', cozum_anahtari: "Eşit olarak paylaştırma veya gruplama durumları bölme işlemi ile çözülür."
        }
    })
  },
  "M.2.1.5.2": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bölme işlemi gerektiren problemleri çözer.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const groups = 4 + (i % 3);
        const perGroup = 5 + (i % 4);
        const total = groups * perGroup;
        const options = createNumericOptions(perGroup, 3);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(perGroup)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.5.2", kazanim_metni: "Bölme işlemi gerektiren problemleri çözer.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${total} ceviz, ${groups} sincaba eşit olarak paylaştırılırsa her bir sincaba kaç ceviz düşer?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Toplam ceviz sayısı", "Sincap sayısı", "Çarpma yapma"],
            gercek_yasam_baglantisi: "Elimizdeki parayla tanesi belli bir fiyattan olan şekerlerden kaç tane alabileceğimizi bölme ile buluruz.",
            seviye: 'ileri', cozum_anahtari: `Toplam ceviz sayısı (${total}), sincap sayısına (${groups}) bölünür. ${total} ÷ ${groups} = ${perGroup}.`
        }
    })
  },
  "M.2.2.1.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.1.1", kazanim_metni: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: Aşağıdaki geometrik şekillerden hangisinin köşe sayısı diğerlerinden farklıdır?`,
        secenekler: { A: "Kare", B: "Dikdörtgen", C: "Üçgen", D: "Dörtgen" },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Aynı köşe sayısına sahip şekiller"],
        gercek_yasam_baglantisi: "Binaların pencereleri (dikdörtgen), trafik levhaları (üçgen) gibi nesneleri şekillerine göre gruplayabiliriz.",
        seviye: 'temel', cozum_anahtari: "Kare, dikdörtgen ve dörtgenin 4 köşesi varken, üçgenin 3 köşesi vardır."
    }))
  },
  "M.2.2.2.1": {
    gradeName: "2. Sınıf", unitName: "Geometri", kazanimName: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.2.2.2.1", kazanim_metni: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: ▲, ●, ●, ▲, ●, ●, ? örüntüsünde '?' yerine hangi şekil gelmelidir?`,
        secenekler: { A: "▲", B: "●", C: "■", D: "▲●" },
        dogru_cevap: 'A',
        yanlis_secenek_tipleri: ["Örüntüdeki farklı bir eleman", "Örüntüde olmayan bir eleman", "Birden fazla eleman"],
        gercek_yasam_baglantisi: "Dans adımları, şarkı nakaratları veya kaldırım taşlarının dizilişi gibi tekrarlayan durumlar birer örüntüdür.",
        seviye: 'orta', cozum_anahtari: "Örüntünün kuralı 'bir üçgen, iki daire' şeklindedir. İki daireden sonra tekrar üçgen gelmelidir."
    }))
  },
   "M.2.3.1.1": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Standart uzunluk ölçme birimlerini tanır.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.1", kazanim_metni: "Standart uzunluk ölçme birimlerini tanır.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: Bir kapının boyunu ölçmek için en uygun standart ölçme aracı hangisidir?`,
        secenekler: { A: "Cetvel", B: "Metre", C: "Karış", D: "Adım" },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Daha küçük ölçme aracı", "Standart olmayan birimler"],
        gercek_yasam_baglantisi: "Bir mobilya alırken odamıza sığıp sığmayacağını anlamak için metreyi kullanırız.",
        seviye: 'temel', cozum_anahtari: "Kapı gibi büyük nesnelerin uzunluğunu ölçmek için metre kullanmak en uygunudur."
    }))
  },
  "M.2.3.1.2": {
    gradeName: "2. Sınıf", unitName: "Ölçme", kazanimName: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const meters = 1 + (i % 5);
        const cm = meters * 100;
        return {
            sinif: 2, unite_adi: "Ölçme", unite_no: 3, kazanim_kodu: "M.2.3.1.2", kazanim_metni: "Metre ve santimetre arasındaki ilişkiyi açıklar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${meters} metre kaç santimetredir?`,
            secenekler: { A: `${meters}`, B: `${meters*10}`, C: `${meters*100}`, D: `${meters*1000}` },
            dogru_cevap: 'C',
            yanlis_secenek_tipleri: ["Birimleri karıştırma", "Yanlış sıfır ekleme"],
            gercek_yasam_baglantisi: "Kumaş alırken veya boyumuzu ölçerken metre ve santimetre arasındaki ilişkiyi kullanırız.",
            seviye: 'orta', cozum_anahtari: `1 metre 100 santimetreye eşittir. Bu nedenle ${meters} metre, ${cm} santimetredir.`
        }
    })
  },
  "M.2.4.1.1": {
      gradeName: "2. Sınıf",
      unitName: "Veri İşleme", 
      kazanimName: "Veri toplar ve çetele tablosu oluşturur.",
      questions: Array.from({length: 20}, (_, i) => {
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
      })
  },
  "M.2.4.1.2": {
    gradeName: "2. Sınıf",
    unitName: "Veri İşleme",
    kazanimName: "Nesne ve şekil grafiği oluşturur.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const data = {
            'Elma': 3 + (i % 3),
            'Armut': 5 - (i % 3),
            'Kiraz': 4 + (i % 2)
        };
        const leastPopular = Object.keys(data).reduce((a, b) => data[a as keyof typeof data] < data[b as keyof typeof data] ? a : b);
        
        const options: { [key: string]: string } = { A: "Elma", B: "Armut", C: "Kiraz", D: "Muz" };
        const correctAnswerKey = Object.keys(options).find(key => options[key] === leastPopular) || 'A';

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
    })
  },
};
