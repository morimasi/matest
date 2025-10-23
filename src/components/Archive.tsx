

import React, { useState, useEffect } from 'react';
import { CURRICULUM_DATA } from '../constants';
import { ARCHIVE_DATA } from '../archiveData';
import { Grade, Unit, Kazanim, ArchiveQuiz } from '../types';
import QuizView from './QuizView';
import { ArchiveIcon } from './icons';
import { getArchivedQuizzes } from '../services/storageService';

const Archive: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedKazanim, setSelectedKazanim] = useState<Kazanim | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<ArchiveQuiz | null>(null);
  const [combinedArchive, setCombinedArchive] = useState<Record<string, ArchiveQuiz>>(ARCHIVE_DATA);

  useEffect(() => {
    const userArchive = getArchivedQuizzes();
    // User's personal archive overrides the static default templates
    setCombinedArchive({ ...ARCHIVE_DATA, ...userArchive });
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
    if (quizData) {
      setSelectedQuiz(quizData);
    } else {
      setSelectedQuiz(null); // No quiz data for this kazanim
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Sınav Arşivi</h2>
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
                <button
                    key={kazanim.id}
                    onClick={() => handleKazanimSelect(kazanim)}
                    className={`w-full text-left p-3 mb-2 rounded-lg transition-all duration-200 text-sm ${selectedKazanim?.id === kazanim.id ? 'bg-green-600 text-white shadow-md' : 'bg-white/60 hover:bg-green-100/70 text-slate-800'}`}
                >
                    <strong className="block">{kazanim.id}</strong>
                    {kazanim.name}
                </button>
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
                    // Archive quizzes don't need a persistent ID for storage, so we use the kazanim code as a key
                    quizId={`archive-${selectedKazanim?.id}`} 
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
