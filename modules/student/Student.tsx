"use client";

import Loading from "@/components/Loading";
import { useLessonDetailByStudent } from "@/hooks/useLessionDetailByStudent";
import { useUser } from "@/hooks/useUser";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import { useState } from "react";
import StudentCalendar from "./StudentCalendar";

// Initialize dayjs plugins
dayjs.extend(isoWeek);
dayjs.extend(weekday);

export default function Student() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(dayjs());

  // Get start and end of current week
  const weekStart = currentDate.startOf("isoWeek");
  const weekEnd = currentDate.endOf("isoWeek");

  // Fetch lesson details for current week
  const { lessonDetails, isLoading, isError } = useLessonDetailByStudent({
    student_email: user?.email || "",
    start_time: weekStart.toDate(),
    end_time: weekEnd.toDate(),
  });

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-[calc(100vh-65px)] bg-white py-10">
      <div className="container mx-auto flex flex-col h-full">
        {/* Always show Summary and Calendar, scroll if overflow */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* <Summary /> */}
          <StudentCalendar lessonDetails={lessonDetails || []} />
        </div>
      </div>
    </div>
  );
}
