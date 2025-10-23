
import { SavedQuiz, DetailedQuestion, ArchiveQuiz } from '../types';

const STORAGE_KEY = 'ai-quiz-history';
const ARCHIVE_STORAGE_KEY = 'ai-quiz-user-archive';

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

export const updateQuiz = (quizId: string, updatedQuestions: DetailedQuestion[]): void => {
  try {
    const history = getHistory();
    const quizIndex = history.findIndex(q => q.id === quizId);
    if (quizIndex > -1) {
      history[quizIndex].questions = updatedQuestions;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error("Error updating quiz in local storage", error);
  }
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

export const getArchivedQuizzes = (): Record<string, ArchiveQuiz> => {
  try {
    const archiveJson = localStorage.getItem(ARCHIVE_STORAGE_KEY);
    return archiveJson ? JSON.parse(archiveJson) : {};
  } catch (error) {
    console.error("Error reading archive from local storage", error);
    return {};
  }
};

export const saveQuizToArchive = (quiz: SavedQuiz): void => {
  try {
    const currentArchive = getArchivedQuizzes();
    
    // Use a map to handle quizzes that might cover the same kazanım multiple times,
    // ensuring we only create one archive entry per kazanım.
    const uniqueKazanims = new Map<string, DetailedQuestion>();
    quiz.questions.forEach(q => {
        if (!uniqueKazanims.has(q.kazanim_kodu)) {
            uniqueKazanims.set(q.kazanim_kodu, q);
        }
    });

    // Create an archive entry for each unique kazanım found in the quiz
    uniqueKazanims.forEach((question, kazanimCode) => {
        const archiveEntry: ArchiveQuiz = {
            gradeName: quiz.gradeName,
            unitName: question.unite_adi,
            kazanimName: question.kazanim_metni,
            questions: quiz.questions // Save the full quiz for this kazanım
        };
        currentArchive[kazanimCode] = archiveEntry;
    });
    
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(currentArchive));

  } catch (error) {
     console.error("Error saving to archive in local storage", error);
     throw error;
  }
};
