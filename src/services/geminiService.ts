
import { GoogleGenAI, Type } from "@google/genai";
import { DetailedQuestion, Kazanim, QuestionType } from '../types';

// FIX: Initialize ai directly with process.env.API_KEY as per the guidelines.
// The key is assumed to be present in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptAndSchema = (grade: string, units: string, kazanims: Kazanim[], questionCount: number, questionType: QuestionType, customPrompt?: string, includeCharts?: boolean) => {
    
    const chartInstruction = includeCharts
        ? `\n\nÖNEMLİ GRAFİK/TABLO KURALI: Eğer bir kazanım "çetele tablosu", "sıklık tablosu", "nesne grafiği" veya "sütun grafiği" oluşturma veya okuma ile ilgiliyse, soru metni ("soru_metni" alanı) İÇERİSİNDE bu grafiği veya tabloyu metin formatında (ASCII karakterler kullanarak) OLUŞTURMALISIN. Örneğin, bir çetele tablosunu '|' karakterleriyle, bir sütun grafiğini ise '█' karakteriyle temsil edebilirsin. Bu, sorunun anlaşılması için zorunludur ve bu kurala mutlaka uymalısın.`
        : '';

    const customPromptSection = customPrompt 
        ? `\n\nKullanıcının Ek Talimatları:\n${customPrompt}\nBu talimatlara harfiyen uyulmalıdır.`
        : '';

    const kazanimList = kazanims.map(k => `- ${k.id}: ${k.name}`).join('\n');

    const basePrompt = `
Görevin, 2025 yılı itibarıyla yürürlükte olan Türkiye Millî Eğitim Bakanlığı İlkokul Matematik dersi öğretim programına (müfredata) sadık kalarak, belirtilen sınıf, üniteler ve kazanımlara uygun, ${questionCount} adet soru üretmektir. Soruları, sağlanan kazanımlar listesi arasında adil ve dengeli bir şekilde dağıtmalısın. Eğer birden fazla ünite seçilmişse, soruları bu üniteler arasında da dengeli bir şekilde dağıtmalısın.
${chartInstruction}${customPromptSection}

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
        soru_metni: { type: Type.STRING, description: "Sorunun metni." },
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

export const generateQuiz = async (grade: string, units: string, kazanims: Kazanim[], questionCount: number = 5, questionType: QuestionType, customPrompt?: string, includeCharts?: boolean): Promise<DetailedQuestion[] | null> => {
    try {
        const { prompt, schema } = getPromptAndSchema(grade, units, kazanims, questionCount, questionType, customPrompt, includeCharts);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (parsedData && Array.isArray(parsedData.questions)) {
            return parsedData.questions;
        }

        return null;

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Yapay zeka ile sınav oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
};

export const generateSingleQuestion = async (grade: string, unit: string, kazanim: Kazanim, questionType: QuestionType, existingQuestionText: string): Promise<DetailedQuestion | null> => {
    try {
        // Remix işlemi sırasında, eğer kazanım metni 'tablo' veya 'grafik' içeriyorsa,
        // tutarlılık için grafik/tablo kuralını otomatik olarak etkinleştir.
        const isDataKazanim = kazanim.name.includes('tablo') || kazanim.name.includes('grafik');
        const { prompt: basePrompt, singleSchema } = getPromptAndSchema(grade, unit, [kazanim], 1, questionType, "", isDataKazanim);
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