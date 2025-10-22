

import React, { useState } from 'react';
import CurriculumSelector from './CurriculumSelector';
import QuizView from './QuizView';
import { CURRICULUM_DATA } from '../constants';
import { generateQuiz } from '../services/geminiService';
import { saveQuiz as saveQuizToStorage } from '../services/storageService';
import { DetailedQuestion, SavedQuiz, QuestionType } from '../types';

const QuizGenerator: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const [selectedKazanim, setSelectedKazanim] = useState<string | null>(null);
    const [numQuestions, setNumQuestions] = useState(5);
    const [questionType, setQuestionType] = useState<QuestionType>('coktan_secmeli');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [generatedQuiz, setGeneratedQuiz] = useState<SavedQuiz | null>(null);

    const handleGenerateQuiz = async () => {
        if (!selectedGrade || !selectedUnit || !selectedKazanim) return;

        const gradeData = CURRICULUM_DATA.find(g => g.id === selectedGrade);
        const unitData = gradeData?.units.find(u => u.id === selectedUnit);
        const kazanimData = unitData?.kazanimlar.find(k => k.id === selectedKazanim);

        if (!gradeData || !unitData || !kazanimData) return;

        setIsLoading(true);
        setError(null);
        setGeneratedQuiz(null);

        try {
            const generatedQuestions = await generateQuiz(gradeData.name, unitData.name, kazanimData, numQuestions, questionType);
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
                    setSelectedGrade={setSelectedGrade}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                    selectedKazanim={selectedKazanim}
                    setSelectedKazanim={setSelectedKazanim}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
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
                    <QuizView questions={generatedQuiz.questions} grade={generatedQuiz.gradeName} />
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