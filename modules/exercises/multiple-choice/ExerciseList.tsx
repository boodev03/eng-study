"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface Exercise {
  sentence: string;
  options: string[][]; // Mỗi chỗ trống có một mảng options
  answers: string[]; // Đáp án cho từng chỗ trống
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

  return (
    <div className="space-y-4 flex-1">
      {exercises.map((exercise, index) => {
        const sentenceParts = exercise.sentence.split("___");

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
                          <div key={partIndex} className="flex items-baseline">
                            <span className="text-gray-800">{part}</span>
                            {partIndex < sentenceParts.length - 1 && (
                              <div className="relative mx-1">
                                <Select
                                  value={userAnswers[index]?.[partIndex] || ""}
                                  onValueChange={(value) =>
                                    onAnswerChange(index, partIndex, value)
                                  }
                                  disabled={isSubmitted}
                                >
                                  <SelectTrigger
                                    className={`w-32 !h-7 ${
                                      isSubmitted
                                        ? isCorrect(index, partIndex)
                                          ? "border-green-300 bg-green-50 text-green-700"
                                          : "border-red-300 bg-red-50 text-red-700"
                                        : userAnswers[index]?.[partIndex]
                                        ? "border-blue-300 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-gray-50 text-gray-700"
                                    }`}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {exercise.options[partIndex]?.length > 0 ? (
                                      exercise.options[partIndex]?.map(
                                        (option, optionIndex) =>
                                          option && (
                                            <SelectItem
                                              key={optionIndex}
                                              value={option}
                                            >
                                              {option}
                                            </SelectItem>
                                          )
                                      )
                                    ) : (
                                      <div className="text-gray-500 px-2 py-1.5 text-sm">
                                        Loading options...
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-800">{exercise.sentence}</span>
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
  );
}
