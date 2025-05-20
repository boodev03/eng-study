"use client";

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
import { lessonAssignmentService } from "@/utils/supabase/services/lesson_assignment.service";
import { LessonAssignmentDto } from "@/utils/supabase/dto/lesson_assigment.dto";
import { FileText, Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { s3Service } from "@/utils/supabase/services/s3.service";
import dayjs from "dayjs";

interface AddHomeworkProps {
  lessonId: string;
}

export default function AddHomework({ lessonId }: AddHomeworkProps) {
  const [homeworkName, setHomeworkName] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const fileUrls = await s3Service.uploadMultipleFiles(files);
      console.log(fileUrls);
      const assignmentData: Omit<LessonAssignmentDto, "id" | "created_at"> = {
        lesson_detail_id: lessonId,
        homework_name: homeworkName,
        due_time: dayjs(dueTime).toDate(),
        files: JSON.stringify(fileUrls),
      };

      const { error } = await lessonAssignmentService.createLessonAssignment(
        assignmentData
      );

      if (error) throw error;

      toast.success("Assignment created successfully");

      // Reset form
      setHomeworkName("");
      setDueTime("");
      setFiles([]);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create assignment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Assignment Name</Label>
            <Input
              id="name"
              placeholder="Enter assignment name"
              value={homeworkName}
              onChange={(e) => setHomeworkName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="files">Upload Files</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  setFiles([...files, ...selectedFiles]);
                }}
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Assignment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
