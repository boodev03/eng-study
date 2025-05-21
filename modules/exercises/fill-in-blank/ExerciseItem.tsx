import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCompletion } from "@ai-sdk/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import parse from "html-react-parser";

interface Exercise {
  sentence: string;
  answers: string[];
}

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  userAnswers: string[];
  isSubmitted: boolean;
  onAnswerChange: (blankIndex: number, value: string) => void;
  isCorrect: (blankIndex: number) => boolean;
}

export default function ExerciseItem({
  exercise,
  index,
  userAnswers = [], // Add default empty array
  isSubmitted,
  onAnswerChange,
  isCorrect,
}: ExerciseItemProps) {
  const sentenceParts = exercise.sentence.split("___");
  const explainHook = useCompletion();
  const [selectedLanguage, setSelectedLanguage] =
    useState<"English">("English");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLanguageSelect = (language: "English") => {
    setSelectedLanguage(language);
  };

  const handleExplain = async () => {
    setIsDialogOpen(false);
    await explainHook.complete(
      "Explain the following sentence: " + exercise.sentence,
      {
        body: {
          type: "explain",
          question: exercise.sentence,
          correctAnswers: exercise.answers || [],
          userAnswer: userAnswers?.join(" ") || "",
          explanationLanguage: selectedLanguage,
        },
      }
    );
  };

  // Add null check for userAnswers
  const isAllCorrect =
    userAnswers?.every((answer, blankIndex) => isCorrect(blankIndex)) ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div
        className={`p-3 rounded-lg border ${
          isSubmitted
            ? isAllCorrect
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
            <div className="flex gap-1">
              {sentenceParts.length > 1 ? (
                <div className="flex items-center flex-wrap gap-1">
                  {sentenceParts.map((part, partIndex) => (
                    <div key={partIndex} className="flex items-baseline">
                      <span className="text-gray-800">{part}</span>
                      {partIndex < sentenceParts.length - 1 && (
                        <div className="relative mx-1">
                          <Input
                            type="text"
                            value={userAnswers?.[partIndex] || ""}
                            onChange={(e) =>
                              onAnswerChange(partIndex, e.target.value)
                            }
                            disabled={isSubmitted}
                            className={`h-7 w-28 px-2 border focus-visible:ring-1 ${
                              isSubmitted
                                ? isCorrect(partIndex)
                                  ? "border-green-300 bg-green-50 text-green-700"
                                  : "border-red-300 bg-red-50 text-red-700"
                                : userAnswers?.[partIndex]
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
                <span className="text-gray-800">{exercise.sentence}</span>
              )}

              {isSubmitted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="ml-1"
                >
                  {isAllCorrect ? (
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  ) : (
                    <XCircle className="text-red-600 h-4 w-4" />
                  )}
                </motion.div>
              )}
            </div>

            {isSubmitted && !isAllCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-red-600 mt-2"
              >
                Correct answer:{" "}
                <span className="font-medium">
                  {exercise.answers.map((answer) => `[${answer}]`).join(" ")}
                </span>
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2"
              >
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Explain
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select explanation language</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Select
                        value={selectedLanguage}
                        onValueChange={handleLanguageSelect}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleExplain}>Okay</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}

            {explainHook.isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
              >
                Processing...
              </motion.div>
            )}

            {explainHook.completion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
              >
                {parse(explainHook.completion)}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
