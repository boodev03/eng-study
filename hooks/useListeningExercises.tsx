import { getListeningExercises } from "@/utils/supabase/services/listening-services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ListeningExercisesFilter } from "@/types/listening";

export const useListeningExercises = (
  initialFilter: ListeningExercisesFilter = {}
) => {
  // State for filter
  const [filter, setFilter] = useState<ListeningExercisesFilter>(initialFilter);

  // Query key for better cache management
  const QUERY_KEY = ["listening-exercises", filter];

  // Get listening exercises with filter
  const exercisesQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getListeningExercises(filter),
  });

  return {
    exercises: exercisesQuery.data || [],
    isLoading: exercisesQuery.isLoading,
    isError: exercisesQuery.isError,
    error: exercisesQuery.error,
    filter,
    setFilter,
  };
};
