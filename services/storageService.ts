
import { SavedQuiz, DetailedQuestion } from '../types';

const STORAGE_KEY = 'ai-quiz-history';

export const getHistory = (): SavedQuiz[] => {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEY);
    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson) as SavedQuiz[];
    // Sort by most recent first
    return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error reading from local storage", error);
    return [];
  }
};

export const saveQuiz = (quizToSave: { gradeName: string; questions: DetailedQuestion[]; kazanimId: string; }): SavedQuiz => {
  try {
    const newQuiz: SavedQuiz = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${quizToSave.kazanimId}`,
        createdAt: new Date().toISOString(),
        gradeName: quizToSave.gradeName,
        questions: quizToSave.questions,
    };

    const history = getHistory();
    const newHistory = [newQuiz, ...history.filter(q => q.id !== newQuiz.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newQuiz;
  } catch (error) {
    console.error("Error saving to local storage", error);
    throw error;
  }
};

export const getQuiz = (id: string): SavedQuiz | undefined => {
  const history = getHistory();
  return history.find(quiz => quiz.id === id);
};

export const deleteQuiz = (id: string): void => {
  try {
    const history = getHistory();
    const newHistory = history.filter(quiz => quiz.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Error deleting from local storage", error);
  }
};
