"use client"
import React, { useEffect, useState, useCallback } from "react";
import bridg from "bridg";
import { updateStudentResults } from "@/actions/students/updateStudentRecords";
import toast from "react-hot-toast";

// Define interfaces for class and student data
interface ClassData {
  id: number;
  ClassCourse: { courseId: number; course: { id: number; name: string } }[];
  StudentT: { id: number; name: string }[];
}

interface StudentScore {
  studentId: number;
  name: string;
  scores: Record<string, string>;
  avgScore: string;
  rank: number;
  courseName: string;
}

function ScoresManagementUI({ classId }: { classId: number }) {
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [studentScores, setStudentScores] = useState<StudentScore[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localClassData = await bridg.classes.findUnique({
          where: { id: classId },
          include: {
            StudentT: {
              select: {
                id: true,
                name: true,
              },
            },
            ClassCourse: {
              select: {
                courseId: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
        setClassData(localClassData);

        const initialScores = localClassData?.StudentT.map((student) => ({
          studentId: student.id,
          name: `${student.name} `,
          scores: localClassData.ClassCourse.reduce((acc, course) => {
            acc[course.course.name] = ""; // Initialize scores with empty string
            return acc;
          }, {} as Record<string, string>),
          avgScore: "0", // Initialize average score
          rank: 0, // Initialize rank
          courseName: "Semester 2 2024",
        }));

        setStudentScores(initialScores || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classId]);

  const updateScoresAndRank = useCallback((updatedScores: StudentScore[]) => {
    // Calculate average scores and update ranks
    const updatedScoresWithAvg = updatedScores.map((student) => {
      const scoresArray = Object.values(student.scores).map(parseFloat).filter((score) => !isNaN(score));
      const sum = scoresArray.reduce((acc, score) => acc + score, 0);
      const avgScore = scoresArray.length > 0 ? (sum / scoresArray.length).toFixed(2) : "0";
      return { ...student, avgScore };
    });

    const sortedScores = [...updatedScoresWithAvg].sort((a, b) => parseFloat(b.avgScore) - parseFloat(a.avgScore));
    sortedScores.forEach((student, index) => {
      student.rank = index + 1;
    });

    setStudentScores(sortedScores);
  }, []);

  const handleScoreChange = useCallback((studentId: number, courseName: string, score: string) => {
    if (!studentScores) return;

    setStudentScores((prevScores) => {
      if (!prevScores) return null; // Handle the case where prevScores is null
    
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
  }, [updateScoresAndRank, studentScores]);

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

  if (!classData || !studentScores) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {classData.ClassCourse.map((course) => (
              <th key={course.course.id}>{course.course.name}</th>
            ))}
            <th>Average</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {studentScores.map((student) => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              {classData.ClassCourse.map((course) => (
                <td key={course.course.id}>
                  <input
                    type="text"
                    value={student.scores[course.course.name]}
                    onChange={(e) => handleScoreChange(student.studentId, course.course.name, e.target.value)}
                  />
                </td>
              ))}
              <td>{student.avgScore}</td>
              <td>{student.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4">
        <button className="btn btn-success" onClick={submitScores}>
          Update Results
        </button>
      </div>
    </div>
  );
}

export default ScoresManagementUI;
