import { createClient } from "../client";
import { EnrollmentWithCourse } from "../dto/enrollment.dto";
import { IEnrollmentService } from "./enrollment.interface";

export class EnrollmentService implements IEnrollmentService {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  async getEnrollmentsByStudentEmail(
    studentEmail: string
  ): Promise<{ data: EnrollmentWithCourse[] | null; error: Error | null }> {
    try {
      const { data: student, error: studentError } = await this.supabase
        .from("students")
        .select("id")
        .eq("email", studentEmail)
        .single();

      if (studentError) throw studentError;

      const { data, error } = await this.supabase
        .from("enrollments")
        .select(`
          *,
          course:courses(*)
        `)
        .eq("student_id", student.id);

      if (error) throw error;
      return { data: data as EnrollmentWithCourse[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}

export const enrollmentService = new EnrollmentService();
