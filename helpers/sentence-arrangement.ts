export function parseExercises(text: string): { scrambled: string[]; correctSentence: string }[] {
    const exercises: { scrambled: string[]; correctSentence: string }[] = [];
    const lines = text.split("\n");

    let currentExercise: { scrambled: string[]; correctSentence: string } | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check for new exercise marker (#number)
        if (line.match(/^#\d+/)) {
            if (currentExercise) {
                exercises.push(currentExercise);
            }
            currentExercise = { scrambled: [], correctSentence: "" };
            continue;
        }

        if (!currentExercise) continue;

        // Parse scrambled words
        if (line.startsWith("Scrambled:")) {
            const scrambledStr = line.substring("Scrambled:".length).trim();
            currentExercise.scrambled = scrambledStr.split(",").map(word => word.trim());
            continue;
        }

        // Parse correct sentence
        if (line.startsWith("Correct Sentence:")) {
            currentExercise.correctSentence = line.substring("Correct Sentence:".length).trim();
            continue;
        }
    }

    // Add the last exercise if it exists
    if (currentExercise && currentExercise.scrambled.length > 0) {
        exercises.push(currentExercise);
    }

    return exercises;
} 