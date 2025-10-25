import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { SparklesIcon, HistoryIcon, ArchiveIcon, QuestionCircleIcon, ThemeIcon } from '../components/icons';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'light', name: 'Aydınlık' },
        { id: 'dark', name: 'Karanlık' },
        { id: 'serene', name: 'Huzurlu Mavi' },
        { id: 'playful', name: 'Eğlenceli Turuncu' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="p-2 rounded-full hover:bg-[--bg-interactive-muted] transition-colors"
                title="Temayı Değiştir"
            >
                <ThemeIcon className="w-5 h-5 text-[--text-secondary]" />
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-48 bg-[--bg-component-solid] backdrop-blur-xl rounded-lg shadow-2xl border border-[--border-color] z-50"
                >
                    <div className="p-2">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id as any);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                    theme === t.id
                                        ? 'bg-[--accent-gradient-from]/20 text-[--text-accent] font-semibold'
                                        : 'text-[--text-secondary] hover:bg-[--bg-interactive-muted]'
                                }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const MainLayout: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-[--bg-from] to-[--bg-to] font-sans text-[--text-primary] flex flex-col transition-colors duration-500">
        <header className="sticky top-0 z-50 non-printable backdrop-blur-xl bg-[--bg-component] shadow-lg border-b border-[--border-color]">
             <div className="max-w-5xl mx-auto px-4 sm:px-8">
                 <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                         <div className="inline-flex items-center justify-center bg-gradient-to-br from-[--accent-gradient-from] to-[--accent-gradient-to] text-white rounded-full p-2 shadow-md">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-[--text-primary] hidden sm:block">AI Sınav Asistanı</h1>
                    </div>
                    <nav className="flex items-center justify-center gap-1 sm:gap-2 p-1 bg-[--bg-interactive-muted] rounded-full">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                    isActive ? 'bg-[--bg-component-active] shadow text-[--text-accent]' : 'hover:bg-[--bg-component-hover] text-[--text-secondary]'
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
                                    isActive ? 'bg-[--bg-component-active] shadow text-[--text-accent]' : 'hover:bg-[--bg-component-hover] text-[--text-secondary]'
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
                                    isActive ? 'bg-[--bg-component-active] shadow text-[--text-accent]' : 'hover:bg-[--bg-component-hover] text-[--text-secondary]'
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
                                    isActive ? 'bg-[--bg-component-active] shadow text-[--text-accent]' : 'hover:bg-[--bg-component-hover] text-[--text-secondary]'
                                }`
                            }
                        >
                            <QuestionCircleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Nasıl Kullanılır?</span>
                        </NavLink>
                    </nav>
                     <div className="w-24 flex justify-end">
                        <ThemeSelector />
                     </div>
                 </div>
             </div>
        </header>

        <main className="flex-grow max-w-5xl mx-auto p-4 sm:p-8 w-full">
            <div className="text-center mb-12 non-printable animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-[--text-primary] tracking-tight">Geleceğin Sınavları, Bugünün Teknolojisiyle</h2>
                <p className="mt-3 text-lg text-[--text-secondary] max-w-2xl mx-auto">
                    Milli Eğitim Bakanlığı müfredatına tam uyumlu, özgün ve yaratıcı sınavları saniyeler içinde hazırlayın.
                </p>
            </div>
            
            <Outlet />
           
        </main>
        <footer className="text-center p-6 text-[--text-muted]/70 text-sm non-printable">
            <p>AI Sınav Hazırlama Asistanı &copy; {new Date().getFullYear()}</p>
        </footer>
    </div>
);

export default MainLayout;