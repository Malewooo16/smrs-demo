"use client";
import { ClassType, classTypeObject } from "@/utilities/classesInfo";
import { useEffect, useState } from "react";
import { createNewClass } from "@/actions/classes/createClasses";
import toast from "react-hot-toast";

export default function AddNewClassForm({ schoolId }: { schoolId: any }) {
  const [className, setClassName] = useState("");
  const [nameOfClass, setNameOfClass] = useState("");
  const [metadata, setMetadata] = useState<ClassType>(); // Set metadata as 'any' type to handle the object type

  useEffect(() => {
    setNameOfClass(className + " " + new Date().getFullYear().toString());
  }, [className]);

  // Updated handleInputChange function to set metadata
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassType = e.target.value;
    setClassName(selectedClassType);

    // Find the object in classTypeObject that matches the selected class type
    const selectedMetadata = classTypeObject.find(
      (c) => c.default === selectedClassType
    );

    // Set the metadata to the found object
    setMetadata(selectedMetadata);
   
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You might want to pass metadata to the backend if necessary
    console.log("Submitting class:", { nameOfClass, metadata });

    const results = await createNewClass(nameOfClass, schoolId, metadata);
    results.success
      ? toast.success(results.message)
      : toast.error(results.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Add a new Class</h1>
        <label>
          <p>Select Class Type</p>
          <select
            title="select Class"
            className="select select-bordered w-full max-w-lg my-4"
            onChange={handleSelectChange} // Use updated function
            required
          >
            <option value=""> Select Class Type </option>
            {classTypeObject.map((c) => (
              <option key={c.id} value={c.default}>
                {c.type}
              </option>
            ))}
          </select>
        </label>
        <label>
          <div className="my-4">
            <p className="text-xl font-semibold">Auto Generated Class Name</p>
            <p className="font-semibold my-4"> {nameOfClass} </p>
          </div>
        </label>
        <button className="btn btn-success" type="submit">
          Add Class
        </button>
      </form>
    </div>
  );
}
