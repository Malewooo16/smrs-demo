//@ts-nocheck
"use client";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { updateStudentResults } from "@/actions/students/updateStudentRecords";
import { getAdvancedStudentData } from "@/actions/students/getStudentInfo";
import { useSearchParams } from "next/navigation";

// Define interfaces for class and student data
interface ClassData {
  id: number;
  classCourses: { courseId: number; course: { id: number; name: string } }[];
  StudentT: { id: number; name: string; results: { avg: string; name: string; scores: Record<string, string>; }[] }[];
}

interface StudentScore {
  studentId: number;
  name: string;
  scores: Record<string, string>;
  avgScore: string;
  term: string;
}

function ScoresManagementUI({ classId }: { classId: number }) {
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [studentScores, setStudentScores] = useState<StudentScore[] | null>(null);
  const searchParams = useSearchParams();

  const term = searchParams.get("term");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localClassData = await getAdvancedStudentData(classId);
        if (localClassData) {
          setClassData(localClassData);

          // Get results for the specified term
          const initialScores = localClassData.StudentT.map((student) => {
            // Find the result for the current term
            const studentResult = student.results.find((result) => result.name === term);
            
            // Initialize scores with either existing scores or empty strings
            const scores = studentResult ? studentResult.scores : localClassData.classCourses.reduce((acc, course) => {
              acc[course.course.name] = ""; // Initialize scores with empty string
              return acc;
            }, {} as Record<string, string>);

            return {
              studentId: student.id,
              name: `${student.name} `,
              scores,
              avgScore: studentResult ? studentResult.avg : "0", // Set average score if exists
              term: term as string, // Initialize term
            };
          });

          setStudentScores(initialScores);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classId, term]); // Add term as a dependency

  const updateScoresAndRank = useCallback((updatedScores: StudentScore[]) => {
    const updatedScoresWithAvg = updatedScores.map((student) => {
      const scoresArray = Object.values(student.scores).map(parseFloat).filter((score) => !isNaN(score));
      const sum = scoresArray.reduce((acc, score) => acc + score, 0);
      const avgScore = scoresArray.length > 0 ? (sum / scoresArray.length).toFixed(2) : "0";
      return { ...student, avgScore };
    });


    setStudentScores(updatedScoresWithAvg);
  }, []);

  const handleScoreChange = useCallback(
    (studentId: number, courseName: string, score: string) => {
      if (!studentScores) return;

      setStudentScores((prevScores) => {
        if (!prevScores) return null;

        const updatedScores = prevScores.map((student) => {
          if (student.studentId === studentId) {
            return {
              ...student,
              scores: {
                ...student.scores,
                [courseName]: score,
              },
            };
          }
          return student;
        });

        updateScoresAndRank(updatedScores);
        return updatedScores;
      });
    },
    [updateScoresAndRank, studentScores]
  );

  const submitScores = async () => {
    if (!studentScores) return;

    try {
      const results = await updateStudentResults(studentScores);
      if (results.success) {
        toast.success(results.message);
      } else {
        toast.error(results.message);
      }
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
            {classData.classCourses.map((course) => (
              <th key={course.course.id} className="py-3 px-4 text-left text-gray-700 font-semibold">
                {course.course.name}
              </th>
            ))}
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">Average</th>
            {/* Optionally remove the Rank column */}
            {/* <th className="py-3 px-4 text-left text-gray-700 font-semibold">Rank</th> */}
          </tr>
        </thead>
        <tbody>
          {studentScores?.map((student) => (
            <tr key={student.studentId} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-800">{student.name}</td>
              {classData.classCourses.map((course) => (
                <td key={course.course.id} className="py-2 px-4">
                  <input
                    type="text"
                    value={student.scores[course.course.name]}
                    onChange={(e) => handleScoreChange(student.studentId, course.course.name, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </td>
              ))}
              <td className="py-2 px-4 text-gray-800">{student.avgScore}</td>
              {/* Optionally display the Rank */}
              {/* <td className="py-2 px-4 text-gray-800">{student.rank}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4 flex justify-end">
        <button className="btn btn-submit" onClick={submitScores}>
          Update Results
        </button>
      </div>
    </div>
  );
}

export default ScoresManagementUI;
