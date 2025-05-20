export interface Course {
    id: string;
    created_at: Date;
    course_name: string;
    start_time: Date;
    end_time: Date;
    tuition: number;
    teacher_id: string;

    // Other fields for join
    teacher?: Teacher
    lesson_details?: LessonDetail[]
    enrollments?: Enrollment[]
}