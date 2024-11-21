"use client";

import {useState} from "react";
import {FaBook, FaUsers, FaChalkboardTeacher} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { ClassCourseResultsTable } from "./ClassCourseResultsTable";
import { useParams } from "next/navigation";
import ClassCourseResultsGraphs from "./ClassCourseResultsGraphs";

export default function ClassCourseResultsInfo() {
  const [activeTab, setActiveTab] = useState("info");
  const params = useParams() as {courseId: string,}
  return (
    <div>
      <h1 className="text-xl font-bold my-6 px-2">Results Overview</h1>
      <div className="w-full  bg-blue-100 p-4 border-b lg:border-b-0 lg:border-r">
      <nav className="flex space-x-6 border-b">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FaBook className="inline mr-2" /> Overview
        </button>
        <button
          onClick={() => setActiveTab('graphs')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'graphs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <IoIosStats className="inline mr-2" /> Stats
        </button>
      </nav>
      </div>

      {activeTab === "info" && <ClassCourseResultsTable  />}
      {activeTab === "graphs" && <ClassCourseResultsGraphs />}
    </div>
  );
}
