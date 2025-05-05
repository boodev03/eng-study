'use server'

import { ListeningExercise, ListeningExercisesFilter, ListeningExerciseWithIndex } from "@/types/listening";
import { createClient } from "../server";



export async function getListeningExercises(filter: ListeningExercisesFilter = {}) {
    const supabase = await createClient();

    let query = supabase
        .from("listening_exercises")
        .select("*, category:listening_categories(*)")
        .order("created_at", { ascending: false });

    // Apply category filter if provided
    if (filter.categoryId) {
        query = query.eq("category_id", filter.categoryId);
    }

    // Apply pagination if provided
    if (filter.limit !== undefined) {
        query = query.limit(filter.limit);
    }

    if (filter.offset !== undefined) {
        query = query.range(filter.offset, filter.offset + (filter.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching listening exercises:", error);
        throw error;
    }

    return data.map((exercise, index) => ({
        ...exercise,
        index: index + 1
    })) as ListeningExerciseWithIndex[];
}

export async function getListeningExerciseById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("listening_exercises")
        .select("*, category:listening_categories(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error fetching listening exercise with id ${id}:`, error);
        throw error;
    }

    return data as ListeningExercise;
}
