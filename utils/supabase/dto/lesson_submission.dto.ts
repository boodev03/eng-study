import { Student } from "./student.dto";
import { LessonAssignmentDto } from "./lesson_assigment.dto";

export interface LessonSubmission {
  id: string;
  created_at: Date;
  student_id: string;
  lesson_assignment_id: string;
  files?: string[];
  score?: number;

  // Optional
  students?: Student;
}

export interface LessonSubmissionWithData extends LessonSubmission {
  student?: Student;
  lesson_assignment?: LessonAssignmentDto;
}