'use client';

import { updateClassCourseScores } from '@/actions/subjects/updateStudentScores';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Type definition for Student
interface Student {
  id: number;
  name: string;
  scores: any; // A record to keep scores by tags
}

interface Props {
  studentsData: Student[];
  courseId: number;
  teacherId: number;
}

const StudentScoresManager: React.FC<Props> = ({ studentsData, courseId, teacherId }) => {
  const [students, setStudents] = useState<Student[] >(studentsData);
  const [newTag, setNewTag] = useState<string>('');
  const [columns, setColumns] = useState<string[]>([]);

  // Initialize columns from scores data
  useEffect(() => {
    const initialColumns = new Set<string>();
    studentsData.forEach(student => {
      Object.keys(student.scores).forEach(scoreTag => initialColumns.add(scoreTag));
    });
    setColumns(Array.from(initialColumns));
  }, [studentsData]);

  // Function to handle score changes
  const handleScoreChange = (studentId: number, tag: string, value: number) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        // Ensure scores is always an object
        const updatedScores = student.scores || {};
        return { ...student, scores: { ...updatedScores, [tag]: value } };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Function to calculate the average of scores for a student
  const calculateAverage = (scores: Record<string, number>) => {
    const totalScores = Object.values(scores);
    if (totalScores.length === 0) return 0;
    const sum = totalScores.reduce((acc, score) => acc + score, 0);
    return Math.round(sum / totalScores.length);
  };

  // Function to add a new tag (column)
  const addTag = () => {
    if (newTag.trim() === '' || columns.includes(newTag)) return; // Prevent empty or duplicate tags
    setColumns([...columns, newTag]);
    setNewTag('');
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const dataToSubmit = students.map((student) => {
      const average = calculateAverage(student.scores);
      return {
        studentId: student.id,
        courseId, // Assume a fixed courseId for now; replace with dynamic as needed
        score: {
          ...student.scores,
        },
      };
    });

    console.log(dataToSubmit);
    const response = await updateClassCourseScores(courseId, teacherId, dataToSubmit);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manage Student Scores</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2  text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              {columns.map((column) => (
                <th key={column} className="px-4 py-2 text-left">{column}</th>
              ))}
              <th className="px-4 py-2 text-left">Average</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2">{student.name}</td>
                {columns.map((column) => (
                  <td key={column} className="px-4 py-2">
                    <input
                      type="number"
                      value={student.scores[column] || ''}
                      onChange={(e) =>
                        handleScoreChange(student.id, column, parseInt(e.target.value, 10))
                      }
                      className="border px-2 py-1 rounded w-20"
                      placeholder="Score"
                    />
                  </td>
                ))}
                <td className="px-4 py-2">{calculateAverage(student.scores)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium">Add a New Score Tag</h3>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="border px-3 py-2 rounded-md mr-2"
          />
          <button
            onClick={addTag}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Tag
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Submit Scores
        </button>
      </div>
    </div>
  );
};

export default StudentScoresManager;
