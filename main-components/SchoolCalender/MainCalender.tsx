"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";

// Define types for the event data
type EventType = {
  id: number;
  eventName: string;
  startDate: Date; // Could be Date type depending on your data
  endDate: Date | null; // Optional because some events may not have an end date
  eventType: "Exam" | "Parent Meeting" | "Holiday" | "Workshop" | string; // Event type can be one of the specific strings or any string
};

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  eventType: string;
};

interface SchoolEventCalendarProps {
  events: EventType[]; // Expect an array of events matching EventType
}

const localizer = momentLocalizer(moment);

export default function SchoolEventCalendar({ events }: SchoolEventCalendarProps) {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState(Views.MONTH); // Default to month view
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const onNavigate = (newDate: Date) => {
    setCurrentDate(newDate); // Update the current date when user navigates
  };

  useEffect(() => {
    // Transform event data into calendar-friendly format
    const formattedEvents: CalendarEvent[] = events.map((event) => ({
      title: event.eventName,
      start: new Date(event.startDate),
      end: new Date(event.endDate || event.startDate), // If no end date, use start date
      allDay: !event.endDate, // Make it an all-day event if there's no end date
      eventType: event.eventType // Set event type for display purposes
    }));
    setCalendarEvents(formattedEvents);
  }, [events]);

  // Color coding events based on type (assuming event type is available in event data)
  const eventStyleGetter = (event: CalendarEvent, start: Date, end: Date, isSelected: boolean) => {
    const eventTypeColors: { [key: string]: string } = {
      Exam: "#ADD8E6",
      "Parent Meeting": "#FFD700",
      Holiday: "#FFB6C1",
      Workshop: "#FF6347",
      SchoolEvent: "orange",
      Admission:"aquamarine"
    };

    const backgroundColor = eventTypeColors[event.eventType as string] || "#90EE90"; // Default color if type not found
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={onView}
        date={currentDate} // Control the currently displayed date
        onNavigate={onNavigate} // Handle navigation between dates
        eventPropGetter={eventStyleGetter} // Apply custom styles to events
        className="bg-white rounded-lg shadow-sm p-4"
      />
    </div>
  );
}
