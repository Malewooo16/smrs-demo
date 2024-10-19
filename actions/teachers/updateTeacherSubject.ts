"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
interface OptionValue {
  classId: number;
  teacherId: number;
  courseLevel?:string
}

export async function updateTeacherSubject(formData: FormData, courseId: number) {
  try {
    const data = formData.get("teacherId") as string;

    const { classId, teacherId, courseLevel } = JSON.parse(data) as OptionValue;

    await prisma.classCourse.upsert({
      where: {
        // Using a composite key with teacherId and courseLevel
        classId_courseId_teacherId: {
          classId: classId,
          courseId: courseId,
          teacherId: teacherId,
          
        },
      },
      create: {
        classId: classId,
        teacherId: teacherId,
        courseId: courseId,
        courseLevel: courseLevel,
        // Optionally include description or other relevant fields
      },
      update: {
        teacherId: teacherId,
        // Optionally update other fields as necessary
      },
    });

    // Optionally revalidate the path if needed
    revalidatePath(`/`);
  } catch (e) {
    console.error("Error updating teacher subject:", e);
  }
}

