"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface TopicInputProps {
  onStart: (topic: string, difficulty: string) => void;
}

export default function TopicInput({ onStart }: TopicInputProps) {
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    const finalTopic = customTopic || selectedTopic;
    if (finalTopic && difficulty) {
      onStart(finalTopic, difficulty);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="custom-topic">Chủ đề tùy chọn</Label>
          <Input
            id="custom-topic"
            placeholder="Nhập chủ đề bạn muốn luyện tập..."
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hoặc chọn chủ đề có sẵn</Label>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
              disabled={!!customTopic}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Giao tiếp thông thường</SelectItem>
                <SelectItem value="business">Công việc & Kinh doanh</SelectItem>
                <SelectItem value="travel">Du lịch & Khám phá</SelectItem>
                <SelectItem value="education">Giáo dục & Học tập</SelectItem>
                <SelectItem value="technology">Công nghệ & Internet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Độ khó</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Dễ</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="hard">Khó</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleStart}
        disabled={(!customTopic && !selectedTopic) || !difficulty}
      >
        Bắt đầu luyện tập
      </Button>
    </div>
  );
}
