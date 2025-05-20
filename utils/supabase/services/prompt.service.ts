'use server'

import { Prompt } from "@/types/prompt";
import { createClient } from "../server";

export async function getPromptByKey(key: string): Promise<Prompt> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("prompts").select("*").eq("prompt_key", key).single();
    if (error) throw error;
    return data as Prompt;
}
