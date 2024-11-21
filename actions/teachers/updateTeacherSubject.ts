"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
interface OptionValue {
  classId: number;
  teacherId: number;
  courseLevel?:string
}

export async function updateTeacherSubject(teacherId:number, classCourseId:number) {
  try {
  
     await prisma.classCourse.update({
      where:{
        id: classCourseId
      },
      data:{
        teacherId: teacherId,
      }
     })
    // Optionally revalidate the path if needed
    revalidatePath(`/`);
    return { success: true, message:"Teacher Updated Successfully" };
  } catch (e) {
    console.error("Error updating teacher subject:", e);
    return { success: false, message: "Error updating teacher subject" };
  }
}

