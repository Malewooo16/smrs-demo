"use client";
import { useState } from "react";
import { updateSchoolInfo } from "@/actions/schools/updateSchool";
import toast from "react-hot-toast";



interface ISchoolData {
  id:number;
  name: string;
  address: string;
  emailAddress: string;
  admissionStatus: boolean;
  admissionDates: {
    from: string;
    to: string;
  };
  classes: IAdmissionClass[];
}

interface IAdmissionClass {
  id: string;
  name: string;
}

export function EditAdmissionInfo({ schoolData, renderHandler }: { schoolData: ISchoolData; renderHandler:(i:number) => void }) {
  const [admissionStatus, setAdmissionStatus] = useState<boolean>(
    schoolData.admissionStatus
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
      setActiveAdmissionClasses((prevSelected) => prevSelected.filter((ac) => ac.id !== selectedId)
      );
    }
    console.log(activeAdmissionClasses);
    console.log(schoolData.classes[0].id);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = { activeAdmissionClasses, admissionDates, admissionStatus };
    // console.log(schoolData.id, obj)
    const result = await updateSchoolInfo(schoolData.id, obj);
    result.success ? toast.success(result.message) : toast.error(result.message)
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
              className="ml-2" />
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
              className="ml-2 input input-bordered" />
          </label>
          <label className="ml-2">
            To:
            <input
              type="date"
              name="to"
              value={new Date(admissionDates.to).toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="ml-2 input input-bordered" />
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
                checked={activeAdmissionClasses &&
                  activeAdmissionClasses.some(
                    (selected) => selected.id == ac.id
                  )}
                onChange={handleClassChange}
                className="mr-1" />
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
