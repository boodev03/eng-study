"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LessonDetail } from "@/utils/supabase/dto/lesson_detail.dto";
import { Calendar, Eye, FileText, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewHomeworkProps {
  lessonDetails: LessonDetail[];
}

export default function ViewHomework({ lessonDetails }: ViewHomeworkProps) {
  const getDueDateStatus = (dueTime: string | null) => {
    if (!dueTime) return { status: "No due date", color: "gray" };
    const now = new Date();
    const due = new Date(dueTime);
    if (now > due) return { status: "Overdue", color: "red" };
    if (now < due) return { status: "Upcoming", color: "green" };
    return { status: "Due today", color: "yellow" };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 flex items-center gap-2">
          <Eye className="h-4 w-4" />
          View Homework
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Homework Details
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="pr-4">
          <div className="flex flex-col gap-6">
            {lessonDetails.map((lesson) =>
              lesson.lesson_assignments?.length ? (
                lesson.lesson_assignments.map((assignment) => {
                  const dueStatus = getDueDateStatus(
                    assignment.due_time?.toString() || null
                  );
                  return (
                    <div
                      key={assignment.id}
                      className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900 text-xl">
                              {assignment.homework_name || "Untitled Homework"}
                            </span>
                          </div>
                          <Badge variant={dueStatus.color as any}>
                            {dueStatus.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">
                              <span className="font-medium">Due:</span>{" "}
                              {assignment.due_time
                                ? new Date(
                                    assignment.due_time
                                  ).toLocaleDateString()
                                : "No due date"}
                            </span>
                          </div>
                          {assignment.due_time && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">
                                {new Date(
                                  assignment.due_time
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        {JSON.parse(assignment.files)?.urls.length > 0 ? (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-3">
                              <Eye className="h-5 w-5 text-green-500" />
                              <span className="font-medium text-gray-700">
                                Attached Files
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {JSON.parse(assignment.files)?.urls.map(
                                (fileUrl: string, idx: number) => (
                                  <a
                                    key={idx}
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="no-underline"
                                  >
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="flex items-center gap-2 hover:bg-gray-100"
                                    >
                                      <FileText className="h-4 w-4" />
                                      <span>File {idx + 1}</span>
                                    </Button>
                                  </a>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-500 mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">No files attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  key={lesson.id}
                  className="border border-gray-200 rounded-xl p-8 bg-gray-50 text-gray-500 text-center"
                >
                  <AlertCircle className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg">
                    No homework assigned for this lesson.
                  </p>
                </div>
              )
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
