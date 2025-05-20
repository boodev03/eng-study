'use server'

import { Course } from "@/types/course";
import { createClient } from "../server";

export const getCoursesByTeacherEmail = async (teacherEmail: string) => {
    const supabase = await createClient()
    try {
        const { data: teacher, error: teacherError } = await supabase
            .from("teachers")
            .select("id")
            .eq("email", teacherEmail)
            .single();

        if (teacherError) throw teacherError;

        const { data, error } = await supabase
            .from("courses")
            .select("*, enrollments(*)")
            .eq("teacher_id", teacher.id);
        if (error) throw error;
        return { data: data as Course[], error: null };
    } catch (error) {
        return { data: null, error: error as Error };
    }
}


