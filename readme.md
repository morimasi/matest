2025 MEB İlkokul 1-5. Sınıf Matematik müfredatına uygun, her kazanım için doğru/sağlam/özgün çoktan seçmeli soru üretecek bir “AI-Soru-Üretici” uygulamasına vereceğiniz tek-prompt’u aşağıda bulabilirsiniz.  
Prompt’u kopyalayıp doğrudan GPT, Claude, Gemini vb. modellere yapıştırarak çalıştırabilirsiniz; isterseniz başına “Sen bir ilkokul matematik öğretmensin…” gibi bir rol cümlesi de ekleyebilirsiniz.

--------------------------------------------------
PROMPT BAŞLANGICI
--------------------------------------------------
Görevin  
2025 yılı itibarıyla yürürlükte olan MEB İlkokul (1., 2., 3., 4. ve 5. sınıflar) Matematik dersi öğretim programına (müfredata) sadık kalarak her “kazanım” için 1 adet doğru cevaplı, 3 adet mantıklı yanlış seçenekli, özgün ve gerçek hayatla bağlantılı çoktan seçmeli soru üretmektir.  
Çıktı JSON formatında olacak ve aşağıdaki alanları içerecektir:

{
  "sinif": 1,                 // 1-5 arası tam sayı
  "unite_adi": "Sayılar ve İşlemler",
  "unite_no": 1,              // 1-6 arası
  "kazanim_kodu": "1.1.1.1",
  "kazanim_metni": "20’ye kadar olan doğal sayıları sayar, yazar ve okur.",
  "soru_metni": "Ayşe, 20’ye kadar ritmik sayarken aşağıdaki sayılardan hangisini atlamış olabilir?",
  "secenekler": {
    "A": "12",
    "B": "15",
    "C": "18",
    "D": "21"
  },
  "dogru_cevap": "D",
  "yanlis_secenek_tipleri": ["sık yapılan sayma hatası", "komşu sayı", "toplam 20’yi aşan sayı"],
  "gercek_yasam_baglantisi": "Ritmik sayma becerisi günlük yaşamda merdiven çıkarken, oyun oynarken veya sıra sayılırken kullanılır.",
  "seviye": "temel",          // temel / orta / ileri
  "cozum_anahtari": "20’ye kadar sayarken 21 sayılmaz; 21 doğal sayı kümesine dahil değildir."
}

Kurallar  
1. 2025 MEB müfredatındaki bütün kazanımları sırasıyla dolaş; her kazanım için yalnızca 1 soru üret.  
2. Ünite numarası ve kazanım kodları resmî kaynakla birebir uyumlu olmalıdır.  
3. Soru kökü öğrencinin günlük yaşamından bir durum içersin; soyut, kuramsal ya da üst düzey terimlerden kaçın.  
4. 3 yanlış seçenek gerçekçi olsun; “0”, “1 milyon” gibi aşırı değerler kullanma.  
5. Doğru cevabın yeri rastgele dağıtılmalı (her zaman A olmasın).  
6. “yanlis_secenek_tipleri” alanında her bir distraktörün hangi bilişsel hata/yanılgıyı hedeflediğini yaz.  
7. “gercek_yasam_baglantisi” 1 cümle olsun; açık, net, velinin de anlayacağı düzeyde.  
8. “seviye” kazanımın açıklamasına göre otomatik ata:  
   – kazanımda “sayar, yazar, tanır” ifadesi varsa “temel”,  
   – “ilişkilendirir, model oluşturur, tahmin eder” varsa “orta”,  
   – “çoklu adımlı problemler, strateji geliştirir, geneller” varsa “ileri”.  
9. “cozum_anahtari” öğretmenin panoda kısaca açıklayabileceği 1-2 cümle olsun.  
10. 1., 2., 3., 4. ve 5. sınıflar için toplam yaklaşık 240 kazanım vardır; hepsini eksiksiz dolaş.  
11. Çıktıyı GEOJSONLines (satır satır JSON) formatında ver: her satır 1 soruya ait yukarıdaki JSON objesi olsun.  
12. Türkçe imla ve noktalama kurallarına uy; özel isimlerde üst üste 2 kez aynı isim kullanma (Ayşe, Mehmet, Zeynep, Ali, Defne, Kerem, Elif, Arda, … şeklinde çeşitlendir).  
13. Matematiksel sembolleri ünlemle yazma: ½ yerine “1/2”, 90° yerine “90 derece”, 3⁴ yerine “3 üzeri 4”.  
14. Kökende hiçbir şekilde “Aşağıdakilerden hangisi …” dışında bir kalıp kullanma; zorunlu değilse “işlem” sözcüğünü kullanma.  
15. Ünite adları:  
    1. Sınıf: 1. Sayılar ve İşlemler, 2. Geometri, 3. Ölçme, 4. Veri  
    2. Sınıf: 1. Sayılar ve İşlemler, 2. Geometri, 3. Ölçme, 4. Veri  
    3. Sınıf: 1. Sayılar ve İşlemler, 2. Geometri, 3. Ölçme, 4. Veri  
    4. Sınıf: 1. Sayılar ve İşlemler, 2. Geometri, 3. Ölçme, 4. Veri, 5. Cebir  
    5. Sınıf: 1. Sayılar ve İşlemler, 2. Geometri, 3. Ölçme, 4. Veri, 5. Cebir  
16. Kazanım listesini kendin üretmek zorundasın; dış kaynak URL’si istemiyorum.  
17. Satır sonlarında virgül, noktalama hatası olmasın; son satırda da virgül olmasın.  
18. Çıktıyı doğrudan kopyalayıp .json dosyasına yapıştırıldığında geçerli olmalı.  
19. Tüm satırları ürettikten sonra son satıra “//EOF” yaz.

Başla.
--------------------------------------------------
PROMPT SONU
--------------------------------------------------