

import React, { useState } from 'react';
import CurriculumSelector from './CurriculumSelector';
import QuizView from './QuizView';
import { CURRICULUM_DATA } from '../constants';
import { generateQuizStream } from '../services/geminiService';
import { saveQuiz as saveQuizToStorage, saveQuizToArchive } from '../services/storageService';
import { SavedQuiz, QuestionType, DetailedQuestion } from '../types';

const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = React.useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    React.useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
};


const QuizGenerator: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = usePersistentState<number | null>('qg_selectedGrade', null);
    const [selectedUnits, setSelectedUnits] = usePersistentState<string[]>('qg_selectedUnits', []);
    const [selectedKazanims, setSelectedKazanims] = usePersistentState<string[]>('qg_selectedKazanims', []);
    const [numQuestions, setNumQuestions] = usePersistentState('qg_numQuestions', 5);
    const [questionType, setQuestionType] = usePersistentState<QuestionType>('qg_questionType', 'coktan_secmeli');
    const [customPrompt, setCustomPrompt] = usePersistentState('qg_customPrompt', '');
    const [includeCharts, setIncludeCharts] = usePersistentState<boolean>('qg_includeCharts', false);
    const [numOperations, setNumOperations] = usePersistentState<number>('qg_numOperations', 0);


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [generatedQuiz, setGeneratedQuiz] = useState<SavedQuiz | null>(null);
    const [questionsForView, setQuestionsForView] = useState<DetailedQuestion[]>([]);
    const [currentGradeName, setCurrentGradeName] = useState<string>('');

    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [isArchived, setIsArchived] = useState(false);


    const handleGenerateQuiz = async () => {
        if (!selectedGrade || selectedUnits.length === 0) return;

        const gradeData = CURRICULUM_DATA.find(g => g.id === selectedGrade);
        const unitsData = gradeData?.units.filter(u => selectedUnits.includes(u.id));
        
        if (!gradeData || !unitsData || unitsData.length === 0) return;

        const allKazanimsFromSelectedUnits = unitsData.flatMap(u => u.kazanimlar);
        
        const kazanimData = selectedKazanims.length > 0
            ? allKazanimsFromSelectedUnits.filter(k => selectedKazanims.includes(k.id))
            : allKazanimsFromSelectedUnits;

        if (!kazanimData || kazanimData.length === 0) return;

        setIsLoading(true);
        setError(null);
        setGeneratedQuiz(null);
        setQuestionsForView([]);
        setCurrentGradeName(gradeData.name);
        setFeedbackSent(false);
        setFeedbackText('');
        setIsArchived(false);

        const allQuestions: DetailedQuestion[] = [];

        try {
            const unitNames = unitsData.map(u => u.name).join(', ');
            await generateQuizStream(
                gradeData.name, 
                unitNames, 
                kazanimData, 
                numQuestions, 
                questionType, 
                customPrompt, 
                includeCharts, 
                numOperations,
                (chunk) => {
                    allQuestions.push(...chunk);
                    setQuestionsForView(prev => [...prev, ...chunk]);
                }
            );
            
            if (allQuestions.length > 0) {
                 const quizData = {
                    gradeName: gradeData.name,
                    questions: allQuestions,
                    kazanimId: selectedUnits.join(','),
                };
                const newQuiz = saveQuizToStorage(quizData);
                setGeneratedQuiz(newQuiz);
            } else {
                setError("Sınav oluşturulamadı. Lütfen tekrar deneyin.");
            }
        } catch (err: any) {
            setError(err.message || "Bilinmeyen bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleArchiveQuiz = () => {
        if (!generatedQuiz || isArchived) return;
        try {
            saveQuizToArchive(generatedQuiz);
            setIsArchived(true);
        } catch (err) {
            setError("Sınav arşive eklenirken bir hata oluştu.");
        }
    };

    const handleSendFeedback = (quickFeedback?: string) => {
        if (!generatedQuiz) return;

        const recipient = 'morimasi@gmail.com';
        const subject = "AI Sınav Asistanı Geri Bildirimi";
        const body = `
Merhaba,

AI Sınav Asistanı hakkında geri bildirimde bulunmak istiyorum.

Sınav ID: ${generatedQuiz.id}
Sınıf: ${generatedQuiz.gradeName}
Kazanımlar: ${[...new Set(generatedQuiz.questions.map(q => q.kazanim_kodu))].join(', ')}

---
Geri Bildirim Tipi: ${quickFeedback || 'Genel Yorum'}
Kullanıcı Yorumu:
${quickFeedback ? '(Hızlı geri bildirim, ek yorum yok)' : feedbackText}
---

Teşekkürler.
        `;
        
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        setFeedbackSent(true);
    };
    
    const hasQuizToShow = questionsForView.length > 0 || generatedQuiz;

    return (
        <>
            <div className="non-printable">
                <CurriculumSelector
                    curriculumData={CURRICULUM_DATA}
                    selectedGrade={selectedGrade}
                    setSelectedGrade={(grade) => {
                        setSelectedGrade(grade);
                        setSelectedUnits([]);
                        setSelectedKazanims([]);
                    }}
                    selectedUnits={selectedUnits}
                    setSelectedUnits={setSelectedUnits}
                    selectedKazanims={selectedKazanims}
                    setSelectedKazanims={setSelectedKazanims}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    customPrompt={customPrompt}
                    setCustomPrompt={setCustomPrompt}
                    includeCharts={includeCharts}
                    setIncludeCharts={setIncludeCharts}
                    numOperations={numOperations}
                    setNumOperations={setNumOperations}
                    onGenerate={handleGenerateQuiz}
                    isLoading={isLoading}
                />
            </div>

            {error && (
                <div className="mt-8 bg-red-500/20 backdrop-blur-xl border border-red-500/50 text-red-800 px-4 py-3 rounded-2xl relative shadow-lg animate-fade-in-up" role="alert">
                    <strong className="font-bold">Hata!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

            {hasQuizToShow ? (
                 <div className="animate-fade-in-up">
                    <QuizView 
                        questions={generatedQuiz ? generatedQuiz.questions : questionsForView} 
                        grade={generatedQuiz ? generatedQuiz.gradeName : currentGradeName} 
                        quizId={generatedQuiz ? generatedQuiz.id : 'generating'}
                        onArchive={generatedQuiz ? handleArchiveQuiz : undefined}
                        isArchived={isArchived}
                    />
                    
                    {generatedQuiz && (
                         <div className="mt-8 bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 non-printable">
                            <h3 className="text-xl font-semibold text-slate-700 text-center">Üretilen Soru Hakkında Geri Bildirim</h3>
                            {feedbackSent ? (
                                <div className="text-center mt-4 p-4 bg-green-500/20 text-green-800 rounded-xl">
                                    <p className="font-semibold">Teşekkürler! Geri bildiriminiz en kısa sürede editörlerimiz tarafından incelemeye alınacaktır.</p>
                                </div>
                            ) : (
                                <>
                                <p className="text-slate-500 mt-2 text-center text-sm">Üretilen soruların kalitesini artırmamıza yardımcı olun.</p>
                                <div className="mt-4 flex flex-wrap justify-center gap-3">
                                    <button onClick={() => handleSendFeedback('Soru Hatalı')} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Soru Hatalı</button>
                                    <button onClick={() => handleSendFeedback('Zorluk Seviyesi Uygun Değil')} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Zorluk Seviyesi Uygun Değil</button>
                                    <button onClick={() => handleSendFeedback('Bağlantı Zayıf')} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Bağlantı Zayıf</button>
                                </div>
                                <div className="mt-4">
                                    <textarea 
                                        rows={2} 
                                        placeholder="Diğer yorumlarınız..." 
                                        className="w-full p-2.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                    ></textarea>
                                    <button onClick={() => handleSendFeedback()} className="w-full mt-2 bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all">
                                        Gönder
                                    </button>
                                </div>
                                </>
                            )}
                        </div>
                    )}
                 </div>
            ) : !isLoading && !error && (
                 <div className="text-center mt-12 p-8 bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-xl font-semibold text-slate-700">Sınavınızı Oluşturmaya Başlayın</h3>
                    <p className="text-slate-500 mt-2">Yukarıdaki menüden sınıf, ünite ve kazanım seçerek yapay zeka destekli sınavınızı oluşturun.</p>
                </div>
            )}
        </>
    );
};

export default QuizGenerator;