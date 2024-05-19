import prisma from "@/db/prisma";

export async function getAllSubjects(schoolId: number) {
  try {
    const subjects = await prisma.course.findMany({
      where: {
        schoolId,
      },
    });
    return subjects;
  } catch (error) {
    console.log(error);
  }
}

export async function getSubjectData(schoolId: number, id: number) {
  try {
    const subject = await prisma.course.findUnique({
      where: {
        id,
        schoolId,
      },
    });
    return subject;
  } catch (error) {
    console.log(error);
  }
}
