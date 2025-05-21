export function parseExercises(text: string): { sentence: string; answers: string[] }[] {
    const exercises: { sentence: string; answers: string[] }[] = [];
    const lines = text.split("\n");
    let currentExercise: { sentence: string; answers: string[] } | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check if this is a new exercise (starts with #)
        if (line.startsWith('#')) {
            // If we have a complete previous exercise, add it to the list
            if (currentExercise && currentExercise.answers.length > 0) {
                exercises.push(currentExercise);
            }
            currentExercise = { sentence: '', answers: [] };
            continue;
        }

        // Parse sentence line
        if (line.startsWith('Sentence:')) {
            const sentence = line.replace('Sentence:', '').trim();
            if (currentExercise) {
                currentExercise.sentence = sentence;
            }
            continue;
        }

        // Parse answers line
        if (line.startsWith('Answers:')) {
            const answers = line.replace('Answers:', '')
                .split(',')
                .map(answer => answer.trim().toLowerCase())
                .filter(answer => answer.length > 0);

            if (currentExercise) {
                currentExercise.answers = answers;
            }
        }
    }

    // Add the last exercise if it exists and is complete
    if (currentExercise && currentExercise.answers.length > 0) {
        exercises.push(currentExercise);
    }

    return exercises;
}
