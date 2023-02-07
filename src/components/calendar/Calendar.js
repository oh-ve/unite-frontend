import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(
          data.events.map((event) => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            desc: event.description,
          }))
        );
      });
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="title"
      style={{ height: 500 }}
    />
  );
}
