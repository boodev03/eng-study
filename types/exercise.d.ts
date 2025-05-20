export interface Requirement {
    numberOfSentences: number;
    topicDescription: string;
    difficulty: Difficulty;
}

export enum Difficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
}

export interface ExplainRequirement {
    exerciseType: 'Cloze' | 'Multiple Choice' | 'Sentence Reordering';
    difficultyLevel: Difficulty;
    explanationLanguage: 'English' | 'Vietnamese';
    question: string;
    correctAnswers: string[];
    userAnswer: string;
}