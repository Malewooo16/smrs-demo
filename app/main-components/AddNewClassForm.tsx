"use client";
import { classTypeObject } from "@/utilities/classesInfo";
import { useEffect, useState } from "react";
import { createNewClass } from "@/actions/classes/createClasses";
import toast from "react-hot-toast";

export default function AddNewClassForm({ schoolId }: { schoolId: any }) {
  const [className, setClassName] = useState("");
  const [nameOfClass, setNameOfClass] = useState("");
  useEffect(() => {
    setNameOfClass(className + " " + new Date().getFullYear().toString());
  }, [className]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await createNewClass(nameOfClass, schoolId);
    results.success
      ? toast.success(results.message)
      : toast.error(results.error);
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
            onChange={(e) => setClassName(e.target.value)}
            required
          >
            <option value=""> Select Class Type </option>
            {classTypeObject.map((c) => (
              <>
                <option key={c.id} value={c.default}>
                  {c.type}
                </option>
              </>
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
