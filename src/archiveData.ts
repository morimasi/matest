
import { ArchiveQuiz } from './types';

// Helper function to create realistic options for calculation questions
const createNumericOptions = (correctAnswer: number) => {
  const options: number[] = [correctAnswer];
  while (options.length < 4) {
    const randomFactor = Math.random() < 0.5 ? -1 : 1;
    let newOption = correctAnswer + (randomFactor * (Math.floor(Math.random() * 5) + 1));
    if (newOption < 0) newOption = 0; // Prevent negative numbers for primary school
    if (!options.includes(newOption)) {
      options.push(newOption);
    }
  }
  // Shuffle the options
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
            soru_metni: `Soru ${i + 1}: Resimdeki ${count} tane çiçeği gösteren rakam hangisidir?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Bir eksik sayma", "Bir fazla sayma", "Yakın bir sayı"],
            gercek_yasam_baglantisi: "Alışverişte para sayarken veya oyuncaklarımızı sayarken nesneleri doğru saymak önemlidir.",
            seviye: 'temel', cozum_anahtari: `Resimde ${count} çiçek olduğu için doğru cevap ${count} olmalıdır.`
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
            soru_metni: `Soru ${i + 1}: ${start}, ${start + 1}, ___, ${start + 3} ritmik saymasında boş bırakılan yere hangi sayı gelmelidir?`,
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
            soru_metni: `Soru ${i + 1}: Yazıyla "${words[num - 10]}" olarak okunan sayı hangisidir?`,
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
        const num1 = 5 + i;
        const num2 = 12;
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.4", kazanim_metni: "20 içinde iki sayıyı karşılaştırır ve aralarındaki ilişkiyi “büyük”, “küçük”, “eşit” ifadeleriyle belirtir.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i + 1}: ${num1} sayısı, ${num2} sayısından ..... . Cümlesindeki boşluğa ne gelmelidir?`,
            secenekler: { A: "büyüktür", B: "küçüktür", C: "eşittir", D: "yakındır" },
            dogru_cevap: num1 > num2 ? 'A' : (num1 < num2 ? 'B' : 'C'),
            yanlis_secenek_tipleri: ["Tersi ilişki", "Eşitlik varsayımı", "İlgisiz kavram"],
            gercek_yasam_baglantisi: "İki arkadaşın bilye sayılarını karşılaştırarak kimin daha fazla olduğunu bulabiliriz.",
            seviye: 'orta', cozum_anahtari: `Sayı doğrusunda ${num1}, ${num2}'den önce geldiği için daha küçüktür.`
        }
    })
  },
  "M.1.1.1.5": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Sıra bildiren sayıları sözlü olarak ifade eder.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.1.5", kazanim_metni: "Sıra bildiren sayıları sözlü olarak ifade eder.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: Bir yarışta Ali 5. (beşinci) olmuştur. Ondan hemen sonra gelen Ayşe kaçıncı olmuştur?`,
        secenekler: { A: "Dördüncü", B: "Beşinci", C: "Altıncı", D: "Yedinci" },
        dogru_cevap: "C",
        yanlis_secenek_tipleri: ["Önceki sıra", "Aynı sıra", "İki sonraki sıra"],
        gercek_yasam_baglantisi: "Apartmanda oturduğumuz katı veya bir sırada beklerken yerimizi belirtmek için sıra sayılarını kullanırız.",
        seviye: 'temel', cozum_anahtari: "Beşinciden sonra altıncı sıra gelir."
    }))
  },
  "M.1.1.2.1": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplama işleminin anlamını kavrar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.1", kazanim_metni: "Toplama işleminin anlamını kavrar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: 5 elmaya 3 elma daha eklersek, bu durumu hangi işlemle ifade ederiz?`,
        secenekler: { A: "5 - 3", B: "5 + 3", C: "5 x 3", D: "5 / 3" },
        dogru_cevap: "B",
        yanlis_secenek_tipleri: ["Çıkarma işlemi", "Çarpma işlemi", "Bölme işlemi"],
        gercek_yasam_baglantisi: "Toplama, iki veya daha fazla grup nesneyi bir araya getirdiğimizde toplam miktarı bulmamızı sağlar.",
        seviye: 'temel', cozum_anahtari: "Ekleme, artırma gibi durumlar toplama işlemi ile ifade edilir."
    }))
  },
    "M.1.1.2.2": {
    gradeName: "1. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const answer = 15;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'B';
        return {
            sinif: 1, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.1.1.2.2", kazanim_metni: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: 7 + 8 işleminin sonucu kaçtır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Eldeyi unutma", "Yanlış sayma", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Kumbaramıza para eklediğimizde toplam ne kadar paramız olduğunu toplama ile buluruz.",
            seviye: 'orta', cozum_anahtari: "7 ile 8'i topladığımızda sonuç 15 olur."
        }
    })
  },
  // ... Tüm 1. sınıf kazanımları bu şekilde doldurulur ...
  "M.1.4.1.1": {
      gradeName: "1. Sınıf", unitName: "Veri İşleme", kazanimName: "En çok iki veri grubuna ait basit tabloları okur.",
      questions: Array.from({length: 20}, (_, i) => ({
          sinif: 1, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.1.4.1.1", kazanim_metni: "En çok iki veri grubuna ait basit tabloları okur.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Soru ${i+1}: Bir çiftlikteki hayvanların sayısı tabloda gösterilmiştir.\n\n+----------+--------+\n| Hayvan   | Sayısı |\n+----------+--------+\n| İnek     |    ${5+i % 5}    |\n| Tavuk    |    ${8+i % 5}    |\n+----------+--------+\n\nTabloya göre çiftlikte kaç tane tavuk vardır?`,
          secenekler: { A: `${5+i % 5}`, B: `${6+i % 5}`, C: `${7+i % 5}`, D: `${8+i % 5}` },
          dogru_cevap: 'D',
          yanlis_secenek_tipleri: ["Diğer hayvanın sayısı", "Yakın sayı", "Yanlış satırı okuma"],
          gercek_yasam_baglantisi: "Sınıf listesi veya ders programı gibi tabloları okuyarak bilgileri kolayca bulabiliriz.",
          seviye: 'temel', cozum_anahtari: `Tabloda 'Tavuk' satırının karşısında ${8+i % 5} yazdığı için doğru cevap budur.`
      }))
  },

  // =================================================================
  // 2. SINIF
  // =================================================================
   "M.2.1.1.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.1.1", kazanim_metni: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: 20'den başlayarak ileriye doğru onar ritmik sayarken dördüncü söylenen sayı hangisidir?`,
        secenekler: { A: "40", B: "50", C: "60", D: "30" },
        dogru_cevap: 'B',
        yanlis_secenek_tipleri: ["Üçüncü sayı", "Beşinci sayı", "İkinci sayı"],
        gercek_yasam_baglantisi: "Para sayarken (10'ar TL) veya saatleri söylerken (5'er dakika) ritmik sayma kullanırız.",
        seviye: 'temel', cozum_anahtari: "20'den başlayarak onar sayma: 20 (birinci), 30 (ikinci), 40 (üçüncü), 50 (dördüncü). Doğru cevap 50'dir."
    }))
  },
  "M.2.1.2.1": {
    gradeName: "2. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const answer = 72;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'A';
        return {
            sinif: 2, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.2.1.2.1", kazanim_metni: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: Bir okulda 47 kız öğrenci ve 25 erkek öğrenci vardır. Okulda toplam kaç öğrenci vardır?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Elde eklemeyi unutma", "Basamak kaydırma hatası", "Çıkarma yapma"],
            gercek_yasam_baglantisi: "Market alışverişi sonrası fişteki ürünlerin toplam fiyatını hesaplamak için toplama yaparız.",
            seviye: 'orta', cozum_anahtari: "47 ile 25'i toplarken önce birlikler (7+5=12), sonra onluklar (40+20=60) toplanır. Elde olan 10'luk da eklenince 60+12=72 bulunur."
        }
    })
  },
    // ... Tüm 2. sınıf kazanımları bu şekilde doldurulur ...
    "M.2.4.1.2": {
      gradeName: "2. Sınıf", unitName: "Veri İşleme", kazanimName: "Nesne ve şekil grafiği oluşturur.",
      questions: Array.from({length: 20}, (_, i) => ({
          sinif: 2, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.2.4.1.2", kazanim_metni: "Nesne ve şekil grafiği oluşturur.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Soru ${i+1}: Bir bahçedeki çiçekleri gösteren nesne grafiği aşağıdadır.\nHer 🌸 bir çiçeği göstermektedir.\n\nGül  : 🌸🌸🌸🌸🌸\nPapatya: 🌸🌸🌸\nLale : 🌸🌸🌸🌸\n\nGrafiğe göre bahçede en çok hangi çiçekten vardır?`,
          secenekler: { A: "Gül", B: "Papatya", C: "Lale", D: "Menekşe" },
          dogru_cevap: 'A',
          yanlis_secenek_tipleri: ["En az olan", "Diğer bir seçenek", "Grafikte olmayan"],
          gercek_yasam_baglantisi: "Hava durumu takvimi veya davranış panosu gibi grafikler bilgileri görsel olarak anlamamıza yardımcı olur.",
          seviye: 'temel', cozum_anahtari: "Grafikte en çok nesne (5 tane 🌸) Gül çiçeğinin sırasında olduğu için cevap Gül'dür."
      }))
  },

  // =================================================================
  // 3. SINIF
  // =================================================================
   "M.3.1.1.1": {
    gradeName: "3. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Üç basamaklı doğal sayıları okur ve yazar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 3, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.3.1.1.1", kazanim_metni: "Üç basamaklı doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: "Beş yüz on yedi" sayısının rakamlarla yazılışı hangisidir?`,
        secenekler: { A: "571", B: "175", C: "517", D: "715" },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Basamakları karıştırma", "Sayıları ters yazma"],
        gercek_yasam_baglantisi: "Apartman numaralarını, ev adreslerini veya ürün fiyatlarını okurken üç basamaklı sayıları kullanırız.",
        seviye: 'temel', cozum_anahtari: "'Beş yüz' 5'i yüzler basamağına, 'on yedi' ise 17'yi onlar ve birler basamağına yerleştirmeyi ifade eder: 517."
    }))
  },
  // ... Tüm 3. sınıf kazanımları ...
  "M.3.4.1.1": {
      gradeName: "3. Sınıf", unitName: "Veri İşleme", kazanimName: "Nesne ve şekil grafikleri oluşturur ve yorumlar.",
       questions: Array.from({length: 20}, (_, i) => ({
          sinif: 3, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.3.4.1.1", kazanim_metni: "Nesne ve şekil grafikleri oluşturur ve yorumlar.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Soru ${i+1}: Bir kantinde satılan içecekleri gösteren şekil grafiği aşağıdadır.\nHer 🥤 5 içeceği göstermektedir.\n\nAyran: 🥤🥤🥤🥤\nSüt  : 🥤🥤\nSu   : 🥤🥤🥤🥤🥤\n\nGrafiğe göre kantinde kaç tane ayran satılmıştır?`,
          secenekler: { A: "4", B: "15", C: "20", D: "25" },
          dogru_cevap: 'C',
          yanlis_secenek_tipleri: ["Şekil sayısını doğrudan alma", "Yanlış çarpma", "Başka bir satırın değeri"],
          gercek_yasam_baglantisi: "Grafikler, bir seçimdeki oyları veya bir aydaki hava durumunu karşılaştırmak için kullanılır.",
          seviye: 'orta', cozum_anahtari: "Ayran sırasında 4 adet 🥤 şekli vardır. Her şekil 5 içeceği temsil ettiğine göre, 4 x 5 = 20 ayran satılmıştır."
      }))
  },

  // =================================================================
  // 4. SINIF
  // =================================================================
   "M.4.1.1.1": {
    gradeName: "4. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 4, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.4.1.1.1", kazanim_metni: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: "On iki bin üç yüz dört" sayısının rakamlarla yazılışı hangisidir?`,
        secenekler: { A: "1234", B: "12340", C: "12304", D: "12034" },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Boş basamağa sıfır koymama", "Sıfırı yanlış yere koyma", "Basamak değeri hatası"],
        gercek_yasam_baglantisi: "Nüfus sayımlarını, araba fiyatlarını veya büyük şehirler arası mesafeleri ifade ederken büyük sayıları kullanırız.",
        seviye: 'temel', cozum_anahtari: "'On iki bin' 12'yi binler bölüğüne, 'üç yüz dört' ise 304'ü birler bölüğüne yerleştirmeyi ifade eder: 12.304."
    }))
  },
  // ... Tüm 4. sınıf kazanımları ...
  "M.4.4.1.1": {
      gradeName: "4. Sınıf", unitName: "Veri İşleme", kazanimName: "Sütun grafiği oluşturur ve yorumlar.",
       questions: Array.from({length: 20}, (_, i) => ({
          sinif: 4, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.4.4.1.1", kazanim_metni: "Sütun grafiği oluşturur ve yorumlar.",
          soru_tipi: 'coktan_secmeli',
          soru_metni: `Soru ${i+1}: Bir okuldaki spor kurslarına katılan öğrenci sayıları sütun grafiğinde verilmiştir.\n\nBasketbol: ████████ (80)\nFutbol   : ██████████ (100)\nVoleybol : ██████ (60)\n\nGrafiğe göre futbol ve voleybol kurslarına katılan toplam öğrenci sayısı kaçtır?`,
          secenekler: { A: "140", B: "160", C: "180", D: "100" },
          dogru_cevap: 'B',
          yanlis_secenek_tipleri: ["Yanlış sütunları toplama", "Sadece bir sütunu okuma", "Üç sütunu da toplama"],
          gercek_yasam_baglantisi: "Sütun grafikleri, aylık gelirimizi ve giderimizi karşılaştırmak veya farklı ürünlerin fiyatlarını görmek için kullanılır.",
          seviye: 'orta', cozum_anahtari: "Grafiğe göre futbol kursuna 100, voleybol kursuna 60 öğrenci katılmıştır. Toplamları 100 + 60 = 160'tır."
      }))
  },

  // =================================================================
  // 5. SINIF
  // =================================================================
   "M.5.1.1.1": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Milyonlu sayıları okur ve yazar.",
    questions: Array.from({ length: 20 }, (_, i) => ({
        sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.1.1", kazanim_metni: "Milyonlu sayıları okur ve yazar.",
        soru_tipi: 'coktan_secmeli',
        soru_metni: `Soru ${i+1}: "İki milyon yüz beş bin kırk" sayısının rakamlarla yazılışı hangisidir?`,
        secenekler: { A: "2.105.400", B: "2.150.040", C: "2.105.040", D: "2.015.040" },
        dogru_cevap: 'C',
        yanlis_secenek_tipleri: ["Boş basamaklara sıfır koymama", "Bölükleri karıştırma", "Sayıları yanlış okuma"],
        gercek_yasam_baglantisi: "Ülkelerin nüfusunu, gezegenlerin uzaklıklarını veya büyük şirketlerin gelirlerini ifade etmek için milyonlu sayılar kullanılır.",
        seviye: 'temel', cozum_anahtari: "Sayı bölüklere ayrılarak yazılır: Milyonlar bölüğü '2', binler bölüğü '105', birler bölüğü '040'. Bu da 2.105.040 sayısını oluşturur."
    }))
  },
  "M.5.1.6.2": {
    gradeName: "5. Sınıf", unitName: "Sayılar ve İşlemler", kazanimName: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
    questions: Array.from({ length: 20 }, (_, i) => {
        const baseNum = 200 + (i*20);
        const percentage = 25;
        const answer = (baseNum * percentage) / 100;
        const options = createNumericOptions(answer);
        const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(answer)) || 'B';
        return {
            sinif: 5, unite_adi: "Sayılar ve İşlemler", unite_no: 1, kazanim_kodu: "M.5.1.6.2", kazanim_metni: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur.",
            soru_tipi: 'coktan_secmeli',
            soru_metni: `Soru ${i+1}: ${baseNum} TL'ye satılan bir ayakkabıya %25 indirim uygulanırsa, indirim miktarı kaç TL olur?`,
            secenekler: options,
            dogru_cevap: correctAnswerKey,
            yanlis_secenek_tipleri: ["Yüzdeyi doğrudan çıkarma", "Yanlış kesre çevirme (örn: 1/5)", "İndirimli fiyatı bulma"],
            gercek_yasam_baglantisi: "Mağazalardaki indirimleri hesaplarken veya bir yemeğin besin değerlerini anlarken yüzdeleri kullanırız.",
            seviye: 'orta', cozum_anahtari: "Bir sayının %25'i çeyreğidir. ${baseNum} sayısını 4'e bölerek ${answer} bulunur. Veya (${baseNum} x 25) / 100 = ${answer} işlemi yapılır."
        }
    })
  },
  // ... Tüm 5. sınıf kazanımları ...
  "M.5.4.1.3": {
      gradeName: "5. Sınıf", unitName: "Veri İşleme", kazanimName: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
       questions: Array.from({length: 20}, (_, i) => {
           const scores = [60, 70, 80 + (i*2)];
           const avg = Math.round(scores.reduce((a,b)=>a+b,0) / scores.length);
           const options = createNumericOptions(avg);
           const correctAnswerKey = Object.keys(options).find(k=>options[k as keyof typeof options] === String(avg)) || 'A';
           return {
                sinif: 5, unite_adi: "Veri İşleme", unite_no: 4, kazanim_kodu: "M.5.4.1.3", kazanim_metni: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar.",
                soru_tipi: 'coktan_secmeli',
                soru_metni: `Soru ${i+1}: Ayşe'nin matematik yazılılarından aldığı notlar 60, 70 ve ${80 + (i*2)}'dir. Ayşe'nin notlarının ortalaması kaçtır?`,
                secenekler: options,
                dogru_cevap: correctAnswerKey,
                yanlis_secenek_tipleri: ["Sayıları toplayıp bölmeme", "En yüksek notu seçme", "Yanlış sayıya bölme"],
                gercek_yasam_baglantisi: "Ders notlarımızın ortalamasını, bir takımın maç başına attığı ortalama gol sayısını hesaplamak için aritmetik ortalama kullanırız.",
                seviye: 'orta', cozum_anahtari: "Verilerin aritmetik ortalamasını bulmak için tüm veriler toplanır (60 + 70 + ${80 + (i*2)} = ${130+80+(i*2)}) ve veri sayısına (3) bölünür. Sonuç ${avg}'dir."
           }
      })
  }
};
