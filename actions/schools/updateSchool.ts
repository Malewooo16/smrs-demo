"use server";

import prisma from "@/db/prisma";

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

    return { success: true, message: "Updated Succesfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Error while updating" };
  }
}
