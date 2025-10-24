import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { SparklesIcon, HistoryIcon, ArchiveIcon, QuestionCircleIcon } from '../components/icons';

const MainLayout: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-violet-300 font-sans text-slate-800 flex flex-col">
        <header className="sticky top-0 z-50 non-printable backdrop-blur-xl bg-white/60 shadow-lg border-b border-white/50">
             <div className="max-w-5xl mx-auto px-4 sm:px-8">
                 <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                         <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-full p-2 shadow-md">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 hidden sm:block">AI Sınav Asistanı</h1>
                        <img src="/logo1.jpg" alt="Ek Logo" className="h-10 w-auto hidden sm:block rounded-full" />
                    </div>
                    <nav className="flex items-center justify-center gap-1 sm:gap-2 p-1 bg-black/5 rounded-full">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <SparklesIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Yeni Sınav</span>
                        </NavLink>
                        <NavLink 
                            to="/archive" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <ArchiveIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Arşiv</span>
                        </NavLink>
                        <NavLink 
                            to="/history" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <HistoryIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Geçmiş</span>
                        </NavLink>
                        <NavLink 
                            to="/how-to-use" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                    isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60 text-slate-600'
                                }`
                            }
                        >
                            <QuestionCircleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Nasıl Kullanılır?</span>
                        </NavLink>
                    </nav>
                     <div className="w-24 hidden sm:block"></div> {/* Spacer for symmetry */}
                 </div>
             </div>
        </header>

        <main className="flex-grow max-w-5xl mx-auto p-4 sm:p-8 w-full">
            <div className="text-center mb-12 non-printable animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Geleceğin Sınavları, Bugünün Teknolojisiyle</h2>
                <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                    Milli Eğitim Bakanlığı müfredatına tam uyumlu, özgün ve yaratıcı sınavları saniyeler içinde hazırlayın.
                </p>
            </div>
            
            <Outlet />
           
        </main>
        <footer className="text-center p-6 text-black/40 text-sm non-printable">
            <p>AI Sınav Hazırlama Asistanı &copy; {new Date().getFullYear()}</p>
        </footer>
    </div>
);

// FIX: Added default export to the component.
export default MainLayout;