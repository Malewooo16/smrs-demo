"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './comps.css';

type Event = {
  date: string;
  desc: string;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PCalender: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const events: Event[] = [
    { date: '2024-07-24', desc: 'Event 1' },
    { date: '2024-07-20', desc: 'Event 2' },
    { date: '2024-07-21', desc: 'Event 3' },
  ];

  const tileClassName = ({ date, view }: {date:Date; view:string;}) => {
    if (view === 'month') {
      const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
      return event ? 'highlight' : null;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Calendar of Events</h1>
      <Calendar
        onChange={setValue}
        showWeekNumbers
        value={value}
        tileClassName={tileClassName}
      />
      <div className="mt-4 w-full max-w-md">
        <h2 className="text-xl mb-2">Events</h2>
        <ul className="event-list">
          {events.map(event => (
            <li key={event.date}>
              {new Date(event.date).toUTCString().slice(0, 17)}: {event.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PCalender;
