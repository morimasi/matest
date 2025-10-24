

import { GoogleGenAI, Type } from "@google/genai";
import { DetailedQuestion, Kazanim, QuestionType } from '../types';

// FIX: Initialize ai directly with process.env.API_KEY as per the guidelines.
// The key is assumed to be present in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptAndSchema = (grade: string, units: string, kazanims: Kazanim[], questionCount: number, questionType: QuestionType, customPrompt?: string, includeCharts?: boolean, numOperations?: number) => {
    
    const chartInstruction = includeCharts
    ? `
ÖNEMLİ GRAFİK/TABLO KURALI:
Eğer bir kazanım "çetele tablosu", "sıklık tablosu", "nesne grafiği" veya "sütun grafiği" ile ilgiliyse, soru metnini ("soru_metni" alanı) bu grafiği içermeyecek şekilde sade tutmalısın. Bunun yerine, grafiğin verilerini JSON formatında "grafik_verisi" adlı ayrı bir alana eklemelisin. ASCII-tabanlı, metin formatında grafikler KESİNLİKLE OLUŞTURMA.

"grafik_verisi" alanı aşağıdaki yapıda olmalıdır:
- "tip": Grafiğin türünü belirtir ('siklik_tablosu', 'nesne_grafiği', 'sutun_grafiği').
- "baslik": Grafik için kısa bir başlık (örn: "Sınıftaki Öğrencilerin Göz Renkleri").
- "veri": Bir dizi (array) olmalıdır. Her eleman bir etiketi ve sayısal bir değeri içermelidir (örn: [{"etiket": "Elma", "deger": 8}]).
  - Eğer "tip" olarak 'nesne_grafiği' seçilirse, her veri elemanına ek olarak bir "nesne" alanı ekleyerek grafikte kullanılacak sembolü (örn: '🍎') belirtmelisin.
- "not": (İsteğe bağlı) Grafiğin altında gösterilecek bir not (örn: "Her şekil 2 öğrenciyi temsil etmektedir.").

Örnek "grafik_verisi" JSON objesi:
{
  "tip": "sutun_grafiği",
  "baslik": "En Sevilen Meyveler",
  "veri": [
    { "etiket": "Elma", "deger": 12 },
    { "etiket": "Çilek", "deger": 18 },
    { "etiket": "Muz", "deger": 9 }
  ]
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
${operationPrompt}${chartInstruction}${customPromptSection}

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
          description: "Soru bir grafik veya tablo gerektiriyorsa, bu alanda yapısal verileri barındırır. ASCII grafikler KULLANILMAMALIDIR.",
          properties: {
            tip: { type: Type.STRING, description: "Grafik türü: 'siklik_tablosu', 'nesne_grafiği', veya 'sutun_grafiği'." },
            baslik: { type: Type.STRING, description: "Grafik için bir başlık." },
            veri: {
              type: Type.ARRAY,
              description: "Grafik verilerini içeren bir dizi.",
              items: {
                type: Type.OBJECT,
                properties: {
                  etiket: { type: Type.STRING, description: "Veri noktasının etiketi (örn: 'Elma')." },
                  deger: { type: Type.NUMBER, description: "Veri noktasının sayısal değeri (örn: 12)." },
                  nesne: { type: Type.STRING, description: "Nesne grafikleri için kullanılacak sembol (örn: '🍎')." }
                },
                required: ["etiket", "deger"]
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
        // Remix işlemi sırasında, eğer kazanım metni 'tablo' veya 'grafik' içeriyorsa,
        // tutarlılık için grafik/tablo kuralını otomatik olarak etkinleştir.
        const isDataKazanim = kazanim.name.toLowerCase().includes('tablo') || kazanim.name.toLowerCase().includes('grafik');
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