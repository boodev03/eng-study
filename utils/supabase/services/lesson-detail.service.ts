import {
    LessonDetail,
    GetLessonDetailByStudentId,
    GetLessonDetailByTeacherId,
} from "../dto/lesson_detail.dto";
import { ILessonDetailService } from "./lesson_detail.interface";
import { createClient } from "../client";

export class LessonDetailService implements ILessonDetailService {
    private supabase;

    constructor() {
        this.supabase = createClient();
    }

    async createLessonDetail(
        lessonDetail: Omit<LessonDetail, "id" | "created_at">
    ): Promise<{ data: LessonDetail | null; error: Error | null }> {
        try {
            const { data, error } = await this.supabase
                .from("lesson_details")
                .insert(lessonDetail)
                .select()
                .single();

            if (error) throw error;
            return { data: data as LessonDetail, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }

    async getLessonDetailByStudentId(
        params: GetLessonDetailByStudentId
    ): Promise<{ data: LessonDetail[] | null; error: Error | null }> {
        try {
            const { student_email, start_time, end_time } = params;

            const startTimeISO =
                start_time instanceof Date ? start_time.toISOString() : start_time;
            const endTimeISO =
                end_time instanceof Date ? end_time.toISOString() : end_time;

            // Get student_id from table students through email
            const { data: student, error: studentError } = await this.supabase
                .from("students")
                .select("id")
                .eq("email", student_email)
                .single();

            if (studentError) throw studentError;

            const { data: enrollments, error: enrollError } = await this.supabase
                .from("enrollments")
                .select("course_id")
                .eq("student_id", student.id);

            if (enrollError) throw enrollError;
            if (!enrollments || enrollments.length === 0) {
                return { data: null, error: null };
            }

            const courseIds = enrollments.map((enrollment) => enrollment.course_id);

            const { data, error } = await this.supabase
                .from("lesson_details")
                .select(
                    `
          *,
          courses:course_id(course_name)
        `
                )
                .in("course_id", courseIds)
                // .gte("start_time", startTimeISO)
                // .lte("end_time", endTimeISO)
                .order("start_time", { ascending: true });

            if (error) throw error;

            return { data: data || null, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }

    async getLessonDetailByTeacherId(
        params: GetLessonDetailByTeacherId // Accept teacher_email
    ): Promise<{ data: LessonDetail[] | null; error: Error | null }> {
        try {
            const { teacher_email, start_time, end_time } = params;

            const startTimeISO =
                start_time instanceof Date ? start_time.toISOString() : start_time;
            const endTimeISO =
                end_time instanceof Date ? end_time.toISOString() : end_time;

            // Get teacher_id from table teachers through email
            const { data: teacher, error: teacherError } = await this.supabase
                .from("teachers")
                .select("id")
                .eq("email", teacher_email)
                .single();

            if (teacherError) throw teacherError;

            const { data, error } = await this.supabase
                .from("lesson_details")
                .select(
                    `
          *,
          courses:course_id(course_name)
        `
                )
                .eq("teacher_id", teacher.id)
                // .gte("start_time", startTimeISO)
                // .lte("end_time", endTimeISO)
                .order("start_time", { ascending: true });

            if (error) throw error;

            return { data: data || null, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }

    async getLessonDetailByCourseId(
        courseId: string
    ): Promise<{ data: LessonDetail[] | null; error: Error | null }> {
        try {
            const { data, error } = await this.supabase
                .from("lesson_details")
                .select("*, lesson_assignments(*, lesson_submissions(*, students(*)))")
                .eq("course_id", courseId)
                .order("start_time", { ascending: true });
            if (error) throw error;
            return { data: data || null, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }
}

export const lessonDetailService = new LessonDetailService();
