import { EnrollmentWithCourse } from "../dto/enrollment.dto";

export interface IEnrollmentService {
  getEnrollmentsByStudentEmail(
    studentEmail: string
  ): Promise<{ data: EnrollmentWithCourse[] | null; error: Error | null }>;
}
