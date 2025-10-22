

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, deleteQuiz } from '../services/storageService';
import { SavedQuiz } from '../types';
import { HistoryIcon, TrashIcon } from './icons';

const HistoryList: React.FC = () => {
    const [history, setHistory] = useState<SavedQuiz[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleDelete = (quizId: string, quizName: string) => {
        if (window.confirm(`'${quizName}' sınavını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
            deleteQuiz(quizId);
            setHistory(prevHistory => prevHistory.filter(quiz => quiz.id !== quizId));
        }
    };

    if (history.length === 0) {
        return (
            <div className="text-center mt-12 p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border-t border-white/80">
                <HistoryIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Geçmiş Sınav Bulunamadı</h3>
                <p className="text-slate-500 mt-2">Henüz bir sınav oluşturmadınız. Yeni bir sınav oluşturduğunuzda burada listelenecektir.</p>
                <Link to="/" className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                    Yeni Sınav Oluştur
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border-t border-white/80">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Geçmiş Sınavlar</h2>
            <ul className="divide-y divide-slate-200/70">
                {history.map((quiz) => {
                    const firstQuestion = quiz.questions[0];
                    const quizTitle = `${quiz.gradeName} - ${firstQuestion.unite_adi}`;
                    return (
                        <li key={quiz.id} className="py-3 flex items-center justify-between group">
                            <Link to={`/history/${quiz.id}`} className="flex-grow block hover:bg-slate-200/40 p-3 rounded-lg transition-colors">
                                <div>
                                    <p className="font-semibold text-blue-700">{quizTitle}</p>
                                    <p className="text-sm text-slate-600">{firstQuestion.kazanim_kodu}: {firstQuestion.kazanim_metni}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                        <span>
                                            {new Date(quiz.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </span>
                                        <span className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                                            {quiz.questions.length} Soru
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div className="ml-4 shrink-0">
                                <button
                                    onClick={() => handleDelete(quiz.id, quizTitle)}
                                    title="Sınavı Sil"
                                    className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default HistoryList;