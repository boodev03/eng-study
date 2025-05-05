interface GeneratePromptOptions {
  type: "fill-in-blank" | "multiple-choice" | "sentence-reordering";
  numberOfSentences: number;
  topicDescription: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const difficultyMap = {
  beginner: "Beginner (CEFR A1-A2)",
  intermediate: "Intermediate (CEFR B1-B2)",
  advanced: "Advanced (CEFR C1-C2)",
};

export function generatePrompt({
  type,
  numberOfSentences,
  topicDescription,
  difficulty,
}: GeneratePromptOptions): string {
  if (type === "fill-in-blank") {
    return `Create ${numberOfSentences} cloze exercises for English practice based on:
- Topic: ${topicDescription}
- Difficulty: ${difficultyMap[difficulty]}

Each exercise must be relevant to the topic and suitable for vocabulary/grammar practice. Follow:

Requirements:
   - **Beginner**: 5-8 word sentences, 1 blank, CEFR A1-A2, simple grammar (e.g., present simple). Blank tests a common topic-related word.
   - **Intermediate**: 8-12 words, 1-2 blanks, CEFR B1-B2, intermediate grammar (e.g., past simple). Blanks test topic-specific vocabulary/grammar.
   - **Advanced**: 12-18 words, 2-3 blanks, CEFR C1-C2, advanced grammar (e.g., conditionals). Blanks test nuanced vocabulary/collocations.
   - Sentences must be grammatically correct, natural, and have one correct answer per blank.
   - Ensure variety in structure, vocabulary, and blank types (nouns, verbs, etc.).

Output format:
   - Return a Markdown string with no additional text outside the specified format.
   - For each of the ${numberOfSentences} exercises, use:
     #<number>
     Sentence: <sentence with blanks as ___>
     Answers: <correct words, comma-separated>
   - Example structure for 2 exercises:
     #1
     Sentence: Sentence with ___ for blank.
     Answers: word1
     #2
     Sentence: Sentence with ___ ___ blanks.
     Answers: word1, word2
   - Include a blank line between exercises.`;
  } else if (type === "multiple-choice") {
    return `Create ${numberOfSentences} multiple-choice exercises for English practice based on:
- Topic: ${topicDescription}
- Difficulty: ${difficultyMap[difficulty]}

Each exercise must be relevant to the topic and suitable for vocabulary/grammar practice. Follow:

Requirements:
   - **Beginner**: 5-8 word sentences, 1 blank, CEFR A1-A2, simple grammar (e.g., present simple). Blank tests a common topic-related word. Provide 4 answer options.
   - **Intermediate**: 8-12 word sentences, 1-2 blanks, CEFR B1-B2, intermediate grammar (e.g., past simple). Blanks test topic-specific vocabulary/grammar. Provide 4 answer options per blank.
   - **Advanced**: 12-18 word sentences, 2-3 blanks, CEFR C1-C2, advanced grammar (e.g., conditionals). Blanks test nuanced vocabulary/collocations. Provide 4 answer options per blank.
   - Sentences must be grammatically correct, natural, and have one correct answer per blank.
   - Ensure variety in structure, vocabulary, and blank types (nouns, verbs, etc.).
   - Answer options must be plausible but distinct, avoiding ambiguity.
   - For multiple blanks, provide a single set of options if blanks are related, or separate sets if blanks test different concepts.

Output format:
   - Return a Markdown string with no additional text outside the specified format.
   - For each of the ${numberOfSentences} exercises, use:
     #<number>
     Sentence: <sentence with blanks as ___>
     Options: <option1>, <option2>, <option3>, <option4>
     Answers: <correct word(s), comma-separated>
   - For multiple blanks with separate option sets:
     #<number>
     Sentence: <sentence with blanks as ___>
     Options for blank 1: <option1>, <option2>, <option3>, <option4>
     Options for blank 2: <option1>, <option2>, <option3>, <option4>
     Answers: <correct word1>, <correct word2>
   - Example structure for 2 exercises:
     #1
     Sentence: Sentence with ___ for practice.
     Options: word1, word2, word3, word4
     Answers: word1
     #2
     Sentence: Sentence with ___ ___ blanks.
     Options for blank 1: word1, word2, word3, word4
     Options for blank 2: word5, word6, word7, word8
     Answers: word1, word5
   - Include a blank line between exercises.`;
  } else {
    return `Create ${numberOfSentences} sentence reordering exercises for English practice based on:
- Topic: ${topicDescription}
- Difficulty: ${difficultyMap[difficulty as keyof typeof difficultyMap]}

Each exercise must be relevant to the topic and suitable for grammar/syntax practice. Follow:

Requirements:
   - **Beginner**: 5-8 word sentences, CEFR A1-A2, simple grammar (e.g., present simple, subject-verb-object). Sentences use common topic-related vocabulary.
   - **Intermediate**: 8-12 word sentences, CEFR B1-B2, intermediate grammar (e.g., past simple, basic clauses). Sentences include topic-specific vocabulary and varied structures.
   - **Advanced**: 12-18 word sentences, CEFR C1-C2, advanced grammar (e.g., conditionals, complex clauses). Sentences test nuanced vocabulary and sophisticated structures.
   - Sentences must be grammatically correct, natural, and have one correct arrangement.
   - Ensure variety in sentence structure, vocabulary, and topic relevance.
   - Randomize word order to create a challenging but solvable scramble, avoiding ambiguous rearrangements.
   - Provide the scrambled words as a list, ensuring the correct sentence can be formed.

Output format:
   - Return a Markdown string with no additional text outside the specified format.
   - For each of the ${numberOfSentences} exercises, use:
     #<number>
     Scrambled: <comma-separated list of words in random order>
     Correct Sentence: <correctly ordered sentence>
   - Example structure for 2 exercises:
     #1
     Scrambled: is, she, happy, very
     Correct Sentence: She is very happy.
     #2
     Scrambled: yesterday, went, to, they, park, the
     Correct Sentence: They went to the park yesterday.
   - Include a blank line between exercises.
`;
  }
}
