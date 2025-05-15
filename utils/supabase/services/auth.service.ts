'use server'

import { createClient } from "../server";

export async function signUpWithCredentials(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    return { data, error };
}

export async function signInWithCredentials(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { data, error };
}

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    return { error };
}

export async function getUser() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    return { data, error };
}
