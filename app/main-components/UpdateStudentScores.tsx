"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import bridg from "bridg";

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

  console.log(students[0].scores);
  const handleScoreUpdate = async (
    studentId: number,
    propertyName: string,
    propertyValue: string | number,
  ) => {
    try {
      // Update the score for the specified student
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
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreUpdateForm;
