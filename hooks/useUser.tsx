import { getUser } from "@/utils/supabase/services/auth-services";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    USER: ["user"],
  };

  // Get current user
  const userQuery = useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const { data, error } = await getUser();
      if (error) {
        throw new Error(error.message);
      }
      return data?.user || null;
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
  };
};
