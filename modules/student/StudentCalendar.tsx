"use client";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import { useMemo } from "react";

interface StudentCalendarProps {
  lessonDetails: any[];
}

export default function StudentCalendar({
  lessonDetails,
}: StudentCalendarProps) {
  // Convert lessons to FullCalendar events with simple colors
  const calendarEvents = useMemo(() => {
    return (lessonDetails || []).map((lesson: any) => ({
      id: lesson.id,
      title: lesson.courses?.course_name || "Course",
      start: lesson.start_time,
      end: lesson.end_time,
      backgroundColor: "#FF6400",
      borderColor: "#FF6400",
      textColor: "#ffffff",
      extendedProps: {
        description: lesson.description || "",
        courseId: lesson.course_id,
        teacherId: lesson.teacher_id,
      },
    }));
  }, [lessonDetails]);

  return (
    <div className="bg-white rounded-[4px] px-6 py-4 shadow border border-border-gray flex-1">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={calendarEvents}
        height="100%"
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        weekends={true}
        editable={false}
        selectable={false}
        allDaySlot={false}
        slotDuration="01:00:00"
        slotLabelInterval="01:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        eventClick={(info) => {
          const event = info.event;
          const modal = `
              <div style="
                position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.5); z-index: 9999; 
                display: flex; align-items: center; justify-content: center;
              " onclick="this.remove()">
                <div style="
                  background: white; padding: 24px; border-radius: 8px; 
                  max-width: 400px; width: 90%; 
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  border: 1px solid #d1d5db;
                " onclick="event.stopPropagation()">
                  <h3 style="
                    color: #111827; font-size: 20px; font-weight: 700; 
                    margin-bottom: 16px; border-bottom: 3px solid #FF6400;
                    padding-bottom: 8px;
                  ">
                    ${event.title}
                  </h3>
                  <div style="margin-bottom: 16px;">
                    <div style="
                      display: flex; align-items: center; 
                      padding: 12px; background: #f9fafb; 
                      border-radius: 6px; border: 1px solid #d1d5db;
                    ">
                      <span style="margin-right: 12px; font-size: 18px;">🕒</span>
                      <div>
                        <div style="font-weight: 600; color: #111827;">
                          ${dayjs(event.start).format("HH:mm")} - ${dayjs(
            event.end
          ).format("HH:mm")}
                        </div>
                        <div style="color: #6b7280; font-size: 14px;">
                        ${dayjs(event.start).format("D MMMM YYYY")}
                        </div>
                      </div>
                    </div>
                    ${
                      event.extendedProps.description
                        ? `
                      <div style="
                        margin-top: 16px; padding: 12px; 
                        background: #f9fafb; border-radius: 6px;
                        border: 1px solid #d1d5db;
                      ">
                        <div style="color: #374151; font-size: 14px; line-height: 1.5;">
                          ${event.extendedProps.description}
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                  <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #FF6400; color: white; border: none; 
                    padding: 12px 24px; border-radius: 6px; font-weight: 600;
                    width: 100%; cursor: pointer; font-size: 14px;
                  ">Close</button>
                </div>
              </div>
            `;
          document.body.insertAdjacentHTML("beforeend", modal);
        }}
      />
    </div>
  );
}
