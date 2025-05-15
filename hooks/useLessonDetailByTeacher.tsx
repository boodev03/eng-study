import { useQuery } from "@tanstack/react-query";
import { lessonDetailService } from "../utils/supabase/services/lesson-detail.service";
import { GetLessonDetailByTeacherId } from "../utils/supabase/dto/lesson_detail.dto";

export const useLessonDetailByTeacher = (
  params: GetLessonDetailByTeacherId
) => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    LESSON_DETAILS: ["lessonDetails"],
    BY_TEACHER: ["lessonDetails", "byTeacher", params.teacher_email],
    BY_TEACHER_WITH_TIME: [
      "lessonDetails",
      "byTeacher",
      params.teacher_email,
      params.start_time,
      params.end_time,
    ],
  };

  // Get lesson details by teacher id query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_TEACHER_WITH_TIME,
    queryFn: async () => {
      const { data, error } =
        await lessonDetailService.getLessonDetailByTeacherId(params);
      if (error) throw error;
      return data;
    },
    enabled: !!params.teacher_email, // Only run query if teacher_id is provided
  });

  return {
    lessonDetails: data || [],
    isLoading,
    isError: error,
    refetch,
  };
};
