

import React, { useState, useEffect } from 'react';
import CurriculumSelector from './CurriculumSelector';
import QuizView from './QuizView';
import { CURRICULUM_DATA } from '../constants';
import { generateQuiz } from '../services/geminiService';
import { saveQuiz as saveQuizToStorage } from '../services/storageService';
import { DetailedQuestion, SavedQuiz, QuestionType } from '../types';

// FIX: Made the hook generic to accept type arguments for better type safety.
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
    // FIX: Added explicit types to state hooks that can be null to avoid type inference issues.
    const [selectedGrade, setSelectedGrade] = usePersistentState<number | null>('qg_selectedGrade', null);
    const [selectedUnit, setSelectedUnit] = usePersistentState<string | null>('qg_selectedUnit', null);
    const [selectedKazanim, setSelectedKazanim] = usePersistentState<string | null>('qg_selectedKazanim', null);
    const [numQuestions, setNumQuestions] = usePersistentState('qg_numQuestions', 5);
    const [questionType, setQuestionType] = usePersistentState<QuestionType>('qg_questionType', 'coktan_secmeli');
    const [customPrompt, setCustomPrompt] = usePersistentState('qg_customPrompt', '');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [generatedQuiz, setGeneratedQuiz] = useState<SavedQuiz | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);


    const handleGenerateQuiz = async () => {
        if (!selectedGrade || !selectedUnit || !selectedKazanim) return;

        const gradeData = CURRICULUM_DATA.find(g => g.id === selectedGrade);
        const unitData = gradeData?.units.find(u => u.id === selectedUnit);
        const kazanimData = unitData?.kazanimlar.find(k => k.id === selectedKazanim);

        if (!gradeData || !unitData || !kazanimData) return;

        setIsLoading(true);
        setError(null);
        setGeneratedQuiz(null);
        setFeedbackSent(false);

        try {
            const generatedQuestions = await generateQuiz(gradeData.name, unitData.name, kazanimData, numQuestions, questionType, customPrompt);
            if (generatedQuestions && generatedQuestions.length > 0) {
                 const quizData = {
                    gradeName: gradeData.name,
                    questions: generatedQuestions,
                    kazanimId: kazanimData.id,
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
    
    return (
        <>
            <div className="non-printable">
                <CurriculumSelector
                    curriculumData={CURRICULUM_DATA}
                    selectedGrade={selectedGrade}
                    setSelectedGrade={(grade) => {
                        setSelectedGrade(grade);
                        setSelectedUnit(null);
                        setSelectedKazanim(null);
                    }}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={(unit) => {
                        setSelectedUnit(unit);
                        setSelectedKazanim(null);
                    }}
                    selectedKazanim={selectedKazanim}
                    setSelectedKazanim={setSelectedKazanim}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    customPrompt={customPrompt}
                    setCustomPrompt={setCustomPrompt}
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

            {generatedQuiz ? (
                 <div className="animate-fade-in-up">
                    <QuizView questions={generatedQuiz.questions} grade={generatedQuiz.gradeName} quizId={generatedQuiz.id} />

                    <div className="mt-8 bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 non-printable">
                        <h3 className="text-xl font-semibold text-slate-700 text-center">Üretilen Soru Hakkında Geri Bildirim</h3>
                        {feedbackSent ? (
                             <div className="text-center mt-4 p-4 bg-green-500/20 text-green-800 rounded-xl">
                                <p className="font-semibold">Teşekkürler!</p>
                                <p className="text-sm">Geri bildiriminiz sınav asistanını geliştirmemize yardımcı oluyor.</p>
                            </div>
                        ) : (
                            <>
                            <p className="text-slate-500 mt-2 text-center text-sm">Üretilen soruların kalitesini artırmamıza yardımcı olun.</p>
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                <button onClick={() => setFeedbackSent(true)} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Soru Hatalı</button>
                                <button onClick={() => setFeedbackSent(true)} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Zorluk Seviyesi Uygun Değil</button>
                                <button onClick={() => setFeedbackSent(true)} className="px-4 py-2 text-sm bg-white/60 border border-slate-300/50 rounded-full hover:bg-white/80 transition-all">Bağlantı Zayıf</button>
                            </div>
                             <div className="mt-4">
                                <textarea rows={2} placeholder="Diğer yorumlarınız..." className="w-full p-2.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"></textarea>
                                <button onClick={() => setFeedbackSent(true)} className="w-full mt-2 bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all">
                                    Gönder
                                </button>
                            </div>
                            </>
                        )}
                       
                    </div>

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