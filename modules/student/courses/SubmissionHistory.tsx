import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLessonSubmissionByStudentId } from "@/hooks/useLessonSubmission";
import { useUser } from "@/hooks/useUser";
import dayjs from "dayjs";
import { AlertCircle, Eye, FileText, X } from "lucide-react";

interface SubmissionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  lessonAssignmentId: string;
}

export default function SubmissionHistory({
  isOpen,
  onClose,
  lessonAssignmentId,
}: SubmissionHistoryProps) {
  const { user } = useUser();
  const { submission, isLoading } = useLessonSubmissionByStudentId(
    lessonAssignmentId,
    user?.email as string
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Submission History
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : submission && submission.length > 0 ? (
            submission.map((sub, index) => (
              <div
                key={sub.id}
                className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Submission #{index + 1}</p>
                      <p className="text-sm text-gray-500">
                        Submitted on{" "}
                        {dayjs(sub.created_at).format("MMM D, YYYY h:mm A")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-700">
                      Submitted
                    </span>
                  </div>
                </div>

                {sub.files && sub.files.length > 0 ? (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-gray-700">
                        Submitted Files
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {sub.files.map((fileUrl: string, idx: number) => (
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
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">No files attached</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No submission history found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
