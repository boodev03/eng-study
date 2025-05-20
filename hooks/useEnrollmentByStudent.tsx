import { useQuery } from "@tanstack/react-query";
import { enrollmentService } from "../utils/supabase/services/enrollment.service";

export const useEnrollmentByStudent = (studentEmail: string) => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    ENROLLMENTS: ["enrollments"],
    BY_STUDENT: ["enrollments", "byStudent", studentEmail],
  };

  // Get enrollments by student email query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.BY_STUDENT,
    queryFn: async () => {
      const { data, error } =
        await enrollmentService.getEnrollmentsByStudentEmail(studentEmail);
      if (error) throw error;
      return data;
    },
    enabled: !!studentEmail, // Only run query if studentEmail is provided
  });

  return {
    enrollments: data || [],
    isLoading,
    isError: error,
    refetch,
  };
};
