import { useQuery } from "@tanstack/react-query";
import { lessonSubmissionService } from "../utils/supabase/services/lesson_submission.service";
import { userService } from "@/utils/supabase/services/user.service";

export const useLessonSubmissionByStudentId = (
  lessonAssignmentId: string,
  studentEmail: string
) => {
  const QUERY_KEYS = {
    LESSON_SUBMISSIONS: ["lessonSubmissions"],
    BY_STUDENT: [
      "lessonSubmissions",
      "byStudent",
      lessonAssignmentId,
      studentEmail,
    ],
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_STUDENT,
    queryFn: async () => {
      const studentId = await userService.getStudentIdByEmail(studentEmail);
      const { data, error } =
        await lessonSubmissionService.getLessonSubmissionByLessonAssignmentIdAndStudentId(
          lessonAssignmentId,
          studentId
        );
      if (error) throw error;
      return data;
    },
    enabled: !!lessonAssignmentId && !!studentEmail,
  });

  return {
    submission: data,
    isLoading,
    isError: error,
    refetch,
  };
};
