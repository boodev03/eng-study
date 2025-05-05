"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Info,
  Mic,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Volume2,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WordResult {
  word: string;
  user_ipa: string;
  standard_ipa: string;
  status: "correct" | "incorrect";
  feedback: string;
}

interface AnalysisResult {
  wordResults: WordResult[];
}

interface PracticeSentenceProps {
  sentence: string;
  phonetics: string;
  onNewSentence: () => void;
}

export default function PracticeSentence({
  sentence,
  phonetics,
  onNewSentence,
}: PracticeSentenceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // Khởi tạo audio context và media recorder
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioBlob(audioBlob);
          audioChunksRef.current = [];

          // Reset audio element when new recording is made
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }

          // Revoke previous URL to prevent memory leaks
          if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
          }
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeAudio();

    // Cleanup function
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  // Xử lý bắt đầu/dừng ghi âm
  const toggleRecording = () => {
    if (!mediaRecorderRef.current) return;

    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioBlob(null);
      setAnalysisResult(null);
      setIsPlaying(false);
    }
  };

  // Xử lý phát âm thanh đã ghi
  const playAudio = () => {
    if (!audioBlob) return;

    if (!audioRef.current) {
      // Create a new audio URL for each new recording
      audioUrlRef.current = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrlRef.current);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Xử lý phát âm chuẩn
  const playStandardAudio = async () => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // Phân tích phát âm
  const analyzeAudio = async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("sentence", sentence);
      formData.append("phonetics", phonetics);

      const response = await fetch("/api/analyze-pronunciation", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze pronunciation");
      }

      const wordResults = (await response.json()) as WordResult[];

      setAnalysisResult({
        wordResults,
      });
    } catch (error) {
      console.error("Error analyzing pronunciation:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Hiển thị câu và phiên âm */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Câu để luyện tập</h3>
            <Button variant="ghost" size="icon" onClick={playStandardAudio}>
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-lg">{sentence}</p>
          <div className="space-y-2">
            <div className="font-mono text-gray-600">{phonetics}</div>
            {analysisResult && (
              <div className="font-mono text-gray-600">
                /
                {analysisResult.wordResults.map((result, index) => (
                  <span
                    key={index}
                    className={
                      result.status === "correct"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {result?.user_ipa?.replaceAll("/", "")}{" "}
                  </span>
                ))}
                /
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Điều khiển ghi âm */}
      <div className="flex justify-center gap-4">
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={toggleRecording}
          className="w-32"
        >
          {isRecording ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Dừng
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" /> Ghi âm
            </>
          )}
        </Button>

        {audioBlob && (
          <>
            <Button onClick={playAudio} variant="outline" className="w-32">
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Dừng
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Phát
                </>
              )}
            </Button>

            <Button
              onClick={analyzeAudio}
              variant="outline"
              className="min-w-32"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Đang phân
                  tích
                </>
              ) : (
                <>
                  <Info className="mr-2 h-4 w-4" /> Phân tích
                </>
              )}
            </Button>

            <Button onClick={onNewSentence} variant="outline" className="w-32">
              <RotateCcw className="mr-2 h-4 w-4" /> Câu mới
            </Button>
          </>
        )}
      </div>

      {/* Hiển thị kết quả phân tích */}
      {analysisResult?.wordResults &&
        analysisResult?.wordResults.length > 0 && (
          <Card className="p-6">
            <div className="space-y-6">
              {/* Phản hồi cho các từ sai */}
              {analysisResult.wordResults.some(
                (word) => word.status === "incorrect"
              ) && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Phản hồi</h4>
                  <div className="grid gap-3">
                    {analysisResult.wordResults
                      .filter((word) => word.status === "incorrect")
                      .map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3"
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                          <div className="space-y-1">
                            <div className="font-medium">{result.word}</div>
                            <div className="text-sm text-gray-600">
                              <span>Phát âm của bạn: {result?.user_ipa}</span>
                              <span className="mx-2">•</span>
                              <span>Phát âm chuẩn: {result.standard_ipa}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {result.feedback}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
    </div>
  );
}
