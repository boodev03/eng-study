"use client";

import { Button } from "@/components/ui/button";
import { parseExercises } from "@/helpers/multiple-choice";
import { useCompletion } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";
import StatsBoard from "../StatsBoard";
import ExerciseForm from "./ExerciseForm";
import ExerciseList from "./ExerciseList";

interface Exercise {
  sentence: string;
  options: string[][]; // Mỗi chỗ trống có một mảng options
  answers: string[]; // Đáp án cho từng chỗ trống
}

interface ParsedExercise {
  sentence: string;
  options: string[][];
  answers: string[];
}

export default function MultipleChoice() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/completion",
  });

  useEffect(() => {
    if (completion) {
      try {
        const parsedExercises = parseExercises(completion);
        setExercises(parsedExercises);
        setUserAnswers(
          parsedExercises.map((exercise: ParsedExercise) =>
            new Array(exercise.sentence.split("___").length - 1).fill("")
          )
        );
      } catch (error) {
        console.error("Error processing completion:", error);
      }
    }
  }, [completion]);

  const handleAnswerChange = (
    index: number,
    blankIndex: number,
    value: string
  ) => {
    const newAnswers = [...userAnswers];
    if (!newAnswers[index]) {
      newAnswers[index] = [];
    }
    newAnswers[index][blankIndex] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getScore = () => {
    if (!isSubmitted) return 0;
    return exercises.reduce((score, exercise, index) => {
      const isAllCorrect = exercise.answers.every((answer, blankIndex) => {
        const userAnswer = userAnswers[index]?.[blankIndex] || "";
        return answer.toLowerCase() === userAnswer.trim().toLowerCase();
      });
      return isAllCorrect ? score + 1 : score;
    }, 0);
  };

  const handleGenerate = async (formData: {
    topic: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    numberOfSentences: number;
  }) => {
    try {
      await complete("Create multiple choice exercises", {
        body: {
          ...formData,
          type: "multiple-choice",
        },
      });
    } catch (error) {
      console.error("Error generating exercises:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col min-h-[calc(100vh-4rem)]">
      <AnimatePresence>
        {exercises.length !== 0 || isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 h-full"
          >
            <div className="lg:col-span-1">
              <StatsBoard
                totalEx={exercises.length}
                completedEx={userAnswers
                  .map((answers, index) =>
                    answers.some((answer) => answer.trim()) ? index : -1
                  )
                  .filter((index) => index !== -1)}
              />
            </div>
            <div className="lg:col-span-3 flex-1 flex-col flex">
              {isLoading && exercises.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg text-gray-600">Đang tạo bài tập...</p>
                </div>
              ) : (
                <>
                  <ExerciseList
                    exercises={exercises}
                    userAnswers={userAnswers}
                    isSubmitted={isSubmitted}
                    onAnswerChange={handleAnswerChange}
                  />
                  <div className="flex justify-end mt-6">
                    {isSubmitted ? (
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-medium">
                          Điểm số:{" "}
                          <span className="text-blue-600">
                            {getScore()}/{exercises.length}
                          </span>
                        </div>
                        <Button onClick={() => setExercises([])}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Tạo bài mới
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          userAnswers.some((answers) =>
                            answers.some((answer) => !answer.trim())
                          ) || exercises.length === 0
                        }
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Nộp bài
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <ExerciseForm onSubmit={handleGenerate} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
