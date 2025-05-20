"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseReadingExercise, ReadingExercise } from "@/helpers/parse-reading";
import StatsBoard from "@/modules/exercises/StatsBoard";
import { useCompletion } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";

export default function Reading() {
  const [topic, setTopic] = useState<string>("general");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [exercise, setExercise] = useState<Partial<ReadingExercise> | null>(
    null
  );
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    complete,
    completion,
    isLoading: isCompletionLoading,
  } = useCompletion();

  const handleGenerate = async () => {
    setIsLoading(true);
    setIsSubmitted(false);
    setUserAnswers([]);

    try {
      const result = await complete(
        "Create a reading comprehension exercise with the following topic, difficulty, and number of questions: ",
        {
          body: {
            topic,
            difficulty,
            numberOfQuestions,
            type: "reading",
          },
        }
      );

      if (result) {
        try {
          const parsedExercise = parseReadingExercise(result);
          setExercise(parsedExercise);
          setUserAnswers(
            new Array(parsedExercise.questions?.length || 0).fill(-1)
          );
        } catch (parseError) {
          console.error("Error parsing exercise:", parseError);
          setExercise(null);
        }
      }
    } catch (error) {
      console.error("Error generating exercise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getScore = () => {
    if (!isSubmitted || !exercise) return 0;
    return (
      exercise.questions?.reduce((score, question, index) => {
        return userAnswers[index] === question.correctAnswerIndex
          ? score + 1
          : score;
      }, 0) || 0
    );
  };

  useEffect(() => {
    if (completion) {
      try {
        const parsedExercise = parseReadingExercise(completion);
        setExercise(parsedExercise);
        setUserAnswers(
          new Array(parsedExercise.questions?.length || 0).fill(-1)
        );
      } catch (error) {
        console.error("Error processing completion:", error);
        setExercise(null);
      }
    }
  }, [completion]);

  return (
    <div className="container mx-auto py-8 flex flex-col min-h-[calc(100vh-4rem)]">
      <AnimatePresence>
        {exercise || isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 h-full"
          >
            <div className="lg:col-span-1">
              <StatsBoard
                totalEx={exercise?.questions?.length || 0}
                completedEx={userAnswers.filter((answer) => answer !== -1)}
              />
            </div>
            <div className="lg:col-span-3 flex-1 flex-col flex">
              {exercise && (
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Reading Passage
                  </h2>
                  <p className="whitespace-pre-wrap">{exercise.passage}</p>
                </Card>
              )}

              {exercise?.questions?.map((question, index) => (
                <Card key={question.id} className="p-6 mb-4">
                  <h3 className="font-medium mb-4">
                    Question {index + 1}: {question.text}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          userAnswers[index] === optionIndex
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        } ${
                          isSubmitted
                            ? optionIndex === question.correctAnswerIndex
                              ? "border-green-500 bg-green-50"
                              : userAnswers[index] === optionIndex
                              ? "border-red-500 bg-red-50"
                              : ""
                            : ""
                        }`}
                        onClick={() => handleAnswerChange(index, optionIndex)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  {isSubmitted &&
                    userAnswers[index] !== question.correctAnswerIndex && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        {question.explanation}
                      </p>
                    )}
                </Card>
              ))}

              <div className="flex justify-end mt-6">
                {isSubmitted ? (
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-medium">
                      Score:{" "}
                      <span className="text-blue-600">
                        {getScore()}/{exercise?.questions?.length}
                      </span>
                    </div>
                    <Button onClick={handleGenerate}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate New Exercise
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !exercise || userAnswers.some((answer) => answer === -1)
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit
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
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="topic" className="mb-2 block">
                    Topic
                  </Label>
                  <Input
                    id="topic"
                    placeholder="Enter topic (in English)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="difficulty" className="mb-2 block">
                    Difficulty
                  </Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="numberOfQuestions" className="mb-2 block">
                    Number of Questions
                  </Label>
                  <Select
                    value={numberOfQuestions.toString()}
                    onValueChange={(value) =>
                      setNumberOfQuestions(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Number of questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 questions</SelectItem>
                      <SelectItem value="5">5 questions</SelectItem>
                      <SelectItem value="6">6 questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full"
                disabled={isLoading || isCompletionLoading}
              >
                {isLoading || isCompletionLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating exercise...
                  </>
                ) : (
                  <>Generate Exercise</>
                )}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
