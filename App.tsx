
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import QuizGenerator from './components/QuizGenerator';
import HistoryList from './components/HistoryList';
import SavedQuiz from './components/SavedQuiz';
import MainLayout from './layouts/MainLayout';


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