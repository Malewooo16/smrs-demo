import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function getAllClasses(schoolId: number) {
  try {
    const classes = await prisma.classes.findMany({
      where: {
        schoolId,
      },
      select: {
        id: true,
        name: true,
        metadata:true
       
      },
    });
    revalidatePath('/classes');
    return classes;
    
  } catch (error) {
    console.log(error);
  }

}

export async function getAllClassesWithClassCourse(schoolId: number) {
  try {
    const classes = await prisma.classes.findMany({
      where: {
        schoolId,
      },
      include:{
        classCourses:{include:{course:true, teacher:true}}
      }
    });
    revalidatePath('/classes');
    return classes;
    
  } catch (error) {
    console.log(error);
  }

}

export async function getSingleClass(schoolId: number, classId: number) {
  try {
    const classes = await prisma.classes.findUnique({
      where: {
        schoolId,
        id: classId,
      },
    });

    return classes;
  } catch (error) {
    console.log(error);
  }
}
