"use client"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createStudentNotice } from "@/actions/notifications/createNotifications";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";

// Validation schema using Yup
const notificationSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  
});

interface IProps{
   headteacherId:number;
   parentId:number;
   studentName:string;
}

const NewStudentNoticeForm: React.FC<IProps> = ({headteacherId, parentId, studentName}) => {
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

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
        //const userId = parseInt(session?.user.id as string);
        const result = await createStudentNotice(data, headteacherId, parentId, userId);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto mt-10">
        <div className="px-4 flex items-center justify-center border-b">
            <h1 className="text-xl font-semibold mb-2">Notice to {studentName} Parents</h1>
        </div>
  {/* Title field */}
  <div className="flex flex-col">
    <label htmlFor="title" className="text-lg font-semibold text-gray-700 mb-2">Title</label>
    <input
      id="title"
      className="input-base"
      type="text"
      {...register("title")}
      placeholder="Enter the notification title"
    />
    {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
  </div>

  {/* Message field */}
  <div className="flex flex-col">
    <label htmlFor="message" className="text-lg font-semibold text-gray-700 mb-2">Message</label>
    <textarea
      id="message"
      {...register("message")}
      className="input-base"
      rows={6}
      placeholder="Write your notification message here..."
    />
    {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {!loading ? "Create Notification" : <span className="loading loading-spinner loading-md"></span>}
  </button>
</form>

  );
};

export default NewStudentNoticeForm;
