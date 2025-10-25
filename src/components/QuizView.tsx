

import React, { useRef, useState, useEffect } from 'react';
import { DetailedQuestion, ChartDataItem } from '../types';
import { DownloadIcon, PrintIcon, ShareIcon, SparklesIcon, SettingsIcon, CopyIcon, CheckIcon, RefreshCwIcon, EditIcon } from './icons';


interface QuizViewProps {
  questions: DetailedQuestion[];
  grade: string;
  quizId: string;
  onRemixQuestion?: (questionIndex: number) => void;
  remixingIndex?: number | null;
  onUpdateQuiz?: (updatedQuestions: DetailedQuestion[]) => void;
  onArchive?: () => void;
  isArchived?: boolean;
}

const VIEW_SETTINGS_KEY = 'quizViewSettings';
const NOTES_PREFIX = 'quizNotes_';

// State for drag information
interface DragInfo {
  type: 'label' | 'shape';
  questionIndex: number;
  itemIndex?: number; // For label dragging
  offsetX: number;
  offsetY: number;
}


const QuizView: React.FC<QuizViewProps> = ({ questions, grade, quizId, onRemixQuestion, remixingIndex, onUpdateQuiz, onArchive, isArchived }) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [isEditing, setIsEditing] = useState(false);
  const [editableQuestions, setEditableQuestions] = useState<DetailedQuestion[]>(questions);
  
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);


  useEffect(() => {
    setEditableQuestions(questions);
  }, [questions]);

  const [settings, setSettings] = useState(() => {
    const initialSettings = {
        fontFamily: "'Inter', sans-serif",
        fontSize: 12, // pt
        columns: 1,
        textAlign: 'left',
        pageStyle: 'normal',
        showBorder: false,
        textColor: '#1e293b',
        questionSpacing: 32, // pt
        pageMarginTop: 2, // cm
        pageMarginBottom: 2, // cm
        pageMarginLeft: 2, // cm
        pageMarginRight: 2, // cm
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

  const handleToggleEdit = () => {
    if (isEditing) {
      onUpdateQuiz?.(editableQuestions);
    }
    setIsEditing(!isEditing);
  };

  // FIX: Changed event type to handle both HTML and SVG elements, and use textContent.
  const handleContentUpdate = (e: React.FocusEvent<HTMLElement | SVGElement>, questionIndex: number, path: (string | number)[]) => {
      const value = e.currentTarget.textContent ?? '';
      
      setEditableQuestions(prevQuestions => {
          const newQuestions = JSON.parse(JSON.stringify(prevQuestions));
          let current: any = newQuestions[questionIndex];

          for (let i = 0; i < path.length - 1; i++) {
              if (current[path[i]] === undefined) {
                  current[path[i]] = typeof path[i+1] === 'number' ? [] : {};
              }
              current = current[path[i]];
          }

          let finalValue: string | number = value;
          const isNumericField = path.includes('veri') && (path[path.length - 1] === 'deger');
          if(isNumericField) {
              const parsedNumber = parseFloat(value.replace(/[^0-9.,]/g, '').replace(',', '.'));
              finalValue = isNaN(parsedNumber) ? 0 : parsedNumber;
          }

          current[path[path.length - 1]] = finalValue;
          return newQuestions;
      });
  };

  const getSVGCoordinates = (e: MouseEvent, svg: SVGSVGElement) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  const handleLabelDragStart = (e: React.MouseEvent<SVGElement>, questionIndex: number, itemIndex: number, defaultPos: {x: number, y: number}) => {
    if (!isEditing) return;
    e.stopPropagation();
    const svg = svgRefs.current[questionIndex];
    if (!svg) return;

    const svgP = getSVGCoordinates(e.nativeEvent, svg);
    const chartData = editableQuestions[questionIndex]?.grafik_verisi;
    const shapeX = chartData?.x ?? 0;
    const shapeY = chartData?.y ?? 0;

    const relMouseX = svgP.x - shapeX;
    const relMouseY = svgP.y - shapeY;

    const currentItem = chartData?.veri[itemIndex];
    const currentRelX = currentItem?.x ?? defaultPos.x;
    const currentRelY = currentItem?.y ?? defaultPos.y;

    setDragInfo({
        type: 'label',
        questionIndex,
        itemIndex,
        offsetX: relMouseX - currentRelX,
        offsetY: relMouseY - currentRelY,
    });
  };

  const handleShapeDragStart = (e: React.MouseEvent<SVGGElement>, questionIndex: number) => {
    if (!isEditing) return;
    
    if ((e.target as SVGElement).closest('text, path, circle, line, polygon')) return;

    const svg = svgRefs.current[questionIndex];
    if (!svg) return;
    
    const svgP = getSVGCoordinates(e.nativeEvent, svg);

    const chartData = editableQuestions[questionIndex]?.grafik_verisi;
    const currentX = chartData?.x ?? 0;
    const currentY = chartData?.y ?? 0;

    setDragInfo({
        type: 'shape',
        questionIndex,
        offsetX: svgP.x - currentX,
        offsetY: svgP.y - currentY,
    });
  };

  useEffect(() => {
    const handleGlobalDrag = (e: MouseEvent) => {
        if (!dragInfo) return;
        const svg = svgRefs.current[dragInfo.questionIndex];
        if (!svg) return;

        const svgP = getSVGCoordinates(e, svg);

        setEditableQuestions(prev => 
            prev.map((q, idx) => {
                if (idx !== dragInfo.questionIndex || !q.grafik_verisi) return q;

                const newGrafikVerisi = { ...q.grafik_verisi };
                
                if (dragInfo.type === 'shape') {
                    newGrafikVerisi.x = svgP.x - dragInfo.offsetX;
                    newGrafikVerisi.y = svgP.y - dragInfo.offsetY;
                } else if (dragInfo.type === 'label' && dragInfo.itemIndex !== undefined) {
                    const shapeX = newGrafikVerisi.x ?? 0;
                    const shapeY = newGrafikVerisi.y ?? 0;
                    const newVeri = [...newGrafikVerisi.veri];
                    const item = newVeri[dragInfo.itemIndex];
                    if (item) {
                        newVeri[dragInfo.itemIndex] = {
                            ...item,
                            x: (svgP.x - shapeX) - dragInfo.offsetX,
                            y: (svgP.y - shapeY) - dragInfo.offsetY,
                        };
                        newGrafikVerisi.veri = newVeri;
                    }
                }
                
                return { ...q, grafik_verisi: newGrafikVerisi };
            })
        );
    };

    const handleGlobalDragEnd = () => {
        setDragInfo(null);
    };

    if (dragInfo) {
        window.addEventListener('mousemove', handleGlobalDrag);
        window.addEventListener('mouseup', handleGlobalDragEnd);
    }

    return () => {
        window.removeEventListener('mousemove', handleGlobalDrag);
        window.removeEventListener('mouseup', handleGlobalDragEnd);
    };
  }, [dragInfo]);
  
  if (!questions || questions.length === 0) return null;

  const uniqueUnitNames = [...new Set(questions.map(q => q.unite_adi))].join(' & ');
  const uniqueKazanimCodes = [...new Set(questions.map(q => q.kazanim_kodu))].join(', ');
  
 const handleDownloadPdf = async () => {
    if (isDownloading || !quizRef.current) return;
    setIsDownloading(true);

    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');

    const quizElement = quizRef.current;
    
    const remixButtons = quizElement.querySelectorAll('button[title="Bu soruyu yeniden oluştur"]') as NodeListOf<HTMLButtonElement>;
    remixButtons.forEach(button => button.style.display = 'none');

    const originalStyles = {
        columnCount: quizElement.style.columnCount,
        width: quizElement.style.width,
        boxShadow: quizElement.style.boxShadow,
        margin: quizElement.style.margin,
        padding: quizElement.style.padding,
    };

    quizElement.style.columnCount = '1';
    quizElement.style.width = '21cm'; 
    quizElement.style.boxShadow = 'none';
    quizElement.style.margin = '0';
    quizElement.style.padding = `${settings.pageMarginTop}cm ${settings.pageMarginRight}cm ${settings.pageMarginBottom}cm ${settings.pageMarginLeft}cm`;
    
    try {
        const canvas = await html2canvas(quizElement, {
            scale: 3, 
            useCORS: true,
            windowWidth: quizElement.scrollWidth,
            windowHeight: quizElement.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.height / imgProps.width;
        
        const imgWidthInPdf = pdfWidth;
        const imgHeightInPdf = imgWidthInPdf * ratio;

        let heightLeft = imgHeightInPdf;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidthInPdf, imgHeightInPdf);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidthInPdf, imgHeightInPdf);
            heightLeft -= pdfHeight;
        }
        
        pdf.save(`${grade}-${uniqueUnitNames}-sinav.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
        quizElement.style.columnCount = originalStyles.columnCount;
        quizElement.style.width = originalStyles.width;
        quizElement.style.boxShadow = originalStyles.boxShadow;
        quizElement.style.margin = originalStyles.margin;
        quizElement.style.padding = originalStyles.padding;
        
        remixButtons.forEach(button => button.style.display = '');

        setIsDownloading(false);
    }
  };

  const handlePrint = () => { 
    const styleId = 'dynamic-print-style';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }
    style.innerHTML = `
        @page {
            size: A4;
            margin: ${settings.pageMarginTop}cm ${settings.pageMarginRight}cm ${settings.pageMarginBottom}cm ${settings.pageMarginLeft}cm;
        }
    `;
    window.print();
  };

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
    textAlign: settings.textAlign as 'left' | 'center' | 'right',
    columnCount: settings.columns,
    columnGap: '2rem'
  };

  const currentQuestions = isEditing ? editableQuestions : questions;


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
           {onUpdateQuiz && (
              <button onClick={handleToggleEdit} title={isEditing ? "Değişiklikleri Kaydet" : "Sınavı Düzenle"} className="p-2 rounded-full hover:bg-black/10 transition-all duration-300">
                {isEditing ? <CheckIcon className="w-6 h-6 text-green-600" /> : <EditIcon className="w-6 h-6 text-slate-600" />}
              </button>
            )}
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
                                    {[8, 9, 10, 11, 12, 13, 14, 16, 18, 20].map(size => <option key={size} value={size}>{size}pt</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Sütun</label>
                                <select value={settings.columns} onChange={e => setSettings({...settings, columns: parseInt(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="1">Tek Sütun</option>
                                    <option value="2">İki Sütun</option>
                                    <option value="3">Üç Sütun</option>
                                    <option value="4">Dört Sütun</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Hizalama</label>
                                <select value={settings.textAlign} onChange={e => setSettings({...settings, textAlign: e.target.value})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                    <option value="left">Sola Dayalı</option>
                                    <option value="center">Ortalanmış</option>
                                    <option value="right">Sağa Dayalı</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Soru Aralığı ({settings.questionSpacing}pt)</label>
                            <input type="range" min="12" max="64" step="4" value={settings.questionSpacing} onChange={e => setSettings({...settings, questionSpacing: parseInt(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Üst Boşluk (cm)</label>
                                <input type="number" min="0" max="5" step="0.5" value={settings.pageMarginTop} onChange={e => setSettings({...settings, pageMarginTop: parseFloat(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"/>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Alt Boşluk (cm)</label>
                                <input type="number" min="0" max="5" step="0.5" value={settings.pageMarginBottom} onChange={e => setSettings({...settings, pageMarginBottom: parseFloat(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"/>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Sol Boşluk (cm)</label>
                                <input type="number" min="0" max="5" step="0.5" value={settings.pageMarginLeft} onChange={e => setSettings({...settings, pageMarginLeft: parseFloat(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"/>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Sağ Boşluk (cm)</label>
                                <input type="number" min="0" max="5" step="0.5" value={settings.pageMarginRight} onChange={e => setSettings({...settings, pageMarginRight: parseFloat(e.target.value)})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Sayfa Stili</label>
                            <select value={settings.pageStyle} onChange={e => setSettings({...settings, pageStyle: e.target.value})} className="w-full p-1.5 text-sm bg-white/60 border border-slate-300/50 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500">
                                <option value="normal">Standart</option>
                                <option value="notebook">Defter Stili</option>
                                <option value="kareli">Kareli</option>
                                <option value="noktali">Noktalı</option>
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
      
      <div className="bg-slate-200/70 p-4 sm:p-8 rounded-b-2xl non-printable-bg">
        <div id="quiz-paper" ref={quizRef} style={quizContentStyle} className={`quiz-paper ${settings.showBorder ? 'bordered' : ''} ${settings.pageStyle}`}>
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

            <div className="flex flex-col" style={{ gap: `${settings.questionSpacing}pt` }}>
            {currentQuestions.map((q, index) => (
                <div key={index} className="text-slate-800 break-inside-avoid relative">
                  <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 flex items-start">
                        <span className="font-semibold mr-2">{`${index + 1}. `}</span>
                        <p 
                            className={`flex-1 whitespace-pre-wrap ${isEditing ? 'editable-field' : ''}`}
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleContentUpdate(e, index, ['soru_metni'])}
                        >
                          {q.soru_metni}
                        </p>
                      </div>
                      {onRemixQuestion && showAnswers && isTeacherView && (
                          <button 
                              onClick={() => onRemixQuestion(index)} 
                              disabled={remixingIndex === index || isEditing}
                              title="Bu soruyu yeniden oluştur"
                              className="p-1 rounded-full text-blue-500 hover:bg-blue-500/10 disabled:text-slate-400 disabled:cursor-wait"
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

                {q.grafik_verisi && (
                  <div className="my-4">
                      <h4 
                        className={`font-bold text-center text-base mb-2 ${isEditing ? 'editable-field' : ''}`}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'baslik'])}
                      >
                        {q.grafik_verisi.baslik}
                      </h4>
                      
                      {q.grafik_verisi.tip === 'siklik_tablosu' && (
                          <table className="w-full mt-2 border-collapse text-sm" style={{maxWidth: '300px', margin: '0 auto'}}>
                              <thead>
                                  <tr>
                                      <th className="border p-2 bg-slate-100 font-semibold">Veri</th>
                                      <th className="border p-2 bg-slate-100 font-semibold">Sıklık</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {q.grafik_verisi.veri.map((item, i) => (
                                      <tr key={i}>
                                          <td 
                                            className={`border p-2 ${isEditing ? 'editable-field' : ''}`}
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'etiket'])}
                                          >{item.etiket}</td>
                                          <td 
                                            className={`border p-2 text-center ${isEditing ? 'editable-field' : ''}`}
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'deger'])}
                                          >{item.deger}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}
                      {q.grafik_verisi.tip === 'sutun_grafiği' && (() => {
                          const chartData = q.grafik_verisi;
                          const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];
                          
                          return (
                              <div className="mt-4 text-sm" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                <div className="space-y-3">
                                  {chartData.veri.map((item, i) => {
                                      const barSegments = Math.floor(item.deger);
                                      const segmentWidth = 12;
                                      const segmentHeight = 20;
                                      const segmentGap = 2;
                                      
                                      return (
                                          <div key={i} className="flex items-center gap-2">
                                              <span 
                                                  className={`w-28 text-right pr-2 shrink-0 ${isEditing ? 'editable-field' : ''}`}
                                                  contentEditable={isEditing}
                                                  suppressContentEditableWarning={true}
                                                  onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'etiket'])}
                                              >{item.etiket}:</span>
                                              <div className="flex-grow flex items-center">
                                                  <svg width="100%" height={segmentHeight} className="min-w-[100px]">
                                                      {Array.from({ length: barSegments }).map((_, j) => (
                                                          <rect
                                                              key={j}
                                                              x={j * (segmentWidth + segmentGap)}
                                                              y={0}
                                                              width={segmentWidth}
                                                              height={segmentHeight}
                                                              fill={colors[i % colors.length]}
                                                              rx="2"
                                                          />
                                                      ))}
                                                  </svg>
                                                  {isEditing && (
                                                     <span 
                                                        className={`ml-2 font-semibold editable-field`}
                                                        contentEditable={isEditing}
                                                        suppressContentEditableWarning={true}
                                                        onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'deger'])}
                                                    >({item.deger})</span>
                                                  )}
                                              </div>
                                          </div>
                                      );
                                  })}
                                </div>
                                <p 
                                  className={`text-xs text-center mt-2 text-slate-500 italic ${isEditing ? 'editable-field' : ''}`}
                                  contentEditable={isEditing}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'not'])}
                                >
                                  {chartData.not || '(Her bir bölüm 1 birimi göstermektedir.)'}
                                </p>
                              </div>
                          );
                      })()}
                       {q.grafik_verisi.tip === 'nesne_grafiği' && (() => {
                          const chartData = q.grafik_verisi;
                          const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];
                          const shapes = ['circle', 'square', 'triangle'];

                          const renderObject = (item: ChartDataItem, props: any) => {
                            if(item.nesne) {
                                return <text {...props} fontSize={props.width} dominantBaseline="middle" textAnchor="middle" x={props.x + props.width/2} y={props.y + props.width/2}>{item.nesne}</text>
                            }
                            const shapeType = shapes[props.shapeIndex % shapes.length];
                            const size = props.width;
                            if (shapeType === 'square') {
                                return <rect {...props} rx="2" />;
                            }
                            if (shapeType === 'triangle') {
                                return <path d={`M ${props.x} ${props.y+size} L ${props.x+size/2} ${props.y} L ${props.x+size} ${props.y+size} Z`} fill={props.fill} />
                            }
                            return <circle cx={props.x + size/2} cy={props.y + size/2} r={size/2} fill={props.fill} />;
                          }
                          
                          return (
                              <div className="mt-4 space-y-2 text-sm">
                                  {chartData.veri.map((item, i) => {
                                      const iconSize = 16;
                                      const iconGap = 4;
                                      const iconsPerRow = 15;
                                      const numRows = Math.ceil(item.deger / iconsPerRow);
                                      const svgWidth = Math.min(item.deger, iconsPerRow) * (iconSize + iconGap);
                                      const svgHeight = numRows * (iconSize + iconGap);
                                      const color = colors[i % colors.length];

                                      return (
                                          <div key={i} className="flex items-start">
                                               <span 
                                                  className={`w-28 text-right pr-2 shrink-0 pt-1 ${isEditing ? 'editable-field' : ''}`}
                                                  contentEditable={isEditing}
                                                  suppressContentEditableWarning={true}
                                                  onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'etiket'])}
                                              >{item.etiket}:</span>
                                              <div className="flex-1 flex items-center flex-wrap">
                                                  <svg width={svgWidth || 0} height={svgHeight || 0}>
                                                      {Array.from({ length: item.deger }).map((_, j) => {
                                                          const row = Math.floor(j / iconsPerRow);
                                                          const col = j % iconsPerRow;
                                                          const x = col * (iconSize + iconGap);
                                                          const y = row * (iconSize + iconGap);
                                                          return renderObject(item, { key: j, x: x, y: y, width: iconSize, height: iconSize, fill: color, shapeIndex: i });
                                                      })}
                                                  </svg>
                                                  {isEditing && 
                                                      <span 
                                                          className="text-xs text-blue-600 font-bold ml-2 editable-field self-center" 
                                                          contentEditable={isEditing} 
                                                          suppressContentEditableWarning={true}
                                                          onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', i, 'deger'])}
                                                      >({item.deger})</span>
                                                  }
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          );
                      })()}
                      {['ucgen', 'dikdortgen', 'kare', 'besgen', 'altıgen', 'dogru_parcasi', 'isin', 'dogru', 'paralel_dogrular', 'kesisen_dogrular', 'dik_kesisen_doğrular'].includes(q.grafik_verisi.tip) && (() => {
                          const { tip, veri } = q.grafik_verisi;
                          const shapeElements: React.ReactElement[] = [];
                          const textElements: React.ReactElement[] = [];
                          const vertexCoords: { [key: string]: { x: number; y: number } } = {};

                          const vertexLabels = new Set<string>();
                           veri.forEach(item => {
                                let match = item.etiket.match(/^(\w)\s+(Köşesi|Noktası|Başlangıç Noktası)/i);
                                if (match && match[1]) vertexLabels.add(match[1].toUpperCase());
                                match = item.etiket.match(/^(\w)(\w)\s+Kenarı/i);
                                if (match && match[1] && match[2]) {
                                    vertexLabels.add(match[1].toUpperCase());
                                    vertexLabels.add(match[2].toUpperCase());
                                }
                            });
                          const sortedVertexLabels = Array.from(vertexLabels).sort();
                          
                          if (tip === 'ucgen') {
                                const labels = sortedVertexLabels.length >= 3 ? sortedVertexLabels : ['A', 'B', 'C'];
                                vertexCoords[labels[0]] = { x: 125, y: 30 };
                                vertexCoords[labels[1]] = { x: 40, y: 150 };
                                vertexCoords[labels[2]] = { x: 210, y: 150 };
                                shapeElements.push(<polygon key="shape" points={`${vertexCoords[labels[0]].x},${vertexCoords[labels[0]].y} ${vertexCoords[labels[1]].x},${vertexCoords[labels[1]].y} ${vertexCoords[labels[2]].x},${vertexCoords[labels[2]].y}`} className="fill-blue-100/50 stroke-blue-500" strokeWidth="2" />);
                            } else if (tip === 'kare' || tip === 'dikdortgen') {
                                const labels = sortedVertexLabels.length >= 4 ? sortedVertexLabels : ['A', 'B', 'C', 'D'];
                                vertexCoords[labels[0]] = { x: 40, y: 30 };
                                vertexCoords[labels[1]] = { x: 210, y: 30 };
                                vertexCoords[labels[2]] = { x: 210, y: 150 };
                                vertexCoords[labels[3]] = { x: 40, y: 150 };
                                shapeElements.push(<polygon key="shape" points={`${vertexCoords[labels[0]].x},${vertexCoords[labels[0]].y} ${vertexCoords[labels[1]].x},${vertexCoords[labels[1]].y} ${vertexCoords[labels[2]].x},${vertexCoords[labels[2]].y} ${vertexCoords[labels[3]].x},${vertexCoords[labels[3]].y}`} className="fill-blue-100/50 stroke-blue-500" strokeWidth="2" />);
                            } else if (tip === 'besgen') {
                                const labels = sortedVertexLabels.length >= 5 ? sortedVertexLabels : ['A', 'B', 'C', 'D', 'E'];
                                vertexCoords[labels[0]] = { x: 125, y: 20 };
                                vertexCoords[labels[1]] = { x: 215, y: 80 };
                                vertexCoords[labels[2]] = { x: 175, y: 160 };
                                vertexCoords[labels[3]] = { x: 75, y: 160 };
                                vertexCoords[labels[4]] = { x: 35, y: 80 };
                                shapeElements.push(<polygon key="shape" points={labels.map(l => `${vertexCoords[l].x},${vertexCoords[l].y}`).join(' ')} className="fill-blue-100/50 stroke-blue-500" strokeWidth="2" />);
                            } else if (tip === 'altıgen') {
                                const labels = sortedVertexLabels.length >= 6 ? sortedVertexLabels : ['A', 'B', 'C', 'D', 'E', 'F'];
                                vertexCoords[labels[0]] = { x: 85, y: 30 };
                                vertexCoords[labels[1]] = { x: 165, y: 30 };
                                vertexCoords[labels[2]] = { x: 205, y: 90 };
                                vertexCoords[labels[3]] = { x: 165, y: 150 };
                                vertexCoords[labels[4]] = { x: 85, y: 150 };
                                vertexCoords[labels[5]] = { x: 45, y: 90 };
                                shapeElements.push(<polygon key="shape" points={labels.map(l => `${vertexCoords[l].x},${vertexCoords[l].y}`).join(' ')} className="fill-blue-100/50 stroke-blue-500" strokeWidth="2" />);
                            } else if (['dogru_parcasi', 'isin', 'dogru'].includes(tip)) {
                                const labels = sortedVertexLabels.length >= 2 ? sortedVertexLabels : ['A', 'B'];
                                vertexCoords[labels[0]] = { x: 40, y: 90 };
                                vertexCoords[labels[1]] = { x: 210, y: 90 };
                            }

                          const centroid = {
                              x: Object.values(vertexCoords).reduce((sum, v) => sum + v.x, 0) / (Object.keys(vertexCoords).length || 1),
                              y: Object.values(vertexCoords).reduce((sum, v) => sum + v.y, 0) / (Object.keys(vertexCoords).length || 1)
                          };

                          veri.forEach((item, itemIndex) => {
                              let defaultPos = { x: 0, y: 0 };
                              let content: (string | number | undefined)[] | null = null;
                              const textProps: any = { textAnchor: "middle", dominantBaseline: "middle", className: `text-[10pt] fill-current ${isEditing ? 'cursor-grab' : ''}` };

                              let match = item.etiket.match(/^(\w)\s+(Köşesi|Noktası|Başlangıç Noktası)/i);
                              if (match && vertexCoords[match[1].toUpperCase()]) {
                                  const vName = match[1].toUpperCase();
                                  const pos = vertexCoords[vName];
                                  if (['ucgen', 'kare', 'dikdortgen', 'besgen', 'altıgen'].includes(tip)) {
                                      const angle = Math.atan2(pos.y - centroid.y, pos.x - centroid.x);
                                      defaultPos = { x: pos.x + 15 * Math.cos(angle), y: pos.y + 15 * Math.sin(angle) };
                                  } else {
                                      defaultPos = { x: pos.x, y: pos.y - 15 };
                                  }
                                  content = [vName];
                                  textProps.className = `font-semibold text-lg fill-current ${isEditing ? 'cursor-grab' : ''}`;
                              }

                              match = item.etiket.match(/^(\w)(\w)\s+Kenarı/i);
                                if (match && vertexCoords[match[1].toUpperCase()] && vertexCoords[match[2].toUpperCase()]) {
                                    const p1 = vertexCoords[match[1].toUpperCase()];
                                    const p2 = vertexCoords[match[2].toUpperCase()];
                                    const midX = (p1.x + p2.x) / 2;
                                    const midY = (p1.y + p2.y) / 2;

                                    const dx = p2.x - p1.x;
                                    const dy = p2.y - p1.y;

                                    let normalX = -dy;
                                    let normalY = dx;
                                    
                                    const vecToCentroidX = centroid.x - midX;
                                    const vecToCentroidY = centroid.y - midY;

                                    const dotProduct = (normalX * vecToCentroidX) + (normalY * vecToCentroidY);
                                    if (dotProduct > 0) {
                                        normalX *= -1;
                                        normalY *= -1;
                                    }

                                    const mag = Math.sqrt(normalX * normalX + normalY * normalY);
                                    if (mag > 0.001) {
                                        const normalizedNormalX = normalX / mag;
                                        const normalizedNormalY = normalY / mag;
                                        const offset = 14;
                                        defaultPos = { x: midX + offset * normalizedNormalX, y: midY + offset * normalizedNormalY };
                                    } else {
                                        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                                        defaultPos = { x: midX + 10 * Math.sin(angle), y: midY - 10 * Math.cos(angle) };
                                    }
                                    
                                    content = [item.deger, item.birim];
                                }

                              match = item.etiket.match(/^(\w)\s+Açısı/i);
                               if (match && vertexCoords[match[1].toUpperCase()]) {
                                  const vName = match[1].toUpperCase();
                                  const vPos = vertexCoords[vName];
                                  let neighbors: {x: number, y: number}[] = [];
                                  const vIndex = sortedVertexLabels.indexOf(vName);

                                  if (vIndex !== -1 && sortedVertexLabels.length > 2) {
                                      const prevIndex = (vIndex - 1 + sortedVertexLabels.length) % sortedVertexLabels.length;
                                      const nextIndex = (vIndex + 1) % sortedVertexLabels.length;
                                      const prevNeighbor = vertexCoords[sortedVertexLabels[prevIndex]];
                                      const nextNeighbor = vertexCoords[sortedVertexLabels[nextIndex]];
                                      if (prevNeighbor && nextNeighbor) {
                                          neighbors = [prevNeighbor, nextNeighbor];
                                      }
                                  }
                              
                                  if (neighbors.length === 2) {
                                      const adjacent1 = neighbors[0];
                                      const adjacent2 = neighbors[1];
                                      const v1 = { x: adjacent1.x - vPos.x, y: adjacent1.y - vPos.y };
                                      const v2 = { x: adjacent2.x - vPos.x, y: adjacent2.y - vPos.y };
                                      const l1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                                      const l2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
                              
                                      if (l1 > 0.001 && l2 > 0.001) {
                                          const v1_norm = { x: v1.x / l1, y: v1.y / l1 };
                                          const v2_norm = { x: v2.x / l2, y: v2.y / l2 };
                                          
                                          let bisector = { x: v1_norm.x + v2_norm.x, y: v1_norm.y + v2_norm.y };
                                          const vecToCentroid = { x: centroid.x - vPos.x, y: centroid.y - vPos.y };

                                          if ((bisector.x * vecToCentroid.x + bisector.y * vecToCentroid.y) < 0) {
                                              bisector.x *= -1;
                                              bisector.y *= -1;
                                          }

                                          if (item.deger === 90) {
                                              const d = 15;
                                              const crossProduct = v1.x * v2.y - v1.y * v2.x;
                                              const vA_norm = crossProduct > 0 ? v1_norm : v2_norm;
                                              const vB_norm = crossProduct > 0 ? v2_norm : v1_norm;

                                              const p1 = { x: vPos.x + vA_norm.x * d, y: vPos.y + vA_norm.y * d };
                                              const p2 = { x: vPos.x + vB_norm.x * d, y: vPos.y + vB_norm.y * d };
                                              const p3 = { x: p1.x + vB_norm.x * d, y: p1.y + vB_norm.y * d };
                                              
                                              shapeElements.push(<path key={`angle-${itemIndex}`} d={`M ${p1.x} ${p1.y} L ${p3.x} ${p3.y} L ${p2.x} ${p2.y}`} className="fill-none stroke-current" strokeWidth="1.5" />);
                                          } else if (item.deger) {
                                              const lBisector = Math.sqrt(bisector.x * bisector.x + bisector.y * bisector.y);
                                              if (lBisector > 0.001) {
                                                  const d = 18;
                                                  defaultPos = {
                                                      x: vPos.x + (bisector.x / lBisector) * d,
                                                      y: vPos.y + (bisector.y / lBisector) * d
                                                  };
                                              } else { 
                                                  const normal = { x: -v1_norm.y, y: v1_norm.x };
                                                  if (normal.x * vecToCentroid.x + normal.y * vecToCentroid.y < 0) {
                                                      normal.x *= -1;
                                                      normal.y *= -1;
                                                  }
                                                  defaultPos = { x: vPos.x + normal.x * 12, y: vPos.y + normal.y * 12 };
                                              }
                                              content = [item.deger, '°'];
                                          }
                                      }
                                  } else if (item.deger) {
                                      defaultPos = { x: vPos.x + (centroid.x - vPos.x) * 0.2, y: vPos.y + (centroid.y - vPos.y) * 0.2 };
                                      content = [item.deger, '°'];
                                  }
                              }
                              
                              if (!content) {
                                  match = item.etiket.match(/^(\w)\s+Kesişim\s+Noktası/i);
                                  if (match) {
                                      const pointName = match[1].toUpperCase();
                                      content = [pointName];
                                      textProps.className = `font-semibold text-lg fill-current ${isEditing ? 'cursor-grab' : ''}`;
                                      if (tip === 'kesisen_dogrular') {
                                          defaultPos = { x: 130, y: 95 };
                                      }
                                  }
                              }
                      
                              if (!content) {
                                  match = item.etiket.match(/^(\w+)\s+doğrusu/i);
                                  if (match) {
                                      const lineName = match[1];
                                      content = [lineName];
                                      textProps.className = `italic text-lg fill-current ${isEditing ? 'cursor-grab' : ''}`;
                                      textProps.textAnchor = 'start';
                                      const lineIndex = veri.findIndex(v => v.etiket === item.etiket);

                                      if (tip === 'paralel_dogrular') {
                                          defaultPos = lineIndex === 0 ? { x: 215, y: 70 } : { x: 215, y: 110 };
                                      } else if (tip === 'kesisen_dogrular') {
                                          defaultPos = lineIndex === 0 ? { x: 215, y: 145 } : { x: 215, y: 35 };
                                      } else if (tip === 'dik_kesisen_doğrular') {
                                          defaultPos = lineIndex === 0 ? { x: 215, y: 90 } : { x: 130, y: 20 };
                                      }
                                  }
                              }

                              if (content) {
                                textElements.push(
                                  <text key={itemIndex} x={item.x ?? defaultPos.x} y={item.y ?? defaultPos.y} {...textProps} onMouseDown={(e) => handleLabelDragStart(e, index, itemIndex, defaultPos)}>
                                      {/* FIX: contentEditable is not in React's SVG types. Ignoring TS error to allow direct editing on SVG text. */}
                                      {/* @ts-ignore */}
                                      <tspan contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'veri', itemIndex, 'deger'])} className={isEditing ? 'editable-field-svg' : ''}>{content[0]}</tspan>
                                      {content[1] && <tspan dy={content[1] === '°' ? -4 : 0} className="text-[8pt]">{content[1]}</tspan>}
                                  </text>
                                );
                              }
                          });

                          if (['dogru_parcasi', 'isin', 'dogru', 'paralel_dogrular', 'kesisen_dogrular', 'dik_kesisen_doğrular'].includes(tip)) {
                              shapeElements.push(
                                ...(() => {
                                  const p1 = { x: 40, y: 90 }, p2 = { x: 210, y: 90 };
                                  const p3 = { x: 40, y: 70 }, p4 = { x: 210, y: 70 };
                                  const p5 = { x: 40, y: 110 }, p6 = { x: 210, y: 110 };
                                  const cross1 = { x: 40, y: 40 }, cross2 = { x: 210, y: 140 };
                                  const cross3 = { x: 40, y: 140 }, cross4 = { x: 210, y: 40 };
                                  const perp1 = { x: 125, y: 20 }, perp2 = { x: 125, y: 160 };
                                  const marker = `url(#arrow-${quizId}-${index})`;
                                  switch (tip) {
                                    case 'dogru_parcasi': return [<line key="l" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-blue-500" strokeWidth="2" />, <circle key="c1" cx={p1.x} cy={p1.y} r="3" className="fill-blue-500" />, <circle key="c2" cx={p2.x} cy={p2.y} r="3" className="fill-blue-500" />];
                                    case 'isin': return [<line key="l" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-blue-500" strokeWidth="2" markerEnd={marker} />, <circle key="c1" cx={p1.x} cy={p1.y} r="3" className="fill-blue-500" />];
                                    case 'dogru': return [<line key="l" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />];
                                    case 'paralel_dogrular': return [<line key="l1" x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker}/>, <line key="l2" x1={p5.x} y1={p5.y} x2={p6.x} y2={p6.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />];
                                    case 'kesisen_dogrular': return [<line key="l1" x1={cross1.x} y1={cross1.y} x2={cross2.x} y2={cross2.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />, <line key="l2" x1={cross3.x} y1={cross3.y} x2={cross4.x} y2={cross4.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />];
                                    case 'dik_kesisen_doğrular': return [<line key="l1" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />, <line key="l2" x1={perp1.x} y1={perp1.y} x2={perp2.x} y2={perp2.y} className="stroke-blue-500" strokeWidth="2" markerStart={marker} markerEnd={marker} />, <path key="angle" d="M 125 90 L 135 90 L 135 80" className="fill-none stroke-current" strokeWidth="1.5" />];
                                    default: return [];
                                  }
                                })()
                              );
                          }
                          
                          return (
                            <div className="my-4 p-4 flex justify-center items-center">
                              {/* FIX: Changed ref callback to not return a value, resolving a TypeScript type error. */}
                              <svg ref={el => { svgRefs.current[index] = el; }} width="250" height="180" viewBox="0 0 250 180" className={`overflow-visible drop-shadow-sm text-slate-700`}>
                                <title>{q.grafik_verisi.baslik}</title>
                                <defs><marker id={`arrow-${quizId}-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-current" /></marker></defs>
                                <g transform={`translate(${q.grafik_verisi.x || 0}, ${q.grafik_verisi.y || 0})`} onMouseDown={e => handleShapeDragStart(e, index)} className={isEditing ? 'cursor-move' : ''}>
                                  {shapeElements}
                                  {textElements}
                                </g>
                              </svg>
                            </div>
                          );
                      })()}
                      
                      {q.grafik_verisi.not && <p 
                        className={`text-xs text-center mt-2 text-slate-500 ${isEditing ? 'editable-field' : ''}`}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleContentUpdate(e, index, ['grafik_verisi', 'not'])}
                      >{q.grafik_verisi.not}</p>}
                  </div>
                )}
                
                {q.soru_tipi === 'coktan_secmeli' && q.secenekler && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 pl-2 options-grid">
                    {Object.entries(q.secenekler).map(([key, optionText]) => {
                        const isCorrect = showAnswers && key === q.dogru_cevap;
                        return (
                        <div key={key} className={`flex items-start p-2 rounded-md transition-all duration-300 ${isCorrect ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
                            <span>{key})&nbsp;</span>
                            <span
                              className={`flex-1 ${isEditing ? 'editable-field' : ''}`}
                              contentEditable={isEditing}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => handleContentUpdate(e, index, ['secenekler', key])}
                            >{optionText}</span>
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
                        <p className="p-2 rounded-md bg-green-100 text-green-800 font-bold inline-block">Cevap: <span
                           className={`${isEditing ? 'editable-field' : ''}`}
                           contentEditable={isEditing}
                           suppressContentEditableWarning={true}
                           onBlur={(e) => handleContentUpdate(e, index, ['dogru_cevap'])}
                          >{q.dogru_cevap}</span></p>
                    </div>
                )}

                {showAnswers && isTeacherView && (
                    <div className="mt-4 ml-6 p-3 bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 rounded-xl space-y-2">
                        <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2"><SparklesIcon className="w-4 h-4"/> Öğretmen Notu</h4>
                        <p className="text-sm text-blue-700"><strong>Kazanım:</strong> <span className={`${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['kazanim_kodu'])}>{q.kazanim_kodu}</span></p>
                        <p className="text-sm text-blue-700"><strong>Çözüm:</strong> <span className={`${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['cozum_anahtari'])}>{q.cozum_anahtari}</span></p>
                        <p className="text-sm text-blue-700"><strong>Seviye:</strong> <span className={`capitalize px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs ${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['seviye'])}>{q.seviye}</span></p>
                         <p className="text-sm text-blue-700"><strong>Doğru Cevap:</strong> <span className={`font-bold ${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['dogru_cevap'])}>{q.dogru_cevap}</span></p>
                        <div className="pt-2 border-t border-blue-100">
                            <p className="text-sm text-blue-700"><strong>Gerçek Yaşam Bağlantısı:</strong> <span className={`${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['gercek_yasam_baglantisi'])}>{q.gercek_yasam_baglantisi}</span></p>
                        </div>
                        {q.soru_tipi === 'coktan_secmeli' && q.yanlis_secenek_tipleri && q.yanlis_secenek_tipleri.length > 0 && (
                            <div className="pt-2 border-t border-blue-100">
                                <strong className="text-sm text-blue-700">Çeldirici Analizi:</strong>
                                <ul className="list-disc list-inside pl-4 text-sm text-blue-600">
                                    {q.yanlis_secenek_tipleri.map((tip, i) => (
                                        <li key={i} className={`${isEditing ? 'editable-field' : ''}`} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContentUpdate(e, index, ['yanlis_secenek_tipleri', i])}>{tip}</li>
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
      </div>
       <style>{`
        .editable-field {
            outline: 2px dashed #a78bfa; /* tailwind purple-400 */
            background-color: #f5f3ff; /* tailwind purple-50 */
            padding: 2px 4px;
            border-radius: 4px;
        }
        .editable-field-svg {
            outline: 1px dashed #a78bfa;
            border-radius: 2px;
            -webkit-tap-highlight-color: transparent;
        }
        .quiz-paper { 
            background-color: var(--bg-color); 
            width: 21cm;
            min-height: 29.7cm;
            padding: 2cm;
            margin: 2rem auto;
            box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
            background-color: white;
        }
        .quiz-paper.notebook {
            background-image: linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 100% var(--line-height);
            line-height: var(--line-height);
        }
        .quiz-paper.kareli {
            background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: var(--line-height) var(--line-height);
            line-height: var(--line-height);
        }
        .quiz-paper.noktali {
            background-image: radial-gradient(#d1d5db 1px, transparent 1px);
            background-size: var(--line-height) var(--line-height);
            line-height: var(--line-height);
        }
        .quiz-paper.bordered { border: 2px solid black; }

        @media print {
            body { 
                background: white !important; 
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            .non-printable-bg {
                background: transparent !important;
                padding: 0 !important;
            }
            .non-printable { display: none !important; }
            .printable-area { 
                box-shadow: none !important; 
                border: none !important; 
                padding: 0 !important; 
                margin: 0 !important; 
                backdrop-filter: none !important; 
                background: none !important; 
            }
            .quiz-paper {
                color: var(--text-color) !important;
                background-color: var(--bg-color) !important;
                box-shadow: none !important;
                border: none !important;
                column-count: var(--column-count) !important;
                column-gap: var(--column-gap) !important;
                width: 100% !important;
                min-height: initial !important;
                padding: 0 !important;
                margin: 0 !important;
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
            .quiz-paper.kareli {
                background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px) !important;
            }
            .quiz-paper.noktali {
                background-image: radial-gradient(#d1d5db 1px, transparent 1px) !important;
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