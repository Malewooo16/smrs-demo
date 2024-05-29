"use client";

import { AdmissionData, ISchoolAdmission } from "@/utilities/admissionTypes";
import { FormEvent, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { updateAdmissionStatusString } from "@/actions/admissions/validateAdmission";
import { usePathname, useRouter } from "next/navigation";
import {
  sendFailedAdmissionToParent,
  sendPassedAdmissionToParent,
} from "@/actions/parents/sendValidationEmailToParent";

import { FaEdit } from "react-icons/fa";

export function EditAdmissionInfo({ schoolData }: { schoolData: ISchoolData }) {
  const [admissionStatus, setAdmissionStatus] = useState<boolean>(
    schoolData.admissionStatus,
  );
  const [admissionDates, setAdmissionDates] = useState<{
    from: string;
    to: string;
  }>(schoolData.admissionDates);
  const [activeAdmissionClasses, setActiveAdmissionClasses] = useState<
    IAdmissionClass[]
  >([]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionStatus(event.target.checked);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdmissionDates({ ...admissionDates, [name]: value });
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    const name = event.target.getAttribute("data-name")!;
    const selectedId = id;

    if (checked) {
      setActiveAdmissionClasses((prevSelected) => [
        ...prevSelected.filter((ac) => ac.id !== selectedId),
        { id: selectedId, name },
      ]);
    } else {
      setActiveAdmissionClasses((prevSelected) =>
        prevSelected.filter((ac) => ac.id !== selectedId),
      );
    }
    console.log(activeAdmissionClasses);
    console.log(schoolData.classes[0].id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { activeAdmissionClasses, admissionDates, admissionStatus };
    // console.log(schoolData.id, obj)
    const result = await updateSchoolInfo();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">{schoolData.name}</h2>
        <p className="text-gray-600 mb-2">{schoolData.address}</p>
        <p className="text-gray-600 mb-2">Email: {schoolData.emailAddress}</p>
        <div className="text-gray-600 mb-2">
          <label>
            Admission Status:
            <input
              type="checkbox"
              checked={admissionStatus}
              onChange={handleStatusChange}
              className="ml-2"
            />
          </label>
        </div>
        <div className="text-gray-600 mb-2">
          Admission Dates:
          <label className="ml-2">
            From:
            <input
              type="date"
              name="from"
              value={new Date(admissionDates.from).toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="ml-2 input input-bordered"
            />
          </label>
          <label className="ml-2">
            To:
            <input
              type="date"
              name="to"
              value={new Date(admissionDates.to).toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="ml-2 input input-bordered"
            />
          </label>
        </div>
        <div className="text-gray-600 mb-2">
          Admission Classes:
          {schoolData.classes.map((ac) => (
            <label key={ac.id} className="mx-2">
              <input
                type="checkbox"
                id={ac.id}
                data-name={ac.name}
                checked={
                  activeAdmissionClasses &&
                  activeAdmissionClasses.some(
                    (selected) => selected.id == ac.id,
                  )
                }
                onChange={handleClassChange}
                className="mr-1"
              />
              {ac.name}
            </label>
          ))}
        </div>
        <div className="flex max-w-xl justify-between mt-4">
          {" "}
          <button className="btn btn-error"> Cancel </button>{" "}
          <button className="btn btn-success" type="submit">
            {" "}
            Update{" "}
          </button>{" "}
        </div>
      </div>
    </form>
  );
}

export function AdmissionInfo({
  schoolData,
  renderHandler,
}: {
  schoolData: any;
}) {
  const school = schoolData as ISchoolAdmission;
  return (
    <div className=" rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-end w-full">
        {" "}
        <button className="btn" onClick={() => renderHandler(4)}>
          {" "}
          <FaEdit />{" "}
        </button>{" "}
      </div>
      <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
      <p className="text-gray-600 mb-2">{school.address}</p>
      <p className="text-gray-600 mb-2">Email: {school.emailAddress}</p>
      <p className="text-gray-600 mb-2">
        {" "}
        Admission Status: {school.admissionStatus
          ? "Active"
          : "Not Active"}{" "}
      </p>
      <p className="text-gray-600 mb-2">
        {" "}
        Admission Dates:{" "}
        {new Date(school.admissionDates.from).toLocaleDateString()} -{" "}
        {new Date(school.admissionDates.to).toLocaleDateString()}
      </p>
      <p>
        {" "}
        Admission Classes:{" "}
        {school.activeAdmissionClasses.map((ac) => (
          <span key={ac.name} className="mx-2">
            {ac.name}
          </span>
        ))}{" "}
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
                <div className="rounded-lg shadow-md p-6 mb-4">
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
    <div>
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
                <div className="rounded-lg shadow-md p-6 mb-4">
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
