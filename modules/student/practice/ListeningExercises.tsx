"use client";

import Congratulations from "@/components/Congratulations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useListeningExercises } from "@/hooks/useListeningExercises";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ExercisesLoading from "./ExercisesLoading";

export default function ListeningExercises() {
  const { id } = useParams();
  const { exercises, isLoading, isError } = useListeningExercises({
    categoryId: id as string,
  });
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const [checkResult, setCheckResult] = useState<null | {
    wordResults: Array<{
      word: string;
      userWord: string | null;
      status: "correct" | "incorrect" | "masked";
    }>;
    isComplete: boolean;
  }>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;

  const handleNext = () => {
    if (currentExerciseIndex < totalExercises - 1 && checkResult?.isComplete) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput("");
      setCheckResult(null);
    } else if (
      currentExerciseIndex === totalExercises - 1 &&
      checkResult?.isComplete
    ) {
      // All exercises completed
      setAllExercisesCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setUserInput("");
      setCheckResult(null);
    }
  };

  // Function to clean text by removing punctuation
  const cleanText = (text: string) => {
    return text.replace(/[.,!?;:'"()\-—–]/g, "").toLowerCase();
  };

  const handleCheck = () => {
    if (!currentExercise) return;

    // Store the original transcript words for display
    const originalTranscriptWords = currentExercise.transcript
      .trim()
      .split(/\s+/);

    // Clean and process the transcript and user input
    const cleanedTranscript = cleanText(currentExercise.transcript);
    const cleanedUserInput = cleanText(userInput);

    const transcriptWords = originalTranscriptWords.map((word) => ({
      original: word,
      cleaned: cleanText(word),
    }));

    const userWords = cleanedUserInput
      .trim()
      .split(/\s+/)
      .filter((w) => w);

    const wordResults = transcriptWords.map((wordObj, index) => {
      // If user hasn't entered this word yet, mask it
      if (index >= userWords.length) {
        return {
          word: wordObj.original, // Keep original with punctuation
          userWord: null,
          status: "masked" as const,
        };
      }

      // Check if the user's word matches the transcript word (ignoring punctuation)
      const isCorrect = userWords[index] === wordObj.cleaned;

      return {
        word: wordObj.original, // Keep original with punctuation
        userWord: userWords[index],
        status: isCorrect ? ("correct" as const) : ("incorrect" as const),
      };
    });

    // Check if all words that the user has entered are correct
    const enteredWordCount = Math.min(userWords.length, wordResults.length);
    const enteredWordResults = wordResults.slice(0, enteredWordCount);
    const allEnteredWordsCorrect = enteredWordResults.every(
      (result) => result.status === "correct"
    );

    // Check if the answer is complete (all words correct)
    const isComplete =
      allEnteredWordsCorrect && userWords.length === transcriptWords.length;

    setCheckResult({
      wordResults,
      isComplete,
    });
  };

  // Reset audio when exercise changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [currentExerciseIndex]);

  if (isLoading) {
    return <ExercisesLoading />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading exercises. Please try again later.
      </div>
    );
  }

  if (!exercises.length) {
    return <div>No exercises found for this category.</div>;
  }

  // Show congratulations screen when all exercises are completed
  if (allExercisesCompleted) {
    return (
      <Congratulations
        title="Great job!"
        message={`You have successfully completed all ${totalExercises} listening exercises.`}
        backUrl="/exercises/listening"
      />
    );
  }

  const canProceed = checkResult?.isComplete;

  return (
    <div className="container mx-auto py-8 mt-20">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Listening Exercise</span>
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentExerciseIndex === 0}
                className="h-8 w-8 text-foreground/70 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="font-medium text-foreground/70">
                {currentExerciseIndex + 1}/{totalExercises}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                disabled={
                  currentExerciseIndex === totalExercises - 1 || !canProceed
                }
                className="h-8 w-8 text-foreground/70 hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentExercise && (
            <>
              <div className="rounded-lg flex items-center justify-center">
                <audio
                  ref={audioRef}
                  src={currentExercise.audio_url}
                  controls
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transcription" className="text-sm font-medium">
                  Write what you hear:
                </Label>
                <Textarea
                  id="transcription"
                  placeholder="Type the text you hear..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevent newline
                      handleCheck();
                    }
                  }}
                  rows={4}
                  className="resize-none shadow-sm"
                />
                <Button onClick={handleCheck} className="w-full">
                  Check Answer
                </Button>
              </div>

              {checkResult && (
                <div className="p-6 rounded-lg bg-accent/20 border border-accent/30 shadow-sm">
                  <div className="w-full">
                    <p className="font-medium mb-4 text-foreground">Result:</p>
                    <div className="font-mono text-lg mb-12">
                      {checkResult.wordResults.map((result, index) => {
                        if (result.status === "masked" && !showFullAnswer) {
                          // Create asterisks matching the length of the masked word
                          const asterisks = "*".repeat(result.word.length);
                          return (
                            <span
                              key={`word-${index}`}
                              className="text-muted-foreground inline-block mr-2"
                            >
                              {asterisks}
                            </span>
                          );
                        } else if (result.status === "correct") {
                          return (
                            <span
                              key={`word-${index}`}
                              className="text-green-600 font-medium inline-block mr-2"
                            >
                              {result.word}
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={`word-${index}`}
                              className="text-destructive font-medium inline-block mr-2"
                            >
                              {result.word}
                            </span>
                          );
                        }
                      })}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="showFullAnswer"
                          checked={showFullAnswer}
                          onCheckedChange={(checked) =>
                            setShowFullAnswer(checked === true)
                          }
                        />
                        <label
                          htmlFor="showFullAnswer"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Show Full Answer
                        </label>
                      </div>

                      {checkResult.isComplete &&
                        currentExerciseIndex < totalExercises - 1 && (
                          <Button
                            onClick={handleNext}
                            variant="default"
                            className="ml-auto animate-pulse"
                          >
                            Next Exercise{" "}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}

                      {checkResult.isComplete &&
                        currentExerciseIndex === totalExercises - 1 && (
                          <Button
                            onClick={() => setAllExercisesCompleted(true)}
                            variant="default"
                            className="ml-auto animate-pulse"
                          >
                            Complete <Sparkles className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                    </div>

                    <p className="text-sm text-foreground/80">
                      {checkResult.isComplete
                        ? currentExerciseIndex < totalExercises - 1
                          ? "Great job! The answer is correct. Click 'Next Exercise' to continue."
                          : "Perfect! You've completed all exercises. Click 'Complete' to finish."
                        : "Continue completing the exercise."}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
