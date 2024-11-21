//@ts-nocheck
"use client";
import { getMutatedStudentDetails } from "@/actions/courses/getClassCourseInfo";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define a type for student data
interface StudentResult {
  id: number;
  name: string;
  scores: any; // This defines scores as an object with keys as strings and values as numbers
}

export function ClassCourseResultsTable() {
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]); // Type studentResults correctly
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const classId = searchParams.get('class');
  

  // Use params correctly to extract the courseId
  const params = useParams() as { courseId: string };
  const calculateAverage = (scores: any) => {
    const totalScores = Object.values(scores);
    if (totalScores.length === 0) return 0;
    const sum = totalScores.reduce((acc, score) => acc + score, 0);
    return Math.round(sum / totalScores.length);
  };
  useEffect(() => {
    if (params.courseId) {
      const fetchData = async () => {
        try {
          const response = await getMutatedStudentDetails(parseInt(params.courseId), parseInt(classId)); // Fetch student details
          
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
  }, [params.courseId]); // Dependency array to re-run useEffect when courseId changes

  if (loading) return <div>Loading...</div>; // Show loading state while data is being fetched
  if (error) return <div>{error}</div>; // Show error message if there's an error

  // Render the student results in a table format
  return (
    <div className="p-6 bg-[#efeff6] shadow-md rounded-md">
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
        <thead className="bg-indigo-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Student Name
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Average
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {studentResults.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.name}
              </td>
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {student.scores[col] !== undefined ? student.scores[col] : 'N/A'}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {calculateAverage(student.scores)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center w-full mt-4"><button className="p-3 btn btn-success">
        <Link href={{
          pathname: `/tsubjects/edit/${params.courseId}`,
          query: { bayasi:"baya", aiii:"AAAAh" },
        }}>Update Results</Link>
        </button></div>
    </div>
  </div>
  
  );
}
