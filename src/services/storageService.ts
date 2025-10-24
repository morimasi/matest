
import { SavedQuiz, DetailedQuestion, ArchiveQuiz, QuizTemplate } from '../types';

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

    const questionsByKazanım = quiz.questions.reduce((acc, question) => {
      const code = question.kazanim_kodu;
      if (!acc[code]) {
        acc[code] = [];
      }
      acc[code].push(question);
      return acc;
    }, {} as Record<string, DetailedQuestion[]>);

    Object.entries(questionsByKazanım).forEach(([kazanimCode, questionsInGroup]) => {
      if (questionsInGroup.length > 0) {
        const firstQuestion = questionsInGroup[0];

        const newTemplate: QuizTemplate = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
          questions: questionsInGroup,
          isSystemTemplate: false,
        };

        if (currentArchive[kazanimCode]) {
          // FIX: Defensively ensure the templates array exists before pushing to it.
          // This prevents a crash if the stored archive entry is malformed.
          if (!Array.isArray(currentArchive[kazanimCode].templates)) {
            currentArchive[kazanimCode].templates = [];
          }
          currentArchive[kazanimCode].templates.push(newTemplate);
        } else {
          currentArchive[kazanimCode] = {
            gradeName: quiz.gradeName,
            unitName: firstQuestion.unite_adi,
            kazanimName: firstQuestion.kazanim_metni,
            templates: [newTemplate],
          };
        }
      }
    });

    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(currentArchive));
  } catch (error) {
    console.error("Error saving to archive in local storage", error);
    throw error;
  }
};


export const deleteQuizFromArchive = (kazanimCode: string, templateId: string): void => {
  try {
    const currentArchive = getArchivedQuizzes();
    const archiveEntry = currentArchive[kazanimCode];
    if (archiveEntry) {
      archiveEntry.templates = archiveEntry.templates.filter(t => t.id !== templateId);
      if (archiveEntry.templates.length === 0) {
        delete currentArchive[kazanimCode];
      }
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(currentArchive));
    }
  } catch (error) {
    console.error("Error deleting from archive", error);
    throw error;
  }
};

export const updateArchivedQuiz = (kazanimCode: string, templateId: string, updatedQuestions: DetailedQuestion[]): void => {
  try {
    const currentArchive = getArchivedQuizzes();
    const archiveEntry = currentArchive[kazanimCode];
    const template = archiveEntry?.templates.find(t => t.id === templateId);
    if (template) {
      template.questions = updatedQuestions;
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(currentArchive));
    }
  } catch (error) {
    console.error("Error updating archive", error);
    throw error;
  }
};

export const renameQuiz = (id: string, newName: string): void => {
  try {
    const history = getHistory();
    const quizIndex = history.findIndex(quiz => quiz.id === id);
    if (quizIndex > -1) {
      history[quizIndex].customName = newName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error("Error renaming quiz in local storage", error);
  }
};
