import { LessonSubmission } from "./lesson_submission.dto";

export interface LessonAssignment {
    id: string;
    created_at: string; // ISO string, e.g., "2024-05-09T09:00:00.000Z"
    lesson_detail_id: string;
    homework_name: string;
    files: string;
    due_time: Date

    // Optional
    lesson_submissions?: LessonSubmission[];
}

export interface LessonDetail {
    id: string;
    created_at: Date;
    course_id: string;
    teacher_id: string;
    room_id: string;
    start_time: Date;
    end_time: Date;
    status: string; // ['Chưa diễn ra', 'Hoàn thành', 'Hủy lịch']

    lesson_assignments: LessonAssignment[];
}

export interface GetLessonDetailByStudentId {
    student_email: string;
    start_time: Date;
    end_time: Date;
}

export interface GetLessonDetailByTeacherId {
    teacher_email: string;
    start_time: Date;
    end_time: Date;
}