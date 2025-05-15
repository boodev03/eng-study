import { useQuery } from "@tanstack/react-query";
import { lessonDetailService } from "../utils/supabase/services/lesson-detail.service";
import { GetLessonDetailByStudentId } from "../utils/supabase/dto/lesson_detail.dto";

export const useLessonDetailByStudent = (
  params: GetLessonDetailByStudentId
) => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    LESSON_DETAILS: ["lessonDetails"],
    BY_STUDENT: ["lessonDetails", "byStudent", params.student_email],
    BY_STUDENT_WITH_TIME: [
      "lessonDetails",
      "byStudent",
      params.student_email,
      params.start_time,
      params.end_time,
    ],
  };

  // Get lesson details by student id query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_STUDENT_WITH_TIME,
    queryFn: async () => {
      const { data, error } =
        await lessonDetailService.getLessonDetailByStudentId(params);
      if (error) throw error;
      return data;
    },
    enabled: !!params.student_email, // Only run query if student_id is provided
  });

  return {
    lessonDetails: data || [],
    isLoading,
    isError: error,
    refetch,
  };
};
