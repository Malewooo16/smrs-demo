import { getSingleClass } from '@/actions/classes/getClasses';
import { schoolInfoFromTeacherId } from '@/actions/schools/getSchoolInfo';
import { getAllStudentInClass, getAllStudentInfo } from '@/actions/students/getStudentInfo';
import AgeComponent from '@/app/main-components/AgeCalculator';
import { authOptions } from '@/utilities/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function StudentsPerClass({params, searchParams}:{params: {classId:string}, searchParams:{className:string}}) {
    const session = await getServerSession(authOptions)
    let schoolId;
    if(session?.user.teacher){
        const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher))
        schoolId = school?.id || 0
    }
    const students = await getAllStudentInClass(schoolId as number, parseInt(params.classId))

    const classData = await getSingleClass(schoolId as number, parseInt(params.classId));
    //console.log(classData)
  return (
    <div className="container mx-auto">
    <h1 className='text-2xl text-center'> {classData?.name} </h1>
  <table className="min-w-full">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Address</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* JavaScript code to map over studentInfo array and generate table rows */}
      {students && students.length >0 ? students.map((student) => (
        <tr key={student.id} className="hover:bg-gray-100">
          <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
          <td className="px-6 py-4 whitespace-nowrap">{student.studentData?.firstName}</td>
          <td className="px-6 py-4 whitespace-nowrap">{student.studentData?.lastName}</td>
          <td className="px-6 py-4 whitespace-nowrap"> <AgeComponent dob={student.studentData?.dob as Date} /> </td>
          <td className="px-6 py-4 whitespace-nowrap">{student.studentData?.homeAddress}</td>
        </tr>
      )) : (<p>No Students Available</p>)}
      {/* End JavaScript code */}
    </tbody>
  </table>
</div>


  )
}
