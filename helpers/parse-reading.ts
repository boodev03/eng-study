export interface ReadingExercise {
    topic: string;
    difficulty: string;
    numberOfQuestions: number;
    passage: string;
    questions: {
        id: number;
        text: string;
        type: string;
        options: string[];
        correctAnswerIndex: number;
        explanation?: string;
    }[];
}

export function parseReadingExercise(data: string): Partial<ReadingExercise> {
    try {
        // Remove any markdown code block markers
        const cleanData = data.replace(/```json\n?|\n?```/g, '');

        // Try to parse the complete JSON first
        try {
            return JSON.parse(cleanData);
        } catch {
            // If complete parsing fails, try to extract partial data
            const result: Partial<ReadingExercise> = {
                topic: '',
                difficulty: '',
                numberOfQuestions: 0,
                passage: '',
                questions: []
            };

            // Extract topic
            const topicMatch = cleanData.match(/"topic"\s*:\s*"([^"]*)"/);
            if (topicMatch) {
                result.topic = topicMatch[1];
            }

            // Extract difficulty
            const difficultyMatch = cleanData.match(/"difficulty"\s*:\s*"([^"]*)"/);
            if (difficultyMatch) {
                result.difficulty = difficultyMatch[1];
            }

            // Extract numberOfQuestions
            const numberOfQuestionsMatch = cleanData.match(/"numberOfQuestions"\s*:\s*(\d+)/);
            if (numberOfQuestionsMatch) {
                result.numberOfQuestions = parseInt(numberOfQuestionsMatch[1]);
            }

            // Extract passage
            const passageMatch = cleanData.match(/"passage"\s*:\s*"([^"]*)"/);
            if (passageMatch) {
                result.passage = passageMatch[1];
            }

            // Extract questions array if it exists
            const questionsArrayMatch = cleanData.match(/"questions"\s*:\s*\[([\s\S]*?)\]/);
            if (questionsArrayMatch) {
                try {
                    const questionsStr = `[${questionsArrayMatch[1]}]`;
                    result.questions = JSON.parse(questionsStr);
                } catch {
                    // If questions parsing fails, leave as empty array
                    result.questions = [];
                }
            }

            return result;
        }
    } catch (error) {
        console.error('Error parsing reading exercise:', error);
        return {
            topic: '',
            difficulty: '',
            numberOfQuestions: 0,
            passage: '',
            questions: []
        };
    }
}