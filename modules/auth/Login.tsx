"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/utils/supabase/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Constants for localStorage keys
const STORAGE_KEYS = {
  REMEMBER_ME: "remember_me",
  SAVED_EMAIL: "saved_email",
};

const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Storage service for handling localStorage operations
const StorageService = {
  saveRememberMe: (email: string): void => {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
    localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, email);
  },

  clearRememberMe: (): void => {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
  },

  getSavedEmail: (): string | null => {
    const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    return isRemembered ? localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL) : null;
  },

  isRememberMeEnabled: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
  },
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Load saved email from localStorage on component mount
  useEffect(() => {
    const savedEmail = StorageService.getSavedEmail();
    const isRemembered = StorageService.isRememberMeEnabled();

    if (savedEmail) {
      form.setValue("email", savedEmail);
    }

    if (isRemembered) {
      form.setValue("rememberMe", true);
    }
  }, [form]);

  const onSubmit = async (values: FormValues) => {
    setError("");
    setIsLoading(true);
    try {
      // Handle remember me functionality
      if (values.rememberMe) {
        StorageService.saveRememberMe(values.email);
      } else {
        StorageService.clearRememberMe();
      }

      const { data, error } = await signInWithCredentials(
        values.email,
        values.password
      );
      if (error) {
        throw new Error(error.message || "Login failed");
      }
      if (data?.user) {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="bg-white border border-border-gray rounded-[4px] shadow-sm p-8 w-full max-w-md flex flex-col items-center">
        <p className="text-2xl font-bold mb-4 text-dark">
          Login to EngStudy Center
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-4"
          >
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-10 border-border-gray shadow-none"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <Mail className="absolute right-2 top-1/2 -translate-y-1/2 size-5" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="6+ Characters"
                        disabled={isLoading}
                        className="h-10 border-border-gray shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <LockKeyhole className="absolute right-2 top-1/2 -translate-y-1/2 size-5" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center mb-2">
                  <FormControl>
                    <input
                      id="remember"
                      type="checkbox"
                      className="mr-2"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="w-full flex justify-center mt-4 text-sm gap-1">
          <span>Forgot password?</span>
          <Link href="#" className="text-link hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
