"use client"
import React, { useState, useEffect } from "react";
import bridg from "bridg";
import { useSearchParams } from "next/navigation";

// Define interfaces
interface StudentT {
  id: number;
  name: string;
  scores: { [courseName: string]: CourseScores };
}

interface CourseScores {
  [test: string]: string | number;
}

function UpdateScoresWithFetching({ courseId }: { courseId: number }) {
  const searchParams = useSearchParams();
  const teacherId = parseInt(searchParams.get("access") as string);
  const classId = parseInt(searchParams.get("classId") as string);
  const [students, setStudents] = useState<StudentT[]>([]);
  const [newScoreColumnName, setNewScoreColumnName] = useState("");

  useEffect(() => {
    async function fetchStudentScores() {
      try {
        const studentsData = await bridg.studentT.findMany({
          where: {
            classId,
          },
          include: {
            courseEnrollments: {
              where: {
                courseId,
                course: {
                  ClassCourse: {
                    some: {
                      teacherId,
                    },
                  },
                },
              },
              include: {
                course: true,
              },
            },
          },
        });

        const formattedStudents: StudentT[] = studentsData.map((student: any) => {
          const scores: { [courseName: string]: CourseScores } = {};

          student.courseEnrollments.forEach((enrollment: any) => {
            const courseName = enrollment.course.name;

            // Check if score is null or not
            if (enrollment.score !== null) {
              scores[courseName] = enrollment.score as CourseScores; // Type assertion
            } else {
              scores[courseName] = {}; // Assign empty object if score is null
            }
          });

          return {
            id: student.id,
            name: student.name,
            scores,
          };
        });

        setStudents(formattedStudents);
      } catch (error) {
        console.error("Error fetching student scores:", error);
      }
    }

    fetchStudentScores();
  }, [classId, courseId, teacherId]);

  const handleScoreUpdate = async (
    studentId: number,
    newScores: { [courseName: string]: CourseScores }
  ) => {
    try {
      // Your update score logic here
      console.log("Scores updated for student:", studentId, newScores);
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  const handleAddScoreColumn = () => {
    // Add a new score column to each student's scores object
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        scores: {
          ...student.scores,
          [newScoreColumnName]: {}, // Initialize with empty object
        },
      }))
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter new score column name"
          value={newScoreColumnName}
          onChange={(e) => setNewScoreColumnName(e.target.value)}
        />
        <button onClick={handleAddScoreColumn}>Add Score Column</button>
      </div>
      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <ul>
            {Object.entries(student.scores).map(([courseName, scores]) => (
              <li key={courseName}>
                <span>{courseName}: </span>
                {Object.entries(scores).map(([test, score]) => (
                  <input
                    key={test}
                    type="text"
                    value={score as string}
                    onChange={(e) => {
                      const newScores = {
                        ...student.scores,
                        [courseName]: {
                          ...student.scores[courseName],
                          [test]: e.target.value,
                        },
                      };
                      handleScoreUpdate(student.id, newScores);
                    }}
                  />
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UpdateScoresWithFetching;
