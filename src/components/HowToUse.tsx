import React from 'react';

const guideSections = [
    {
        title: "1. Adım: Yeni Sınav Oluşturma",
        description: "Yapay zeka destekli sınav oluşturucu, MEB müfredatına uygun, özelleştirilebilir ve anında sınavlar hazırlamanızı sağlar.",
        imageUrl: "https://storage.googleapis.com/aistudio-bucket/1721832906596-0.png",
        steps: [
            "**Sınıf ve Ünite Seçimi:** Sınav hazırlamak istediğiniz sınıfı ve ilgili bir veya birden fazla üniteyi seçin.",
            "**Kazanım Filtreleme (İsteğe Bağlı):** Belirli kazanımlara odaklanmak isterseniz, ilgili kazanımları seçerek soruları daraltabilirsiniz. Seçim yapmazsanız, seçili ünitelerdeki tüm kazanımlardan sorular üretilir.",
            "**Soru Sayısı ve Tipi:** Sınavınızda yer alacak soru sayısını ve tipini (çoktan seçmeli, doğru/yanlış, boşluk doldurma) belirleyin.",
            "**Gelişmiş Ayarlar:** 'Problem Tipi' ile soruların zorluk derecesini (kaç işlem gerektireceği), 'Grafik/Tablo Ekle' ile 'Veri İşleme' kazanımlarına özel yapısal veriler eklenmesini sağlayabilirsiniz.",
            "**Ek Talimatlar:** Yapay zekaya özel direktifler vererek (örn: 'Sorular hayvanlarla ilgili olsun.') sınavınızı daha da kişiselleştirin.",
            "**Oluştur:** 'AI ile Sınav Oluştur' butonuna tıkladığınızda sınavınızın soru soru, gerçek zamanlı olarak oluşturulduğunu göreceksiniz."
        ]
    },
    {
        title: "2. Adım: Sınavı Görüntüleme ve Düzenleme",
        description: "Oluşturulan sınavı anında görüntüleyebilir, yazdırma ayarlarını düzenleyebilir ve hatta içeriğini doğrudan düzenleyebilirsiniz.",
        imageUrl: "https://storage.googleapis.com/aistudio-bucket/1721832906596-1.png",
        steps: [
            "**Cevapları ve Notları Gösterme:** 'Cevapları Göster' ve 'Öğretmen Notları' seçenekleri ile çözüm anahtarlarını, kazanım bilgilerini ve pedagojik notları görüntüleyebilirsiniz.",
            "**Anında Düzenleme:** Öğretmen notları açıkken, soru metni, seçenekler, cevaplar gibi alanlara **çift tıklayarak** metinleri anında düzenleyebilirsiniz. Değişiklikleriniz otomatik olarak kaydedilir.",
            "**Soru Yenileme (Remix):** Beğenmediğiniz bir soruyu, öğretmen notları açıkken yanında çıkan yenileme ikonuna tıklayarak yapay zekanın aynı kazanıma uygun yeni bir soru üretmesini sağlayabilirsiniz.",
            "**Yazdırma Ayarları:** 'Ayarlar' ikonuna tıklayarak yazı tipi (Disleksi dostu dahil), punto boyutu, sütun sayısı, sayfa stili gibi görsel ayarları zevkinize göre düzenleyebilirsiniz.",
            "**Dışa Aktarma ve Arşivleme:** Sınavınızı 'Yazdır', 'PDF Olarak İndir', 'Paylaş' butonları ile kolayca paylaşabilir veya 'Arşive Ekle' butonuyla kalıcı olarak saklayabilirsiniz."
        ]
    },
    {
        title: "3. Adım: Geçmiş Sınavları Yönetme",
        description: "Daha önce oluşturduğunuz tüm sınavlar otomatik olarak 'Geçmiş' bölümüne kaydedilir. Bu bölüm, çalışmalarınızı organize etmenizi sağlar.",
        imageUrl: "https://storage.googleapis.com/aistudio-bucket/1721832906596-2.png",
        steps: [
            "**Kronolojik Sıralama:** Sınavlarınız 'Bugün', 'Dün', 'Bu Hafta' gibi zaman blokları halinde gruplanır, böylece aradığınızı kolayca bulursunuz.",
            "**Yeniden Adlandırma:** Her sınava, içeriğini daha iyi hatırlamanızı sağlayacak özel isimler verebilirsiniz.",
            "**Silme ve Arşivleme:** Artık ihtiyaç duymadığınız sınavları silebilir veya ileride kullanmak üzere kalıcı olarak arşive taşıyabilirsiniz.",
            "**Hızlı Erişim:** Bir sınava tıklayarak doğrudan detaylı görünümüne ve düzenleme seçeneklerine ulaşabilirsiniz."
        ]
    },
    {
        title: "4. Adım: Sınav Arşivinin Gücünü Keşfedin",
        description: "Arşiv, hem sistem tarafından sunulan hazır şablonları hem de sizin 'Geçmiş' bölümünden kaydettiklerinizi içeren kalıcı bir kütüphanedir.",
        imageUrl: "https://storage.googleapis.com/aistudio-bucket/1721832906597-3.png",
        steps: [
            "**Filtreleme:** Sınıf, ünite ve kazanım seçerek aradığınız konudaki hazır sınav şablonlarına anında ulaşın.",
            "**Sistem ve Kişisel Şablonlar:** 'Sistem Şablonları' hazır ve değiştirilemezken, 'Kişisel Şablonlar' sizin arşivlediğiniz ve üzerinde değişiklik yapabileceğiniz sınavlardır.",
            "**Kişisel Şablonları Düzenleme:** Kendi arşivlediğiniz sınavlardaki soruları, anında düzenleme veya 'Soru Yenileme (Remix)' özelliği ile dilediğiniz gibi güncelleyebilirsiniz.",
            "**Görüntüleme ve Kullanma:** İstediğiniz şablonu seçerek içeriğini görüntüleyebilir, yazdırabilir veya PDF olarak indirebilirsiniz."
        ]
    }
];

const HowToUse: React.FC = () => {
  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Uygulama Kullanım Kılavuzu</h2>
      <p className="text-center text-slate-600 mb-10">AI Sınav Asistanı'nın tüm özelliklerini keşfedin ve verimliliğinizi artırın.</p>
      
      <div className="space-y-12">
        {guideSections.map((section, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/50 pt-8 first:border-t-0 first:pt-0">
            <div className={`md:order-${index % 2 === 0 ? '1' : '2'}`}>
              <h3 className="text-2xl font-semibold text-slate-700 mb-3">{section.title}</h3>
              <p className="text-slate-600 mb-4">{section.description}</p>
              <ul className="space-y-2 text-slate-700">
                {section.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-purple-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>') }} />
                    </li>
                ))}
              </ul>
            </div>
            <div className={`md:order-${index % 2 === 0 ? '2' : '1'}`}>
                <img src={section.imageUrl} alt={section.title} className="rounded-xl shadow-2xl w-full h-auto object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUse;