
import React from 'react';
import { HashRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import QuizGenerator from './components/QuizGenerator';
import HistoryList from './components/HistoryList';
import SavedQuiz from './components/SavedQuiz';
import { SparklesIcon, HistoryIcon } from './components/icons';

const MainLayout: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 font-sans text-slate-800 flex flex-col">
        <header className="sticky top-0 z-50 non-printable">
             <div className="max-w-5xl mx-auto px-4">
                 <div className="flex justify-between items-center h-20 bg-white/80 backdrop-blur-lg rounded-2xl mt-4 shadow-md border border-white/80">
                    <div className="flex items-center gap-3 px-6">
                         <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-2">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 hidden sm:block">AI Sınav Asistanı</h1>
                    </div>
                    <nav className="flex items-center justify-center gap-2 p-2 bg-slate-100/70 rounded-2xl">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 py-2 rounded-xl font-semibold transition-colors text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <SparklesIcon className="w-5 h-5" />
                            Yeni Sınav
                        </NavLink>
                        <NavLink 
                            to="/history" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 py-2 rounded-xl font-semibold transition-colors text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <HistoryIcon className="w-5 h-5" />
                            Geçmiş
                        </NavLink>
                    </nav>
                     <div className="w-24 hidden sm:block"></div> {/* Spacer for symmetry */}
                 </div>
             </div>
        </header>

        <main className="flex-grow max-w-5xl mx-auto p-4 sm:p-8 w-full">
            <div className="text-center mb-12 non-printable">
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">AI Destekli Sınav Hazırlama Asistanı</h2>
                <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                    Matematik müfredatındaki her bir kazanıma özel, kişiselleştirilmiş sınavları saniyeler içinde oluşturun.
                </p>
            </div>
            
            <Outlet />
           
        </main>
        <footer className="text-center p-6 text-slate-500 text-sm non-printable">
            <p>AI Sınav Hazırlama Asistanı &copy; {new Date().getFullYear()} | Tüm hakları saklıdır.</p>
        </footer>
    </div>
);


const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<QuizGenerator />} />
                    <Route path="history" element={<HistoryList />} />
                    <Route path="history/:quizId" element={<SavedQuiz />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;