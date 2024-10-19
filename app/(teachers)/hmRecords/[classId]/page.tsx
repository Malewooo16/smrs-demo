//@ts-nocheck

import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getAllStudentInClass } from "@/actions/students/getStudentInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";


const RecordsManager = async ({ params, searchParams }: { params: { classId: string }, searchParams: { term: string } }) => {
  const session = await getServerSession(authOptions);

  if (session?.user.teacher && session.user.role.toLocaleLowerCase() === "headteacher") {
    const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
    const students = await getAllStudentInClass(school?.id as number, parseInt(params.classId));

    // Get the term from search parameters
    const term = searchParams.term;

    // Filter students based on the selected term
    const filteredStudents = students.map(student => {
      const filteredResults = student.results.filter(result => result.name === term);
      return {
        ...student,
        results: filteredResults
      };
    }).filter(student => student.results.length > 0); // Only include students with results for the selected term

    // Calculate ranks based on average scores for the filtered results
    const studentsWithRank = filteredStudents.map(student => ({
      ...student,
      avgScore: student.results.length > 0 ? parseFloat(student.results[0].avg) : 0 // Average score for the filtered term
    })).sort((a, b) => b.avgScore - a.avgScore) // Sort descending by average score
      .map((student, index) => ({
        ...student,
        rank: index + 1 // Assign ranks based on sorted order
      }));

    return (
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Student Records for {term}</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Rank</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Average Score</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Scores</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Send To Parent</th>
            </tr>
          </thead>
          <tbody>
            {studentsWithRank.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-gray-800">{student.rank}</td>
                <td className="py-2 px-4 text-gray-800">{student.name}</td>
                <td className="py-2 px-4 text-gray-800">{student.avgScore.toFixed(2)}</td>
                <td className="py-2 px-4 text-gray-800">
                  <ul>
                    {student.results.length > 0 ? (
                      student.results[0].scores && Object.entries(student.results[0].scores).map(([subject, score]) => (
                        <li key={subject}>
                          {subject}: {score}
                        </li>
                      ))
                    ) : (
                      <li>No scores available</li>
                    )}
                  </ul>
                </td>
                <td className="py-2 text-gray-800">
                  <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send to Parent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>You do not have permission to view this page.</div>;
};

export default RecordsManager;
