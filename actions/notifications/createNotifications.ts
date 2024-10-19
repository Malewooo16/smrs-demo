"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache";
import { getAllTeachers } from "../teachers/getTeacherInfo";



export const createSchoolNotification = async (notification: any, schoolId:number, userId?: number) => {
  const { title, message } = notification;

  try {
    // Create the notification
    const newNotification = await prisma.notification.create({
      data: {
        title,
        message,
        createdById: userId, // Set the user who created the notification
      },
    });

    // Fetch all teachers to notify them
    const teachers = await getAllTeachers(schoolId); // This should now return all teachers, regardless of school
    const teachersId = teachers?.map((t) => t.id);

    // Create entries in NotificationUser for each teacher
    if (teachersId && teachersId.length > 0) {
      const notificationUserData = teachersId.map((teacherId) => ({
        notificationId: newNotification.id,
        userId: teacherId,
      }));

      await prisma.notificationUser.createMany({
        data: notificationUserData,
      });
    }

    // Optionally, you can also notify parents or any other users here

    // Revalidate the notifications path if needed
    revalidatePath(`/tnotifications`);

    return { success: true, message: "Notification Added" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to add notification" };
  }
};



export const createStudentNotice = async (formData:any,headteacherId:number, parentId:number, teacherId:number)=>{
  const {title, message,} = formData;
  try{
    await prisma.notification.create({
      data:{
        title,
        message,
        createdById:teacherId,
        NotificationUser:{
          create:[
            {userId:headteacherId},
            {userId:parentId}
          ]
        }
      }
    })
    revalidatePath(`/tnotifications`)
    return {success:true, message:"Notice created"}
  }catch(e){
    console.log(e);
    return {success:false, message:"Failed to create notice"}
  }
}