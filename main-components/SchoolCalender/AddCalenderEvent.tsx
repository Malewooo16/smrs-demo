"use client"

import { addEvent } from "@/actions/calender/addEvent";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCalenderEventForm({schoolId}:{schoolId:number}) {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Term");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    
    const newEvent = { eventName, eventType, startDate, endDate, description };
    try {
        const response = await addEvent(newEvent, schoolId);
        if (response.success) {
            toast.success("Event created successfully!");
        }else{
            toast.error("Failed to create event. Please try again!");
        }
    } catch (err) {
        toast.error("Failed to create event. Please try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Event</h2>
  
    <label className="block">
      <span className="text-gray-700 font-semibold">Event Name:</span>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </label>
  
    <label className="block">
      <span className="text-gray-700 font-semibold">Event Type:</span>
      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="Term">Term</option>
        <option value="Holiday">Holiday</option>
        <option value="PublicHoliday">Public Holiday</option>
        <option value="SchoolEvent">School Event</option>
        <option value="ParentMeeting">Parent Meeting</option>
        <option value="Exams">Exams</option>
        <option value="Admission">Admission</option>
      </select>
    </label>
  
    <label className="block">
      <span className="text-gray-700 font-semibold">Start Date:</span>
      <input
        type="date"
        value={startDate.toISOString().slice(0, -14)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </label>
  
    <label className="block">
      <span className="text-gray-700 font-semibold">End Date:</span>
      <input
        type="date"
        value={endDate.toISOString().slice(0, -14)}
        onChange={(e) => setEndDate(new Date(e.target.value))}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </label>
  
    <label className="block">
      <span className="text-gray-700 font-semibold">Description:</span>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        rows={3}
      />
    </label>
  
    <button type="submit" className="btn w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500">
      Create Event
    </button>
  </form>
  
  );
}
