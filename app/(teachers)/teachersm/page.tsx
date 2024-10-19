import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getAllTeachers } from "@/actions/teachers/getTeacherInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.teacher && session.user.role.toLocaleLowerCase() === "headteacher") {
    const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
    const teachers = await getAllTeachers(school?.id as number);

    return (
      <div className="w-full p-6">
        <h1 className="text-center text-2xl font-bold mb-6">Teachers Management</h1>

        <div className="flex justify-end"> <button className="btn btn-success mb-3 "><Link href={`/teachersm/new-teacher`} className="block h-full py-4">New Teacher</Link> </button>   </div>
        {/* Table to display teacher data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone Number</th>
                {/* <th className="px-4 py-2 border">Academics Access</th>
                <th className="px-4 py-2 border">Admissions Access</th>
                <th className="px-4 py-2 border">Discipline Access</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teachers && teachers?.length > 0 && teachers.map((teacher) => (
                <tr key={teacher.id} className="text-center">
                  <td className="px-4 py-2 border">{teacher.firstName}</td>
                  <td className="px-4 py-2 border">{teacher.lastName}</td>
                  <td className="px-4 py-2 border">{teacher.email}</td>
                  <td className="px-4 py-2 border">{teacher.phoneNumber}</td>
                  {/* <td className={`px-4 py-2 border ${teacher.canAccessAcademics ? "text-green-600" : "text-red-600"}`}>
                    {teacher.canAccessAcademics ? "Yes" : "No"}
                  </td>
                  <td className={`px-4 py-2 border ${teacher.canAccessAdmissions ? "text-green-600" : "text-red-600"}`}>
                    {teacher.canAccessAdmissions ? "Yes" : "No"}
                  </td>
                  <td className={`px-4 py-2 border ${teacher.canAccessDiscpline ? "text-green-600" : "text-red-600"}`}>
                    {teacher.canAccessDiscpline ? "Yes" : "No"}
                  </td> */}
                  <td className="px-4 py-2 border">
                     <Link href={`/teachersm/${teacher.id}`} className="font-semibold hover:underline">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-red-500">Unauthorized Access. Please log in as a Headteacher.</h1>
    </div>
  );
}
