"use client"
import { decryptData } from "@/actions/schools/crypto";
import { ISchoolAdmission, IStudentAdmission } from "@/utilities/admissionTypes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import BeemPay from "./BeemPay";
import { useEffect, useState } from "react";

export default function ValidateAdmissionData({ schoolData, admission }: { schoolData: any; admission: any }) {
  const school = schoolData as ISchoolAdmission
  const searchParams = useSearchParams()
  const [selectedClass, setselectedClass] = useState("");
  const schoolId = parseInt(decryptData(searchParams.get("escuela"), "MySuperSecretKeyMySuperSecretKey"))
  const validAdmission = admission as IStudentAdmission;

  if(validAdmission.AdmissionStats.some(stats => stats.schoolId === schoolId )){
    return (
      <h2 className="text-lg">The admission for {validAdmission.firstName} {validAdmission.lastName} to {school.name} already exists </h2>
    )
  }

  return (
   <div className="flex h-full">
     <div className="flex flex-col flex-1 mx-2 lg:w-auto justify-center items-start gap-10 ">
      {/* Should Be Refactored as a Separate Component */}
      {/* Student Data */}
      <div className="min-w-md w-full p-6 border rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Student Data</h1>
        <div className="border-b-2 w-full"></div>
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 relative rounded-full overflow-hidden my-4">
            <Image src={validAdmission.imgUrl as string}  fill alt={validAdmission.id} />
          </div>
          <h2 className="text-lg font-semibold">{validAdmission.firstName} {validAdmission.lastName}</h2>
          <p className="text-sm mb-2">Date of Birth: {new Date(validAdmission.dob).toLocaleDateString()}</p>
          <p className="text-sm mb-2">Address: {validAdmission.homeAddress}</p>
        </div>
      </div>

      {/* School */}
      <div className="min-w-md w-full p-6 border rounded-lg shadow-md">
        <h1 className="text-xl font-semibold ">School</h1>
        <div className="border-b-2 w-full my-4"></div>
        <div>
          <h2 className="text-lg font-semibold">{school.name}</h2>
          <p className="text-sm mb-2">Address: {school.address}</p>
        </div>
        <p> Select the Class to be Admitted </p>
        <select className="select select-bordered w-full max-w-xs" onChange={(e)=>setselectedClass(e.target.value)}>
        {school.activeAdmissionClasses.map((a, index)=> (
          <option key={index} value={a.id.toString()}> {a.name} </option>
        ))}
</select>
      </div>
    </div>
    <BeemPay selectedClass={selectedClass==="" ? school.activeAdmissionClasses[0].id.toString() : selectedClass} />
   </div>
  );
}
