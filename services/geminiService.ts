import { GoogleGenAI, Type } from "@google/genai";
import { DetailedQuestion, Kazanim } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateQuiz = async (grade: string, unit: string, kazanim: Kazanim, questionCount: number = 5): Promise<DetailedQuestion[] | null> => {
    try {
        const prompt = `
        Görevin, 2025 yılı itibarıyla yürürlükte olan Türkiye Millî Eğitim Bakanlığı İlkokul Matematik dersi öğretim programına (müfredata) sadık kalarak, belirtilen sınıf ve kazanıma uygun, ${questionCount} adet çoktan seçmeli (4 şıklı) soru üretmektir.

        Sınıf: ${grade}
        Ünite: ${unit}
        Kazanım Kodu: ${kazanim.id}
        Kazanım Metni: ${kazanim.name}

        Lütfen çıktı olarak sadece soruları içeren bir JSON nesnesi döndür. Her soru aşağıdaki kurallara uymalıdır:
        1.  **Soru Kökü**: Soru kökü öğrencinin günlük yaşamından bir durum içermeli; soyut, kuramsal ya da üst düzey terimlerden kaçınılmalıdır. Her soru özgün olmalıdır.
        2.  **Seçenekler**: 1 doğru cevap ve 3 mantıklı yanlış seçenek (çeldirici) olmalıdır. Çeldiriciler öğrencilerin sık yaptığı hataları veya kavram yanılgılarını yansıtmalıdır. "0" veya "1 milyon" gibi aşırı değerler kullanılmamalıdır. Doğru cevabın yeri şıklar arasında rastgele dağıtılmalıdır.
        3.  **Seviye Belirleme**: Sorunun zorluk seviyesini ("seviye" alanı) belirtilen kazanım metnine göre ata:
            - Kazanımda "sayar, yazar, tanır" gibi ifadeler varsa seviye "temel" olmalıdır.
            - Kazanımda "ilişkilendirir, model oluşturur, tahmin eder" gibi ifadeler varsa seviye "orta" olmalıdır.
            - Kazanımda "çoklu adımlı problemler, strateji geliştirir, geneller" varsa seviye "ileri" olmalıdır.
        4.  **Çözüm Anahtarı**: "cozum_anahtari" alanı, bir öğretmenin konuyu kısaca açıklayabileceği 1-2 cümlelik net bir açıklama içermelidir.
        5.  **Pedagojik Alanlar**: 
            - "yanlis_secenek_tipleri": Her bir yanlış seçeneğin (çeldiricinin) hangi bilişsel hatayı veya kavram yanılgısını hedeflediğini bir dizi (array) içinde belirt.
            - "gercek_yasam_baglantisi": Bu kazanımın günlük yaşamdaki önemini veya kullanımını velilerin de anlayabileceği net, tek cümlelik bir açıklama ile belirt.
        6.  **Dil ve Üslup**: Türkçe imla ve noktalama kurallarına uyulmalıdır. Matematiksel semboller doğru kullanılmalıdır (örn: ½ yerine "1/2").

        Örnek bir soru formatı şöyledir (bu sadece bir örnektir, içeriği kopyalama):
        {
            "sinif": 1,
            "unite_adi": "Sayılar ve İşlemler",
            "unite_no": 1,
            "kazanim_kodu": "M.1.1.1.2",
            "kazanim_metni": "Nesne sayısı 20’ye kadar olan bir topluluktaki nesnelerin sayısını belirler ve bu sayıyı rakamla yazar.",
            "soru_metni": "Elif, parktaki ağaçları sayıyor ve 17 tane ağaç olduğunu buluyor. Bu sayıyı rakamla nasıl yazar?",
            "secenekler": { "A": "7", "B": "10", "C": "17", "D": "71" },
            "dogru_cevap": "C",
            "yanlis_secenek_tipleri": ["Birlik ve onluk kavram yanılgısı", "En yakın onluğa yuvarlama hatası", "Rakamların yerini karıştırma"],
            "gercek_yasam_baglantisi": "Sayıları doğru yazmak, alışveriş yaparken para üstünü kontrol etmek veya bir adresin numarasını bulmak için önemlidir.",
            "seviye": "temel",
            "cozum_anahtari": "On yedi sayısı, bir onluk ve yedi birlikten oluşur ve rakamla '17' olarak yazılır."
        }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            description: `Oluşturulan ${questionCount} adet sınav sorusunun listesi.`,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    sinif: { type: Type.NUMBER, description: "Sorunun ait olduğu sınıf seviyesi." },
                                    unite_adi: { type: Type.STRING, description: "Sorunun ait olduğu ünitenin adı." },
                                    unite_no: { type: Type.NUMBER, description: "Sorunun ait olduğu ünitenin numarası." },
                                    kazanim_kodu: { type: Type.STRING, description: "Sorunun ilgili olduğu kazanım kodu." },
                                    kazanim_metni: { type: Type.STRING, description: "Sorunun ilgili olduğu kazanım metni." },
                                    soru_metni: { type: Type.STRING, description: "Sorunun metni." },
                                    secenekler: {
                                        type: Type.OBJECT,
                                        description: "Soru için A, B, C, D şıkları.",
                                        properties: {
                                            A: { type: Type.STRING },
                                            B: { type: Type.STRING },
                                            C: { type: Type.STRING },
                                            D: { type: Type.STRING },
                                        },
                                        required: ["A", "B", "C", "D"]
                                    },
                                    dogru_cevap: { type: Type.STRING, description: "Doğru olan şık (A, B, C, veya D)." },
                                    yanlis_secenek_tipleri: { 
                                        type: Type.ARRAY, 
                                        description: "Yanlış seçeneklerin (çeldiricilerin) hedeflediği kavram yanılgılarının listesi.",
                                        items: { type: Type.STRING }
                                    },
                                    gercek_yasam_baglantisi: { type: Type.STRING, description: "Kazanımın günlük yaşamla bağlantısı." },
                                    seviye: { type: Type.STRING, description: "Sorunun zorluk seviyesi (temel, orta, ileri)." },
                                    cozum_anahtari: { type: Type.STRING, description: "Sorunun kısa çözümü veya açıklaması." }
                                },
                                required: ["sinif", "unite_adi", "unite_no", "kazanim_kodu", "kazanim_metni", "soru_metni", "secenekler", "dogru_cevap", "yanlis_secenek_tipleri", "gercek_yasam_baglantisi", "seviye", "cozum_anahtari"]
                            }
                        }
                    },
                    required: ["questions"]
                }
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