"use client";

import { useEnrollmentByStudent } from "@/hooks/useEnrollmentByStudent";
import { useUser } from "@/hooks/useUser";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Courses() {
  const router = useRouter();
  const { user } = useUser();
  const { enrollments, isLoading, isError } = useEnrollmentByStudent(
    user?.email || ""
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">Error loading courses</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      {enrollments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            You are not enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              onClick={() =>
                router.push(`/student/courses/${enrollment.course.id}`)
              }
              className="bg-white p-6 rounded-lg shadow-sm transition-shadow border border-gray-300 cursor-pointer hover:shadow-md"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {enrollment.course.course_name}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Start:</span>
                  {dayjs(enrollment.course.start_time).format("MMM D, YYYY")}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">End:</span>
                  {dayjs(enrollment.course.end_time).format("MMM D, YYYY")}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Tuition:</span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(enrollment.course.tuition)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
