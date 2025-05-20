"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourseByTeacherId } from "@/hooks/useCourseByTeacherId";
import { useUser } from "@/hooks/useUser";
import { BookOpen, Calendar, Users } from "lucide-react";
import Link from "next/link";

export default function Courses() {
  const { user } = useUser();
  const { courses, isLoading } = useCourseByTeacherId(user?.email || "");

  if (isLoading || !user) {
    return (
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-900">No courses available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/teacher/courses/${course.id}`}
              className="hover:shadow-lg transition-shadow"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <BookOpen className="h-5 w-5" />
                    {course.course_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <Users className="h-4 w-4" />
                      <span>{course.enrollments?.length || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <Calendar className="h-4 w-4" />
                      <span>{course.lesson_details?.length || 0} Lessons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
