import { useQuery } from "@tanstack/react-query";
import { getCoursesByTeacherEmail } from "../utils/supabase/services/course.service";

export const useCourseByTeacherId = (teacherEmail: string) => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    COURSES: ["courses"],
    BY_TEACHER: ["courses", "byTeacher", teacherEmail],
  };

  // Get courses by teacher id query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_TEACHER,
    queryFn: async () => {
      const { data, error } = await getCoursesByTeacherEmail(teacherEmail);
      if (error) throw error;
      return data;
    },
    enabled: !!teacherEmail, // Only run query if teacher_id is provided
  });

  return {
    courses: data || [],
    isLoading,
    isError: error,
    refetch,
  };
};
