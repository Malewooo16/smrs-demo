"use client";

import React, { useState, useEffect } from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { useParams } from 'next/navigation';
import { getMutatedStudentDetails } from '@/actions/courses/getClassCourseInfo';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement
);

interface Student {
  id: number;
  name: string;
  scores: any;  //this Prisma JSON shit makes no sense
}

const ClassCourseResultsGraph: React.FC = () => {
  const [studentResults, setStudentResults] = useState<Student[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams() as { courseId: string };

  // Fetch student scores data
  useEffect(() => {
    if (params.courseId) {
      const fetchData = async () => {
        try {
          const response = await getMutatedStudentDetails(parseInt(params.courseId)); // Fetch student details
          
          setStudentResults(response); // Set the fetched results to state

          // Extract unique score keys (columns) from the student results
          const initialColumns = new Set<string>();
          response.forEach((student) => {
            Object.keys(student.scores).forEach((scoreTag) => initialColumns.add(scoreTag));
          });
          setColumns(Array.from(initialColumns)); // Convert Set to array and set it to columns
        } catch (err) {
          setError("Failed to fetch course details."); // Set an error message if fetching fails
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      };

      fetchData(); // Call fetchData function to load data
    }
  }, [params.courseId]); 

  // Function to calculate the average of scores for a student
  const calculateAverage = (scores: Record<string, number>) => {
    const totalScores = Object.values(scores);
    if (totalScores.length === 0) return 0;
    const sum = totalScores.reduce((acc, score) => acc + score, 0);
    return Math.round(sum / totalScores.length);
  };

  // Function to calculate frequency distribution for scores
  const getFrequencyDistribution = (scores: Record<number, number>, ranges: number[]) => {
    const distribution: Record<number, number> = {};
    ranges.forEach(range => {
      distribution[range] = 0;
    });
  
    for (const score of Object.values(scores)) {
      const rangeKey = ranges.find(range => score <= range);
      if (rangeKey !== undefined) {
        distribution[rangeKey] = (distribution[rangeKey] || 0) + 1;
      }
    }
  
    return distribution;
  };
  

  // Example ranges for frequency distribution
  const scoreRanges = [50, 75, 100]; // 0-50, 51-75, 76-100

  // Data for Bar Chart - Students' Average Scores
  const barData = {
    labels: studentResults.map((student) => student.name),
    datasets: [
      {
        label: 'Average Score',
        data: studentResults.map((student) =>
          calculateAverage(student.scores)
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Average Scores of Students',
      },
    },
  };

  // Data for Line Chart - Frequency Distribution of Scores
  const lineData = {
    labels: scoreRanges.map(range => `Up to ${range}`),
    datasets: columns.map((column, index) => {
      const frequencies = getFrequencyDistribution(
        studentResults.reduce((acc, student) => ({ ...acc, [student.id]: student.scores[column] }), {}),
        scoreRanges
      );

      return {
        label: column,
        data: scoreRanges.map(range => frequencies[range] || 0),
        backgroundColor: `rgba(${255 - index * 90}, ${99 + index * 120}, ${132 + index * 10}, 0.2)`,
        borderColor: `rgba(${255 - index * 90}, ${99 + index * 120}, ${132 + index * 10}, 1)`,
        borderWidth: 2,
        fill: false,
      };
    }),
  };

  // Options for Line Chart
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Frequency Distribution of Scores',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Score Range',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Students',
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-[#efeff6] shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Performance Graphs</h2>
      
      {/* Bar Chart */}
      <div className="mb-8">
        <Bar data={barData} options={barOptions} />
      </div>

      {/* Line Chart */}
      <div className="mb-8">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default ClassCourseResultsGraph;
