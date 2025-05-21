import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lessonSubmissionService } from "@/utils/supabase/services/lesson_submission.service";
import { s3Service } from "@/utils/supabase/services/s3.service";
import { userService } from "@/utils/supabase/services/user.service";
import { FileText, Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddSubmitAssignmentProps {
  lessonAssignmentId: string;
  studentEmail: string;
  refetch: () => void;
}

export default function AddSubmitAssignment({
  lessonAssignmentId,
  studentEmail,
  refetch,
}: AddSubmitAssignmentProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to submit");
      return;
    }

    setIsSubmitting(true);
    try {
      const studentId = await userService.getStudentIdByEmail(studentEmail);
      // Upload files to S3
      const { urls, errors } = await s3Service.uploadMultipleFiles(files);

      if (errors.length > 0) {
        throw new Error("Failed to upload some files");
      }

      // Create submission record
      const { data, error } =
        await lessonSubmissionService.createLessonSubmission({
          student_id: studentId,
          lesson_assignment_id: lessonAssignmentId,
          files: urls,
        });

      if (error) throw error;

      toast.success("Assignment submitted successfully");

      // Reset form
      setFiles([]);
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Submit Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="files">Upload Files</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="files"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <Label
                htmlFor="files"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  PDF, DOC, DOCX up to 10MB
                </span>
              </Label>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || files.length === 0}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Assignment"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
