

import React, { useState, useEffect } from 'react';
import { CURRICULUM_DATA } from '../constants';
import { ARCHIVE_DATA } from '../archiveData';
import { Grade, Unit, Kazanim, ArchiveQuiz, DetailedQuestion } from '../types';
import QuizView from './QuizView';
import { ArchiveIcon, TrashIcon } from './icons';
import { getArchivedQuizzes, deleteQuizFromArchive, updateArchivedQuiz } from '../services/storageService';
import { generateSingleQuestion } from '../services/geminiService';


const Archive: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedKazanim, setSelectedKazanim] = useState<Kazanim | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<ArchiveQuiz | null>(null);
  
  const [userArchive, setUserArchive] = useState<Record<string, ArchiveQuiz>>({});
  const [combinedArchive, setCombinedArchive] = useState<Record<string, ArchiveQuiz>>(ARCHIVE_DATA);

  const [remixingIndex, setRemixingIndex] = useState<number | null>(null);
  const [remixError, setRemixError] = useState<string | null>(null);

  useEffect(() => {
    const fetchedUserArchive = getArchivedQuizzes();
    setUserArchive(fetchedUserArchive);
    setCombinedArchive({ ...ARCHIVE_DATA, ...fetchedUserArchive });
  }, []);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setSelectedUnit(null);
    setSelectedKazanim(null);
    setSelectedQuiz(null);
  };

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setSelectedKazanim(null);
    setSelectedQuiz(null);
  };

  const handleKazanimSelect = (kazanim: Kazanim) => {
    setSelectedKazanim(kazanim);
    const quizData = combinedArchive[kazanim.id];
    setSelectedQuiz(quizData || null);
    setRemixError(null); // Clear previous errors when selecting a new quiz
  };

  const handleDelete = (kazanim: Kazanim) => {
    if (window.confirm(`'${kazanim.name}' kazanımına ait kişisel arşiv sınavınızı silmek istediğinizden emin misiniz?`)) {
        deleteQuizFromArchive(kazanim.id);
        const updatedUserArchive = { ...userArchive };
        delete updatedUserArchive[kazanim.id];
        setUserArchive(updatedUserArchive);
        setCombinedArchive({ ...ARCHIVE_DATA, ...updatedUserArchive });
        
        // If the deleted quiz was being viewed, clear the view
        if (selectedKazanim?.id === kazanim.id) {
            setSelectedQuiz(ARCHIVE_DATA[kazanim.id] || null);
        }
    }
  };

   const handleRemixQuestion = async (questionIndex: number) => {
    if (!selectedQuiz || !selectedKazanim) return;
    setRemixingIndex(questionIndex);
    setRemixError(null);

    try {
        const oldQuestion = selectedQuiz.questions[questionIndex];
        const gradeData = CURRICULUM_DATA.find(g => g.name === selectedQuiz.gradeName);
        const unitData = gradeData?.units.find(u => u.name === oldQuestion.unite_adi);
        const kazanimData = unitData?.kazanimlar.find(k => k.id === oldQuestion.kazanim_kodu);

        if (!gradeData || !unitData || !kazanimData) {
            throw new Error("Soru için müfredat verisi bulunamadı.");
        }

        const newQuestion = await generateSingleQuestion(gradeData.name, unitData.name, kazanimData, oldQuestion.soru_tipi, oldQuestion.soru_metni);

        if (newQuestion) {
            const newQuestions = [...selectedQuiz.questions];
            newQuestions[questionIndex] = newQuestion;
            const updatedQuiz: ArchiveQuiz = { ...selectedQuiz, questions: newQuestions };
            
            updateArchivedQuiz(selectedKazanim.id, updatedQuiz);
            
            // Update local state to show changes immediately
            setSelectedQuiz(updatedQuiz);
            const updatedUserArchive = { ...userArchive, [selectedKazanim.id]: updatedQuiz };
            setUserArchive(updatedUserArchive);
            setCombinedArchive({ ...ARCHIVE_DATA, ...updatedUserArchive });
        } else {
             throw new Error("Yapay zeka yeni bir soru üretemedi.");
        }
    } catch (error: any) {
        setRemixError(error.message || "Soru yenilenirken bir hata oluştu.");
    } finally {
        setRemixingIndex(null);
    }
  };

  const isUserArchived = (kazanimId: string) => userArchive.hasOwnProperty(kazanimId);


  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Sınav Arşivi</h2>
       {remixError && (
            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-800 px-4 py-3 rounded-2xl relative shadow-lg" role="alert">
                <strong className="font-bold">Hata!</strong>
                <span className="block sm:inline ml-2">{remixError}</span>
            </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sütun 1: Sınıflar */}
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-700 border-b-2 border-purple-300 pb-2 mb-3">Sınıflar</h3>
          {CURRICULUM_DATA.map(grade => (
            <button
              key={grade.id}
              onClick={() => handleGradeSelect(grade)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedGrade?.id === grade.id ? 'bg-purple-600 text-white shadow-md' : 'bg-white/60 hover:bg-purple-100/70 text-slate-800'}`}
            >
              {grade.name}
            </button>
          ))}
        </div>

        {/* Sütun 2: Üniteler */}
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-700 border-b-2 border-blue-300 pb-2 mb-3">Üniteler</h3>
          {selectedGrade ? (
            selectedGrade.units.map(unit => (
              <button
                key={unit.id}
                onClick={() => handleUnitSelect(unit)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedUnit?.id === unit.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white/60 hover:bg-blue-100/70 text-slate-800'}`}
              >
                {unit.name}
              </button>
            ))
          ) : (
            <p className="text-slate-500 text-sm p-3">Lütfen bir sınıf seçin.</p>
          )}
        </div>
        
        {/* Sütun 3: Kazanımlar */}
        <div className="space-y-2">
           <h3 className="font-semibold text-slate-700 border-b-2 border-green-300 pb-2 mb-3">Kazanımlar</h3>
          {selectedUnit ? (
             <div className="max-h-96 overflow-y-auto pr-2">
                {selectedUnit.kazanimlar.map(kazanim => (
                <div key={kazanim.id} className="relative group flex items-center">
                    <button
                        onClick={() => handleKazanimSelect(kazanim)}
                        className={`flex-grow text-left p-3 rounded-lg transition-all duration-200 text-sm ${selectedKazanim?.id === kazanim.id ? 'bg-green-600 text-white shadow-md' : 'bg-white/60 hover:bg-green-100/70 text-slate-800'}`}
                    >
                        <strong className="block">{kazanim.id}</strong>
                        {kazanim.name}
                        {isUserArchived(kazanim.id) && <span className="absolute top-2 right-10 text-xs bg-yellow-400 text-yellow-900 font-bold px-1.5 py-0.5 rounded-full">Kişisel</span>}
                    </button>
                     {isUserArchived(kazanim.id) && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(kazanim); }} 
                            title="Arşivden Sil"
                            className="absolute right-0 p-2 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                     )}
                </div>
                ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm p-3">Lütfen bir ünite seçin.</p>
          )}
        </div>
      </div>
        
      <div className="mt-8 border-t border-white/50 pt-8">
        {selectedQuiz ? (
            <div className="animate-fade-in-up">
                <QuizView 
                    questions={selectedQuiz.questions} 
                    grade={selectedQuiz.gradeName}
                    quizId={`archive-${selectedKazanim?.id}`}
                    onRemixQuestion={isUserArchived(selectedKazanim?.id ?? '') ? handleRemixQuestion : undefined}
                    remixingIndex={remixingIndex}
                />
            </div>
        ) : selectedKazanim ? (
            <div className="text-center p-8 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <h3 className="text-xl font-semibold text-amber-800">Arşiv Kaydı Bulunamadı</h3>
                <p className="text-amber-700 mt-2">Seçtiğiniz kazanım için henüz bir arşiv sınavı oluşturulmamış.</p>
            </div>
        ) : (
            <div className="text-center p-8 bg-slate-100/50 rounded-2xl">
                <ArchiveIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Arşivlenmiş Sınavları Görüntüleyin</h3>
                <p className="text-slate-500 mt-2">Bir sınav şablonu görüntülemek için yukarıdan sınıf, ünite ve kazanım seçimi yapın.</p>
            </div>
        )}
      </div>

    </div>
  );
};

export default Archive;
