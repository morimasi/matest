

import { GoogleGenAI, Type } from "@google/genai";
import { DetailedQuestion, Kazanim, QuestionType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptAndSchema = (grade: string, units: string, kazanims: Kazanim[], questionCount: number, questionType: QuestionType, customPrompt?: string, includeCharts?: boolean, numOperations?: number) => {
    
    const visualDataInstruction = includeCharts
    ? `
ÖNEMLİ GÖRSEL VERİ KURALI (GRAFİK/ŞEKİL):
Eğer bir kazanım görsel bir veri gerektiriyorsa (Veri İşleme ünitelerindeki tablolar/grafikler veya Geometri ünitelerindeki şekiller gibi), soru metnini ("soru_metni" alanı) bu görseli içermeyecek şekilde sade tutmalısın. Bunun yerine, görselin verilerini JSON formatında "grafik_verisi" adlı ayrı bir alana eklemelisin. ASCII-tabanlı, metin formatında görseller KESİNLİKLE OLUŞTURMA.

"grafik_verisi" alanı aşağıdaki yapılardan birinde olmalıdır:

1. VERİ İŞLEME GRAFİKLERİ:
   - "tip": 'siklik_tablosu', 'nesne_grafiği', 'sutun_grafiği'.
   - "baslik": Grafik için kısa bir başlık.
   - "veri": Bir dizi (array) olmalıdır. Her eleman: {"etiket": "Elma", "deger": 8}.
   - "nesne": (Sadece 'nesne_grafiği' için) Veri elemanına eklenecek sembol. örn: "🍎".
   - "not": (İsteğe bağlı) Grafik altında gösterilecek not.

   Örnek Veri Grafiği JSON:
   {
     "tip": "sutun_grafiği", "baslik": "En Sevilen Meyveler",
     "veri": [ { "etiket": "Elma", "deger": 12 }, { "etiket": "Çilek", "deger": 18 } ]
   }

2. GEOMETRİ ŞEKİLLERİ VE KAVRAMLARI:
   - "tip": 'ucgen', 'dikdortgen', 'kare', 'kup', 'dogru_parcasi', 'isin', 'dogru', 'paralel_dogrular', 'kesisen_dogrular', 'dik_kesisen_doğrular'.
   - "baslik": Şekil/kavram için bir başlık (örn: "ABC Üçgeni", "AB Doğru Parçası", "d1 ve d2 Paralel Doğruları").
   - "veri": Bir dizi (array) olmalıdır. Her eleman şeklin bir özelliğini tanımlar. Etiketler çizim için kullanılır.
     **ÖNEMLİ TUTARLILIK KURALI: "soru_metni" içinde bahsedilen harf/isimler (örn: AB doğru parçası, d doğrusu) ile "grafik_verisi" içindeki etiketler (örn: "A Köşesi", "d doğrusu") BİREBİR AYNI OLMALIDIR.**
   - "not": (İsteğe bağlı) Şekille ilgili ek bilgi.

   Örnek Geometri JSON'ları:
   {
     "tip": "ucgen", "baslik": "ABC Dik Üçgeni",
     "veri": [
       { "etiket": "A Köşesi" }, { "etiket": "B Köşesi" }, { "etiket": "C Köşesi" },
       { "etiket": "AB Kenarı", "deger": 8, "birim": "cm" },
       { "etiket": "BC Kenarı", "deger": 6, "birim": "cm" },
       { "etiket": "Açısı", "deger": 90, "birim": "°" }
     ],
     "not": "B açısı dik açıdır."
   }
   {
     "tip": "dogru_parcasi", "baslik": "AB Doğru Parçası",
     "veri": [ { "etiket": "A Noktası" }, { "etiket": "B Noktası" } ]
   }
   {
     "tip": "isin", "baslik": "CD Işını",
     "veri": [ { "etiket": "C Başlangıç Noktası" }, { "etiket": "D Noktası" } ]
   }
   {
     "tip": "paralel_dogrular", "baslik": "Paralel Doğrular",
     "veri": [ { "etiket": "d doğrusu" }, { "etiket": "k doğrusu" } ]
   }
   {
     "tip": "kesisen_dogrular", "baslik": "Kesişen Doğrular",
     "veri": [ { "etiket": "m doğrusu" }, { "etiket": "n doğrusu" }, { "etiket": "P Kesişim Noktası" } ]
   }
`
    : '';

    let operationPrompt = '';
    if (numOperations && numOperations > 0) {
        const stepText = numOperations === 1 
            ? 'tek bir matematiksel işlem (toplama, çıkarma, çarpma, bölme) ile çözülebilmelidir.' 
            : `tam olarak ${numOperations} adet matematiksel işlem gerektirmelidir.`;
        
        operationPrompt = `\n\nÖNEMLİ PROBLEM TİPİ KURALI:
Üreteceğin her soru, ilgili kazanımın doğası elverdiği sürece, ${stepText} Bu kural, özellikle problem çözme becerisini ölçen kazanımlar için geçerlidir. Çözüm adımları net ve mantıksal olmalıdır.`;
    }

    const customPromptSection = customPrompt 
        ? `\n\nKullanıcının Ek Talimatları:\n${customPrompt}\nBu talimatlara harfiyen uyulmalıdır.`
        : '';

    const kazanimList = kazanims.map(k => `- ${k.id}: ${k.name}`).join('\n');

    const basePrompt = `
Görevin, 2025 yılı itibarıyla yürürlükte olan Türkiye Millî Eğitim Bakanlığı İlkokul Matematik dersi öğretim programına (müfredata) sadık kalarak, belirtilen sınıf, üniteler ve kazanımlara uygun, ${questionCount} adet soru üretmektir. Soruları, sağlanan kazanımlar listesi arasında adil ve dengeli bir şekilde dağıtmalısın. Eğer birden fazla ünite seçilmişse, soruları bu üniteler arasında da dengeli bir şekilde dağıtmalısın.
${operationPrompt}${visualDataInstruction}${customPromptSection}

Sınıf: ${grade}
Üniteler: ${units}
İlgili Kazanımlar:
${kazanimList}

Lütfen çıktı olarak sadece soruları içeren bir JSON nesnesi döndür. Her soru aşağıdaki genel kurallara uymalıdır:
1.  **Soru Kökü**: Soru kökü öğrencinin günlük yaşamından bir durum içermeli; soyut, kuramsal ya da üst düzey terimlerden kaçınılmalıdır. Her soru özgün olmalıdır.
2.  **Seviye Belirleme**: Sorunun zorluk seviyesini ("seviye" alanı) belirtilen kazanım metnine göre ata:
    - Kazanımda "sayar, yazar, tanır" gibi ifadeler varsa seviye "temel" olmalıdır.
    - Kazanımda "ilişkilendirir, model oluşturur, tahmin eder" gibi ifadeler varsa seviye "orta" olmalıdır.
    - Kazanımda "çoklu adımlı problemler, strateji geliştirir, geneller" varsa seviye "ileri" olmalıdır.
3.  **Çözüm Anahtarı**: "cozum_anahtari" alanı, bir öğretmenin konuyu kısaca açıklayabileceği 1-2 cümlelik net bir açıklama içermelidir.
4.  **Pedagojik Alanlar**: 
    - "gercek_yasam_baglantisi": Bu kazanımın günlük yaşamdaki önemini veya kullanımını velilerin de anlayabileceği net, tek cümlelik bir açıklama ile belirt.
5.  **Dil ve Üslup**: Türkçe imla ve noktalama kurallarına uyulmalıdır. Matematiksel semboller doğru kullanılmalıdır (örn: ½ yerine "1/2").
`;

    const baseProperties = {
        sinif: { type: Type.NUMBER, description: "Sorunun ait olduğu sınıf seviyesi." },
        unite_adi: { type: Type.STRING, description: "Sorunun ait olduğu ünitenin adı." },
        unite_no: { type: Type.NUMBER, description: "Sorunun ait olduğu ünitenin numarası." },
        kazanim_kodu: { type: Type.STRING, description: "Sorunun ilgili olduğu kazanım kodu." },
        kazanim_metni: { type: Type.STRING, description: "Sorunun ilgili olduğu kazanım metni." },
        soru_tipi: { type: Type.STRING, description: "Sorunun tipi (örn: 'coktan_secmeli')." },
        soru_metni: { type: Type.STRING, description: "Sorunun metni. Grafik veya tablo içermemelidir." },
        grafik_verisi: {
          type: Type.OBJECT,
          description: "Soru bir grafik, tablo veya geometrik şekil gerektiriyorsa, bu alanda yapısal verileri barındırır. ASCII görseller KULLANILMAMALIDIR.",
          properties: {
            tip: { type: Type.STRING, description: "Görsel türü: 'siklik_tablosu', 'nesne_grafiği', 'sutun_grafiği', 'ucgen', 'dikdortgen', 'kare', 'kup', 'dogru_parcasi', 'isin', 'dogru', 'paralel_dogrular', 'kesisen_dogrular', 'dik_kesisen_doğrular'." },
            baslik: { type: Type.STRING, description: "Görsel için bir başlık." },
            veri: {
              type: Type.ARRAY,
              description: "Görselin verilerini içeren bir dizi.",
              items: {
                type: Type.OBJECT,
                properties: {
                  etiket: { type: Type.STRING, description: "Veri noktasının etiketi (örn: 'Elma', 'AB Kenarı' veya 'A Noktası')." },
                  deger: { type: Type.NUMBER, description: "Veri noktasının sayısal değeri (örn: 12 veya 90)." },
                  nesne: { type: Type.STRING, description: "Nesne grafikleri için kullanılacak sembol (örn: '🍎')." },
                  birim: { type: Type.STRING, description: "Geometrik veriler için birim (örn: 'cm', '°')." },
                  x: { type: Type.NUMBER, description: "Kullanıcı tarafından düzenlenen etiketin x-koordinatı." },
                  y: { type: Type.NUMBER, description: "Kullanıcı tarafından düzenlenen etiketin y-koordinatı." }
                },
                required: ["etiket"]
              }
            },
            not: { type: Type.STRING, description: "Grafik altında gösterilecek ek not." }
          },
          required: ["tip", "baslik", "veri"]
        },
        dogru_cevap: { type: Type.STRING, description: "Sorunun doğru cevabı." },
        gercek_yasam_baglantisi: { type: Type.STRING, description: "Kazanımın günlük yaşamla bağlantısı." },
        seviye: { type: Type.STRING, description: "Sorunun zorluk seviyesi (temel, orta, ileri)." },
        cozum_anahtari: { type: Type.STRING, description: "Sorunun kısa çözümü veya açıklaması." }
    };

    const baseRequired = ["sinif", "unite_adi", "unite_no", "kazanim_kodu", "kazanim_metni", "soru_tipi", "soru_metni", "dogru_cevap", "gercek_yasam_baglantisi", "seviye", "cozum_anahtari"];

    let specificPrompt = '';
    let specificProperties = {};
    let specificRequired: string[] = [];

    switch (questionType) {
        case 'dogru_yanlis':
            specificPrompt = `
**Soru Tipi: Doğru/Yanlış**
- Her soru bir ifade olmalıdır.
- "dogru_cevap" alanı, ifadenin doğruluğunu belirtmek için "Doğru" veya "Yanlış" metnini içermelidir.
`;
            specificProperties = {
                dogru_cevap: { type: Type.STRING, description: "İfadenin doğruluğunu belirten 'Doğru' veya 'Yanlış' metni." }
            };
            break;

        case 'bosluk_doldurma':
            specificPrompt = `
**Soru Tipi: Boşluk Doldurma**
- "soru_metni" içindeki boşluk '___' ile belirtilmelidir.
- "dogru_cevap" alanı, boşluğu dolduracak doğru kelimeyi veya sayıyı içermelidir.
`;
            specificProperties = {
                 dogru_cevap: { type: Type.STRING, description: "Boşluğu dolduracak kelime veya sayı." }
            };
            break;

        case 'coktan_secmeli':
        default:
            specificPrompt = `
**Soru Tipi: Çoktan Seçmeli**
- 1 doğru cevap ve 3 mantıklı yanlış seçenek (çeldirici) olmalıdır. Çeldiriciler öğrencilerin sık yaptığı hataları veya kavram yanılgılarını yansıtmalıdır.
- Doğru cevabın yeri şıklar arasında rastgele dağıtılmalıdır.
- "yanlis_secenek_tipleri": Her bir yanlış seçeneğin hangi bilişsel hatayı hedeflediğini bir dizi (array) içinde belirt.
`;
            specificProperties = {
                secenekler: {
                    type: Type.OBJECT,
                    description: "Soru için A, B, C, D şıkları.",
                    properties: {
                        A: { type: Type.STRING }, B: { type: Type.STRING },
                        C: { type: Type.STRING }, D: { type: Type.STRING },
                    },
                    required: ["A", "B", "C", "D"]
                },
                dogru_cevap: { type: Type.STRING, description: "Doğru olan şık (A, B, C, veya D)." },
                yanlis_secenek_tipleri: { 
                    type: Type.ARRAY, 
                    description: "Yanlış seçeneklerin (çeldiricilerin) hedeflediği kavram yanılgılarının listesi.",
                    items: { type: Type.STRING }
                },
            };
            specificRequired = ["secenekler", "yanlis_secenek_tipleri"];
            break;
    }
    
    const finalPrompt = basePrompt + specificPrompt;
    
    const singleQuestionSchema = {
      type: Type.OBJECT,
      properties: { ...baseProperties, ...specificProperties },
      required: [...baseRequired, ...specificRequired]
    };
    
    const multipleQuestionSchema = {
        type: Type.OBJECT,
        properties: {
            questions: {
                type: Type.ARRAY,
                description: `Oluşturulan ${questionCount} adet sınav sorusunun listesi.`,
                items: singleQuestionSchema
            }
        },
        required: ["questions"]
    };

    return { prompt: finalPrompt, schema: multipleQuestionSchema, singleSchema: singleQuestionSchema };
};

export const generateQuizStream = async (
    grade: string,
    units: string,
    kazanims: Kazanim[],
    questionCount: number = 5,
    questionType: QuestionType,
    customPrompt: string | undefined,
    includeCharts: boolean | undefined,
    numOperations: number | undefined,
    onChunk: (chunk: DetailedQuestion[]) => void
): Promise<void> => {
    try {
        const CHUNK_SIZE = 5;
        let remainingQuestions = questionCount;
        const promises: Promise<void>[] = [];

        while (remainingQuestions > 0) {
            const currentChunkSize = Math.min(CHUNK_SIZE, remainingQuestions);

            const { prompt, schema } = getPromptAndSchema(
                grade,
                units,
                kazanims,
                currentChunkSize,
                questionType,
                customPrompt,
                includeCharts,
                numOperations
            );

            const promise = ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            }).then(response => {
                const jsonText = response.text.trim();
                const parsedData = JSON.parse(jsonText);
                const questions = (parsedData?.questions || []) as DetailedQuestion[];
                if (questions.length > 0) {
                    onChunk(questions);
                }
            });

            promises.push(promise);
            remainingQuestions -= currentChunkSize;
        }

        await Promise.all(promises);
    } catch (error) {
        console.error("Error generating quiz stream:", error);
        throw new Error("Yapay zeka ile sınav oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
};

export const generateSingleQuestion = async (grade: string, unit: string, kazanim: Kazanim, questionType: QuestionType, existingQuestionText: string): Promise<DetailedQuestion | null> => {
    try {
        const isDataKazanim = kazanim.name.toLowerCase().includes('tablo') || kazanim.name.toLowerCase().includes('grafik') || unit.toLowerCase().includes('geometri');
        const { prompt: basePrompt, singleSchema } = getPromptAndSchema(grade, unit, [kazanim], 1, questionType, "", isDataKazanim, 0);
        const remixPrompt = `${basePrompt}\n\nÖNEMLİ KURAL: Üreteceğin yeni soru, aşağıdaki sorudan MUTLAKA farklı olmalıdır:\n"${existingQuestionText}"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: remixPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: singleSchema
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DetailedQuestion;
    } catch (error) {
        console.error("Error generating single question:", error);
        throw new Error("Soru yenilenirken bir hata oluştu.");
    }
}