export function parseExercises(text: string): { sentence: string; options: string[][]; answers: string[] }[] {
    const exercises: { sentence: string; options: string[][]; answers: string[] }[] = [];
    const lines = text.split("\n");

    let currentExercise: { sentence: string; options: string[][]; answers: string[] } | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check for new exercise marker (#number)
        if (line.match(/^#\d+/)) {
            if (currentExercise) {
                exercises.push(currentExercise);
            }
            currentExercise = { sentence: "", options: [], answers: [] };
            continue;
        }

        if (!currentExercise) continue;

        // Parse sentence
        if (line.startsWith("Sentence:")) {
            currentExercise.sentence = line.substring("Sentence:".length).trim();
            continue;
        }

        // Parse options
        if (line.startsWith("Options:")) {
            const optionsStr = line.substring("Options:".length).trim();
            const options = optionsStr.split(",").map(opt => opt.trim());
            // Single set of options for all blanks
            const blanksCount = (currentExercise.sentence.match(/___/g) || []).length;
            for (let j = 0; j < blanksCount; j++) {
                currentExercise.options[j] = options;
            }
            continue;
        }

        // Parse options for specific blanks
        if (line.startsWith("Options for blank")) {
            const blankMatch = line.match(/Options for blank (\d+):/);
            if (blankMatch) {
                const blankIndex = parseInt(blankMatch[1]) - 1;
                const optionsStr = line.substring(line.indexOf(":") + 1).trim();
                const options = optionsStr.split(",").map(opt => opt.trim());
                currentExercise.options[blankIndex] = options;
            }
            continue;
        }

        // Parse answers
        if (line.startsWith("Answers:")) {
            const answersStr = line.substring("Answers:".length).trim();
            currentExercise.answers = answersStr.split(",").map(ans => ans.trim());
            continue;
        }
    }

    // Add the last exercise if it exists
    if (currentExercise && currentExercise.sentence) {
        exercises.push(currentExercise);
    }

    return exercises;
}