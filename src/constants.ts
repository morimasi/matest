import { Grade } from './types';

export const CURRICULUM_DATA: Grade[] = [
  // 1. Sınıf
  {
    id: 1,
    name: "1. Sınıf",
    units: [
      { 
        id: "1-1", 
        name: "Sayılar ve İşlemler", 
        kazanimlar: [
          { id: "M.1.1.1.1", name: "Nesne sayısı 20’ye kadar (20 dâhil) olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar." },
          { id: "M.1.1.1.2", name: "20’ye kadar olan sayıları ileriye ve geriye doğru birer birer ritmik sayar." },
          { id: "M.1.1.1.3", name: "Rakamları okur ve yazar." },
          { id: "M.1.1.1.4", name: "20 içinde iki sayıyı karşılaştırır ve aralarındaki ilişkiyi “büyük”, “küçük”, “eşit” ifadeleriyle belirtir." },
          { id: "M.1.1.1.5", name: "Sıra bildiren sayıları sözlü olarak ifade eder." },
          { id: "M.1.1.2.1", name: "Toplama işleminin anlamını kavrar." },
          { id: "M.1.1.2.2", name: "Toplamları 20’ye kadar (20 dâhil) olan doğal sayılarla toplama işlemini yapar." },
          { id: "M.1.1.2.3", name: "Toplama işleminde verilmeyen toplananı bulur." },
          { id: "M.1.1.2.4", name: "Zihinden toplama işlemi yapar." },
          { id: "M.1.1.3.1", name: "Çıkarma işleminin anlamını kavrar." },
          { id: "M.1.1.3.2", name: "20’ye kadar (20 dâhil) olan doğal sayılarla çıkarma işlemini yapar." },
          { id: "M.1.1.3.3", name: "Çıkarma işleminde verilmeyen terimleri bulur." },
        ] 
      },
      { 
        id: "1-2", 
        name: "Geometri", 
        kazanimlar: [
          { id: "M.1.2.1.1", name: "Uzamsal ilişkileri ifade eder." }, 
          { id: "M.1.2.2.1", name: "Geometrik cisimleri tanır ve isimlendirir." },
          { id: "M.1.2.2.2", name: "Geometrik şekilleri tanır ve isimlendirir." },
          { id: "M.1.2.3.1", name: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar." },
        ] 
      },
      { 
        id: "1-3", 
        name: "Ölçme", 
        kazanimlar: [
          { id: "M.1.3.1.1", name: "Uzunlukları standart olmayan birimlerle ölçer." },
          { id: "M.1.3.1.2", name: "Nesneleri uzunlukları yönünden karşılaştırır ve sıralar." },
          { id: "M.1.3.2.1", name: "Paralarımızı tanır." },
          { id: "M.1.3.3.1", name: "Zaman ölçme birimlerini tanır." },
          { id: "M.1.3.3.2", name: "Tam saatleri okur." },
        ] 
      },
       { 
        id: "1-4", 
        name: "Veri İşleme", 
        kazanimlar: [
          { id: "M.1.4.1.1", name: "En çok iki veri grubuna ait basit tabloları okur." }
        ] 
      },
    ],
  },
  // 2. Sınıf
  {
    id: 2,
    name: "2. Sınıf",
    units: [
      { 
        id: "2-1", 
        name: "Sayılar ve İşlemler", 
        kazanimlar: [
          { id: "M.2.1.1.1", name: "100’e kadar olan doğal sayıları ileriye doğru birer, beşer ve onar ritmik sayar." }, 
          { id: "M.2.1.1.2", name: "100’den küçük doğal sayıların basamaklarını adlandırır, basamaklarındaki rakamların basamak değerlerini belirtir." },
          { id: "M.2.1.1.3", name: "100’den küçük doğal sayıları karşılaştırır ve sıralar." },
          { id: "M.2.1.1.4", name: "100’den küçük doğal sayıları en yakın onluğa yuvarlar." },
          { id: "M.2.1.2.1", name: "Toplamları 100’e kadar (100 dâhil) olan doğal sayılarla eldesiz ve eldeli toplama işlemini yapar." }, 
          { id: "M.2.1.2.2", name: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır." },
          { id: "M.2.1.2.3", name: "Zihinden toplama işlemi yapar." },
          { id: "M.2.1.2.4", name: "Toplama işlemi gerektiren problemleri çözer." },
          { id: "M.2.1.3.1", name: "100’e kadar olan doğal sayılarla onluk bozmayı gerektiren ve gerektirmeyen çıkarma işlemini yapar." }, 
          { id: "M.2.1.3.2", name: "İki sayının farkını tahmin eder ve tahminini işlem sonucuyla karşılaştırır." },
          { id: "M.2.1.3.3", name: "Zihinden çıkarma işlemi yapar." },
          { id: "M.2.1.3.4", name: "Çıkarma işlemi gerektiren problemleri çözer." },
          { id: "M.2.1.4.1", name: "Çarpma işleminin tekrarlı toplama olduğunu anlar." },
          { id: "M.2.1.4.2", name: "Çarpım tablosunu oluşturur." },
          { id: "M.2.1.4.3", name: "Çarpma işlemi gerektiren problemleri çözer." },
          { id: "M.2.1.5.1", name: "Bölme işleminin anlamını kavrar." },
          { id: "M.2.1.5.2", name: "Bölme işlemi gerektiren problemleri çözer." }
        ]
      },
      { 
        id: "2-2", 
        name: "Geometri", 
        kazanimlar: [
          { id: "M.2.2.1.1", name: "Geometrik şekilleri kenar ve köşe sayılarına göre sınıflandırır." },
          { id: "M.2.2.2.1", name: "Bir örüntüdeki ilişkiyi belirler ve örüntüyü tamamlar." }
        ]
      },
      { 
        id: "2-3", 
        name: "Ölçme", 
        kazanimlar: [
          { id: "M.2.3.1.1", name: "Standart uzunluk ölçme birimlerini tanır." },
          { id: "M.2.3.1.2", name: "Metre ve santimetre arasındaki ilişkiyi açıklar." },
          { id: "M.2.3.2.1", name: "Tam, yarım ve çeyrek saatleri okur." },
          { id: "M.2.3.3.1", name: "Paralarımızla ilgili problemleri çözer." },
          { id: "M.2.3.4.1", name: "Nesneleri gram ve kilogram birimleriyle tartar." }
        ]
      },
      { 
        id: "2-4", 
        name: "Veri İşleme", 
        kazanimlar: [
          { id: "M.2.4.1.1", name: "Veri toplar ve çetele tablosu oluşturur." },
          { id: "M.2.4.1.2", name: "Nesne ve şekil grafiği oluşturur." }
        ]
      },
    ],
  },
  // 3. Sınıf
  {
    id: 3,
    name: "3. Sınıf",
    units: [
      { 
        id: "3-1", 
        name: "Sayılar ve İşlemler", 
        kazanimlar: [
          { id: "M.3.1.1.1", name: "Üç basamaklı doğal sayıları okur ve yazar." },
          { id: "M.3.1.1.2", name: "Üç basamaklı doğal sayıların basamak adlarını, basamaklarındaki rakamların basamak değerlerini belirler." },
          { id: "M.3.1.1.3", name: "1000’e kadar olan doğal sayıları karşılaştırır ve sıralar." },
          { id: "M.3.1.1.4", name: "1000’e kadar olan doğal sayıları en yakın onluğa ve yüzlüğe yuvarlar." },
          { id: "M.3.1.1.5", name: "1000 içinde altışar, yedişer, sekizer, dokuzar ileriye ritmik sayar." },
          { id: "M.3.1.2.1", name: "En çok üç basamaklı sayılarla eldesiz ve eldeli toplama işlemini yapar." },
          { id: "M.3.1.2.2", name: "İki sayının toplamını tahmin eder ve tahminini işlem sonucuyla karşılaştırır." },
          { id: "M.3.1.2.3", name: "Toplama işleminin özelliklerini kullanır." },
          { id: "M.3.1.2.4", name: "Toplama işlemi gerektiren problemleri çözer." },
          { id: "M.3.1.3.1", name: "En çok üç basamaklı sayılardan, en çok üç basamaklı sayıları çıkarır." },
          { id: "M.3.1.3.2", name: "Zihinden çıkarma işlemi yapar." },
          { id: "M.3.1.3.3", name: "Çıkarma işlemi gerektiren problemleri çözer." },
          { id: "M.3.1.4.1", name: "Çarpma işleminin özelliklerini kullanır." },
          { id: "M.3.1.4.2", name: "Üç basamaklı bir doğal sayı ile bir basamaklı bir doğal sayıyı çarpar." },
          { id: "M.3.1.4.3", name: "İki basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar." },
          { id: "M.3.1.4.4", name: "Zihinden çarpma işlemi yapar." },
          { id: "M.3.1.4.5", name: "Çarpma işlemi gerektiren problemleri çözer." },
          { id: "M.3.1.5.1", name: "İki basamaklı bir doğal sayıyı bir basamaklı bir doğal sayıya böler." },
          { id: "M.3.1.5.2", name: "Bölme işleminde kalanı yorumlar." },
          { id: "M.3.1.5.3", name: "Bölme işlemi gerektiren problemleri çözer." },
          { id: "M.3.1.6.1", name: "Birim kesirleri tanır ve modellerle gösterir." },
          { id: "M.3.1.6.2", name: "Bir bütünün belirtilen birim kesir kadarını belirler." },
          { id: "M.3.1.6.3", name: "Paydası 10 ve 100 olan kesirleri birim kesir olarak ifade eder." },
        ] 
      },
      { 
        id: "3-2", 
        name: "Geometri", 
        kazanimlar: [
          { id: "M.3.2.1.1", name: "Nokta, doğru, doğru parçası ve ışını açıklar." },
          { id: "M.3.2.1.2", name: "Düzlem ve düzlemsel şekilleri açıklar." },
          { id: "M.3.2.2.1", name: "Açıları isimlendirir ve sınıflandırır." },
          { id: "M.3.2.2.2", name: "Üçgen, kare, dikdörtgeni kenarlarına ve açılarına göre sınıflandırır." },
          { id: "M.3.2.3.1", name: "Tekrarlayan bir geometrik örüntü oluşturur ve örüntünün kuralını açıklar." },
          { id: "M.3.2.4.1", name: "Düzlemsel şekillerin simetri doğrularını belirler ve çizer." },
        ]
      },
      { 
        id: "3-3", 
        name: "Ölçme", 
        kazanimlar: [
          { id: "M.3.3.1.1", name: "Metre ve santimetre arasındaki ilişkiyi fark eder ve birbiri cinsinden yazar." },
          { id: "M.3.3.1.2", name: "Kilometrenin kullanım alanlarını belirtir." },
          { id: "M.3.3.1.3", name: "Uzunluk ölçme birimleriyle ilgili problemleri çözer." },
          { id: "M.3.3.2.1", name: "Şekillerin çevre uzunluğunu hesaplar." },
          { id: "M.3.3.2.2", name: "Çevre uzunlukları ile ilgili problemleri çözer." },
          { id: "M.3.3.3.1", name: "Alanın, standart olmayan birimlerle ölçülebileceğini fark eder." },
          { id: "M.3.3.4.1", name: "Saat, dakika ve saniye arasındaki ilişkiyi açıklar." },
          { id: "M.3.3.4.2", name: "Zaman ölçme birimleriyle ilgili problemleri çözer." },
          { id: "M.3.3.5.1", name: "Lira ve kuruş ilişkisini gösterir." },
          { id: "M.3.3.5.2", name: "Paralarımızla ilgili problemleri çözer." },
          { id: "M.3.3.6.1", name: "Kilogram ve gram arasındaki ilişkiyi fark eder." },
          { id: "M.3.3.6.2", name: "Tartma ile ilgili problemleri çözer." },
          { id: "M.3.3.7.1", name: "Litre ve yarım litreyi kullanır." },
          { id: "M.3.3.7.2", name: "Sıvı ölçme ile ilgili problemleri çözer." },
        ]
      },
      { 
        id: "3-4", 
        name: "Veri İşleme", 
        kazanimlar: [
          { id: "M.3.4.1.1", name: "Nesne ve şekil grafikleri oluşturur ve yorumlar." },
          { id: "M.3.4.1.2", name: "Sıklık tablosu oluşturur." },
        ]
      },
    ],
  },
  // 4. Sınıf
  {
    id: 4,
    name: "4. Sınıf",
    units: [
      { 
        id: "4-1", 
        name: "Sayılar ve İşlemler", 
        kazanimlar: [
          { id: "M.4.1.1.1", name: "4, 5 ve 6 basamaklı doğal sayıları okur ve yazar."},
          { id: "M.4.1.1.2", name: "Milyonlar basamağına kadar olan doğal sayıları okur ve yazar." },
          { id: "M.4.1.1.3", name: "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar." },
          { id: "M.4.1.1.4", name: "Sayı örüntülerindeki ilişkiyi bulur ve örüntüyü genişletir." },
          { id: "M.4.1.2.1", name: "En çok dört basamaklı doğal sayılarla toplama işlemi yapar." },
          { id: "M.4.1.2.2", name: "Zihinden toplama işlemi yapar." },
          { id: "M.4.1.2.3", name: "Toplama işlemi gerektiren problemleri çözer." },
          { id: "M.4.1.3.1", name: "En çok dört basamaklı doğal sayılarla çıkarma işlemi yapar." },
          { id: "M.4.1.3.2", name: "Zihinden çıkarma işlemi yapar." },
          { id: "M.4.1.3.3", name: "Çıkarma işlemi gerektiren problemleri çözer." },
          { id: "M.4.1.4.1", name: "En çok üç basamaklı bir doğal sayı ile en çok iki basamaklı bir doğal sayıyı çarpar." },
          { id: "M.4.1.4.2", name: "Çarpma işleminin sonucunu tahmin eder." },
          { id: "M.4.1.5.1", name: "En çok dört basamaklı bir doğal sayıyı en çok iki basamaklı bir doğal sayıya böler." },
          { id: "M.4.1.5.2", name: "Bölme işleminin sonucunu tahmin eder." },
          { id: "M.4.1.5.3", name: "Zihinden bölme işlemi yapar." },
          { id: "M.4.1.6.1", name: "Basit, bileşik ve tam sayılı kesirleri tanır ve modellerle gösterir." },
          { id: "M.4.1.6.2", name: "Kesirleri karşılaştırır ve sıralar." },
          { id: "M.4.1.6.3", name: "Bir çokluğun belirtilen basit kesir kadarını bulur." },
          { id: "M.4.1.7.1", name: "Kesirlerle toplama ve çıkarma işlemi yapar." },
        ]
      },
      { 
        id: "4-2", 
        name: "Geometri", 
        kazanimlar: [
          { id: "M.4.2.1.1", name: "Açının kenarlarını ve köşesini isimlendirir."},
          { id: "M.4.2.1.2", name: "Açıları standart olmayan birimlerle ölçer ve standart açı ölçme birimlerinin gerekliliğini açıklar." },
          { id: "M.4.2.1.3", name: "Açıları standart birimlerle ölçer." },
          { id: "M.4.2.2.1", name: "Üçgenleri kenar uzunluklarına göre sınıflandırır." },
          { id: "M.4.2.2.2", name: "Üçgenleri açılarına göre sınıflandırır." },
          { id: "M.4.2.2.3", name: "Kare ve dikdörtgenin kenar ve açı özelliklerini belirler." },
          { id: "M.4.2.3.1", name: "Düzlemsel şekillerin simetri doğrularını belirler." },
        ] 
      },
      { 
        id: "4-3", 
        name: "Ölçme", 
        kazanimlar: [
          { id: "M.4.3.1.1", name: "Uzunluk ölçme birimleri ile ilgili problemleri çözer." },
          { id: "M.4.3.1.2", name: "Metre, santimetre ve milimetre arasındaki ilişkiyi açıklar." },
          { id: "M.4.3.1.3", name: "Kilometre ve metre arasındaki ilişkiyi açıklar." },
          { id: "M.4.3.2.1", name: "Kare ve dikdörtgenin çevre uzunlukları ile kenar uzunlukları arasındaki ilişkiyi açıklar." },
          { id: "M.4.3.2.2", name: "Çevre uzunluğu ile ilgili problemleri çözer." },
          { id: "M.4.3.2.3", name: "Üçgenin çevre uzunluğunu hesaplar." },
          { id: "M.4.3.3.1", name: "Dikdörtgenin alanını hesaplar."},
          { id: "M.4.3.3.2", name: "Alanı ile ilgili problemleri çözer." },
          { id: "M.4.3.4.1", name: "Zaman ölçü birimleri arasındaki ilişkiyi açıklar."},
          { id: "M.4.3.4.2", name: "Zaman ölçme birimleri ile ilgili problemleri çözer." },
        ]
      },
      { 
        id: "4-4", 
        name: "Veri İşleme", 
        kazanimlar: [
          { id: "M.4.4.1.1", name: "Sütun grafiği oluşturur ve yorumlar."},
          { id: "M.4.4.1.2", name: "Sütun grafiği, tablo ve diğer grafiklerle gösterilen bilgileri kullanarak günlük hayatla ilgili problemler çözer." },
        ]
      },
    ],
  },
  // 5. Sınıf
  {
    id: 5,
    name: "5. Sınıf",
    units: [
      { 
        id: "5-1", 
        name: "Sayılar ve İşlemler", 
        kazanimlar: [
          { id: "M.5.1.1.1", name: "Milyonlu sayıları okur ve yazar."},
          { id: "M.5.1.1.2", name: "Doğal sayıları en yakın onluğa, yüzlüğe veya binliğe yuvarlar." },
          { id: "M.5.1.1.3", name: "Sayı ve şekil örüntülerinin kuralını bulur ve örüntüyü genişletir." },
          { id: "M.5.1.2.1", name: "Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde strateji belirler ve kullanır." },
          { id: "M.5.1.2.2", name: "Doğal sayılarla çarpma ve bölme işlemlerinin sonuçlarını tahmin eder." },
          { id: "M.5.1.2.3", name: "Bir doğal sayının karesini ve küpünü hesaplar." },
          { id: "M.5.1.2.4", name: "Parantezli işlemleri yapar." },
          { id: "M.5.1.2.5", name: "Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer." },
          { id: "M.5.1.3.1", name: "Kesirleri sıralar." },
          { id: "M.5.1.3.2", name: "Tam sayılı kesri bileşik kesre, bileşik kesri tam sayılı kesre dönüştürür." },
          { id: "M.5.1.4.1", name: "Kesirlerle toplama ve çıkarma işlemi yapar." },
          { id: "M.5.1.4.2", name: "Bir çokluğun belirtilen bir basit kesir kadarını ve basit kesir kadarı verilen bir çokluğun tamamını bulur." },
          { id: "M.5.1.4.3", name: "Kesirlerle toplama ve çıkarma işlemi gerektiren problemleri çözer." },
          { id: "M.5.1.5.1", name: "Ondalık gösterimleri okur ve yazar." },
          { id: "M.5.1.5.2", name: "Ondalık gösterimlerde basamak değerlerini belirler." },
          { id: "M.5.1.5.3", name: "Ondalık gösterimleri verilen sayıları sıralar." },
          { id: "M.5.1.5.4", name: "Ondalık gösterimlerle toplama ve çıkarma işlemi yapar." },
          { id: "M.5.1.6.1", name: "Yüzdeleri, kesir ve ondalık gösterimle ilişkilendirir." },
          { id: "M.5.1.6.2", name: "Bir çokluğun belirtilen bir yüzdesine karşılık gelen miktarı bulur." },
          { id: "M.5.1.6.3", name: "Yüzde ile ilgili problemleri çözer." },
        ] 
      },
      { 
        id: "5-2", 
        name: "Geometri", 
        kazanimlar: [
          { id: "M.5.2.1.1", name: "Temel geometrik kavramları tanır."},
          { id: "M.5.2.1.2", name: "Doğruya, bir noktasından veya dışındaki bir noktadan dikme çizer." },
          { id: "M.5.2.1.3", name: "Bir doğru parçasına paralel bir doğru parçası inşa eder." },
          { id: "M.5.2.2.1", name: "Çokgenleri isimlendirir, oluşturur ve temel elemanlarını tanır."},
          { id: "M.5.2.2.2", name: "Üçgen ve dörtgenlerin iç açılarının ölçüleri toplamını belirler ve verilmeyen açıyı bulur." },
        ]
      },
      { 
        id: "5-3", 
        name: "Ölçme", 
        kazanimlar: [
          { id: "M.5.3.1.1", name: "Uzunluk ölçme birimlerini (km, m, cm, mm) tanır ve birbirine dönüştürür." },
          { id: "M.5.3.1.2", name: "Uzunluk ölçme birimleriyle ilgili problemleri çözer." },
          { id: "M.5.3.1.3", name: "Zaman ölçü birimlerini (yıl, ay, hafta, gün, saat, dakika, saniye) tanır ve birbirine dönüştürür." },
          { id: "M.5.3.1.4", name: "Zaman ölçme birimleriyle ilgili problemleri çözer." },
          { id: "M.5.3.2.1", name: "Dikdörtgenin alanını hesaplar ve santimetrekare (cm²) ile metrekareyi (m²) kullanır." },
          { id: "M.5.3.2.2", name: "Dikdörtgenin alanını hesaplamayı gerektiren problemleri çözer." },
          { id: "M.5.3.2.3", name: "Üçgenin alanını hesaplar." },
          { id: "M.5.3.3.1", name: "Dikdörtgenler prizmasının yüzey alanını hesaplar."},
          { id: "M.5.3.3.2", name: "Dikdörtgenler prizmasının hacmini hesaplar." },
        ]
      },
      { 
        id: "5-4", 
        name: "Veri İşleme", 
        kazanimlar: [
          { id: "M.5.4.1.1", name: "Araştırma soruları üretir, veri toplar ve düzenler."},
          { id: "M.5.4.1.2", name: "Sıklık tablosu ve sütun grafiği oluşturur." },
          { id: "M.5.4.1.3", name: "Bir veri grubuna ait aritmetik ortalamayı hesaplar ve yorumlar." },
        ]
      },
    ],
  },
];