"use server";

import prisma from "@/db/prisma";

export async function createSubject(data: any) {
  const { name, description, tagFor, schoolId } = data;
  try {
    const newSubject = await prisma.course.create({
      data: {
        name,
        schoolId,
        tagFor,
      },
    });
    return { success: true, courseId: newSubject.id };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export async function createSubjectForClass(data: any) {
  const { name, description, tagFor, schoolId } = data;
  try {
    const newSubject = await prisma.course.create({
      data: {
        name,
        schoolId,
        tagFor,
      },
    });
    return { success: true, courseId: newSubject.id };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
