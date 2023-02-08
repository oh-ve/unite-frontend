import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import calendarImg from "./calendar.png";
import "./calendar.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage({ user }) {
  const [events, setEvents] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const [signal, setSignal] = useState(false);
  const link1 = "https://unite.onrender.com";
  const link2 = "http://localhost:8080";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(link1 + "/events", {
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
  }, [signal]);

  console.log(events);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(link1 + "/events", {
        method: "POST",
        body: JSON.stringify({ start, end, title, description }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      console.log("DATA", data);

      if (!response.ok) {
        setError(data.error);
      }

      if (response.ok) {
        setError(null);
        setStart(null);
        setEnd(null);
        setTitle("");
        setDescription("");
        setSignal(true);
        alert("Your event has been submitted!");
      }
    } catch (error) {
      setError(error);
      alert("You suck at coding");
      console.log(error);
    }
  };

  useEffect(() => {
    setSignal(false);
  }, [events]);

  let formats = {
    dateFormat: "dd",

    dayFormat: (date, culture, localizer) =>
      localizer.format(date, "DDD", culture),

    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, { date: "short" }, culture) +
      " — " +
      localizer.format(end, { date: "short" }, culture),
  };

  return (
    <div className="CalendarComp">
      {user.isAdmin ? (
        <div className="calFormImg">
          {" "}
          <form onSubmit={handleSubmit} className="calendarForm">
            <h2>Add event</h2>
            <label>
              Start:
              <input
                type="datetime-local"
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label>
              End:
              <input
                type="datetime-local"
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
            <label>
              Event:
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </label>

            <button type="submit" className="submitEvent">
              Submit
            </button>
          </form>
          <img src={calendarImg} />
        </div>
      ) : null}
      <h1>Calendar</h1>
      <Calendar
        className="CalCal"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500, width: 800 }}
        formats={formats}
        eventPropGetter={() => {
          return {
            style: {
              backgroundColor: "#f0af35",
            },
          };
        }}
      />
      <button onClick={() => navigate(`/`)} className="backToMain">
        Back to main
      </button>
    </div>
  );
}
