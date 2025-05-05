"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ExerciseFormProps {
  onSubmit: (data: {
    topic: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    numberOfSentences: number;
  }) => void;
  isLoading: boolean;
}

const difficultyOptions = {
  beginner: {
    title: "Sơ cấp",
    level: "A1-A2",
    description:
      "Câu đơn giản với từ vựng cơ bản. Phù hợp cho người học trình độ A1-A2.",
  },
  intermediate: {
    title: "Trung cấp",
    level: "B1-B2",
    description:
      "Câu có độ phức tạp vừa phải với các cách diễn đạt thông dụng. Phù hợp cho người học trình độ B1-B2.",
  },
  advanced: {
    title: "Cao cấp",
    level: "C1-C2",
    description:
      "Câu phức tạp với từ vựng tinh tế. Phù hợp cho người học trình độ C1-C2.",
  },
};

const exerciseCounts = {
  5: {
    title: "5 bài",
    description: "Luyện tập nhanh",
  },
  10: {
    title: "10 bài",
    description: "Luyện tập tiêu chuẩn",
  },
  20: {
    title: "20 bài",
    description: "Luyện tập toàn diện",
  },
};

export default function ExerciseForm({
  onSubmit,
  isLoading,
}: ExerciseFormProps) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [numberOfSentences, setNumberOfSentences] = useState<5 | 10 | 20>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      topic,
      difficulty,
      numberOfSentences,
    });
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-3xl h-fit">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Tạo Bài Tập Trắc Nghiệm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Chủ đề</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Nhập chủ đề (ví dụ: thói quen hàng ngày, du lịch, ẩm thực)"
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Độ khó</Label>
              <RadioGroup
                value={difficulty}
                onValueChange={(
                  value: "beginner" | "intermediate" | "advanced"
                ) => setDifficulty(value)}
                className="grid grid-cols-3 gap-2"
              >
                {Object.entries(difficultyOptions).map(
                  ([key, { title, level, description }]) => (
                    <div key={key} className="h-full">
                      <RadioGroupItem
                        value={key}
                        id={`d${key}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`d${key}`}
                        className="flex flex-col h-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-semibold">{title}</span>
                          <span className="text-sm text-muted-foreground">
                            ({level})
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground text-center mt-2 flex-grow">
                          {description}
                        </span>
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Số lượng bài tập</Label>
              <RadioGroup
                value={numberOfSentences.toString()}
                onValueChange={(value) =>
                  setNumberOfSentences(parseInt(value) as 5 | 10 | 20)
                }
                className="grid grid-cols-3 gap-2"
              >
                {Object.entries(exerciseCounts).map(
                  ([count, { title, description }]) => (
                    <div key={count}>
                      <RadioGroupItem
                        value={count}
                        id={`c${count}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`c${count}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-lg font-semibold">{title}</span>
                        <span className="text-sm text-muted-foreground">
                          {description}
                        </span>
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full h-10" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tạo bài tập...
                </>
              ) : (
                "Tạo bài tập"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
