
import React, { useState } from 'react';
import CurriculumSelector from './CurriculumSelector';
import QuizView from './QuizView';
import { CURRICULUM_DATA } from '../constants';
import { generateQuiz } from '../services/geminiService';
import { saveQuiz as saveQuizToStorage } from '../services/storageService';
import { DetailedQuestion, SavedQuiz } from '../types';

const QuizGenerator: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const [selectedKazanim, setSelectedKazanim] = useState<string | null>(null);
    const [numQuestions, setNumQuestions] = useState(5);

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
            const generatedQuestions = await generateQuiz(gradeData.name, unitData.name, kazanimData, numQuestions);
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
                    onGenerate={handleGenerateQuiz}
                    isLoading={isLoading}
                />
            </div>

            {error && (
                <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Hata!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

            {generatedQuiz ? (
                 <QuizView questions={generatedQuiz.questions} grade={generatedQuiz.gradeName} />
            ) : !isLoading && !error && (
                 <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700">Sınavınızı Oluşturmaya Başlayın</h3>
                    <p className="text-slate-500 mt-2">Yukarıdaki menüden sınıf, ünite ve kazanım seçerek yapay zeka destekli sınavınızı oluşturun.</p>
                </div>
            )}
        </>
    );
};

export default QuizGenerator;
