"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { updateTeachersDetails } from "@/actions/teachers/createAndUpdateTeachers";
import toast from "react-hot-toast";
import {Prisma, Teacher} from "@prisma/client"
import { Classes } from "@prisma/client";

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().matches(/^[+]?\d{10,}$/, "Phone number is invalid").required("Phone number is required"),
  canAccessAcademics: yup.boolean(),
  canAccessAdmissions: yup.boolean(),
  canAccessDiscpline: yup.boolean(),
});
type TeacherType = Teacher & {Classes:Classes[]}
export default function ViewandEditTeacher({ teacher }: { teacher: TeacherType }) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber,
      canAccessAcademics: teacher.canAccessAcademics,
      canAccessAdmissions: teacher.canAccessAdmissions,
      canAccessDiscpline: teacher.canAccessDiscpline,
    },
  });

  
  const onSubmit = async (data: any) => {
    try {
      const response = await updateTeachersDetails(data, teacher.id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating teacher", err);
    }
  };

  if (session?.user.teacher && session.user.role.toLowerCase() === "headteacher") {
    return (
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isEditing ? "Edit Teacher" : "Teacher Details"}
        </h1>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block font-semibold">First Name</label>
              <input id="firstName" {...register("firstName")} className="input-base" />
              {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block font-semibold">Last Name</label>
              <input id="lastName" {...register("lastName")} className="input-base" />
              {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold">Email</label>
              <input id="email" {...register("email")} type="email" className="input-base" />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block font-semibold">Phone Number</label>
              <input id="phoneNumber" {...register("phoneNumber")} type="text" className="input-base" />
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
            <button type="submit" className="btn btn-submit w-full mt-6">Update Teacher</button>
            <button type="button" className="btn btn-secondary w-full mt-2" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p><strong>First Name:</strong> {teacher.firstName}</p>
            <p><strong>Last Name:</strong> {teacher.lastName}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Phone Number:</strong> {teacher.phoneNumber}</p>
            {teacher.Classes && teacher.Classes.length > 0 && <p><strong>Class Teacher:</strong> {teacher.Classes[0].name} </p>}
            <p><strong>Can Access Academics:</strong> {teacher.canAccessAcademics ? "Yes" : "No"}</p>
            <p><strong>Can Access Admissions:</strong> {teacher.canAccessAdmissions ? "Yes" : "No"}</p>
            <p><strong>Can Access Discipline:</strong> {teacher.canAccessDiscpline ? "Yes" : "No"}</p>
            <button className="btn btn-primary w-full mt-6" onClick={() => setIsEditing(true)}>
              Edit Teacher
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-red-500">Unauthorized Access. Please log in as a Headteacher.</h1>
    </div>
  );
}
