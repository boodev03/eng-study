"use client";

import { motion } from "framer-motion";
import ExerciseItem from "./ExerciseItem";

interface Exercise {
  sentence: string;
  options: string[][];
  answers: string[];
}

interface ExerciseListProps {
  exercises: Exercise[];
  userAnswers: string[][];
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
    const userAnswer = userAnswers[index]?.[blankIndex] || "";
    return (
      exercises[index].answers[blankIndex].toLowerCase() ===
      userAnswer.trim().toLowerCase()
    );
  };

  return (
    <div className="space-y-4 flex-1">
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={index}
          exercise={exercise}
          index={index}
          userAnswers={userAnswers[index] || []}
          isSubmitted={isSubmitted}
          onAnswerChange={(blankIndex, value) =>
            onAnswerChange(index, blankIndex, value)
          }
          isCorrect={(blankIndex) => isCorrect(index, blankIndex) ?? false}
        />
      ))}
    </div>
  );
}
