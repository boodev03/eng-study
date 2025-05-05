export function parseExercises(text: string): { sentence: string; answers: string[] }[] {
    const exercises: { sentence: string; answers: string[] }[] = [];
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Tìm tất cả các chỗ trống trong câu
        const blanks = line.match(/___/g) || [];
        if (blanks.length === 0) continue;

        // Tách câu thành các phần
        const parts = line.split("___");
        const sentence = parts.join("___");

        // Tìm đáp án cho từng chỗ trống
        const answers: string[] = [];
        for (let j = 0; j < blanks.length; j++) {
            const answerLine = lines[i + j + 1];
            if (!answerLine) break;

            // Lấy đáp án đầu tiên cho mỗi chỗ trống
            const answer = answerLine.split(",")[0].trim().toLowerCase();
            if (answer) {
                answers.push(answer);
            }
        }

        if (answers.length === blanks.length) {
            exercises.push({ sentence, answers });
        }
    }

    return exercises;
}
