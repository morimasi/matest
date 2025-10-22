import React from 'react';
import { Grade, Unit, QuestionType } from '../types';
import { SparklesIcon } from './icons';

interface CurriculumSelectorProps {
  curriculumData: Grade[];
  selectedGrade: number | null;
  setSelectedGrade: (grade: number | null) => void;
  selectedUnit: string | null;
  setSelectedUnit: (unit: string | null) => void;
  selectedKazanim: string | null;
  setSelectedKazanim: (kazanim: string | null) => void;
  numQuestions: number;
  setNumQuestions: (count: number) => void;
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const CurriculumSelector: React.FC<CurriculumSelectorProps> = ({
  curriculumData,
  selectedGrade,
  setSelectedGrade,
  selectedUnit,
  setSelectedUnit,
  selectedKazanim,
  setSelectedKazanim,
  numQuestions,
  setNumQuestions,
  questionType,
  setQuestionType,
  customPrompt,
  setCustomPrompt,
  onGenerate,
  isLoading,
}) => {
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = parseInt(e.target.value, 10);
    setSelectedGrade(gradeId);
    setSelectedUnit(null);
    setSelectedKazanim(null);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
    setSelectedKazanim(null);
  };

  const currentGradeData = curriculumData.find(g => g.id === selectedGrade);
  const currentUnitData = currentGradeData?.units.find(u => u.id === selectedUnit);

  const canGenerate = selectedGrade && selectedUnit && selectedKazanim && !isLoading;

  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Sınav Parametreleri</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sınıf Seçimi */}
          <div>
            <label htmlFor="grade-select" className="block text-sm font-medium text-slate-600 mb-1">Sınıf</label>
            <select
              id="grade-select"
              value={selectedGrade ?? ''}
              onChange={handleGradeChange}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value="" disabled>Sınıf seçin...</option>
              {curriculumData.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>
          </div>

          {/* Ünite Seçimi */}
          <div>
            <label htmlFor="unit-select" className="block text-sm font-medium text-slate-600 mb-1">Ünite</label>
            <select
              id="unit-select"
              value={selectedUnit ?? ''}
              onChange={handleUnitChange}
              disabled={!selectedGrade}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:bg-slate-100/50"
            >
              <option value="" disabled>Ünite seçin...</option>
              {currentGradeData?.units.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))}
            </select>
          </div>

          {/* Kazanım Seçimi */}
          <div>
            <label htmlFor="kazanim-select" className="block text-sm font-medium text-slate-600 mb-1">Kazanım</label>
            <select
              id="kazanim-select"
              value={selectedKazanim ?? ''}
              onChange={(e) => setSelectedKazanim(e.target.value)}
              disabled={!selectedUnit}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:bg-slate-100/50"
            >
              <option value="" disabled>Kazanım seçin...</option>
              {currentUnitData?.kazanimlar.map(kazanim => (
                <option key={kazanim.id} value={kazanim.id}>{kazanim.id} - {kazanim.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Soru Sayısı Seçimi */}
          <div>
            <label htmlFor="question-count-select" className="block text-sm font-medium text-slate-600 mb-1">Soru Sayısı</label>
            <select
              id="question-count-select"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value={5}>5 Soru</option>
              <option value={10}>10 Soru</option>
              <option value={15}>15 Soru</option>
            </select>
          </div>

           {/* Soru Tipi Seçimi */}
          <div>
            <label htmlFor="question-type-select" className="block text-sm font-medium text-slate-600 mb-1">Soru Tipi</label>
            <select
              id="question-type-select"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value="coktan_secmeli">Çoktan Seçmeli</option>
              <option value="dogru_yanlis">Doğru/Yanlış</option>
              <option value="bosluk_doldurma">Boşluk Doldurma</option>
            </select>
          </div>
        </div>
         <div className="pt-2">
            <label htmlFor="custom-prompt" className="block text-sm font-medium text-slate-600 mb-1">Ek Talimatlar (İsteğe Bağlı)</label>
            <textarea
                id="custom-prompt"
                rows={3}
                className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                placeholder="Örn: Sorular Ege Bölgesi'ndeki şehirlerle ilgili olsun."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">Yapay zekaya daha spesifik veya yaratıcı sorular üretmesi için ek talimatlar verebilirsiniz.</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-2xl disabled:bg-slate-400 disabled:shadow-md disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Oluşturuluyor...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              AI ile Sınav Oluştur
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CurriculumSelector;