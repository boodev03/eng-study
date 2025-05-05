"use client";

import { Button } from "@/components/ui/button";
import { useCompletion } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";
import StatsBoard from "../StatsBoard";
import { parseExercises } from "@/helpers/sentence-arrangement";
import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";

interface Exercise {
  scrambled: string[];
  correctSentence: string;
}

export default function SentenceArrangement() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      scrambled: ["to", "the", "park", "I", "go", "every", "morning"],
      correctSentence: "I go to the park every morning",
    },
    {
      scrambled: ["English", "studying", "enjoy", "I"],
      correctSentence: "I enjoy studying English",
    },
    {
      scrambled: ["dinner", "we", "at", "eat", "seven", "usually"],
      correctSentence: "we usually eat dinner at seven",
    },
    {
      scrambled: ["yesterday", "to", "the", "movies", "went", "they"],
      correctSentence: "they went to the movies yesterday",
    },
    {
      scrambled: ["reading", "books", "loves", "she", "interesting"],
      correctSentence: "she loves reading interesting books",
    },
  ]);
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
        setUserAnswers(parsedExercises.map(() => []));
      } catch (error) {
        console.error("Error processing completion:", error);
      }
    }
  }, [completion]);

  const handleAnswerChange = (index: number, value: string[]) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getScore = () => {
    if (!isSubmitted) return 0;
    return exercises.reduce((score, exercise, index) => {
      const userAnswer = userAnswers[index]?.join(" ") || "";
      return exercise.correctSentence.toLowerCase() === userAnswer.toLowerCase()
        ? score + 1
        : score;
    }, 0);
  };

  const handleGenerate = async (formData: {
    topic: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    numberOfSentences: number;
  }) => {
    try {
      await complete("Create sentence arrangement exercises", {
        body: {
          ...formData,
          type: "sentence-reordering",
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
                  .map((answers, index) => (answers.length > 0 ? index : -1))
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
                          userAnswers.some((answers) => answers.length === 0) ||
                          exercises.length === 0
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
