import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz } from '../services/storageService';
import { SavedQuiz as SavedQuizType } from '../types';
import QuizView from './QuizView';

const SavedQuiz: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState<SavedQuizType | null | undefined>(undefined);

    useEffect(() => {
        if (quizId) {
            setQuiz(getQuiz(quizId));
        }
    }, [quizId]);

    if (quiz === undefined) {
        return ( // Loading state
             <div className="text-center mt-12 p-8">
                <svg className="animate-spin mx-auto h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             </div>
        );
    }

    if (quiz === null) {
        return ( // Not found state
            <div className="text-center mt-12 p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border-t border-white/80">
                <h3 className="text-xl font-semibold text-red-700">Sınav Bulunamadı</h3>
                <p className="text-slate-500 mt-2">Aradığınız sınav geçmişinizde bulunamadı veya silinmiş olabilir.</p>
                 <Link to="/history" className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                    Geçmiş Sınavlara Geri Dön
                </Link>
            </div>
        );
    }
    
    return <QuizView questions={quiz.questions} grade={quiz.gradeName} />;
};

export default SavedQuiz;