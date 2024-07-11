"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";



type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PCalender() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    
     <Calendar onChange={onChange} showWeekNumbers value={value} />
       
  );
}
