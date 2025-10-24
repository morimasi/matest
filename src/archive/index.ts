import { ARCHIVE_DATA_GRADE_1 } from './grade1';
import { ARCHIVE_DATA_GRADE_2 } from './grade2';
import { ARCHIVE_DATA_GRADE_3 } from './grade3';
import { ARCHIVE_DATA_GRADE_4 } from './grade4';
import { ARCHIVE_DATA_GRADE_5 } from './grade5';
import { ArchiveQuiz } from '../types';

export const ARCHIVE_DATA: Record<string, ArchiveQuiz> = {
    ...ARCHIVE_DATA_GRADE_1,
    ...ARCHIVE_DATA_GRADE_2,
    ...ARCHIVE_DATA_GRADE_3,
    ...ARCHIVE_DATA_GRADE_4,
    ...ARCHIVE_DATA_GRADE_5,
};
