"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLessonDetailByCourseId } from "@/hooks/useLessionDetailByCourseId";
import { useLessonSubmissionByStudentId } from "@/hooks/useLessonSubmission";
import { useUser } from "@/hooks/useUser";
import ViewHomework from "@/modules/teacher/courses/ViewHomework";
import SubmissionHistory from "./SubmissionHistory";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  History,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddSubmitAssignment from "./AddSubmitAssignment";

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const { user } = useUser();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { lessonDetails, isLoading, isError } =
    useLessonDetailByCourseId(courseId);

  const {
    submission,
    isLoading: isSubmissionLoading,
    isError: isSubmissionError,
  } = useLessonSubmissionByStudentId(
    lessonDetails[0]?.lesson_assignments[0]?.id,
    user?.email as string
  );

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

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Schedule</h1>
      </div>

      <div className="gap-6 space-y-6">
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
                    {submission && ` (${submission.length} submissions)`}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                {lesson.lesson_assignments.length > 0 && (
                  <>
                    <AddSubmitAssignment
                      lessonAssignmentId={lesson.lesson_assignments[0].id}
                      studentEmail={user?.email as string}
                    />
                    <ViewHomework lessonDetails={[lesson]} />
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={() =>
                        setSelectedLessonId(lesson.lesson_assignments[0].id)
                      }
                    >
                      <History className="h-4 w-4" />
                      View History
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 ml-2">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubmissionHistory
        isOpen={!!selectedLessonId}
        onClose={() => setSelectedLessonId(null)}
        lessonAssignmentId={selectedLessonId || ""}
      />
    </div>
  );
}
