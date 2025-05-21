"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompletion } from "@ai-sdk/react";
import { RefreshCw, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { parseExercises } from "@/helpers/fill-in-blank";
import ExerciseList from "./ExerciseList";
import StatsBoard from "../StatsBoard";
import ExerciseForm from "./ExerciseForm";

interface Exercise {
  sentence: string;
  answers: string[]; // Mỗi string tương ứng với một chỗ trống theo thứ tự
}

export default function FillInBlank() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    complete,
    completion,
    isLoading: isCompletionLoading,
  } = useCompletion();

  const handleGenerate = async (data: {
    topic: string;
    difficulty: "easy" | "medium" | "hard";
    numberOfSentences: number;
  }) => {
    setIsLoading(true);
    setIsSubmitted(false);
    setUserAnswers([]);

    try {
      const result = await complete(
        "Create a fill in the blank exercise with the following topic, difficulty, and number of sentences: ",
        {
          body: data,
        }
      );

      if (result) {
        const parsedExercises = parseExercises(result);
        setExercises(parsedExercises);
        setUserAnswers(
          parsedExercises.map((exercise) =>
            new Array(exercise.sentence.split("___").length - 1).fill("")
          )
        );
      }
    } catch (error) {
      console.error("Error generating exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (
    index: number,
    blankIndex: number,
    value: string
  ) => {
    const newAnswers = [...(userAnswers || [])];
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
    if (!isSubmitted || !userAnswers) return 0;
    return exercises.reduce((score, exercise, index) => {
      const isAllCorrect = exercise.answers.every((answer, blankIndex) => {
        const userAnswer = userAnswers[index]?.[blankIndex] || "";
        return answer.toLowerCase() === userAnswer.trim().toLowerCase();
      });
      return isAllCorrect ? score + 1 : score;
    }, 0);
  };

  useEffect(() => {
    if (completion) {
      try {
        const parsedExercises = parseExercises(completion);
        setExercises(parsedExercises);
        setUserAnswers(
          parsedExercises.map((exercise) =>
            new Array(exercise.sentence.split("___").length - 1).fill("")
          )
        );
      } catch (error) {
        console.error("Error processing completion:", error);
      }
    }
  }, [completion]);

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
                completedEx={(userAnswers || [])
                  .map((answers, index) =>
                    answers?.some((answer) => answer?.trim()) ? index : -1
                  )
                  .filter((index) => index !== -1)}
              />
            </div>
            <div className="lg:col-span-3 flex-1 flex-col flex">
              <ExerciseList
                exercises={exercises}
                userAnswers={userAnswers || []}
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
                    <Button
                      onClick={() =>
                        handleGenerate({
                          topic: "general",
                          difficulty: "medium",
                          numberOfSentences: 20,
                        })
                      }
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Tạo bài mới
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !userAnswers?.length ||
                      userAnswers.some(
                        (answers) => !answers?.some((answer) => answer?.trim())
                      ) ||
                      exercises.length === 0
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Nộp bài
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <ExerciseForm
              onSubmit={handleGenerate}
              isLoading={isLoading || isCompletionLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
