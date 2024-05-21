"use client";

import React, { useEffect, useState, useCallback } from "react";
import bridg from "bridg";
import { updateStudentResults } from "@/actions/students/updateStudentRecords";
import toast from "react-hot-toast";

function ScoresManagementUI({ classId }: { classId: number }) {
  const [classData, setClassData] = useState<any>();
  const [studentScores, setStudentScores] = useState<any[]>([]);
  console.log(studentScores);

  useEffect(() => {
    const fetchData = async () => {
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

      const initialScores = localClassData?.StudentT.map((student: any) => ({
        studentId: student.id,
        name: `${student.name} `,
        scores: localClassData.ClassCourse.reduce((acc: any, course: any) => {
          acc[course.course.name] = ""; // Initialize scores with empty string
          return acc;
        }, {}),
        avgScore: 0, // Initialize average score
        rank: 0, // Initialize rank
        courseName: "Semester 2 2024",
      }));

      setStudentScores(initialScores);
    };

    fetchData();
  }, [classId]);

  const updateScoresAndRank = useCallback((updatedScores) => {
    // Calculate average scores
    updatedScores.forEach((student) => {
      const scores = Object.values(student.scores)
        .map((score: string) => parseFloat(score))
        .filter((score: number) => !isNaN(score));
      const sum = scores.reduce((acc: number, score: number) => acc + score, 0);
      const avgScore = scores.length > 0 ? sum / scores.length : 0;
      student.avgScore = avgScore.toFixed(2);
    });

    // Calculate ranks
    const sortedScores = [...updatedScores].sort(
      (a, b) => parseFloat(b.avgScore) - parseFloat(a.avgScore),
    );
    sortedScores.forEach((student, index) => {
      student.rank = index + 1;
    });

    setStudentScores(sortedScores);
    console.log(studentScores);
  }, []);

  const handleScoreChange = useCallback(
    (studentId: number, courseName: string, score: string) => {
      setStudentScores((prevScores) => {
        const updatedScores = [...prevScores];
        const studentIndex = updatedScores.findIndex(
          (student) => student.studentId === studentId,
        );
        if (studentIndex !== -1) {
          updatedScores[studentIndex].scores[courseName] = score;
        }
        updateScoresAndRank(updatedScores);

        return updatedScores;
      });
    },
    [updateScoresAndRank],
  );

  const submitScores = async () => {
    const results = await updateStudentResults(studentScores);
    if (results.success) {
      toast.success(results.message);
    } else {
      toast.error(results.message);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {classData &&
              classData.ClassCourse.map((course: any) => (
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
              {classData &&
                classData.ClassCourse.map((course: any) => (
                  <td key={course.course.id}>
                    <input
                      type="text"
                      value={student.scores[course.course.name]}
                      onChange={(e) =>
                        handleScoreChange(
                          student.studentId,
                          course.course.name,
                          e.target.value,
                        )
                      }
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
