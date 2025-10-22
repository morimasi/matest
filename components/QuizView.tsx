
import React, { useRef, useState } from 'react';
import { DetailedQuestion } from '../types';
import { DownloadIcon, PrintIcon, ShareIcon, SparklesIcon } from './icons';

// Make sure to declare jspdf and html2canvas from the window object
declare const jspdf: any;
declare const html2canvas: any;

interface QuizViewProps {
  questions: DetailedQuestion[];
  grade: string;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, grade }) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const firstQuestion = questions[0];
  if (!firstQuestion) return null;

  const handleDownloadPdf = async () => {
    if (!quizRef.current) return;
    setIsDownloading(true);
    try {
        const wasShowingAnswers = showAnswers;
        // Create a student version by default
        setShowAnswers(false);
        await new Promise(resolve => setTimeout(resolve, 100)); // Allow DOM to update

        const canvas = await html2canvas(quizRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${grade}-${firstQuestion.kazanim_kodu}-sinav.pdf`);
        setShowAnswers(wasShowingAnswers); // Restore previous state

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
        setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI ile Oluşturulmuş Sınav',
          text: `İşte ${grade} - ${firstQuestion.kazanim_kodu} konusu için hazırladığım sınav!`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Tarayıcınız paylaşma özelliğini desteklemiyor.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 mt-8 printable-area">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden non-printable">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Oluşturulan Sınav</h2>
            <p className="text-slate-500 max-w-md">{`${grade} | ${firstQuestion.unite_adi} | ${firstQuestion.kazanim_kodu}`}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handlePrint} title="Yazdır" className="p-2 rounded-full hover:bg-slate-100 transition-colors"><PrintIcon className="w-6 h-6 text-slate-600" /></button>
          <button onClick={handleDownloadPdf} disabled={isDownloading} title="PDF Olarak İndir" className="p-2 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-50">
            {isDownloading ? (
                <svg className="animate-spin h-6 w-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <DownloadIcon className="w-6 h-6 text-slate-600" />
            )}
            </button>
          <button onClick={handleShare} title="Paylaş" className="p-2 rounded-full hover:bg-slate-100 transition-colors"><ShareIcon className="w-6 h-6 text-slate-600" /></button>
          <div className="flex items-center gap-4 ml-4 border-l pl-4">
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
      
      <div ref={quizRef} className="bg-white p-4 sm:p-8 border-t border-slate-200">
        <header className="text-center mb-8">
            <h1 className="text-xl font-bold">Matematik Değerlendirme</h1>
            <p className="text-sm text-slate-600">{`${grade} / Ünite ${firstQuestion.unite_no}: ${firstQuestion.unite_adi}`}</p>
            <p className="text-sm text-slate-500 mt-1"><strong>Kazanım:</strong> {firstQuestion.kazanim_metni} ({firstQuestion.kazanim_kodu})</p>
            <div className="grid grid-cols-3 gap-4 mt-6 border-t border-b py-2 text-left">
                <p><strong>Adı Soyadı:</strong> ....................................</p>
                <p><strong>Tarih:</strong> ..... / ..... / ..........</p>
                <p><strong>Puan:</strong> ............</p>
            </div>
        </header>

        <ol className="space-y-8 list-decimal list-inside">
          {questions.map((q, index) => (
            <li key={index} className="text-slate-800">
              <p className="font-semibold mb-3 inline">{q.soru_metni}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 pl-2">
                {Object.entries(q.secenekler).map(([key, optionText]) => {
                  const isCorrect = showAnswers && key === q.dogru_cevap;
                  return (
                    <div key={key} className={`p-2 rounded-md transition-colors ${isCorrect ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
                      <span>{key}) {optionText}</span>
                    </div>
                  );
                })}
              </div>
              {showAnswers && isTeacherView && (
                <div className="mt-4 ml-6 p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2"><SparklesIcon className="w-4 h-4"/> Öğretmen Notu</h4>
                    <p className="text-sm text-blue-700"><strong>Çözüm:</strong> {q.cozum_anahtari}</p>
                    <p className="text-sm text-blue-700"><strong>Seviye:</strong> <span className="capitalize px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs">{q.seviye}</span></p>
                    <div className="pt-2 border-t border-blue-100">
                        <p className="text-sm text-blue-700"><strong>Gerçek Yaşam Bağlantısı:</strong> {q.gercek_yasam_baglantisi}</p>
                    </div>
                    <div className="pt-2 border-t border-blue-100">
                        <strong className="text-sm text-blue-700">Çeldirici Analizi:</strong>
                        <ul className="list-disc list-inside pl-4 text-sm text-blue-600">
                            {q.yanlis_secenek_tipleri.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
       <style>{`
        .toggle-checkbox {
            appearance: none;
            width: 40px;
            height: 20px;
            background-color: #cbd5e1;
            border-radius: 9999px;
            position: relative;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }
        .toggle-checkbox::before {
            content: '';
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 9999px;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked {
            background-color: #2563eb;
        }
        .toggle-checkbox:checked::before {
            transform: translateX(20px);
        }
        @media print {
            body {
                background-color: white !important;
            }
            .non-printable {
                display: none !important;
            }
            .printable-area {
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            .bg-blue-50 {
                background-color: #eff6ff !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            .bg-green-100 {
                 background-color: #dcfce7 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
        }
      `}</style>
    </div>
  );
};

export default QuizView;
