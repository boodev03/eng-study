import { useQuery } from "@tanstack/react-query";
import { lessonDetailService } from "../utils/supabase/services/lesson-detail.service";

export const useLessonDetailByCourseId = (courseId: string) => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    LESSON_DETAILS: ["lessonDetails"],
    BY_COURSE: ["lessonDetails", "byCourse", courseId],
  };

  // Get lesson details by course id query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_COURSE,
    queryFn: async () => {
      const { data, error } =
        await lessonDetailService.getLessonDetailByCourseId(courseId);
      if (error) throw error;
      return data;
    },
    enabled: !!courseId, // Only run query if courseId is provided
  });

  return {
    lessonDetails: data || [],
    isLoading,
    isError: error,
    refetch,
  };
};
