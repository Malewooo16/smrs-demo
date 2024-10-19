import { getClassTeacherClassandStudents } from "@/actions/teachers/getTeacherInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TClass() {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const classAndStudents = await getClassTeacherClassandStudents(
      parseInt(session.user.teacher as string)
    );

    const classData = classAndStudents?.Classes[0];

    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">{classData?.name} Class Details</h1>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Student Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            {classData?.StudentT?.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{student.id} </td>
                <td className="py-3 px-4 text-sm text-gray-700">{student.name}</td>
                <td className="py-3 px-4 text-sm text-indigo-600">
                  <Link href={`/tclass/${student.id}`}>
                    <p className="text-blue-500 hover:underline">View Details</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

   
        
      </div>
    );
  }

  return <div className="text-center text-red-500">No class data found.</div>;
}
