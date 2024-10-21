"use client";
import {
  AdmissionInfo,
  ApprovedAdmissions,
} from "@/main-components/AdmissionInfoAndActions";
import {useEffect, useState} from "react";
import {PendingAdmissions} from "../../../main-components/AdmissionInfoAndActions";
import {useSearchParams} from "next/navigation";
import StudentsInformation from "@/main-components/StudentsInformation";

export default function ClientWrapperPStudents() {
  const searchParams = useSearchParams();
  const [component, setComponent] = useState(1);

  const renderHandler = (num: number) => {
    setComponent(num);
  };

  return (
    <div>
      <div className="my-4">
        <div className="flex justify-between w-[22rem] bg-base-200 p-2 rounded-xl">
          <div
            className={`rounded-lg px-4 py-1 cursor-pointer  hover:bg-base-300  ${
              component === 1 ? "bg-base-300" : " "
            }`}
            onClick={() => renderHandler(1)}
          >
            General
          </div>
          <div
            className={`rounded-lg px-4 py-1 cursor-pointer hover:bg-base-300 ${
              component === 2 ? "bg-base-300" : ""
            }`}
            onClick={() => renderHandler(2)}
          >
            Pending
          </div>
          <div
            className={`rounded-lg  px-4 py-1 cursor-pointer hover:bg-base-300 ${
              component === 3 ? "bg-base-300" : ""
            }`}
            onClick={() => renderHandler(3)}
          >
            Approved
          </div>
        </div>
      </div>

      {component === 1 ? <StudentsInformation /> : null}
    </div>
  );
}
