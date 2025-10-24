

import React, { useRef, useState, useEffect } from 'react';
import { DetailedQuestion, ChartData } from '../types';
import { DownloadIcon, PrintIcon, ShareIcon, SparklesIcon, SettingsIcon, CopyIcon, CheckIcon, RefreshCwIcon, ArchiveAddIcon } from './icons';


interface QuizViewProps {
  questions: DetailedQuestion[];
  grade: string;
  quizId: string;
  onRemixQuestion?: (questionIndex: number) => void;
  remixingIndex?: number | null;
  onArchive?: () => void;
  isArchived?: boolean;
  onUpdateQuiz?: (updatedQuestions: DetailedQuestion[]) => void;
}

const VIEW_SETTINGS_KEY = 'quizViewSettings';
const NOTES_PREFIX = 'quizNotes_';

type EditingTarget = {
  questionIndex: number;
  field: 'soru_metni' | 'secenek' | 'dogru_cevap' | 'cozum_anahtari' | 'gercek_yasam_baglantisi' | 'grafik_baslik' | 'grafik_veri_etiket' | 'grafik_veri_deger';
  optionKey?: 'A' | 'B' | 'C' | 'D';
  dataIndex?: number;
};


const ChartRenderer: React.FC<{ 
    data: ChartData, 
    questionIndex: number, 
    isEditable: boolean,
    editingTarget: EditingTarget | null,
    editingValue: string,
    setEditingValue: (value: string) => void,
    handleStartEditing: (target: EditingTarget, value: string) => void,
    handleSaveChanges: () => void,
    handleKeyDown: (e: React.KeyboardEvent) => void
}> = ({ 
    data, 
    questionIndex, 
    isEditable, 
    editingTarget, 
    editingValue, 
    setEditingValue,
    handleStartEditing, 
    handleSaveChanges, 
    handleKeyDown 
}) => {
  if (!data || !data.veri || data.veri.length === 0) {
    return null;
  }
  
  const isEditing = (field: EditingTarget['field'], dataIndex?: number) => {
      return editingTarget?.questionIndex === questionIndex && editingTarget?.field === field && (dataIndex === undefined || editingTarget?.dataIndex === dataIndex);
  }

  const renderChart = () => {
    switch (data.tip) {
      case 'siklik_tablosu':
        return (
          <table className="w-full my-4 border-collapse text-left max-w-sm mx-auto" style={{ pageBreakInside: 'avoid' }}>
            <thead className="bg-slate-100 font-semibold">
              <tr>
                <th className="border border-slate-300 p-2 capitalize">Kategori</th>
                <th className="border border-slate-300 p-2 capitalize text-center">Sayı</th>
              </tr>
            </thead>
            <tbody>
              {data.veri.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-slate-300 p-2">
                     {isEditing('grafik_veri_etiket', index) ? (
                        <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveChanges}
                            onKeyDown={handleKeyDown}
                            className="w-full p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    ) : (
                        <span onDoubleClick={() => isEditable && handleStartEditing({ questionIndex, field: 'grafik_veri_etiket', dataIndex: index }, item.etiket)} className={`w-full block ${isEditable ? 'editable-field' : ''}`}>
                            {item.etiket}
                        </span>
                    )}
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                     {isEditing('grafik_veri_deger', index) ? (
                        <input
                            type="number"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveChanges}
                            onKeyDown={handleKeyDown}
                            className="w-full p-1 text-center bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    ) : (
                        <span onDoubleClick={() => isEditable && handleStartEditing({ questionIndex, field: 'grafik_veri_deger', dataIndex: index }, String(item.deger))} className={`w-full block ${isEditable ? 'editable-field' : ''}`}>
                           {item.deger}
                        </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'nesne_grafiği':
      case 'sutun_grafiği':
        return (
          <div className="space-y-3 my-4" style={{ pageBreakInside: 'avoid' }}>
            {data.veri.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-28 text-right font-medium shrink-0">
                    {isEditing('grafik_veri_etiket', index) ? (
                         <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveChanges}
                            onKeyDown={handleKeyDown}
                            className="w-full p-1 text-right bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    ) : (
                        <span onDoubleClick={() => isEditable && handleStartEditing({ questionIndex, field: 'grafik_veri_etiket', dataIndex: index }, item.etiket)} className={`w-full block ${isEditable ? 'editable-field' : ''}`}>
                            {item.etiket}
                        </span>
                    )}
                </div>
                <div className="flex-grow flex flex-wrap gap-1 items-center">
                   {data.tip === 'nesne_grafiği' ? (
                     <span className="flex flex-wrap gap-1 text-2xl">{Array.from({ length: item.deger }, (_, i) => <span key={i}>{item.nesne || '●'}</span>)}</span>
                   ) : (
                     Array.from({ length: item.deger }, (_, i) => (
                        <div key={i} className="w-4 h-5 bg-purple-500 rounded-sm"></div>
                     ))
                   )}
                   {isEditable && (
                    isEditing('grafik_veri_deger', index) ? (
                         <input
                            type="number"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveChanges}
                            onKeyDown={handleKeyDown}
                            className="w-16 ml-2 p-1 text-center bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    ): (
                         <span onDoubleClick={() => handleStartEditing({ questionIndex, field: 'grafik_veri_deger', dataIndex: index }, String(item.deger))} className={`ml-2 p-1 rounded-md ${isEditable ? 'editable-field' : ''}`}>
                           ({item.deger})
                        </span>
                    )
                   )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-4 p-4 bg-white/40 border border-slate-200/80 rounded-lg">
       <h4 className="font-bold text-center text-slate-700 mb-3">
            {isEditing('grafik_baslik') ? (
                <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={handleSaveChanges}
                    onKeyDown={handleKeyDown}
                    className="w-full text-center p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => isEditable && handleStartEditing({ questionIndex, field: 'grafik_baslik' }, data.baslik)} className={`w-full block ${isEditable ? 'editable-field' : ''}`}>
                    {data.baslik}
                </span>
            )}
       </h4>
      {renderChart()}
      {data.not && <p className="text-xs text-center text-slate-500 mt-2">{data.not}</p>}
    </div>
  );
};

const QuizView: React.FC<QuizViewProps> = ({ questions, grade, quizId, onRemixQuestion, remixingIndex, onArchive, isArchived, onUpdateQuiz }) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const [editingTarget, setEditingTarget] = useState<EditingTarget | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

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
    if (quizId !== 'generating') {
      localStorage.setItem(`${NOTES_PREFIX}${quizId}`, JSON.stringify(customTeacherNotes));
    }
  }, [customTeacherNotes, quizId]);

  const handleNoteChange = (index: number, text: string) => {
    setCustomTeacherNotes(prev => ({ ...prev, [index]: text }));
  };

  const isEditable = showAnswers && isTeacherView && !!onUpdateQuiz && quizId !== 'generating';

  const handleCancelEditing = () => {
    setEditingTarget(null);
    setEditingValue('');
  };

  const handleSaveChanges = () => {
    if (!editingTarget || !onUpdateQuiz) {
        handleCancelEditing();
        return;
    }

    const { questionIndex, field, optionKey, dataIndex } = editingTarget;
    
    const newQuestions: DetailedQuestion[] = JSON.parse(JSON.stringify(questions));
    const questionToUpdate = newQuestions[questionIndex];

    switch (field) {
        case 'soru_metni': questionToUpdate.soru_metni = editingValue; break;
        case 'cozum_anahtari': questionToUpdate.cozum_anahtari = editingValue; break;
        case 'gercek_yasam_baglantisi': questionToUpdate.gercek_yasam_baglantisi = editingValue; break;
        case 'dogru_cevap': questionToUpdate.dogru_cevap = editingValue; break;
        case 'secenek':
            if (optionKey && questionToUpdate.secenekler) {
                questionToUpdate.secenekler[optionKey] = editingValue;
            }
            break;
        case 'grafik_baslik':
            if (questionToUpdate.grafik_verisi) questionToUpdate.grafik_verisi.baslik = editingValue;
            break;
        case 'grafik_veri_etiket':
            if (questionToUpdate.grafik_verisi && dataIndex !== undefined) questionToUpdate.grafik_verisi.veri[dataIndex].etiket = editingValue;
            break;
        case 'grafik_veri_deger':
            if (questionToUpdate.grafik_verisi && dataIndex !== undefined) questionToUpdate.grafik_verisi.veri[dataIndex].deger = Number(editingValue) || 0;
            break;
    }

    onUpdateQuiz(newQuestions);
    handleCancelEditing();
  };

  const handleStartEditing = (target: EditingTarget, value: string) => {
    if (!isEditable) return;
    setEditingTarget(target);
    setEditingValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        handleSaveChanges();
    } else if (e.key === 'Escape') {
        handleCancelEditing();
    }
  };
  
  if (!questions || questions.length === 0) return null;

  const isEditingCheck = (questionIndex: number, field: EditingTarget['field'], optionKey?: 'A' | 'B' | 'C' | 'D', dataIndex?: number) => {
    return editingTarget?.questionIndex === questionIndex &&
           editingTarget?.field === field &&
           editingTarget?.optionKey === optionKey &&
           editingTarget?.dataIndex === dataIndex;
  };

  const uniqueUnitNames = [...new Set(questions.map(q => q.unite_adi))].join(' & ');
  const uniqueKazanimCodes = [...new Set(questions.map(q => q.kazanim_kodu))].join(', ');
  
 const handleDownloadPdf = async () => {
    if (isDownloading || !quizRef.current) return;
    setIsDownloading(true);

    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');

    const quizElement = quizRef.current;
    
    const originalStyles = {
        columnCount: quizElement.style.columnCount,
        width: quizElement.style.width,
        boxShadow: quizElement.style.boxShadow,
    };
    quizElement.style.columnCount = '1';
    quizElement.style.width = '800px'; 
    quizElement.style.boxShadow = 'none';
    
    try {
        const canvas = await html2canvas(quizElement, {
            scale: 2.5, 
            useCORS: true,
            windowWidth: quizElement.scrollWidth,
            windowHeight: quizElement.scrollHeight,
            backgroundColor: null, 
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
    if (quizId === 'generating') {
        alert("Sınav henüz kaydedilmedi, bu yüzden paylaşılamaz.");
        return;
    }
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
          {onArchive && (
            <button 
                onClick={onArchive} 
                disabled={isArchived}
                title={isArchived ? "Bu sınav zaten arşivlendi" : "Bu sınavı arşive ekle"}
                className="p-2 flex items-center gap-1.5 rounded-full hover:bg-black/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-slate-600 disabled:text-green-600"
            >
                {isArchived ? (
                    <>
                        <CheckIcon className="w-6 h-6" />
                        <span className="text-sm font-semibold hidden sm:inline">Arşivlendi</span>
                    </>
                ) : (
                    <>
                        <ArchiveAddIcon className="w-6 h-6" />
                        <span className="text-sm font-semibold hidden sm:inline">Arşive Ekle</span>
                    </>
                )}
            </button>
          )}
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

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="text-slate-800 break-inside-avoid relative">
              
              <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {q.grafik_verisi && <ChartRenderer 
                        data={q.grafik_verisi} 
                        questionIndex={index} 
                        isEditable={isEditable}
                        editingTarget={editingTarget}
                        editingValue={editingValue}
                        setEditingValue={setEditingValue}
                        handleStartEditing={handleStartEditing}
                        handleSaveChanges={handleSaveChanges}
                        handleKeyDown={handleKeyDown}
                    />}
                    {isEditingCheck(index, 'soru_metni') ? (
                        <textarea
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveChanges}
                            onKeyDown={handleKeyDown}
                            className="w-full font-semibold p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            autoFocus
                        />
                    ) : (
                       <p onDoubleClick={() => handleStartEditing({ questionIndex: index, field: 'soru_metni' }, q.soru_metni)} className={`font-semibold mb-3 inline whitespace-pre-wrap ${isEditable ? 'editable-field' : ''}`} style={{color: 'inherit'}}>{`${index + 1}. ${q.soru_metni}`}</p>
                    )}
                  </div>
                  {onRemixQuestion && showAnswers && isTeacherView && (
                    <button 
                        onClick={() => onRemixQuestion(index)} 
                        disabled={remixingIndex === index}
                        title="Bu soruyu yeniden oluştur"
                        className="p-1 ml-2 rounded-full text-blue-500 hover:bg-blue-500/10 disabled:text-slate-400 disabled:cursor-wait shrink-0"
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
                  {(Object.keys(q.secenekler) as Array<keyof typeof q.secenekler>).map((key) => {
                    const optionText = q.secenekler![key];
                    const isCorrect = showAnswers && key === q.dogru_cevap;
                    const isOptionEditing = isEditingCheck(index, 'secenek', key);
                    
                    return (
                      <div key={key} className={`flex items-center p-2 rounded-md transition-all duration-300 ${isCorrect ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
                        <span className="mr-2">{key})</span>
                        {isOptionEditing ? (
                             <input
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onBlur={handleSaveChanges}
                                onKeyDown={handleKeyDown}
                                className="w-full p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                        ) : (
                             <span onDoubleClick={() => handleStartEditing({ questionIndex: index, field: 'secenek', optionKey: key }, optionText)} className={`flex-1 ${isEditable ? 'editable-field' : ''}`}>
                                {optionText}
                             </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {q.soru_tipi === 'dogru_yanlis' && showAnswers && (
                 <p className="mt-2 pl-2 p-2 rounded-md bg-green-100 text-green-800 font-bold inline-block">Cevap: {q.dogru_cevap}</p>
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
                     <div className="text-sm text-blue-700">
                      <strong>Çözüm: </strong>
                        {isEditingCheck(index, 'cozum_anahtari') ? (
                           <textarea value={editingValue} onChange={(e) => setEditingValue(e.target.value)} onBlur={handleSaveChanges} onKeyDown={handleKeyDown} rows={2} className="w-full mt-1 p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus />
                        ) : (
                          <span onDoubleClick={() => handleStartEditing({questionIndex: index, field: 'cozum_anahtari'}, q.cozum_anahtari)} className={`${isEditable ? 'editable-field' : ''}`}>{q.cozum_anahtari}</span>
                        )}
                    </div>
                    <p className="text-sm text-blue-700"><strong>Seviye:</strong> <span className="capitalize px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs">{q.seviye}</span></p>
                    <div className="pt-2 border-t border-blue-100">
                         <strong className="text-sm text-blue-700">Doğru Cevap: </strong>
                         {isEditingCheck(index, 'dogru_cevap') ? (
                           <select value={editingValue} onChange={(e) => {setEditingValue(e.target.value);}} onBlur={handleSaveChanges} onKeyDown={handleKeyDown} className="p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus>
                                {q.secenekler && (Object.keys(q.secenekler) as Array<keyof typeof q.secenekler>).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                {q.soru_tipi === 'dogru_yanlis' && <> <option value="Doğru">Doğru</option> <option value="Yanlış">Yanlış</option> </>}
                           </select>
                         ) : (
                            <span onDoubleClick={() => handleStartEditing({questionIndex: index, field: 'dogru_cevap'}, q.dogru_cevap)} className={`font-bold text-green-700 px-2 rounded ${isEditable ? 'editable-field' : ''}`}>{q.dogru_cevap}</span>
                         )}
                    </div>
                    <div className="pt-2 border-t border-blue-100">
                        <strong className="text-sm text-blue-700">Gerçek Yaşam Bağlantısı: </strong>
                         {isEditingCheck(index, 'gercek_yasam_baglantisi') ? (
                           <textarea value={editingValue} onChange={(e) => setEditingValue(e.target.value)} onBlur={handleSaveChanges} onKeyDown={handleKeyDown} rows={2} className="w-full mt-1 p-1 bg-yellow-100/50 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus />
                        ) : (
                          <span onDoubleClick={() => handleStartEditing({questionIndex: index, field: 'gercek_yasam_baglantisi'}, q.gercek_yasam_baglantisi)} className={`${isEditable ? 'editable-field' : ''}`}>{q.gercek_yasam_baglantisi}</span>
                        )}
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
            </div>
          ))}
        </div>
      </div>
       <style>{`
        .editable-field {
            border-radius: 4px;
            padding: 2px 4px;
        }
        .editable-field:hover {
            background-color: rgba(254, 240, 138, 0.4);
            cursor: text;
            transition: background-color 0.2s ease-in-out;
        }
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
            .quiz-paper p, .quiz-paper div {
                overflow-wrap: break-word;
            }
            .quiz-paper div.break-inside-avoid {
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
