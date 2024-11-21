"use client";
import { createSubject } from "@/actions/subjects/createNewSubject";
import { useIdStore } from "@/store/courseIdStore";
import { classTypeObject } from "@/utilities/classesInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface classesData {
  id: number;
  name: string;
}

interface teachersData {
  id: number;
  firstName: string;
  lastName: string;
}
export function AddNewSubject({
  classes,
  teachers,
  schoolId,
}: {
  classes: any;
  teachers: any;
  schoolId: any;
}) {
 
  const [loading, setLoading] = useState(false);
  const classesData = classes as classesData[];
  const teachersData = teachers as teachersData[];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    tagFor: Yup.string().required("Deadline is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const createNewSubject = async (formData: any) => {
    setLoading(true);
    const newObj = { ...formData, schoolId };
    const newSubjectResponse = await createSubject(newObj);
    if (newSubjectResponse.success) {
      setLoading(false);
      toast.success(newSubjectResponse.message);
    } else {
      setLoading(false);
      toast.error(newSubjectResponse.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      
      <form
        className={`flex flex-col bg-white px-10 rounded-md py-4 w-1/2`}
        onSubmit={handleSubmit(createNewSubject)}
      >
        <div className="border-b w-full p-1 mb-4">
      <h2 className="text-xl text-center font-semibold">Create a New Subject </h2>
      </div>
        <label>
          <p>Subject Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input-base w-full max-w-lg mb-2"
            {...register("name")}
          />
        </label>
        <label>
          <p>Subject For</p>
          <select
            title="select Class"
            className="input-base p-2 w-full max-w-lg"
            {...register("tagFor")}
          >
            <option disabled selected>
              Select Subjected Students
            </option>
            {classTypeObject.map((c, index) => (
              <option key={index}>{c.type}</option>
            ))}
          </select>
        </label>
        <button
          className="btn btn-success max-w-lg my-4"
          type="submit"
          disabled={loading}
        >
          Create Subject
        </button>
      </form>
    </div>
  );
}
