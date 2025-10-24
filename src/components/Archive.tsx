import React, { useState, useEffect, useCallback } from 'react';
import { CURRICULUM_DATA } from '../constants';
import { ARCHIVE_DATA } from '../archive';
import { Grade, Unit, Kazanim, ArchiveQuiz, QuizTemplate, DetailedQuestion } from '../types';
import QuizView from './QuizView';
import { ArchiveIcon, TrashIcon } from './icons';
import { getArchivedQuizzes, deleteQuizFromArchive, updateArchivedQuiz } from '../services/storageService';
import { generateSingleQuestion } from '../services/geminiService';


const Archive: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedKazanim, setSelectedKazanim] = useState<Kazanim | null>(null);
  
  const [userArchive, setUserArchive] = useState<Record<string, ArchiveQuiz>>({});
  
  const [templatesForSelectedKazanim, setTemplatesForSelectedKazanim] = useState<QuizTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<QuizTemplate | null>(null);

  const [remixingIndex, setRemixingIndex] = useState<number | null>(null);
  const [remixError, setRemixError] = useState<string | null>(null);

  const refreshUserArchive = useCallback(() => {
    const fetchedUserArchive = getArchivedQuizzes();
    setUserArchive(fetchedUserArchive);
  }, []);

  useEffect(() => {
    refreshUserArchive();
  }, [refreshUserArchive]);

  // Helper function to update a template in storage and local state, reducing code duplication.
  const updateAndRefreshTemplate = (templateId: string, updatedQuestions: DetailedQuestion[]) => {
      if (!selectedKazanim || !selectedTemplate) return;

      // 1. Update data in local storage
      updateArchivedQuiz(selectedKazanim.id, templateId, updatedQuestions);

      // 2. Create the updated template object for state
      const updatedTemplate = { ...selectedTemplate, id: templateId, questions: updatedQuestions };
      
      // 3. Update the currently selected template state
      setSelectedTemplate(updatedTemplate);

      // 4. Update the list of templates for the current kazanim
      setTemplatesForSelectedKazanim(prev => prev.map(t => t.id === templateId ? updatedTemplate : t));

      // 5. Refresh the main user archive state from storage
      refreshUserArchive();
  };

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setSelectedUnit(null);
    setSelectedKazanim(null);
    setSelectedTemplate(null);
    setTemplatesForSelectedKazanim([]);
  };

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setSelectedKazanim(null);
    setSelectedTemplate(null);
    setTemplatesForSelectedKazanim([]);
  };

  const handleKazanimSelect = (kazanim: Kazanim) => {
    setSelectedKazanim(kazanim);
    setRemixError(null);
    
    const systemTemplates = ARCHIVE_DATA[kazanim.id]?.templates || [];
    const userTemplates = userArchive[kazanim.id]?.templates || [];
    const allTemplates = [...systemTemplates, ...userTemplates];
    
    setTemplatesForSelectedKazanim(allTemplates);
    
    if (allTemplates.length === 1) {
      setSelectedTemplate(allTemplates[0]);
    } else {
      setSelectedTemplate(null);
    }
  };
  
  const handleDeleteTemplate = (kazanim: Kazanim, template: QuizTemplate) => {
    if (window.confirm(`Bu şablonu (${new Date(template.createdAt).toLocaleString('tr-TR')}) silmek istediğinizden emin misiniz?`)) {
        deleteQuizFromArchive(kazanim.id, template.id);
        
        const updatedUserArchive = getArchivedQuizzes();
        setUserArchive(updatedUserArchive);
        
        const updatedUserTemplates = (updatedUserArchive[kazanim.id]?.templates || []);
        const systemTemplates = ARCHIVE_DATA[kazanim.id]?.templates || [];
        const allTemplates = [...systemTemplates, ...updatedUserTemplates];
        
        setTemplatesForSelectedKazanim(allTemplates);
        if (selectedTemplate?.id === template.id) {
            setSelectedTemplate(allTemplates.length === 1 ? allTemplates[0] : null);
        }
    }
  };

  // This function is passed down to QuizView for direct editing.
  const handleUpdateArchivedQuiz = (updatedQuestions: DetailedQuestion[]) => {
    if (!selectedTemplate || selectedTemplate.isSystemTemplate) return;
    updateAndRefreshTemplate(selectedTemplate.id, updatedQuestions);
  };
  
  const handleRemixQuestion = async (questionIndex: number) => {
    if (!selectedTemplate || !selectedKazanim || selectedTemplate.isSystemTemplate) return;
    setRemixingIndex(questionIndex);
    setRemixError(null);

    const quizInfo = ARCHIVE_DATA[selectedKazanim.id] || userArchive[selectedKazanim.id];

    try {
        const oldQuestion = selectedTemplate.questions[questionIndex];
        const gradeData = CURRICULUM_DATA.find(g => g.name === quizInfo.gradeName);
        const unitData = gradeData?.units.find(u => u.name === oldQuestion.unite_adi);
        const kazanimData = unitData?.kazanimlar.find(k => k.id === oldQuestion.kazanim_kodu);

        if (!gradeData || !unitData || !kazanimData) {
            throw new Error("Soru için müfredat verisi bulunamadı.");
        }

        const newQuestion = await generateSingleQuestion(gradeData.name, unitData.name, kazanimData, oldQuestion.soru_tipi, oldQuestion.soru_metni);

        if (newQuestion) {
            const newQuestions = [...selectedTemplate.questions];
            newQuestions[questionIndex] = newQuestion;
            // Use the centralized update function
            updateAndRefreshTemplate(selectedTemplate.id, newQuestions);
        } else {
             throw new Error("Yapay zeka yeni bir soru üretemedi.");
        }
    } catch (error: any) {
        setRemixError(error.message || "Soru yenilenirken bir hata oluştu.");
    } finally {
        setRemixingIndex(null);
    }
  };

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
        
        <div className="space-y-2">
           <h3 className="font-semibold text-slate-700 border-b-2 border-green-300 pb-2 mb-3">Kazanımlar</h3>
          {selectedUnit ? (
             <div className="max-h-96 overflow-y-auto pr-2">
                {selectedUnit.kazanimlar.map(kazanim => (
                <div key={kazanim.id} className="relative group flex items-center">
                    <button
                        onClick={() => handleKazanimSelect(kazanim)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm ${selectedKazanim?.id === kazanim.id ? 'bg-green-600 text-white shadow-md' : 'bg-white/60 hover:bg-green-100/70 text-slate-800'}`}
                    >
                        <strong className="block">{kazanim.id}</strong>
                        {kazanim.name}
                    </button>
                </div>
                ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm p-3">Lütfen bir ünite seçin.</p>
          )}
        </div>
      </div>
        
      <div className="mt-8 border-t border-white/50 pt-8">
        {selectedTemplate ? (
            <div className="animate-fade-in-up">
                <QuizView 
                    questions={selectedTemplate.questions} 
                    grade={ (ARCHIVE_DATA[selectedKazanim!.id] || userArchive[selectedKazanim!.id]).gradeName }
                    quizId={`archive-${selectedKazanim?.id}-${selectedTemplate.id}`}
                    onRemixQuestion={!selectedTemplate.isSystemTemplate ? handleRemixQuestion : undefined}
                    remixingIndex={remixingIndex}
                    onUpdateQuiz={!selectedTemplate.isSystemTemplate ? handleUpdateArchivedQuiz : undefined}
                />
            </div>
        ) : templatesForSelectedKazanim.length > 0 ? (
             <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold text-slate-700 mb-4">"'<span className="text-blue-600">{selectedKazanim?.name}</span>'" için Şablonlar</h3>
                <div className="space-y-3">
                    {templatesForSelectedKazanim.map(template => (
                        <div key={template.id} className="group bg-white/60 p-4 rounded-xl flex items-center justify-between transition-all hover:shadow-md hover:bg-white/80">
                            <div>
                                <p className="font-semibold text-slate-800">
                                    {template.isSystemTemplate ? 'Sistem Şablonu' : 'Kişisel Şablon'}
                                    <span className="ml-2 text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{template.questions.length} Soru</span>
                                </p>
                                <p className="text-sm text-slate-500">
                                    {template.isSystemTemplate ? 'Değiştirilemez orijinal şablon' : `Oluşturulma: ${new Date(template.createdAt).toLocaleString('tr-TR')}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setSelectedTemplate(template)} className="px-4 py-2 text-sm bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">Görüntüle</button>
                                {!template.isSystemTemplate && (
                                     <button 
                                        onClick={() => handleDeleteTemplate(selectedKazanim!, template)} 
                                        title="Bu şablonu sil"
                                        className="p-2 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
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