"use client";

import { decryptData } from "@/actions/schools/crypto";
import { ISchoolAdmission, IStudentAdmission } from "@/utilities/admissionTypes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import calculateAge from "@/utilities/ageCalculator";
import BeemPay from "./BeemPay";

export default function ValidateAdmissionData({ schoolData, admission }: { schoolData: any; admission: any }) {
  const school = schoolData as ISchoolAdmission;
  const searchParams = useSearchParams();
  const [selectedClass, setSelectedClass] = useState("");
  const schoolId = parseInt(decryptData(searchParams.get("escuela") as string, "MySuperSecretKeyMySuperSecretKey"));
  const validAdmission = admission as IStudentAdmission;

  const activeAdmissionClasses = school.activeAdmissionClasses.find ((ac)=>{
    return ac.id === parseInt(selectedClass)
  })

  if (
    validAdmission.AdmissionStats &&
    validAdmission.AdmissionStats.some((stats) => stats.schoolId === schoolId)
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#e0f7fa]">
        <h2 className="text-lg text-gray-700">
          The admission for {validAdmission.firstName} {validAdmission.lastName} to {school.name} already exists.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#e0f7fa] p-6 gap-8">
      {/* Left Panel: Student and School Data */}
      <div className="flex flex-col flex-1 gap-8">
        {/* Student Data */}
        <div className="p-6 rounded-lg shadow-lg bg-white border">
          <h1 className="text-2xl font-semibold mb-6 text-teal-700">Student Data</h1>
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 relative rounded-full overflow-hidden shadow-md">
              <Image src={validAdmission.imgUrl as string} fill alt={`Student ${validAdmission.id}`} />
            </div>
            <h2 className="text-xl font-medium mt-4 text-gray-800">
              {validAdmission.firstName} {validAdmission.lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-2">Date of Birth: {new Date(validAdmission.dob).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Age: {calculateAge(validAdmission.dob)}</p>
            <p className="text-sm text-gray-600 mt-2">Address: {validAdmission.homeAddress}</p>
          </div>
        </div>

        {/* School Data */}
        <div className="p-6 rounded-lg shadow-lg bg-white border">
          <h1 className="text-2xl font-semibold text-teal-700 mb-6">School</h1>
          <h2 className="text-lg font-medium text-gray-800">{school.name}</h2>
          <p className="text-sm text-gray-600 mt-2">Address: {school.address}</p>
          <div className="mt-6">
            <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select the Class to be Admitted
            </label>
            <select
              id="class-select"
              className="select select-bordered w-full max-w-xs border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              title="Class Selection"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {school.activeAdmissionClasses.map((ac) => (
                <option key={ac.id} value={ac.id}>
                  {ac.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right Panel: Payment Component */}
      {school.activeAdmissionClasses.length > 0 && (
        <div className="flex items-center justify-center lg:w-1/3">
          <BeemPay selectedClass={selectedClass === "" ? `${school.activeAdmissionClasses[0].id}` : selectedClass} selectedClassName={activeAdmissionClasses?.name as string || school.activeAdmissionClasses[0].name}  />
        </div>
      )}
    </div>
  );
}
