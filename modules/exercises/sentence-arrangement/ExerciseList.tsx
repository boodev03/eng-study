"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface Exercise {
  scrambled: string[];
  correctSentence: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  userAnswers: string[][];
  isSubmitted: boolean;
  onAnswerChange: (index: number, value: string[]) => void;
}

export default function ExerciseList({
  exercises,
  userAnswers,
  isSubmitted,
  onAnswerChange,
}: ExerciseListProps) {
  const isCorrect = (index: number) => {
    if (!isSubmitted) return null;
    const userAnswer = userAnswers[index]?.join(" ") || "";
    return (
      exercises[index].correctSentence.toLowerCase() ===
      userAnswer.toLowerCase()
    );
  };

  const handleDragEnd = (result: any, index: number) => {
    if (!result.destination) return;

    const items = Array.from(userAnswers[index] || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onAnswerChange(index, items);
  };

  const handleWordClick = (index: number, word: string) => {
    const currentAnswer = userAnswers[index] || [];
    const newAnswer = [...currentAnswer, word];
    onAnswerChange(index, newAnswer);
  };

  const handleWordRemove = (index: number, wordIndex: number) => {
    const currentAnswer = userAnswers[index] || [];
    const newAnswer = currentAnswer.filter((_, i) => i !== wordIndex);
    onAnswerChange(index, newAnswer);
  };

  return (
    <div className="space-y-6 flex-1">
      {exercises.map((exercise, index) => {
        const currentAnswer = userAnswers[index] || [];
        const availableWords = exercise.scrambled.filter(
          (word) => !currentAnswer.includes(word)
        );

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`p-4 rounded-lg border ${
                isSubmitted
                  ? isCorrect(index)
                    ? "border-green-200 bg-green-50/50"
                    : "border-red-200 bg-red-50/50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-600 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-medium border border-blue-100 bg-blue-50">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    {/* Available Words Section */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500 font-medium">
                        Từ có sẵn:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {availableWords.map((word, wordIndex) => (
                          <button
                            key={wordIndex}
                            onClick={() => handleWordClick(index, word)}
                            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-colors flex items-center gap-1 group"
                          >
                            {word}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Answer Section */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500 font-medium">
                        Sắp xếp câu:
                      </div>
                      <DragDropContext
                        onDragEnd={(result) => handleDragEnd(result, index)}
                      >
                        <Droppable
                          droppableId={`answer-${index}`}
                          direction="horizontal"
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="flex flex-wrap gap-2 min-h-[44px] bg-gray-50 p-3 rounded-md border border-dashed border-gray-300"
                            >
                              {currentAnswer.length === 0 && (
                                <div className="text-sm text-gray-400 italic">
                                  Kéo thả từ vào đây để sắp xếp câu
                                </div>
                              )}
                              {currentAnswer.map((word, wordIndex) => (
                                <Draggable
                                  key={wordIndex}
                                  draggableId={`word-${index}-${wordIndex}`}
                                  index={wordIndex}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="px-3 py-1.5 rounded-md bg-white shadow-sm text-gray-800 text-sm font-medium cursor-move flex items-center gap-1 group"
                                    >
                                      {word}
                                      <button
                                        onClick={() =>
                                          handleWordRemove(index, wordIndex)
                                        }
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <ArrowLeft className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>

                    {/* Feedback Section */}
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-sm ${
                          isCorrect(index) ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCorrect(index) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          <span>
                            {isCorrect(index)
                              ? "Chính xác!"
                              : `Đáp án đúng: ${exercise.correctSentence}`}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
