import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, deleteQuiz, saveQuizToArchive, renameQuiz } from '../services/storageService';
import { SavedQuiz } from '../types';
import { HistoryIcon, TrashIcon, ArchiveAddIcon, CheckIcon, EditIcon, DocumentTextIcon } from './icons';

interface GroupedQuizzes {
    [key: string]: SavedQuiz[];
}

const HistoryList: React.FC = () => {
    const [history, setHistory] = useState<SavedQuiz[]>([]);
    const [archivedStatus, setArchivedStatus] = useState<Record<string, boolean>>({});
    
    const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const groupedQuizzes = useMemo(() => {
        if (history.length === 0) return {};

        const groups: GroupedQuizzes = {
            'Bugün': [],
            'Dün': [],
            'Bu Hafta': [],
            'Geçen Hafta': [],
            'Daha Eski': [],
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        
        const dayOfWeek = today.getDay();
        const dayDiff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayDiff);
        
        const startOfLastWeek = new Date(startOfWeek);
        startOfLastWeek.setDate(startOfWeek.getDate() - 7);


        history.forEach(quiz => {
            const quizDate = new Date(quiz.createdAt);
            quizDate.setHours(0, 0, 0, 0);

            if (quizDate.getTime() === today.getTime()) {
                groups['Bugün'].push(quiz);
            } else if (quizDate.getTime() === yesterday.getTime()) {
                groups['Dün'].push(quiz);
            } else if (quizDate >= startOfWeek) {
                groups['Bu Hafta'].push(quiz);
            } else if (quizDate >= startOfLastWeek) {
                groups['Geçen Hafta'].push(quiz);
            } else {
                groups['Daha Eski'].push(quiz);
            }
        });

        return Object.fromEntries(Object.entries(groups).filter(([, quizzes]) => quizzes.length > 0));

    }, [history]);

    const handleDelete = (quizId: string, quizName: string) => {
        if (window.confirm(`'${quizName}' sınavını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
            deleteQuiz(quizId);
            setHistory(prevHistory => prevHistory.filter(quiz => quiz.id !== quizId));
        }
    };

    const handleArchive = (quiz: SavedQuiz) => {
        try {
            saveQuizToArchive(quiz);
            setArchivedStatus(prev => ({ ...prev, [quiz.id]: true }));
        } catch (error) {
            alert("Sınav arşive eklenirken bir hata oluştu.");
            console.error(error);
        }
    };

    const handleStartEditing = (quiz: SavedQuiz) => {
        setEditingQuizId(quiz.id);
        const firstQuestion = quiz.questions[0];
        const defaultTitle = `${quiz.gradeName} - ${firstQuestion.unite_adi}`;
        setEditingName(quiz.customName || defaultTitle);
    };

    const handleRename = (quizId: string) => {
        if (editingName.trim() === '') {
            alert("Sınav adı boş olamaz.");
            return;
        }
        renameQuiz(quizId, editingName);
        setHistory(prev => prev.map(q => q.id === quizId ? { ...q, customName: editingName } : q));
        setEditingQuizId(null);
        setEditingName('');
    };


    if (history.length === 0) {
        return (
            <div className="text-center mt-12 p-8 bg-[--bg-component] backdrop-blur-xl rounded-3xl shadow-2xl border border-[--border-color] animate-fade-in-up">
                <HistoryIcon className="w-12 h-12 mx-auto text-[--text-muted] mb-4" />
                <h3 className="text-xl font-semibold text-[--text-primary]">Geçmiş Sınav Bulunamadı</h3>
                <p className="text-[--text-secondary] mt-2">Henüz bir sınav oluşturmadınız. Yeni bir sınav oluşturduğunuzda burada listelenecektir.</p>
                <Link to="/" className="mt-6 inline-block bg-gradient-to-r from-[--accent-gradient-from] via-[--accent-gradient-via] to-[--accent-gradient-to] text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Yeni Sınav Oluştur
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[--bg-component] backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-[--border-color] animate-fade-in-up">
            <h2 className="text-2xl font-bold text-[--text-primary] mb-6">Geçmiş Sınavlar</h2>
            <div className="space-y-8">
                {Object.entries(groupedQuizzes).map(([groupName, quizzes]) => (
                    <div key={groupName}>
                        <h3 className="text-lg font-semibold text-[--text-secondary] mb-3 border-b border-[--border-muted] pb-2">{groupName}</h3>
                        <div className="space-y-4">
                           {(quizzes as SavedQuiz[]).map((quiz) => {
                                const firstQuestion = quiz.questions[0];
                                const quizTitle = quiz.customName || `${quiz.gradeName} - ${firstQuestion.unite_adi}`;
                                const isEditing = editingQuizId === quiz.id;

                                return (
                                    <div key={quiz.id} className="bg-[--bg-component-hover] p-4 rounded-xl shadow-sm transition-all hover:shadow-lg group flex items-center gap-4">
                                        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-800 rounded-lg hidden sm:flex items-center justify-center">
                                            <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                                        </div>

                                        <div className="flex-grow w-full overflow-hidden">
                                            {isEditing ? (
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="text"
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleRename(quiz.id);
                                                            if (e.key === 'Escape') setEditingQuizId(null);
                                                        }}
                                                        className="w-full font-semibold text-lg text-blue-800 dark:text-sky-300 bg-[--bg-component-active] border border-[--accent-gradient-via] rounded-md px-2 py-1 focus:ring-2 focus:ring-[--accent-gradient-via] focus:outline-none"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => handleRename(quiz.id)} title="Kaydet" className="p-2 rounded-full text-green-600 hover:bg-green-500/10">
                                                        <CheckIcon className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => setEditingQuizId(null)} title="İptal" className="p-2 rounded-full text-slate-500 hover:bg-slate-500/10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <Link to={`/history/${quiz.id}`} className="block group/link">
                                                    <p className="font-semibold text-lg text-[--text-accent] group-hover/link:underline truncate" title={quizTitle}>{quizTitle}</p>
                                                </Link>
                                            )}
                                            
                                            <div className="flex items-center flex-wrap gap-2 mt-2">
                                                <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-1 rounded-full font-medium">
                                                    {quiz.gradeName}
                                                </span>
                                                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-1 rounded-full font-medium truncate" title={firstQuestion.unite_adi}>
                                                    {firstQuestion.unite_adi}
                                                </span>
                                                <span className="text-xs bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 px-2 py-1 rounded-full font-medium">
                                                    {quiz.questions.length} Soru
                                                </span>
                                            </div>
                                            <p className="text-xs text-[--text-muted] mt-2">
                                                Oluşturulma: {new Date(quiz.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        <div className="shrink-0 flex items-center gap-1 self-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 focus-within:opacity-100">
                                            {!isEditing && (
                                                <button
                                                    onClick={() => handleStartEditing(quiz)}
                                                    title="Sınavı Yeniden Adlandır"
                                                    className="p-2 rounded-full text-[--text-secondary] hover:bg-blue-500/10 hover:text-blue-600"
                                                >
                                                    <EditIcon className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleArchive(quiz); }}
                                                disabled={archivedStatus[quiz.id]}
                                                title={archivedStatus[quiz.id] ? "Arşivlendi" : "Sınavı Arşive Ekle"}
                                                className="p-2 rounded-full text-[--text-secondary] hover:bg-purple-500/10 hover:text-purple-600 disabled:text-green-600 disabled:cursor-not-allowed"
                                            >
                                                {archivedStatus[quiz.id] ? <CheckIcon className="w-5 h-5" /> : <ArchiveAddIcon className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(quiz.id, quizTitle)}
                                                title="Sınavı Sil"
                                                className="p-2 rounded-full text-[--text-secondary] hover:bg-red-500/10 hover:text-red-600"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;