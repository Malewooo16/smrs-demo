//@ts-nocheck

import {getSingleStudent} from "@/actions/students/getStudentInfo";
import {redirect} from "next/navigation";
import Image from "next/image";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export default async function StudentPage({params}: {params: {id: string}}) {
  const student = await getSingleStudent(parseInt(params.id));

  if (!student) {
    redirect(`/not-found`);
  }

  const studentData = student.studentData;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex items-center space-x-6 mb-6 justify-between">
        {/* Student Image */}
        <div className="w-24 h-24 relative">
          <Image
            src={studentData?.imgUrl as string}
            alt={`${studentData?.firstName} ${studentData?.lastName}`}
            className="rounded-full object-cover"
            layout="fill"
          />

          
        </div>

        {/* Student Information */}
        <div>
          <h1 className="text-3xl font-bold">
            {studentData?.firstName} {studentData?.lastName}
          </h1>
          <p className="text-gray-600">
            Date of Birth: {moment(studentData?.dob).format("LL")}
          </p>
          <p className="text-gray-600">
            Home Address: {studentData?.homeAddress}
          </p>
        </div>

        <button className="btn-submit w-48">Edit Student Details</button>
      </div>

      {/* Academic Records */}
      <h2 className="text-2xl font-semibold mb-4">Academic Records</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
              Term
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
              Subject
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {student.results?.map((termResult) => (
            <React.Fragment key={termResult?.name}>
              {Object.entries(termResult.scores).map(([subject, score]) => (
                <tr key={subject} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {termResult?.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{subject}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{score}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={2} className="py-3 px-4 font-semibold">
                  Average
                </td>
                <td className="py-3 px-4 font-semibold">{termResult.avg}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-end">
        <button className="btn btn-submit w-1/4 my-2">
        <Link
          className="h-full block py-2"
          href={`/tnotifications/new-student-notice?student=${student.id}`}
        >
          Send Notice To Parents
        </Link>
        </button>
      </div>
    </div>
  );
}
