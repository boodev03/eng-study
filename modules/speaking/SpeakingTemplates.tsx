"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  BookOpen,
  Briefcase,
  Globe,
  Heart,
  Home,
  Music,
  Plane,
  Users,
} from "lucide-react";

interface Template {
  id: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "daily-life",
    topic: "Daily Life",
    difficulty: "easy",
    description: "Practice speaking about your daily routine and activities",
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "hobbies",
    topic: "Hobbies",
    difficulty: "easy",
    description: "Talk about your favorite hobbies and interests",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "travel",
    topic: "Travel",
    difficulty: "medium",
    description: "Discuss travel experiences and destinations",
    icon: <Plane className="w-6 h-6" />,
  },
  {
    id: "work",
    topic: "Work",
    difficulty: "medium",
    description: "Practice speaking about work-related topics",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: "education",
    topic: "Education",
    difficulty: "medium",
    description: "Talk about education and learning experiences",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "technology",
    topic: "Technology",
    difficulty: "hard",
    description: "Discuss technology trends and innovations",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "environment",
    topic: "Environment",
    difficulty: "hard",
    description: "Talk about environmental issues and solutions",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "culture",
    topic: "Culture",
    difficulty: "hard",
    description: "Discuss cultural differences and traditions",
    icon: <Users className="w-6 h-6" />,
  },
];

interface SpeakingTemplatesProps {
  onSelectTemplate: (topic: string, difficulty: string) => void;
}

export default function SpeakingTemplates({
  onSelectTemplate,
}: SpeakingTemplatesProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | "all"
  >("all");

  const filteredTemplates = templates.filter(
    (template) =>
      selectedDifficulty === "all" || template.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={selectedDifficulty === "all" ? "default" : "outline"}
          onClick={() => setSelectedDifficulty("all")}
          className="rounded-full"
        >
          Tất cả
        </Button>
        <Button
          variant={selectedDifficulty === "easy" ? "default" : "outline"}
          onClick={() => setSelectedDifficulty("easy")}
          className="rounded-full bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
        >
          Dễ
        </Button>
        <Button
          variant={selectedDifficulty === "medium" ? "default" : "outline"}
          onClick={() => setSelectedDifficulty("medium")}
          className="rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
        >
          Trung bình
        </Button>
        <Button
          variant={selectedDifficulty === "hard" ? "default" : "outline"}
          onClick={() => setSelectedDifficulty("hard")}
          className="rounded-full bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
        >
          Khó
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-500"
            onClick={() =>
              onSelectTemplate(template.topic, template.difficulty)
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    {template.icon}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {template.topic}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    template.difficulty
                  )}`}
                >
                  {template.difficulty === "easy"
                    ? "Dễ"
                    : template.difficulty === "medium"
                    ? "Trung bình"
                    : "Khó"}
                </span>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                {template.description}
              </p>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Bắt đầu luyện tập →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
