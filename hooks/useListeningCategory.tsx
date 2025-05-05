import { getAllListeningCategories } from "@/utils/supabase/services/listening-category-services";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  // Query keys for better cache management
  const QUERY_KEYS = {
    ALL_CATEGORIES: ["listening-categories"],
    CATEGORY_DETAIL: (id: string) => ["listening-category", id],
  };

  // Get all listening categories
  const allCategoriesQuery = useQuery({
    queryKey: QUERY_KEYS.ALL_CATEGORIES,
    queryFn: getAllListeningCategories,
  });

  return {
    categories: allCategoriesQuery.data || [],
    isLoading: allCategoriesQuery.isLoading,
    isError: allCategoriesQuery.isError,
    error: allCategoriesQuery.error,
  };
};
