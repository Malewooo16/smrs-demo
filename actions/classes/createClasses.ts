"use server";
import prisma from "@/db/prisma";
export async function createNewClass(className: string, schoolId: number, metadata:any) {
  try {
    await prisma.classes.create({
      data: {
        schoolId,
        name: className,
        metadata
      },
    });
    return { success: true, message: "Added Succesfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "An error occured" };
  }
}
