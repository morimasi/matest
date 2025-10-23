
import React, { useRef, useState, useEffect } from 'react';
import { DetailedQuestion } from '../types';
import { DownloadIcon, PrintIcon, ShareIcon, SparklesIcon, SettingsIcon, CopyIcon, CheckIcon, RefreshCwIcon } from './icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface QuizViewProps {
  questions: DetailedQuestion[];
  grade: string;
  quizId: string;
  onRemixQuestion?: (questionIndex: number) => void;
  remixingIndex?: number | null;
}

const VIEW_SETTINGS_KEY = 'quizViewSettings';
const NOTES_PREFIX = 'quizNotes_';

const QuizView: React.FC<QuizViewProps> = ({ questions, grade, quizId, onRemixQuestion, remixingIndex }) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const [settings, setSettings] = useState(() => {
    const initialSettings = {
        fontFamily: "'Inter', sans-serif",
        fontSize: 12, // pt
        columns: 1,
        textAlign: 'left',
        pageStyle: 'normal',
        showBorder: false,
        textColor: '#1e293b',
    };
    try {
        const savedSettings = localStorage.getItem(VIEW_SETTINGS_KEY);
        return savedSettings ? { ...initialSettings, ...JSON.parse(savedSettings) } : initialSettings;
    } catch {
        return initialSettings;
    }
  });

  const [customTeacherNotes, setCustomTeacherNotes] = useState<Record<number, string>>(() => {
    try {
      const savedNotes = localStorage.getItem(`${NOTES_PREFIX}${quizId}`);
      return savedNotes ? JSON.parse(savedNotes) : {};
    } catch {
        return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${NOTES_PREFIX}${quizId}`, JSON.stringify(customTeacherNotes));
  }, [customTeacherNotes, quizId]);

  const handleNoteChange = (index: number, text: string) => {
    setCustomTeacherNotes(prev => ({ ...prev, [index]: text }));
  };
  
  if (!questions || questions.length === 0) return null;

  const uniqueUnitNames = [...new Set(questions.map(q => q.unite_adi))].join(' & ');
  const uniqueKazanimCodes = [...new Set(questions.map(q => q.kazanim_kodu))].join(', ');
  const firstQuestion = questions[0];
  

 const handleDownloadPdf = async () => {
    if (isDownloading || !quizRef.current) return;
    setIsDownloading(true);

    const quizElement = quizRef.current;
    
    // Temporarily apply styles for better PDF capture
    const originalStyles = {
        columnCount: quizElement.style.columnCount,
        width: quizElement.style.width,
        boxShadow: quizElement.style.boxShadow,
    };
    // Force single column for consistent, multi-page layout
    quizElement.style.columnCount = '1';
    quizElement.style.width = '800px'; // A fixed width can help with consistency
    quizElement.style.boxShadow = 'none';
    
    try {
        const canvas = await html2canvas(quizElement, {
            scale: 2.5, // Higher resolution for crisp text
            useCORS: true,
            windowWidth: quizElement.scrollWidth,
            windowHeight: quizElement.scrollHeight,
            backgroundColor: null, // Use element's background
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;

        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.height / imgProps.width;
        
        const imgWidthInPdf = pdfWidth - (margin * 2);
        const imgHeightInPdf = imgWidthInPdf * ratio;

        let heightLeft = imgHeightInPdf;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidthInPdf, imgHeightInPdf);
        heightLeft -= (pdfHeight - (margin * 2));

        while (heightLeft > 0) {
            position -= (pdfHeight - (margin * 2));
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidthInPdf, imgHeightInPdf);
            heightLeft -= (pdfHeight - (margin * 2));
        }
        
        pdf.save(`${grade}-${uniqueUnitNames}-sinav.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
        // Restore original styles
        quizElement.style.columnCount = originalStyles.columnCount;
        quizElement.style.width = originalStyles.width;
        quizElement.style.boxShadow = originalStyles.boxShadow;
        setIsDownloading(false);
    }
  };

  const handlePrint = () => { window.print(); };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI ile Oluşturulmuş Sınav',
          text: `İşte ${grade} - ${uniqueUnitNames} konusu için hazırladığım sınav!`,
        });
      } catch (error) { console.error('Error sharing:', error); }
    } else {
      alert('Tarayıcınız paylaşma özelliğini desteklemiyor.');
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#/history/${quizId}`;
    navigator.clipboard.writeText(url).then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Bağlantı kopyalanamadı.");
    });
  };

  const quizContentStyle: React.CSSProperties & { [key: `--${string}`]: string | number } = {
    '--text-color': settings.textColor,
    '--line-height': `${settings.fontSize * 1.6}pt`,
    '--bg-color': 'white',
    '--column-count': settings.columns,
    '--column-gap': '2rem',
    fontFamily: settings.fontFamily,
    fontSize: `${settings.fontSize}pt`,
    color: settings.textColor,
    textAlign: settings.textAlign as 'left' | 'center',
    columnCount: settings.columns,
    columnGap: '2rem'
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 mt-8 printable-area">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden non-printable">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Oluşturulan Sınav</h2>
            <p className="text-slate-500 max-w-md">{`${grade} | ${uniqueUnitNames} | ${uniqueKazanimCodes}`}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handlePrint} title="Yazdır" className="p-2 rounded-full hover:bg-black/10 transition-all duration-300"><PrintIcon className="w-6 h-6 text-slate-600" /></button>
          <button onClick={handleDownloadPdf} disabled={isDownloading} title="PDF Olarak İndir" className="p-2 rounded-full hover:bg-black/10 transition-all duration-300 disabled:opacity-50">
            {isDownloading ? (
                <svg className="animate-spin h-6 w-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <DownloadIcon className="w-6 h-6 text-slate-600" />
            )}
          </button>
          <button onClick={handleShare} title="Paylaş" className="p-2 rounded-full hover:bg-black/10 transition-all duration-300"><ShareIcon className="w-6 h-6 text-slate-600" /></button>
          <button onClick={handleCopyLink} title="Bağlantıyı Kopyala" className="p-2 rounded-full hover:bg-black/10 transition-all duration-300">
             {copyStatus === 'copied' ? <CheckIcon className="w-6 h-6 text-green-600" /> : <CopyIcon className="w-6 h-6 text-slate-600" />}
          </button>

          <div className="relative">
             <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} title="Yazdırma Ayarları" className="p-2 rounded-full hover:bg-black/10 transition-all duration-300">
                <SettingsIcon className="w-6 h-6 text-slate-600" />
            </button>
            {isSettingsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/50 z-10">
                    <h4 className="font-bold text-slate-700 mb-4 text-center">Yazdırma ve Görünüm Ayarları</h4>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Font Ailesi</label>
                                <select value={settings.fontFamily} onChange={e => setSettings({...settings, fontFamily: e.target.value})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="'Inter', sans-serif">Standart (Inter)</option>
                                    <option value="'OpenDyslexic', sans-serif">Disleksi Dostu</option>
                                    <option value="'Comic Neue', cursive">Comic Neue</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Yazı Tipi Boyutu</label>
                                <select value={settings.fontSize} onChange={e => setSettings({...settings, fontSize: parseInt(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="10">10pt</option><option value="11">11pt</option><option value="12">12pt</option><option value="13">13pt</option><option value="14">14pt</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Sütun</label>
                                <select value={settings.columns} onChange={e => setSettings({...settings, columns: parseInt(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="1">Tek Sütun</option><option value="2">İki Sütun</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Hizalama</label>
                                <select value={settings.textAlign} onChange={e => setSettings({...settings, textAlign: e.target.value})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="left">Sola Dayalı</option><option value="center">Ortalanmış</option>
                                </select>
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Sayfa Stili</label>
                            <select value={settings.pageStyle} onChange={e => setSettings({...settings, pageStyle: e.target.value})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                <option value="normal">Standart</option><option value="notebook">Defter Stili</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600">Sayfa Kenarlığı</label>
                            <input type="checkbox" checked={settings.showBorder} onChange={e => setSettings({...settings, showBorder: e.target.checked})} className="toggle-checkbox" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600">Metin Rengi</label>
                            <input type="color" value={settings.textColor} onChange={e => setSettings({...settings, textColor: e.target.value})} className="w-8 h-8 p-0 border-none rounded-md cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
          </div>
          <div className="flex items-center gap-4 ml-4 border-l border-slate-300/70 pl-4">
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm font-medium text-slate-700">Cevapları Göster</span>
              <input type="checkbox" checked={showAnswers} onChange={() => setShowAnswers(!showAnswers)} className="toggle-checkbox" />
            </label>
             {showAnswers && (
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-sm font-medium text-slate-700">Öğretmen Notları</span>
                <input type="checkbox" checked={isTeacherView} onChange={() => setIsTeacherView(!isTeacherView)} className="toggle-checkbox" />
              </label>
            )}
          </div>
        </div>
      </div>
      
      <div id="quiz-paper" ref={quizRef} style={quizContentStyle} className={`p-4 sm:p-8 bg-white border-t border-slate-200/80 rounded-b-2xl quiz-paper ${settings.showBorder ? 'bordered' : ''} ${settings.pageStyle}`}>
        <header className="text-center mb-8">
            <h1 className="text-xl font-bold">Matematik Değerlendirme</h1>
            <p className="text-sm opacity-80">{`${grade} / Ünite(ler): ${uniqueUnitNames}`}</p>
            <p className="text-sm opacity-70 mt-1"><strong>Kazanım(lar):</strong> {uniqueKazanimCodes}</p>
            <div className="grid grid-cols-3 gap-4 mt-6 border-t border-b py-2 text-left">
                <p><strong>Adı Soyadı:</strong> ....................................</p>
                <p><strong>Tarih:</strong> ..... / ..... / ..........</p>
                <p><strong>Puan:</strong> ............</p>
            </div>
        </header>

        <ol className="space-y-8 list-decimal list-inside">
          {questions.map((q, index) => (
            <li key={index} className="text-slate-800 break-inside-avoid relative">
              <div className="flex justify-between items-start">
                  <p className="font-semibold mb-3 inline flex-1" style={{color: 'inherit'}}>{q.soru_metni}</p>
                  {onRemixQuestion && showAnswers && isTeacherView && (
                    <button 
                        onClick={() => onRemixQuestion(index)} 
                        disabled={remixingIndex === index}
                        title="Bu soruyu yeniden oluştur"
                        className="p-1 ml-2 rounded-full text-blue-500 hover:bg-blue-500/10 disabled:text-slate-400 disabled:cursor-wait"
                    >
                       {remixingIndex === index ? (
                           <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                       ) : (
                           <RefreshCwIcon className="w-4 h-4"/>
                       )}
                    </button>
                  )}
              </div>
              
              {q.soru_tipi === 'coktan_secmeli' && q.secenekler && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 pl-2 options-grid">
                  {Object.entries(q.secenekler).map(([key, optionText]) => {
                    const isCorrect = showAnswers && key === q.dogru_cevap;
                    return (
                      <div key={key} className={`p-2 rounded-md transition-all duration-300 ${isCorrect ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
                        <span>{key}) {optionText}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {q.soru_tipi === 'dogru_yanlis' && (
                <div className="flex items-center gap-4 mt-2 pl-2">
                    <div className={`p-2 rounded-md transition-all duration-300 border w-24 text-center ${showAnswers && q.dogru_cevap === 'Doğru' ? 'bg-green-100 text-green-800 font-bold border-green-200' : 'bg-slate-50 border-slate-200'}`}>Doğru</div>
                    <div className={`p-2 rounded-md transition-all duration-300 border w-24 text-center ${showAnswers && q.dogru_cevap === 'Yanlış' ? 'bg-green-100 text-green-800 font-bold border-green-200' : 'bg-slate-50 border-slate-200'}`}>Yanlış</div>
                </div>
              )}

              {q.soru_tipi === 'bosluk_doldurma' && showAnswers && (
                <div className="mt-2 pl-2">
                    <p className="p-2 rounded-md bg-green-100 text-green-800 font-bold inline-block">Cevap: {q.dogru_cevap}</p>
                </div>
              )}

              {showAnswers && isTeacherView && (
                <div className="mt-4 ml-6 p-3 bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 rounded-xl space-y-2">
                    <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2"><SparklesIcon className="w-4 h-4"/> Öğretmen Notu</h4>
                    <p className="text-sm text-blue-700"><strong>Kazanım:</strong> {q.kazanim_kodu}</p>
                    <p className="text-sm text-blue-700"><strong>Çözüm:</strong> {q.cozum_anahtari}</p>
                    <p className="text-sm text-blue-700"><strong>Seviye:</strong> <span className="capitalize px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs">{q.seviye}</span></p>
                    <div className="pt-2 border-t border-blue-100">
                        <p className="text-sm text-blue-700"><strong>Gerçek Yaşam Bağlantısı:</strong> {q.gercek_yasam_baglantisi}</p>
                    </div>
                    {q.soru_tipi === 'coktan_secmeli' && q.yanlis_secenek_tipleri && q.yanlis_secenek_tipleri.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                            <strong className="text-sm text-blue-700">Çeldirici Analizi:</strong>
                            <ul className="list-disc list-inside pl-4 text-sm text-blue-600">
                                {q.yanlis_secenek_tipleri.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="pt-2 border-t border-blue-100">
                        <label htmlFor={`teacher-note-${index}`} className="text-sm font-semibold text-blue-800">Ek Notlar / İpuçları:</label>
                        <textarea
                            id={`teacher-note-${index}`}
                            rows={3}
                            className="w-full mt-1 p-2 text-sm bg-white/60 border border-blue-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 transition-all duration-200 note-textarea"
                            placeholder="Öğrenciler için ipuçları veya ek açıklamalar ekleyin..."
                            value={customTeacherNotes[index] || ''}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                        />
                    </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
       <style>{`
        .toggle-checkbox {
            appearance: none; width: 40px; height: 20px; background-color: #cbd5e1;
            border-radius: 9999px; position: relative; cursor: pointer; transition: all 0.3s ease-in-out;
        }
        .toggle-checkbox::before {
            content: ''; width: 16px; height: 16px; background-color: white; border-radius: 9999px;
            position: absolute; top: 2px; left: 2px; transition: all 0.3s ease-in-out;
        }
        .toggle-checkbox:checked { background-color: #6366f1; }
        .toggle-checkbox:checked::before { transform: translateX(20px); }
        
        .quiz-paper { background-color: var(--bg-color); }
        .quiz-paper.notebook {
            background-image: linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 100% var(--line-height);
            line-height: var(--line-height);
        }
        .quiz-paper.bordered { border: 2px solid black; }

        @media print {
            @page {
                size: A4;
                margin: 2cm;
            }
            body { 
                background: white !important; 
                -webkit-print-color-adjust: exact;
            }
            .non-printable { display: none !important; }
            .printable-area { 
                box-shadow: none !important; 
                border: none !important; 
                padding: 0 !important; 
                margin: 0 !important; 
                backdrop-filter: none !important; 
                background-color: white !important; 
            }
            .quiz-paper {
                color: var(--text-color) !important;
                background-color: var(--bg-color) !important;
                color-adjust: exact;
                box-shadow: none !important;
                border: none !important;
                column-count: var(--column-count) !important;
                column-gap: var(--column-gap) !important;
                width: 100% !important;
                padding: 0 !important;
            }
            .quiz-paper header {
                break-after: avoid;
            }
            .quiz-paper p, .quiz-paper li, .quiz-paper div {
                overflow-wrap: break-word;
            }
            .quiz-paper li.break-inside-avoid {
                break-inside: avoid;
                page-break-inside: avoid;
                orphans: 3;
                widows: 3;
            }
            .quiz-paper .options-grid {
                 display: block !important;
            }
            .quiz-paper.bordered {
                border: 2px solid black !important;
            }
            .quiz-paper.notebook {
                 background-image: linear-gradient(to bottom, #e2e8f0 1px, transparent 1px) !important;
            }
            .bg-green-100 { 
                background-color: #dcfce7 !important; 
            }
            .note-textarea {
                border: 1px dashed #93c5fd !important;
                background-color: #eff6ff !important;
            }
            button[title="Bu soruyu yeniden oluştur"] {
                display: none !important;
            }
        }
      `}</style>
    </div>
  );
};

export default QuizView;
