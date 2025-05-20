"use client";

import { useMemo } from "react";
import ExerciseItem from "./ExerciseItem";

interface Exercise {
  sentence: string;
  answers: string[]; // Mỗi string tương ứng với một chỗ trống theo thứ tự
}

interface ExerciseListProps {
  exercises: Exercise[];
  userAnswers: string[][]; // Mỗi câu có thể có nhiều đáp án
  isSubmitted: boolean;
  onAnswerChange: (index: number, blankIndex: number, value: string) => void;
}

export default function ExerciseList({
  exercises,
  userAnswers,
  isSubmitted,
  onAnswerChange,
}: ExerciseListProps) {
  const isCorrect = (index: number, blankIndex: number) => {
    if (!isSubmitted) return null;
    const userAnswer = userAnswers?.[index]?.[blankIndex] || "";
    return (
      exercises[index].answers[blankIndex].toLowerCase() ===
      userAnswer.trim().toLowerCase()
    );
  };

  // Get all unique answers and shuffle them
  const allAnswers = useMemo(() => {
    const answers = exercises.flatMap((exercise) => exercise.answers || []);
    const uniqueAnswers = [...new Set(answers)];
    return uniqueAnswers.sort(() => Math.random() - 0.5);
  }, [exercises]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none p-3 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-700 mb-2">Từ cần điền:</h3>
        <div className="flex flex-wrap gap-2">
          {allAnswers.map((answer, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1.5 bg-white border border-blue-200 rounded-md text-sm text-blue-700 shadow-sm"
            >
              {answer}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 py-4">
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={index}
            exercise={exercise}
            index={index}
            userAnswers={userAnswers?.[index] || []}
            isSubmitted={isSubmitted}
            onAnswerChange={(blankIndex, value) =>
              onAnswerChange(index, blankIndex, value)
            }
            isCorrect={(blankIndex) => isCorrect(index, blankIndex) ?? false}
          />
        ))}
      </div>
    </div>
  );
}
