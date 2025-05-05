"use server";

import { ListeningCategory } from "@/types/listening";
import { createClient } from "../server";

const LISTENING_CATEGORIES_TABLE_NAME = "listening_categories";

export async function getAllListeningCategories() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from(LISTENING_CATEGORIES_TABLE_NAME)
        .select(`
            *,
            exercises_count:listening_exercises(count)
        `)
        .order("index", { ascending: true });

    if (error) {
        console.error("Error fetching listening categories:", error);
        throw error;
    }

    return data as ListeningCategory[];
}

export async function getListeningCategoryById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from(LISTENING_CATEGORIES_TABLE_NAME)
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error fetching listening category with id ${id}:`, error);
        throw error;
    }

    return data as ListeningCategory;
}