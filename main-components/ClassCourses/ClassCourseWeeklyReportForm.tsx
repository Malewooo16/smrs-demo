"use client"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import { createWeeklyReport } from "@/actions/courses/classCourseCreates";

// Validation schema using Yup
const notificationSchema = yup.object().shape({
  summary: yup.string().required("Report is required").min(5, "Title must be at least 5 characters"),
  report: yup.string().required("Report is required").min(10, "Message must be at least 10 characters"),
  week:yup.number().min(1).required("Week number is required")
  
});

type WeeklyReport = yup.InferType<typeof notificationSchema>

interface IProps{
   classCourseId:number;
   classCourseName:string;  
}

const ClassCourseWeeklyReportForm: React.FC<IProps> = ({classCourseId, classCourseName}) => {
  const {data:session} = useSession();
  const userId = parseInt(session?.user.id as string)
  const [loading, setLoading] = useState(false)
  // Initialize React Hook Form with validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(notificationSchema),
  });

 
  const onSubmit = async (data:WeeklyReport) => {
    setLoading(true);

    try {
        //const userId = parseInt(session?.user.id as string);
        const result = await createWeeklyReport(data, classCourseId);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error("Error creating notification:", error); // Log the error for debugging
        toast.error("Failed to create notification");
    } finally {
        setLoading(false); // Ensure loading state is reset regardless of success or error
        reset(); // Reset form only if needed
    }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white px-8 py-4 rounded-lg shadow-lg w-full lg:w-1/2 mx-auto mt-5">
        <div className="px-4 flex flex-col items-center justify-center border-b">
            <h1 className="text-xl font-semibold mb-2">Weekly Report for {classCourseName}</h1>
            <p className="font-semibold text-center">Submit Weekly Report</p>
        </div>
  {/* Title field */}
  <div className="flex flex-col">
    <label htmlFor="title" className="text-lg font-semibold text-gray-700 mb-2">Title</label>
    <input
      id="summary"
      className="input-base"
      type="text"
      {...register("summary")}
      placeholder="Enter the summary"
    />
    {errors.summary && <p className="text-red-500 text-sm mt-2">{errors.summary.message}</p>}
  </div>

   {/* Week field */}
   <div className="flex flex-col">
    <label htmlFor="week" className="text-lg font-semibold text-gray-700 mb-2">Week</label>
    <input
      id="week"
      className="input-base"
      type="number"
      {...register("week")}
      placeholder="Enter the week"
    />
    {errors.week && <p className="text-red-500 text-sm mt-2">{errors.week.message}</p>}
  </div>

  {/* Message field */}
  <div className="flex flex-col">
    <label htmlFor="report" className="text-lg font-semibold text-gray-700 mb-2">Message</label>
    <textarea
      id="report"
      {...register("report")}
      className="input-base"
      rows={6}
      placeholder="Write your detailed report here..."
    />
    {errors.report && <p className="text-red-500 text-sm mt-2">{errors.report.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {!loading ? "Add Report" : <span className="loading loading-spinner loading-md"></span>}
  </button>
</form>

  );
};

export default ClassCourseWeeklyReportForm;
