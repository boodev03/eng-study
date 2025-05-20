"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLessonDetailByCourseId } from "@/hooks/useLessionDetailByCourseId";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  XCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Star,
} from "lucide-react";
import { useParams } from "next/navigation";
import AddHomework from "./AddHomework";
import ViewHomework from "./ViewHomework";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const { lessonDetails, isLoading, isError } =
    useLessonDetailByCourseId(courseId);
  const [expandedLessons, setExpandedLessons] = useState<
    Record<string, boolean>
  >({});
  const [scores, setScores] = useState<Record<string, number>>({});

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleScoreChange = (submissionId: string, score: number) => {
    setScores((prev) => ({
      ...prev,
      [submissionId]: score,
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6 container mx-auto py-10">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-500">
          Error loading course details
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Schedule</h1>
      </div>

      <div className="gap-6">
        {lessonDetails.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl p-6 transition-all duration-300 border border-gray-300 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-medium">
                  {new Date(lesson.start_time).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span className="font-medium">
                  {new Date(lesson.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(lesson.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {lesson.lesson_assignments?.length > 0 && (
                <div className="flex items-center gap-3 text-gray-700 mb-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  <span className="font-medium">
                    {lesson.lesson_assignments.length} Assignment
                    {lesson.lesson_assignments.length > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <AddHomework lessonId={lesson.id} />
                  {lesson.lesson_assignments?.length > 0 && (
                    <ViewHomework lessonDetails={[lesson]} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {lesson.status === "completed" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <XCircle className="h-5 w-5" />
                      <span className="font-medium">Pending</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLesson(lesson.id)}
                  >
                    {expandedLessons[lesson.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedLessons[lesson.id] &&
                lesson.lesson_assignments?.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="mt-4 border rounded-lg p-4"
                  >
                    <h3 className="font-semibold mb-3">
                      {assignment.homework_name}
                    </h3>
                    <div className="space-y-3">
                      {assignment.lesson_submissions?.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>
                              {submission.students?.first_name}{" "}
                              {submission.students?.last_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
