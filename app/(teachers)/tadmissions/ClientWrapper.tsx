"use client";
import {
  AdmissionInfo,
  ApprovedAdmissions,
} from "@/main-components/AdmissionInfoAndActions";
import {EditAdmissionInfo} from "@/main-components/EditAdmissionInfo";
import SearchInput from "@/main-components/SearchInput";
import {AdmissionData} from "@/utilities/admissionTypes";
import {useEffect, useState} from "react";
import {PendingAdmissions} from "../../../main-components/AdmissionInfoAndActions";
import {useSearchParams} from "next/navigation";

export default function ClientWrapperTAdmissions({
  admissions,
  school,
}: {
  admissions: any;
  school: any;
}) {
  const searchParams = useSearchParams();
  const [component, setComponent] = useState(1);
  //console.log(school)
 

  const renderHandler = (num: number) => {
    setComponent(num);
  };

  return (
    <div>
     <div className="my-4">
  <div className="flex space-x-4 border-b mb-4">
    <div
      className={`py-2 px-6 cursor-pointer ${
        component === 1
          ? "border-b-2 border-indigo-500 font-semibold text-indigo-500"
          : "text-gray-500"
      }`}
      onClick={() => renderHandler(1)}
    >
      General
    </div>
    <div
      className={`py-2 px-6 cursor-pointer ${
        component === 2
          ? "border-b-2 border-indigo-500 font-semibold text-indigo-500"
          : "text-gray-500"
      }`}
      onClick={() => renderHandler(2)}
    >
      Pending
    </div>
    <div
      className={`py-2 px-6 cursor-pointer ${
        component === 3
          ? "border-b-2 border-indigo-500 font-semibold text-indigo-500"
          : "text-gray-500"
      }`}
      onClick={() => renderHandler(3)}
    >
      Approved
    </div>
  </div>
</div>


      {component === 1 ? (
        <AdmissionInfo schoolData={school} renderHandler={renderHandler} />
      ) : null}
      {component === 2 ? (
        <PendingAdmissions admissionData={admissions} />
      ) : null}
      {component === 3 ? (
        <ApprovedAdmissions admissionData={admissions} />
      ) : null}
      {component === 4 ? (
        <EditAdmissionInfo schoolData={school} renderHandler={renderHandler} />
      ) : null}
    </div>
  );
}
