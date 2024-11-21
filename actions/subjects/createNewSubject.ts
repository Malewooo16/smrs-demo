"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

interface Subject{
  name: string;
  schoolId:number;
  tagFor: string;
}
export async function createSubject(data: Subject){
  
  try {
    // Step 1: Create the new subject (Course)
    const subject = await prisma.course.create({
        data:data
    });

    console.log("Subject created:", subject);

    // Step 2: Fetch all classes that match the subject's school and class type
    const classes = await prisma.classes.findMany({
        where: {
            schoolId: data.schoolId,
            metadata: {
              path: ['type'], // Proper JSON path filtering
              equals: data.tagFor,
            },
        },
    });

    console.log("Classes found:", classes);

    if(classes.length === 0){
      throw new Error("Classes not Found")
    }
    // Step 3: Create a ClassCourse for each matching class
    const classCourses = await prisma.classCourse.createMany({
        data: classes.map((cls) => ({
            classId: cls.id,
            courseId: subject.id,
            courseLevel: " ", // Default level, can be adjusted
            description: `${subject.name} for ${cls.name}`, // Optional description
        })),
    });
    revalidatePath('/')
    return {success:true, message:`${classCourses.count} ClassCourses created successfully.`}
} catch (err) {
    console.error("Error creating subjects and class courses:", err);
    return {success:false, message: "Error creating subjects and class courses."};
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
