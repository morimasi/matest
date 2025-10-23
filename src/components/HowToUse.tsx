import React from 'react';

const guideSections = [
    {
        title: "1. Adım: Yeni Sınav Oluşturma",
        description: "Yapay zeka destekli sınav oluşturucu, MEB müfredatına uygun, özelleştirilebilir ve anında sınavlar hazırlamanızı sağlar.",
        imageUrl: "https://placehold.co/600x400/e0e7ff/4338ca?text=Sınav+Parametreleri",
        steps: [
            "**Sınıf ve Ünite Seçimi:** Sınav hazırlamak istediğiniz sınıfı ve ilgili ünite veya üniteleri seçin.",
            "**Kazanım Filtreleme (İsteğe Bağlı):** Belirli kazanımlara odaklanmak isterseniz, ilgili kazanımları seçerek soruları daraltabilirsiniz. Seçim yapmazsanız, seçili ünitelerdeki tüm kazanımlardan sorular üretilir.",
            "**Soru Sayısı ve Tipi:** Sınavınızda yer alacak soru sayısını ve tipini (çoktan seçmeli, doğru/yanlış, boşluk doldurma) belirleyin.",
            "**Gelişmiş Ayarlar:** 'Problem Tipi' ile soruların zorluk derecesini (kaç işlem gerektireceği), 'Grafik/Tablo Ekle' ile 'Veri İşleme' kazanımlarına özel metin tabanlı görseller eklenmesini sağlayabilirsiniz.",
            "**Ek Talimatlar:** Yapay zekaya özel direktifler vererek (örn: 'Sorular hayvanlarla ilgili olsun.') sınavınızı daha da kişiselleştirin.",
            "**Oluştur:** 'AI ile Sınav Oluştur' butonuna tıklayarak sınavınızın saniyeler içinde hazırlanmasını izleyin."
        ]
    },
    {
        title: "2. Adım: Sınavı Görüntüleme ve Özelleştirme",
        description: "Oluşturulan sınavı anında görüntüleyebilir, yazdırma ayarlarını düzenleyebilir ve çeşitli formatlarda dışa aktarabilirsiniz.",
        imageUrl: "https://placehold.co/600x400/dbeafe/1e40af?text=Sınav+Görünümü",
        steps: [
            "**Cevapları ve Notları Gösterme:** 'Cevapları Göster' ve 'Öğretmen Notları' seçenekleri ile çözüm anahtarlarını, kazanım bilgilerini ve pedagojik notları görüntüleyebilirsiniz.",
            "**Soru Yenileme (Remix):** Beğenmediğiniz bir soruyu, öğretmen notları açıkken yanında çıkan yenileme ikonuna tıklayarak yapay zekanın aynı kazanıma uygun yeni bir soru üretmesini sağlayabilirsiniz.",
            "**Yazdırma Ayarları:** 'Ayarlar' ikonuna tıklayarak yazı tipi, punto boyutu, sütun sayısı gibi görsel ayarları zevkinize göre düzenleyebilirsiniz.",
            "**Dışa Aktarma:** Sınavınızı 'Yazdır', 'PDF Olarak İndir' veya 'Paylaş' butonları ile kolayca paylaşabilirsiniz.",
            "**Arşive Ekle:** Oluşturduğunuz bu sınavı, ileride tekrar kullanmak üzere kalıcı olarak 'Arşiv' bölümüne ekleyebilirsiniz."
        ]
    },
    {
        title: "3. Adım: Geçmiş Sınavları Yönetme",
        description: "Daha önce oluşturduğunuz tüm sınavlar otomatik olarak 'Geçmiş' bölümüne kaydedilir. Bu bölüm, çalışmalarınızı organize etmenizi sağlar.",
        imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=Geçmiş+Sınavlar",
        steps: [
            "**Kronolojik Sıralama:** Sınavlarınız 'Bugün', 'Dün', 'Bu Hafta' gibi zaman blokları halinde gruplanır, böylece aradığınızı kolayca bulursunuz.",
            "**Yeniden Adlandırma:** Her sınava, içeriğini daha iyi hatırlamanızı sağlayacak özel isimler verebilirsiniz.",
            "**Silme ve Arşivleme:** Artık ihtiyaç duymadığınız sınavları silebilir veya ileride kullanmak üzere kalıcı olarak arşive taşıyabilirsiniz.",
            "**Hızlı Erişim:** Bir sınava tıklayarak doğrudan detaylı görünümüne ve düzenleme seçeneklerine ulaşabilirsiniz."
        ]
    },
    {
        title: "4. Adım: Sınav Arşivini Kullanma",
        description: "Arşiv, hem sizin tarafınızdan eklenen hem de sistem tarafından sunulan hazır sınav şablonlarını içeren bir kütüphanedir.",
        imageUrl: "https://placehold.co/600x400/f3e8ff/7e22ce?text=Sınav+Arşivi",
        steps: [
            "**Filtreleme:** Sınıf, ünite ve kazanım seçerek aradığınız konudaki hazır sınav şablonlarına anında ulaşın.",
            "**Sistem ve Kişisel Şablonlar:** 'Sistem Şablonları' hazır ve değiştirilemezken, 'Kişisel Şablonlar' sizin 'Geçmiş' bölümünden arşive eklediğiniz ve üzerinde değişiklik yapabileceğiniz sınavlardır.",
            "**Görüntüleme:** İstediğiniz şablonu seçerek içeriğini görüntüleyebilir, yazdırabilir veya PDF olarak indirebilirsiniz.",
            "**Kişisel Şablonları Düzenleme:** Kendi arşivlediğiniz sınavlardaki soruları, 'Soru Yenileme (Remix)' özelliği ile güncelleyebilirsiniz."
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
