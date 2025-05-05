"use client";

import { useState } from "react";
import TopicInput from "./TopicInput";
import PracticeSentence from "./PracticeSentence";
import SpeakingTemplates from "./SpeakingTemplates";

export default function Speaking() {
  const [isStarted, setIsStarted] = useState(false);
  const [sentence, setSentence] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentDifficulty, setCurrentDifficulty] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);

  const handleStart = async (topic: string, difficulty: string) => {
    setIsLoading(true);
    setError("");
    setCurrentTopic(topic);
    setCurrentDifficulty(difficulty);
    setShowTopicInput(false);

    try {
      const response = await fetch("/api/generate-sentence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty,
          topic:
            topic !== "general" && topic !== "business" && topic !== "travel"
              ? topic
              : "",
          predefinedTopic: ["general", "business", "travel"].includes(topic)
            ? topic
            : "general",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate sentence");
      }

      const data = await response.json();
      setSentence(data.sentence);
      setPhonetics(data.phonetics);
      setIsStarted(true);
    } catch (err) {
      console.error("Error generating sentence:", err);
      setError("Failed to generate a practice sentence. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSentence = () => {
    handleStart(currentTopic, currentDifficulty);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Luyện tập phát âm tiếng Anh
      </h1>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Đang tạo câu luyện tập...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      {!isStarted && !isLoading && (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              onClick={() => setShowTopicInput(true)}
            >
              <span>+</span>
              Tạo chủ đề tuỳ chọn
            </button>
          </div>
          <SpeakingTemplates onSelectTemplate={handleStart} />
        </div>
      )}

      {/* Popup/modal cho nhập chủ đề tuỳ chọn */}
      {showTopicInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowTopicInput(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Tạo chủ đề tuỳ chọn
            </h2>
            <TopicInput onStart={handleStart} />
          </div>
        </div>
      )}

      {isStarted && !isLoading && (
        <PracticeSentence
          sentence={sentence}
          phonetics={phonetics}
          onNewSentence={handleNewSentence}
        />
      )}
    </div>
  );
}
