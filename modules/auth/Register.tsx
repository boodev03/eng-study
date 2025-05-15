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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signUpWithCredentials } from "@/utils/supabase/services/auth.service";

const formSchema = z
  .object({
    email: z
      .string()
      .email("Email không hợp lệ")
      .min(1, "Email không được để trống"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu không được quá 20 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");

      const { data, error } = await signUpWithCredentials(
        values.email,
        values.password
      );

      if (error) {
        throw new Error(error.message || "Đăng ký thất bại");
      }

      if (data?.user) {
        router.push("/login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Đăng ký tài khoản
          </h1>
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-500">
              Đăng nhập
            </a>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
