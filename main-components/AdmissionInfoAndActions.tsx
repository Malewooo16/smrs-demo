"use client";

import { AdmissionData, ISchoolAdmission } from "@/utilities/admissionTypes";
import { FormEvent, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  sendFailedAdmissionToParent,
  sendPassedAdmissionToParent,
} from "@/actions/parents/sendValidationEmailToParent";

import { FaEdit } from "react-icons/fa";





interface AdmissionInfoProps {
  schoolData: ISchoolAdmission;
  renderHandler: (i: number) => void;
}

export function AdmissionInfo({ schoolData, renderHandler }: AdmissionInfoProps) {
  const school = schoolData;

  // Default date to current date if not available
  const defaultDate = new Date().toLocaleDateString();

  // Ensure admissionDates is not null or undefined
  const admissionDates = school.admissionDates || {};
  
  // Handle null or undefined dates
  const fromDate = admissionDates.from ? new Date(admissionDates.from).toLocaleDateString() : defaultDate;
  const toDate = admissionDates.to ? new Date(admissionDates.to).toLocaleDateString() : defaultDate;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center w-full">
      <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
        <button className="btn" onClick={() => renderHandler(4)}>
          <FaEdit />
        </button>
      </div>
      
      <p className="text-gray-600 mb-2">{school.address}</p>
      <p className="text-gray-600 mb-2">Email: {school.emailAddress}</p>
      <p className="text-gray-600 mb-2">
        Admission Status: {school.admissionStatus ? 'Active' : 'Not Active'}
      </p>
      <p className="text-gray-600 mb-2">
        Admission Dates: {fromDate} - {toDate}
      </p>
      <p>
        Admission Classes:{' '}
        {school.activeAdmissionClasses.length > 0 ? (
          school.activeAdmissionClasses.map((ac) => (
            <span key={ac.name} className="mx-2">
              {ac.name}
            </span>
          ))
        ) : (
          <span>No classes available</span>
        )}
      </p>
    </div>
  );
}


export function PendingAdmissions({ admissionData }: { admissionData: any }) {
  const admissions = admissionData as AdmissionData[];
  const [search, setSearch] = useState(" ");
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="my-4">
        {" "}
        <SearchInput searchHandler={searchHandler} />{" "}
      </div>
      <p className="text-lg font-semibold">Pending Admissions</p>
      <ul className="my-4">
        {admissions
          .filter((a) => {
            return a.status === "Pending";
          })
          .filter((item) => {
            return search.toLowerCase() === " "
              ? item
              : item.admission.firstName.toLowerCase().includes(search);
          })
          .map((a) => (
            <li key={a.admissionId}>
              <Link href={`/tadmissions/${a.admissionId}`}>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h1 className="text-xl">
                    {" "}
                    {a.admission.firstName} {a.admission.lastName}{" "}
                  </h1>
                  <p> {a.admission.homeAddress} </p>
                  <p> {a.admission.dob.toLocaleDateString()} </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
export function ApprovedAdmissions({ admissionData }: { admissionData: any }) {
  const pathname = usePathname();
  const admissions = admissionData as AdmissionData[];
  const [search, setSearch] = useState(" ");
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="">
      <div className="my-4">
        {" "}
        <SearchInput searchHandler={searchHandler} />{" "}
      </div>
      <p className="text-lg font-semibold">Approved Admissions</p>

      <ul className="my-4">
        {admissions
          .filter((a) => {
            return a.status === "Accepted";
          })
          .filter((item) => {
            return search.toLowerCase() === " "
              ? item
              : item.admission.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase());
          })
          .map((a) => (
            <li key={a.admissionId}>
              <Link href={`/tadmissions/${a.admissionId}`}>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h1 className="text-xl">
                    {" "}
                    {a.admission.firstName} {a.admission.lastName}{" "}
                  </h1>
                  <p> {a.admission.homeAddress} </p>
                  <p> {a.admission.dob.toLocaleDateString()} </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
export function UpdateAdmissionStatus({
  admissionId,
  admissionInfo,
}: {
  admissionId: string;
  admissionInfo: any;
}) {
  const { parentEmail, studentName, schoolName, schoolId, classId } =
    admissionInfo;
  const router = useRouter();
  const [showForm, setshowForm] = useState(false);
  const [loading, setloading] = useState(false);
  const [selected, setSelected] = useState(" ");
  const [validationErr, setValidationErr] = useState("");
  useEffect(() => {
    if (selected === "Accepted" || selected === "Rejected") {
      setValidationErr("");
    }
  }, [selected]);
  const updateAdmission = async () => {
    setloading(true);
    try {
      const sendFunction =
        selected === "Accepted"
          ? sendPassedAdmissionToParent
          : sendFailedAdmissionToParent;
      const results = await sendFunction(
        admissionId,
        parentEmail,
        studentName,
        schoolName,
        schoolId,
        classId,
      );
      if (!results.success) {
        alert(results.message);
      }
      router.push(`/tadmissions?T=2`);
    } catch {
      setloading(false);
      alert("Error Occurred");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected !== "Accepted" && selected !== "Rejected") {
      setValidationErr("Valid Status Required");
      return;
    }
    updateAdmission();
  };

  return (
    <div>
      <div className="flex  mt-4">
        {" "}
        <button
          className={`btn btn-info ${showForm ? "hidden" : " "}`}
          onClick={() => setshowForm(true)}
        >
          Update Admission Status
        </button>{" "}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <select
            title="Update Admission Status"
            className="select select-bordered w-full max-w-xl"
            required
            onChange={(e) => setSelected(e.target.value)}
          >
            <option disabled selected>
              Select admission Status
            </option>
            <option className="text-success text-lg">Accepted</option>
            <option className="text-error text-lg"> Rejected</option>
          </select>
          <button
            className="btn btn-success mx-4"
            disabled={loading}
            type="submit"
          >
            {" "}
            Update{" "}
          </button>
          <div>
            {" "}
            <p className="text-md text-error">{validationErr}</p>{" "}
          </div>
        </form>
      )}
    </div>
  );
}
