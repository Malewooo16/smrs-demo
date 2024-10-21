"use client";
import { useState, useEffect } from "react";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function TeachersDashboard() {
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [notifications, setNotifications] = useState([
    "Grade 10 Maths assignment due tomorrow",
    "Staff meeting at 3 PM in the conference room",
    "Submit student attendance by the end of the day"
  ]);

  // Placeholder data for the bar chart (Student Performance)
  const studentPerformanceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Number of Students',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Placeholder data for the line chart (Performance Trends)
  const performanceTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Average Score',
        data: [78, 85, 90, 92, 88],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    // Simulate fetching the number of students from an API
    setTimeout(() => {
      setNumberOfStudents(120);
    }, 1000);
  }, []);

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-3xl font-bold">Teachers Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Number of Students</h2>
        <div className="text-4xl font-bold">{numberOfStudents}</div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 w-1/4">
        <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
        <Bar data={studentPerformanceData} />
      </div>

      <div className="bg-white shadow rounded-lg p-6 w-1/4">
        <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
        <Line data={performanceTrendsData} />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
