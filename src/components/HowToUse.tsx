import React from 'react';
import { SparklesIcon } from './icons';

const guideSections = [
    {
        title: "1. Adım: Yeni Sınav Oluşturma",
        description: "Yapay zeka destekli sınav oluşturucu, MEB müfredatına uygun, özelleştirilebilir ve anında sınavlar hazırlamanızı sağlar.",
        steps: [
            "**Sınıf ve Ünite Seçimi:** Sınav hazırlamak istediğiniz sınıfı ve ilgili bir veya birden fazla üniteyi seçin.",
            "**Kazanım Filtreleme (İsteğe Bağlı):** Belirli kazanımlara odaklanmak isterseniz, ilgili kazanımları seçerek soruları daraltabilirsiniz. Seçim yapmazsanız, seçili ünitelerdeki tüm kazanımlardan sorular üretilir.",
            "**Soru Sayısı ve Tipi:** Sınavınızda yer alacak soru sayısını ve tipini (çoktan seçmeli, doğru/yanlış, boşluk doldurma) belirleyin.",
            "**Gelişmiş Ayarlar:** 'Problem Tipi' ile soruların zorluk derecesini (kaç işlem gerektireceği), 'Grafik/Tablo Ekle' ile 'Veri İşleme' kazanımlarına özel yapısal veriler eklenmesini sağlayabilirsiniz.",
            "**Ek Talimatlar:** Yapay zekaya özel direktifler vererek (örn: 'Sorular hayvanlarla ilgili olsun.') sınavınızı daha da kişiselleştirin.",
            "**Oluştur:** 'AI ile Sınav Oluştur' butonuna tıkladığınızda sınavınızın soru soru, gerçek zamanlı olarak oluşturulduğunu göreceksiniz."
        ],
        tip: "Birden fazla ünite seçerek farklı konuları kapsayan karma sınavlar oluşturabilirsiniz."
    },
    {
        title: "2. Adım: Sınavı Görüntüleme ve Düzenleme",
        description: "Oluşturulan sınavı anında görüntüleyebilir, yazdırma ayarlarını düzenleyebilir ve hatta içeriğini doğrudan düzenleyebilirsiniz.",
        steps: [
            "**Cevapları ve Notları Gösterme:** 'Cevapları Göster' ve 'Öğretmen Notları' seçenekleri ile çözüm anahtarlarını, kazanım bilgilerini ve pedagojik notları görüntüleyebilirsiniz.",
            "**Anında Düzenleme:** Öğretmen notları açıkken, soru metni, seçenekler, cevaplar gibi alanlara **çift tıklayarak** metinleri anında düzenleyebilirsiniz. Değişiklikleriniz otomatik olarak kaydedilir.",
            "**Soru Yenileme (Remix):** Beğenmediğiniz bir soruyu, öğretmen notları açıkken yanında çıkan yenileme ikonuna tıklayarak yapay zekanın aynı kazanıma uygun yeni bir soru üretmesini sağlayabilirsiniz.",
            "**Yazdırma Ayarları:** 'Ayarlar' ikonuna tıklayarak yazı tipi (Disleksi dostu dahil), punto boyutu, sütun sayısı, sayfa stili gibi görsel ayarları zevkinize göre düzenleyebilirsiniz.",
            "**Dışa Aktarma ve Arşivleme:** Sınavınızı 'Yazdır', 'PDF Olarak İndir', 'Paylaş' butonları ile kolayca paylaşabilir veya 'Arşive Ekle' butonuyla kalıcı olarak saklayabilirsiniz."
        ],
        tip: "Değişiklikleriniz otomatik kaydedilir. Arşivdeki kişisel şablonlarınızda yaptığınız düzenlemeler kalıcıdır!"
    },
    {
        title: "3. Adım: Geçmiş Sınavları Yönetme",
        description: "Daha önce oluşturduğunuz tüm sınavlar otomatik olarak 'Geçmiş' bölümüne kaydedilir. Bu bölüm, çalışmalarınızı organize etmenizi sağlar.",
        steps: [
            "**Kronolojik Sıralama:** Sınavlarınız 'Bugün', 'Dün', 'Bu Hafta' gibi zaman blokları halinde gruplanır, böylece aradığınızı kolayca bulursunuz.",
            "**Yeniden Adlandırma:** Her sınava, içeriğini daha iyi hatırlamanızı sağlayacak özel isimler verebilirsiniz.",
            "**Silme ve Arşivleme:** Artık ihtiyaç duymadığınız sınavları silebilir veya ileride kullanmak üzere kalıcı olarak arşive taşıyabilirsiniz.",
            "**Hızlı Erişim:** Bir sınava tıklayarak doğrudan detaylı görünümüne ve düzenleme seçeneklerine ulaşabilirsiniz."
        ],
        tip: "Sınavlarınıza özel isimler vererek onları daha sonra kolayca bulabilirsiniz. Düzenleme ikonu bunun için var!"
    },
    {
        title: "4. Adım: Sınav Arşivinin Gücünü Keşfedin",
        description: "Arşiv, hem sistem tarafından sunulan hazır şablonları hem de sizin 'Geçmiş' bölümünden kaydettiklerinizi içeren kalıcı bir kütüphanedir.",
        steps: [
            "**Filtreleme:** Sınıf, ünite ve kazanım seçerek aradığınız konudaki hazır sınav şablonlarına anında ulaşın.",
            "**Sistem ve Kişisel Şablonlar:** 'Sistem Şablonları' hazır ve değiştirilemezken, 'Kişisel Şablonlar' sizin arşivlediğiniz ve üzerinde değişiklik yapabileceğiniz sınavlardır.",
            "**Kişisel Şablonları Düzenleme:** Kendi arşivlediğiniz sınavlardaki soruları, anında düzenleme veya 'Soru Yenileme (Remix)' özelliği ile dilediğiniz gibi güncelleyebilirsiniz.",
            "**Görüntüleme ve Kullanma:** İstediğiniz şablonu seçerek içeriğini görüntüleyebilir, yazdırabilir veya PDF olarak indirebilirsiniz."
        ],
        tip: "Arşivdeki kişisel şablonlarınız 'yaşayan' belgelerdir. Onları zamanla düzenleyerek mükemmelleştirebilirsiniz."
    }
];

const HowToUse: React.FC = () => {
  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Uygulama Kullanım Kılavuzu</h2>
      <p className="text-center text-slate-600 mb-12">AI Sınav Asistanı'nın tüm özelliklerini keşfedin ve verimliliğinizi artırın.</p>
      
      <div className="relative">
        {/* The timeline line */}
        <div className="absolute left-4 sm:left-1/2 top-4 h-full w-0.5 bg-gradient-to-b from-purple-300 via-blue-300 to-sky-300" aria-hidden="true"></div>

        <div className="space-y-16">
          {guideSections.map((section, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline marker */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-white/80 z-10">
                {index + 1}
              </div>
              
              <div className="ml-6 w-full">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-3 text-purple-700">{section.title}</h3>
                    <p className="text-slate-600 mb-5">{section.description}</p>

                    <ul className="space-y-3 text-slate-700 mb-5">
                        {section.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>') }} />
                            </li>
                        ))}
                    </ul>

                    <div className="bg-purple-500/10 p-4 rounded-lg border-l-4 border-purple-400">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <SparklesIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-purple-800">
                                    <strong className="font-semibold">Profesyonel İpucu:</strong> {section.tip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
