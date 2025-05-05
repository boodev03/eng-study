"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

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
    const userAnswer = userAnswers[index]?.[blankIndex] || "";
    return (
      exercises[index].answers[blankIndex].toLowerCase() ===
      userAnswer.trim().toLowerCase()
    );
  };

  // Get all unique answers and shuffle them
  const allAnswers = useMemo(() => {
    const answers = exercises.flatMap((exercise) => exercise.answers);
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
        {exercises.map((exercise, index) => {
          const sentenceParts = exercise.sentence.split("___");
          const blanksCount = sentenceParts.length - 1;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`p-3 rounded-lg border ${
                  isSubmitted
                    ? userAnswers[index]?.every((answer, blankIndex) =>
                        isCorrect(index, blankIndex)
                      )
                      ? "border-green-200 bg-green-50/50"
                      : "border-red-200 bg-red-50/50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium border border-blue-100 bg-blue-50">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      {sentenceParts.length > 1 ? (
                        <div className="flex items-center flex-wrap gap-1">
                          {sentenceParts.map((part, partIndex) => (
                            <div
                              key={partIndex}
                              className="flex items-baseline"
                            >
                              <span className="text-gray-800">{part}</span>
                              {partIndex < sentenceParts.length - 1 && (
                                <div className="relative mx-1">
                                  <Input
                                    type="text"
                                    value={
                                      userAnswers[index]?.[partIndex] || ""
                                    }
                                    onChange={(e) =>
                                      onAnswerChange(
                                        index,
                                        partIndex,
                                        e.target.value
                                      )
                                    }
                                    disabled={isSubmitted}
                                    className={`h-7 w-28 px-2 border focus-visible:ring-1 ${
                                      isSubmitted
                                        ? isCorrect(index, partIndex)
                                          ? "border-green-300 bg-green-50 text-green-700"
                                          : "border-red-300 bg-red-50 text-red-700"
                                        : userAnswers[index]?.[partIndex]
                                        ? "border-blue-300 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-gray-50 text-gray-700"
                                    }`}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-800">
                          {exercise.sentence}
                        </span>
                      )}

                      {isSubmitted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="ml-1"
                        >
                          {userAnswers[index]?.every((answer, blankIndex) =>
                            isCorrect(index, blankIndex)
                          ) ? (
                            <CheckCircle className="text-green-600 h-4 w-4" />
                          ) : (
                            <XCircle className="text-red-600 h-4 w-4" />
                          )}
                        </motion.div>
                      )}
                    </div>

                    {isSubmitted &&
                      !userAnswers[index]?.every((answer, blankIndex) =>
                        isCorrect(index, blankIndex)
                      ) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm text-red-600 mt-2"
                        >
                          Đáp án đúng:{" "}
                          <span className="font-medium">
                            {exercise.answers
                              .map((answer, i) => `[${answer}]`)
                              .join(" ")}
                          </span>
                        </motion.div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
