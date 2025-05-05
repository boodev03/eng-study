"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface StatsBoardProps {
  totalEx: number;
  completedEx: number[];
}

export default function StatsBoard({ totalEx, completedEx }: StatsBoardProps) {
  const completedCount = completedEx.length;
  const progress = (completedCount / totalEx) * 100 || 0;

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium">Tiến độ</h3>
            <span className="text-lg font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Exercise Status */}
        <div className="space-y-3">
          <h3 className="text-base font-medium">Câu hỏi</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalEx }).map((_, index) => {
              const isCompleted = completedEx.includes(index);

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-2 rounded-md border ${
                    isCompleted ? "border-green-200" : "border-gray-200"
                  }`}
                >
                  <span className="text-sm font-medium mb-1">{index + 1}</span>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
