
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz, updateQuiz } from '../services/storageService';
import { generateSingleQuestion } from '../services/geminiService';
import { SavedQuiz as SavedQuizType, Kazanim, DetailedQuestion } from '../types';
import QuizView from './QuizView';
import { CURRICULUM_DATA } from '../constants';

const SavedQuiz: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState<SavedQuizType | null | undefined>(undefined);
    const [remixingIndex, setRemixingIndex] = useState<number | null>(null);
    const [remixError, setRemixError] = useState<string | null>(null);
    const [hasApiKey, setHasApiKey] = useState(false);

    useEffect(() => {
        const checkApiKey = async () => {
             if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
                const keySelected = await window.aistudio.hasSelectedApiKey();
                setHasApiKey(keySelected);
            } else {
                // If aistudio API is not available, assume key is provided via environment.
                setHasApiKey(true);
            }
        };
        checkApiKey();
    }, []);

    useEffect(() => {
        if (quizId) {
            setQuiz(getQuiz(quizId));
        }
    }, [quizId]);

     const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setHasApiKey(true);
        }
    };

    const handleRemixQuestion = async (questionIndex: number) => {
        if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
            const keySelected = await window.aistudio.hasSelectedApiKey();
            if (!keySelected) {
                await handleSelectKey();
            }
        } else if (!process.env.API_KEY) {
            setRemixError("API anahtarı yapılandırılmamış. Lütfen uygulamanın yapılandırmasını kontrol edin.");
            return;
        }

        if (!quiz) return;
        setRemixingIndex(questionIndex);
        setRemixError(null);

        try {
            const oldQuestion = quiz.questions[questionIndex];
            const gradeData = CURRICULUM_DATA.find(g => g.name === quiz.gradeName);
            const unitData = gradeData?.units.find(u => u.name === oldQuestion.unite_adi);
            const kazanimData = unitData?.kazanimlar.find(k => k.id === oldQuestion.kazanim_kodu);

            if (!gradeData || !unitData || !kazanimData) {
                throw new Error("Soru için müfredat verisi bulunamadı.");
            }

            const newQuestion = await generateSingleQuestion(gradeData.name, unitData.name, kazanimData, oldQuestion.soru_tipi, oldQuestion.soru_metni);

            if (newQuestion) {
                const newQuestions = [...quiz.questions];
                newQuestions[questionIndex] = newQuestion;
                setQuiz(prevQuiz => prevQuiz ? { ...prevQuiz, questions: newQuestions } : null);
                updateQuiz(quiz.id, newQuestions);
            } else {
                 throw new Error("Yapay zeka yeni bir soru üretemedi.");
            }
        } catch (error: any) {
            const errorMessage = error.message || "Soru yenilenirken bir hata oluştu.";
            if (error.toString().includes("401") || errorMessage.includes("API key not valid") || errorMessage.includes("CREDENTIALS_MISSING") || errorMessage.includes("Requested entity was not found")) {
                setRemixError("Kimlik doğrulama hatası. API anahtarınız geçersiz veya süresi dolmuş olabilir. Lütfen yeni bir anahtar seçin.");
                if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
                    setHasApiKey(false);
                }
            } else {
                setRemixError(errorMessage);
            }
        } finally {
            setRemixingIndex(null);
        }
    };

    const handleUpdateQuiz = (updatedQuestions: DetailedQuestion[]) => {
        if (!quiz) return;
        setQuiz(prevQuiz => prevQuiz ? { ...prevQuiz, questions: updatedQuestions } : null);
        updateQuiz(quiz.id, updatedQuestions);
    };


    if (quiz === undefined) {
        return ( // Loading state
             <div className="text-center mt-12 p-8 bg-[--bg-component] backdrop-blur-xl rounded-3xl shadow-2xl border border-[--border-color]">
                <svg className="animate-spin mx-auto h-10 w-10 text-[--accent-gradient-via]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-[--text-secondary] font-semibold">Sınav Yükleniyor...</p>
             </div>
        );
    }

    if (quiz === null) {
        return ( // Not found state
            <div className="text-center mt-12 p-8 bg-[--bg-component] backdrop-blur-xl rounded-3xl shadow-2xl border border-[--border-color] animate-fade-in-up">
                <h3 className="text-xl font-semibold text-red-700">Sınav Bulunamadı</h3>
                <p className="text-[--text-secondary] mt-2">Aradığınız sınav geçmişinizde bulunamadı veya silinmiş olabilir.</p>
                 <Link to="/history" className="mt-6 inline-block bg-gradient-to-r from-[--accent-gradient-from] via-[--accent-gradient-via] to-[--accent-gradient-to] text-[--text-inverted] font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Geçmiş Sınavlara Geri Dön
                </Link>
            </div>
        );
    }
    
    if (!hasApiKey && (remixingIndex !== null || remixError?.includes("Kimlik doğrulama hatası")) ) {
         return (
            <div className="text-center mt-12 p-8 bg-[--bg-component] backdrop-blur-xl rounded-3xl shadow-2xl border border-[--border-color] animate-fade-in-up">
                <h3 className="text-xl font-semibold text-[--text-primary]">API Anahtarı Gerekli</h3>
                <p className="text-[--text-secondary] mt-2">Soru yenileme gibi özellikleri kullanmak için lütfen bir API anahtarı seçin.</p>
                 <p className="text-xs text-[--text-muted] mt-4">API anahtarı kullanımıyla ilgili ücretlendirme bilgileri için <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline text-[--text-accent]">Google AI Studio dokümantasyonunu</a> ziyaret edebilirsiniz.</p>
                <button 
                    onClick={handleSelectKey}
                    className="mt-6 inline-block bg-gradient-to-r from-[--accent-gradient-from] via-[--accent-gradient-via] to-[--accent-gradient-to] text-[--text-inverted] font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    API Anahtarı Seç
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            {remixError && (
                <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-800 px-4 py-3 rounded-2xl relative shadow-lg" role="alert">
                    <strong className="font-bold">Hata!</strong>
                    <span className="block sm:inline ml-2">{remixError}</span>
                </div>
            )}
            <QuizView 
                questions={quiz.questions} 
                grade={quiz.gradeName} 
                quizId={quiz.id}
                onRemixQuestion={handleRemixQuestion}
                remixingIndex={remixingIndex}
                onUpdateQuiz={handleUpdateQuiz}
             />
        </div>
    );
};

export default SavedQuiz;
