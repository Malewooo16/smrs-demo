"use client";
import { useState } from "react";
import { updateSchoolInfo } from "@/actions/schools/updateSchool";
import toast from "react-hot-toast";

interface ISchoolData {
  id: number;
  name: string;
  address: string;
  emailAddress: string;
  admissionStatus: boolean;
  admissionDates?: {
    from?: string | null;
    to?: string | null;
  };
  classes: IAdmissionClass[];
}

interface IAdmissionClass {
  id: string;
  name: string;
}

export function EditAdmissionInfo({
  schoolData,
  renderHandler,
}: {
  schoolData: ISchoolData;
  renderHandler: (i: number) => void;
}) {
  const [admissionStatus, setAdmissionStatus] = useState<boolean>(
    schoolData.admissionStatus
  );

  // Ensure admissionDates is not null or undefined
  const [admissionDates, setAdmissionDates] = useState<{
    from: string;
    to: string;
  }>({
    from: schoolData.admissionDates?.from || '',
    to: schoolData.admissionDates?.to || ''
  });

  const [activeAdmissionClasses, setActiveAdmissionClasses] = useState<
    IAdmissionClass[]
  >([]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionStatus(event.target.checked);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdmissionDates((prevDates) => ({
      ...prevDates,
      [name]: value
    }));
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    const name = event.target.getAttribute("data-name")!;
    const selectedId = id;
    
    setActiveAdmissionClasses((prevSelected) => {
      const newSelected = checked 
        ? [...prevSelected.filter((ac) => ac.id !== selectedId), { id: selectedId, name }]
        : prevSelected.filter((ac) => ac.id !== selectedId);

      return newSelected;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = { activeAdmissionClasses, admissionDates, admissionStatus };
    const result = await updateSchoolInfo(schoolData.id, obj);
    if(result.success){
      renderHandler(4);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
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
              value={admissionDates.from}
              onChange={handleDateChange}
              className="ml-2 input input-bordered"
            />
          </label>
          <label className="ml-2">
            To:
            <input
              type="date"
              name="to"
              value={admissionDates.to}
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
                    (selected) => selected.id == ac.id
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
          <button className="btn btn-error" type="button" onClick={() => renderHandler(1)}>
            Cancel
          </button>
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
