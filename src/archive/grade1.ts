import { ArchiveQuiz, DetailedQuestion } from '../types';
import { createNumericOptions } from './helpers';

export const ARCHIVE_DATA_GRADE_1: Record<string, ArchiveQuiz> = {
  "M.1.1.1.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
    templates: [{ id: 'system-default-M.1.1.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const count = 5 + i;
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
    templates: [{ id: 'system-default-M.1.1.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const start = 8 + i;
        const isForward = i % 2 === 0;
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.2", kazanim_metni: "20’ye kadar olan sayıları ileriye ve geriye doğru birer birer ritmik sayar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: isForward 
              ? `${start}, ${start + 1}, ___, ${start + 3} ileriye doğru ritmik saymada boş bırakılan yere hangi sayı gelmelidir?`
              : `${start}, ${start - 1}, ___, ${start - 3} geriye doğru ritmik saymada boş bırakılan yere hangi sayı gelmelidir?`,
            secenekler: { A: `${start}`, B: isForward ? `${start + 2}`: `${start-2}`, C: isForward ? `${start - 1}` : `${start+1}`, D: `${start + 1}` },
            dogru_cevap: 'B',
            yanlis_secenek_tipleri: ["Önceki sayı", "Sonraki sayı", "Tekrarlanan sayı"],
            gercek_yasam_baglantisi: "Sıraya girerken veya bir oyunda sıra sayarken ritmik sayma becerisini kullanırız.",
            seviye: 'temel', cozum_anahtari: isForward ? `${start + 1}'den sonra ileriye doğru birer ritmik sayarken ${start + 2} gelir.` : `${start - 1}'den sonra geriye doğru birer ritmik sayarken ${start - 2} gelir.`
        }
    })}]
  },
  "M.1.1.1.3": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Rakamları okur ve yazar.",
    templates: [{ id: 'system-default-M.1.1.1.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num = 10 + i;
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
    templates: [{ id: 'system-default-M.1.1.1.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num1 = 5 + (i * 2 % 15);
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
    templates: [{ id: 'system-default-M.1.1.1.5', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const rank = 5 + i;
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
    templates: [{ id: 'system-default-M.1.1.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.1.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num1 = 7 + i;
        const num2 = 8 - (i % 4);
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
    templates: [{ id: 'system-default-M.1.1.2.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const total = 12 + i;
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
    templates: [{ id: 'system-default-M.1.1.2.4', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num1 = 10;
        const num2 = 3 + i;
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
    templates: [{ id: 'system-default-M.1.1.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.1.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
    templates: [{ id: 'system-default-M.1.1.3.3', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const num1 = 18 - i;
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
    templates: [{ id: 'system-default-M.1.2.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.2.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
        const items = ["futbol topu", "kibrit kutusu", "konserve kutusu", "dondurma külahı"];
        const shapes = ["Küp", "Küre", "Silindir", "Koni"];
        const answers = ["Küre", "Küp", "Silindir", "Koni"];
        const currentItem = items[i % 4];
        const currentAnswer = answers[i % 4];
        return {
            sinif: 1, unite_adi: "Geometri", unite_no: 2, kazanim_kodu: "M.1.2.2.1", kazanim_metni: "Geometrik cisimleri tanır ve isimlendirir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Bir ${currentItem} hangi geometrik cisme benzer?`,
            secenekler: { A: shapes[0], B: shapes[1], C: shapes[2], D: shapes[3] },
            dogru_cevap: Object.keys({ A: shapes[0], B: shapes[1], C: shapes[2], D: shapes[3] }).find(key => ({ A: shapes[0], B: shapes[1], C: shapes[2], D: shapes[3] }[key as 'A'|'B'|'C'|'D'] === currentAnswer))!,
            yanlis_secenek_tipleri: ["Köşeli cisimler", "Farklı yuvarlak cisimler"],
            gercek_yasam_baglantisi: "Çevremizdeki nesneleri (kutu, top, konserve kutusu) geometrik cisimlere benzeterek tanıyabiliriz.",
            seviye: 'temel', cozum_anahtari: `${currentItem} şekli ${currentAnswer} cismine benzer.`
        };
    })}]
  },
  "M.1.2.2.2": {
    gradeName: "1. Sınıf", unitName: "Geometri", kazanimName: "Geometrik şekilleri tanır ve isimlendirir.",
    templates: [{ id: 'system-default-M.1.2.2.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.2.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.3.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.3.1.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.3.2.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.3.3.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => ({
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
    templates: [{ id: 'system-default-M.1.3.3.2', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({ length: 10 }, (_, i) => {
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
      templates: [{ id: 'system-default-M.1.4.1.1', createdAt: '2024-01-01T00:00:00.000Z', isSystemTemplate: true, questions: Array.from({length: 10}, (_, i) => {
        const inek = 5+i;
        const tavuk = 8+i;
        const options = createNumericOptions(tavuk);
        const correctAnswerKey = Object.keys(options).find(key => options[key as keyof typeof options] === String(tavuk))!;
        return {
          sinif: 1, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.1.4.1.1", kazanim_metni: "En çok iki veri grubuna ait basit tabloları okur.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Bir çiftlikteki hayvanların sayısı tabloda gösterilmiştir. Tabloya göre çiftlikte kaç tane tavuk vardır?`,
          grafik_verisi: {
            tip: "siklik_tablosu",
            baslik: "Çiftlikteki Hayvanlar",
            veri: [
              { etiket: "İnek", deger: inek },
              { etiket: "Tavuk", deger: tavuk }
            ]
          },
          secenekler: options,
          dogru_cevap: correctAnswerKey,
          yanlis_secenek_tipleri: ["Diğer hayvanın sayısı", "Yakın sayı", "Yanlış satırı okuma"],
          gercek_yasam_baglantisi: "Sınıf listesi veya ders programı gibi tabloları okuyarak bilgileri kolayca bulabiliriz.",
          seviye: 'temel', cozum_anahtari: `Tabloda 'Tavuk' satırının karşısında ${tavuk} yazdığı için doğru cevap budur.`
      }
    })}]
  },
};