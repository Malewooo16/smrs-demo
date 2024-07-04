"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

interface SchoolInfo {
  admissionStatus: boolean;
  admissionDates: any;
  activeAdmissionClasses: any;
}
export async function updateSchoolInfo(id: number, data: SchoolInfo) {
  try {
    const schoolInfo = await prisma.school.update({
      where: { id },
      data,
    });

    revalidatePath(`(parent-app)/padmissions`)
    revalidatePath(`/tadmissions`)
    return { success: true, message: "Updated Succesfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Error while updating" };
  }
}
