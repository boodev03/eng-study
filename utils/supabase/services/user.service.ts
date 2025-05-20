import { createClient } from "../client";
import IUserService from "./user.interface";

export class UserService implements IUserService {
    private supabase;

    constructor() {
        this.supabase = createClient();
    }

    async getStudentIdByEmail(email: string): Promise<string> {
        try {
            const { data, error } = await this.supabase
                .from("students")
                .select("id")
                .eq("email", email)
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            throw error;
        }
    }

    async getTeacherIdByEmail(email: string): Promise<string> {
        try {
            const { data, error } = await this.supabase
                .from("teachers")
                .select("id")
                .eq("email", email)
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();
