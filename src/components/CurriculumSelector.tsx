

import React, { useState, useRef, useEffect } from 'react';
import { Grade, Unit, QuestionType } from '../types';
import { SparklesIcon, MicrophoneIcon } from './icons';

interface CurriculumSelectorProps {
  curriculumData: Grade[];
  selectedGrade: number | null;
  setSelectedGrade: (grade: number | null) => void;
  selectedUnits: string[];
  setSelectedUnits: (units: string[]) => void;
  selectedKazanims: string[];
  setSelectedKazanims: (kazanims: string[]) => void;
  numQuestions: number;
  setNumQuestions: (count: number) => void;
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  includeCharts: boolean;
  setIncludeCharts: (include: boolean) => void;
  numOperations: number;
  setNumOperations: (num: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const CurriculumSelector: React.FC<CurriculumSelectorProps> = ({
  curriculumData,
  selectedGrade,
  setSelectedGrade,
  selectedUnits,
  setSelectedUnits,
  selectedKazanims,
  setSelectedKazanims,
  numQuestions,
  setNumQuestions,
  questionType,
  setQuestionType,
  customPrompt,
  setCustomPrompt,
  includeCharts,
  setIncludeCharts,
  numOperations,
  setNumOperations,
  onGenerate,
  isLoading,
}) => {
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [isKazanimOpen, setIsKazanimOpen] = useState(false);
  const unitSelectorRef = useRef<HTMLDivElement>(null);
  const kazanimSelectorRef = useRef<HTMLDivElement>(null);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (unitSelectorRef.current && !unitSelectorRef.current.contains(event.target as Node)) {
        setIsUnitOpen(false);
      }
      if (kazanimSelectorRef.current && !kazanimSelectorRef.current.contains(event.target as Node)) {
        setIsKazanimOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleListening = () => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Ses tanıma özelliği tarayıcınız tarafından desteklenmiyor.");
      return;
    }

    // If an instance already exists, it means we are either listening or stopping.
    // The only action is to stop it. The 'onend' handler will do the cleanup.
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    // If no instance exists, create a new one and start it.
    const recognitionInstance = new SpeechRecognitionAPI();
    recognitionRef.current = recognitionInstance;
    
    recognitionInstance.continuous = false;
    recognitionInstance.lang = 'tr-TR';
    recognitionInstance.interimResults = false;

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCustomPrompt(prev => (prev ? prev.trim() + ' ' : '') + transcript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert("Mikrofon izni verilmedi. Sesli komut özelliğini kullanmak için tarayıcı ayarlarınızdan mikrofon erişimine izin vermelisiniz.");
      } else if (event.error === 'no-speech') {
        alert("Konuşma algılanamadı. Lütfen tekrar deneyin.");
      } else if (event.error === 'network') {
        alert("Ağ hatası nedeniyle ses tanıma başarısız oldu.");
      }
      // The onend event usually fires after onerror, triggering cleanup.
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      // Only nullify if the ref still points to this instance.
      // This avoids a race condition if the user clicks stop then start again very quickly.
      if (recognitionRef.current === recognitionInstance) {
        recognitionRef.current = null;
      }
    };

    try {
      recognitionInstance.start();
    } catch (error) {
      // This can happen if start() is called while another instance is still finalizing its stop.
      console.error("Could not start speech recognition:", error);
      setIsListening(false);
      recognitionRef.current = null; // Clean up on immediate failure
    }
  };


  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = parseInt(e.target.value, 10);
    setSelectedGrade(gradeId);
    setSelectedUnits([]);
    setSelectedKazanims([]);
  };

  const handleUnitToggle = (unitId: string) => {
    const newSelectedUnits = selectedUnits.includes(unitId)
      ? selectedUnits.filter(id => id !== unitId)
      : [...selectedUnits, unitId];
    setSelectedUnits(newSelectedUnits);
    
    const currentGradeData = curriculumData.find(g => g.id === selectedGrade);
    const allowedKazanimIds = currentGradeData?.units
        .filter(u => newSelectedUnits.includes(u.id))
        .flatMap(u => u.kazanimlar.map(k => k.id)) || [];
    setSelectedKazanims(selectedKazanims.filter(kId => allowedKazanimIds.includes(kId)));
  };


  const handleKazanimToggle = (kazanimId: string) => {
    setSelectedKazanims(
      selectedKazanims.includes(kazanimId)
        ? selectedKazanims.filter(id => id !== kazanimId)
        : [...selectedKazanims, kazanimId]
    );
  };

  const currentGradeData = curriculumData.find(g => g.id === selectedGrade);
  const currentUnitsData = currentGradeData?.units.filter(u => selectedUnits.includes(u.id));
  
  const showChartOption = currentGradeData?.units
      .filter(u => selectedUnits.includes(u.id))
      .some(unit => unit.name === 'Veri İşleme' || unit.name === 'Geometri') ?? false;

  useEffect(() => {
    if (!showChartOption) {
      setIncludeCharts(false);
    }
  }, [showChartOption, setIncludeCharts]);


  const canGenerate = selectedGrade && selectedUnits.length > 0 && !isLoading;

  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Sınav Parametreleri</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="relative" ref={unitSelectorRef}>
             <label htmlFor="unit-select" className="block text-sm font-medium text-slate-600 mb-1">Ünite(ler)</label>
              <button
                id="unit-select"
                onClick={() => setIsUnitOpen(!isUnitOpen)}
                disabled={!selectedGrade}
                className="w-full text-left p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:bg-slate-100/50 flex justify-between items-center"
              >
                <span className="truncate">
                    {selectedUnits.length === 0 && 'Ünite seçin...'}
                    {selectedUnits.length === 1 && `1 ünite seçildi`}
                    {selectedUnits.length > 1 && `${selectedUnits.length} ünite seçildi`}
                </span>
                 <svg className={`w-4 h-4 text-slate-500 transition-transform ${isUnitOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
               {isUnitOpen && (
                <div className="absolute top-full mt-1 w-full bg-white/80 backdrop-blur-lg border border-slate-300/50 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                    {currentGradeData?.units.map(unit => (
                    <label key={unit.id} className="flex items-center gap-3 p-2 hover:bg-purple-500/10 cursor-pointer text-sm">
                        <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        checked={selectedUnits.includes(unit.id)}
                        onChange={() => handleUnitToggle(unit.id)}
                        />
                        <span className="text-slate-700">{unit.name}</span>
                    </label>
                    ))}
                </div>
                )}
          </div>

          <div className="relative" ref={kazanimSelectorRef}>
            <label htmlFor="kazanim-select" className="block text-sm font-medium text-slate-600 mb-1">Kazanım(lar) (İsteğe Bağlı)</label>
            <button
              id="kazanim-select"
              onClick={() => setIsKazanimOpen(!isKazanimOpen)}
              disabled={selectedUnits.length === 0}
              className="w-full text-left p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:bg-slate-100/50 flex justify-between items-center"
            >
              <span className="truncate">
                {selectedKazanims.length === 0 && 'Tüm kazanımlardan karışık'}
                {selectedKazanims.length === 1 && `1 kazanım seçildi`}
                {selectedKazanims.length > 1 && `${selectedKazanims.length} kazanım seçildi`}
              </span>
              <svg className={`w-4 h-4 text-slate-500 transition-transform ${isKazanimOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {isKazanimOpen && (
              <div className="absolute top-full mt-1 w-full bg-white/80 backdrop-blur-lg border border-slate-300/50 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {currentUnitsData?.map(unit => (
                    <div key={`unit-group-${unit.id}`}>
                        <h5 className="font-bold text-xs text-slate-500 uppercase bg-slate-100/70 p-2 sticky top-0">{unit.name}</h5>
                        {unit.kazanimlar.map(kazanim => (
                        <label key={kazanim.id} className="flex items-center gap-3 p-2 hover:bg-purple-500/10 cursor-pointer text-sm">
                            <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                            checked={selectedKazanims.includes(kazanim.id)}
                            onChange={() => handleKazanimToggle(kazanim.id)}
                            />
                            <span className="text-slate-700">{kazanim.id} - {kazanim.name}</span>
                        </label>
                        ))}
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="question-count-select" className="block text-sm font-medium text-slate-600 mb-1">Soru Sayısı</label>
            <select
              id="question-count-select"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
              className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              <option value={5}>5 Soru</option>
              <option value={8}>8 Soru</option>
              <option value={10}>10 Soru</option>
              <option value={12}>12 Soru</option>
              <option value={14}>14 Soru</option>
              <option value={15}>15 Soru</option>
              <option value={16}>16 Soru</option>
              <option value={18}>18 Soru</option>
              <option value={20}>20 Soru</option>
              <option value={22}>22 Soru</option>
              <option value={24}>24 Soru</option>
              <option value={25}>25 Soru</option>
              <option value={26}>26 Soru</option>
              <option value={30}>30 Soru</option>
              <option value={50}>50 Soru</option>
            </select>
          </div>

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

          <div>
            <label htmlFor="operation-count-select" className="block text-sm font-medium text-slate-600 mb-1">Problem Tipi</label>
            <select
                id="operation-count-select"
                value={numOperations}
                onChange={(e) => setNumOperations(parseInt(e.target.value, 10))}
                className="w-full p-2.5 bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
                <option value={0}>Otomatik (Karışık)</option>
                <option value={1}>1 İşlemli Problem</option>
                <option value={2}>2 İşlemli Problem</option>
                <option value={3}>3 İşlemli Problem</option>
            </select>
          </div>
        </div>
        {showChartOption && (
            <div className="pt-2 animate-fade-in-up">
                <label className="p-3 flex items-center justify-between bg-white/60 border border-slate-300/50 rounded-md shadow-sm cursor-pointer hover:bg-white/80 transition-all duration-300">
                    <div>
                        <span className="font-semibold text-slate-700">Görsel Yardımcı Ekle (Grafik/Şekil)</span>
                        <p className="text-xs text-slate-500 mt-1 pr-4">Seçilen 'Veri İşleme' veya 'Geometri' kazanımları için sorulara yapısal grafik veya şekil verileri ekler.</p>
                    </div>
                    <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={includeCharts}
                        onChange={(e) => setIncludeCharts(e.target.checked)}
                    />
                </label>
            </div>
        )}
         <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="custom-prompt" className="block text-sm font-medium text-slate-600">Ek Talimatlar (İsteğe Bağlı)</label>
                <button
                    type="button"
                    onClick={handleToggleListening}
                    title={isListening ? "Dinlemeyi Durdur" : "Sesli Komut Ver"}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold'
                    }`}
                >
                    <MicrophoneIcon className="w-4 h-4" />
                    {isListening ? "Dinleniyor..." : "Sesli Komut"}
                </button>
            </div>
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
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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