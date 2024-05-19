"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

// Define interfaces
interface StudentT {
  id: number;
  name: string;
  scores: { [property: string]: number | string };
}

function ScoreUpdateForm({
  courseId,
  studentsData,
}: {
  courseId: number;
  studentsData: StudentT[];
}) {
  const searchParams = useSearchParams();
  const teacherId = parseInt(searchParams.get("access") as string);
  const classId = parseInt(searchParams.get("classId") as string);
  const [students, setStudents] = useState<StudentT[]>(studentsData);
  const [newScorePropertyName, setNewScorePropertyName] = useState("");
  const [newScorePropertyValue, setNewScorePropertyValue] = useState("");

  // Function to calculate the average score for a student
  function calculateAverageScore(student: StudentT): number {
    const scores = Object.values(student.scores).map((score) =>
      typeof score === "string" ? parseInt(score, 10) : score,
    ) as number[];
    const numericScores = scores.filter((score) => !isNaN(score)); // Filter out non-numeric scores
    const sum = numericScores.reduce((total, score) => total + score, 0);
    const average = sum / numericScores.length;
    return isNaN(average) ? 0 : average; // Return 0 if there are no numeric scores
  }

  const handleScoreUpdate = (
    studentId: number,
    propertyName: string,
    propertyValue: string | number,
  ) => {
    try {
      // Update the score for the specified student in the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? {
                ...student,
                scores: {
                  ...student.scores,
                  [propertyName]: propertyValue,
                },
              }
            : student,
        ),
      );
      console.log(students[0].scores);
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  const handleSaveScores = async () => {
    try {
      const studentsScores = students.map((student) => ({
        studentId: student.id,
        newScores: student.scores,
      }));
      console.log(classId, courseId, teacherId, studentsScores);
      console.log("Scores updated successfully!");
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  const handleAddScoreProperty = () => {
    // Add a new score property to each student's scores object
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        scores: {
          ...student.scores,
          [newScorePropertyName]: newScorePropertyValue, // Initialize with empty value
        },
      })),
    );
    // Reset input fields
    setNewScorePropertyName("");
    setNewScorePropertyValue("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter new score property name"
          value={newScorePropertyName}
          onChange={(e) => setNewScorePropertyName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Enter new score property value"
          value={newScorePropertyValue}
          onChange={(e) => setNewScorePropertyValue(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 hidden"
        />
        <button
          onClick={handleAddScoreProperty}
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Add Score Property
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            {Object.keys(students[0].scores).map((propertyName) => (
              <th key={propertyName}>{propertyName}</th>
            ))}
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {Object.entries(student.scores).map(
                ([propertyName, propertyValue]) => (
                  <td key={propertyName}>
                    <input
                      type="text"
                      value={propertyValue}
                      onChange={(e) => {
                        handleScoreUpdate(
                          student.id,
                          propertyName,
                          e.target.value,
                        );
                      }}
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                  </td>
                ),
              )}
              <td>{calculateAverageScore(student)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleSaveScores}
          className="bg-green-500 text-white rounded-md px-4 py-2"
        >
          Save Scores
        </button>
      </div>
    </div>
  );
}

export default ScoreUpdateForm;
