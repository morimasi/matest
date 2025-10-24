
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import QuizGenerator from './QuizGenerator';
import HistoryList from './HistoryList';
import SavedQuiz from './SavedQuiz';
import MainLayout from '../layouts/MainLayout';
import Archive from './Archive';
import HowToUse from './HowToUse';


const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<QuizGenerator />} />
                    <Route path="archive" element={<Archive />} />
                    <Route path="history" element={<HistoryList />} />
                    <Route path="history/:quizId" element={<SavedQuiz />} />
                    <Route path="how-to-use" element={<HowToUse />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;