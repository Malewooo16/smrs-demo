"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
interface OptionValue {
  classId: number;
  teacherId: number;
}

export async function updateTeacherSubject(
  formData: FormData,
  courseId: number,
) {
  try {
    const data = formData.get("teacherId") as string;
    
    const { classId, teacherId } = JSON.parse(data) as OptionValue;

    await prisma.classCourse.upsert({
      where: {
        classId_courseId: {
          classId: classId,
          courseId: courseId,
        },
      },
      create: {
        classId: classId,
        teacherId: teacherId,
        courseId: courseId,
      },
      update: {
        teacherId: teacherId,
      },
    });
    revalidatePath(`/`)
  } catch (e) {
    console.log(e);
  }
}
