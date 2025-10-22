
import React from 'react';
import { HashRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import QuizGenerator from './components/QuizGenerator';
import HistoryList from './components/HistoryList';
import SavedQuiz from './components/SavedQuiz';
import { SparklesIcon, HistoryIcon } from './components/icons';

const Layout: React.FC = () => (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
        <main className="flex-grow max-w-4xl mx-auto p-4 sm:p-8 w-full">
            <header className="text-center mb-10 non-printable">
                <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
                    <SparklesIcon className="w-10 h-10" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">AI Destekli Sınav Hazırlama Asistanı</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
                    Matematik müfredatındaki her bir kazanıma özel, kişiselleştirilmiş sınavları saniyeler içinde oluşturun.
                </p>
                <nav className="mt-8 flex justify-center gap-2 sm:gap-4 border-b border-slate-200 pb-4">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 text-slate-600'
                            }`
                        }
                    >
                        <SparklesIcon className="w-5 h-5" />
                        Yeni Sınav
                    </NavLink>
                    <NavLink 
                        to="/history" 
                        className={({ isActive }) => 
                            `flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 text-slate-600'
                            }`
                        }
                    >
                        <HistoryIcon className="w-5 h-5" />
                        Geçmiş Sınavlar
                    </NavLink>
                </nav>
            </header>
            <div className="mt-8">
                 <Outlet />
            </div>
        </main>
        <footer className="text-center p-4 text-slate-500 text-sm non-printable">
            <p>AI Sınav Hazırlama Asistanı &copy; {new Date().getFullYear()} | Tüm hakları saklıdır.</p>
        </footer>
    </div>
);


const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<QuizGenerator />} />
                    <Route path="history" element={<HistoryList />} />
                    <Route path="history/:quizId" element={<SavedQuiz />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;
