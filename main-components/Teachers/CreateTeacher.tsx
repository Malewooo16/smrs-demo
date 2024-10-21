"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import toast from "react-hot-toast";
import { createTeacher } from "@/actions/teachers/createAndUpdateTeachers";

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[+]?\d{10,}$/, "Phone number is invalid")
    .required("Phone number is required"),
  canAccessAcademics: yup.boolean(),
  canAccessAdmissions: yup.boolean(),
  canAccessDiscpline: yup.boolean(),
});

type TeacherType = yup.InferType<typeof schema>

export default function AddNewTeacher({schoolId}:{schoolId:number}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeacherType> ({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TeacherType) => {
    try {
      const response = await createTeacher(data, schoolId);
      if (response.success) {
        toast.success("Teacher added successfully!");
        reset(); // Reset form after successful submission
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error adding teacher", err);
      toast.error("Failed to add teacher.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Teacher</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block font-semibold">First Name</label>
          <input
            id="firstName"
            {...register("firstName")}
            className="input-base"
          />
          {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block font-semibold">Last Name</label>
          <input
            id="lastName"
            {...register("lastName")}
            className="input-base"
          />
          {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold">Email</label>
          <input
            id="email"
            {...register("email")}
            type="email"
            className="input-base"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block font-semibold">Phone Number</label>
          <input
            id="phoneNumber"
            {...register("phoneNumber")}
            type="text"
            className="input-base"
          />
          {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
        </div>

        {/* Access Permissions */}
        <div className="flex items-center justify-between">
          <label htmlFor="academicsAccess" className="font-semibold">Can Access Academics</label>
          <input id="academicsAccess" type="checkbox" {...register("canAccessAcademics")} className="ml-2" />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="admissionsAccess" className="font-semibold">Can Access Admissions</label>
          <input id="admissionsAccess" type="checkbox" {...register("canAccessAdmissions")} className="ml-2" />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="disciplineAccess" className="font-semibold">Can Access Discipline</label>
          <input id="disciplineAccess" type="checkbox" {...register("canAccessDiscpline")} className="ml-2" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-submit w-full mt-6">
          Add Teacher
        </button>
      </form>
    </div>
  );
}
