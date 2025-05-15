"use client";

import Loading from "@/components/Loading";
import { useLessonDetailByTeacher } from "@/hooks/useLessonDetailByTeacher";
import { useUser } from "@/hooks/useUser";
import dayjs from "dayjs";
import { useMemo } from "react";
import TeacherCalendar from "./TeacherCalendar";

export default function Teacher() {
  const { user } = useUser();
  const weekStart = dayjs().startOf("isoWeek").toDate();
  const weekEnd = dayjs().endOf("isoWeek").toDate();

  const params = useMemo(
    () => ({
      teacher_email: user?.email || "",
      start_time: weekStart,
      end_time: weekEnd,
    }),
    [user?.email]
  );

  const { lessonDetails, isLoading, isError } =
    useLessonDetailByTeacher(params);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="h-[calc(100vh-65px)] bg-white py-10">
      <div className="container mx-auto flex flex-col h-full">
        {/* Always show Summary and Calendar, scroll if overflow */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* <Summary /> */}
          <TeacherCalendar lessonDetails={lessonDetails || []} />
        </div>
      </div>
    </div>
  );
}
