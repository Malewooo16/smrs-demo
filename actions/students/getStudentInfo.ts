import prisma from "@/db/prisma";

export async function getAllStudentInfo(schoolId: number) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
      },

      include: {
        studentData: true,
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}

export async function getAllStudentInClass(schoolId: number, classId: number) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
        classId,
      },

      include: {
        studentData: true,
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}

export async function getAdvancedStudentData(classId: number) {
  try {
    const localClassData = prisma.classes.findUnique({
      where: { id: classId },
      include: {
        StudentT: {
          select: {
            id: true,
            name: true,
          },
        },
        ClassCourse: {
          select: {
            courseId: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return localClassData;
  } catch (e) {
    console.log(e);
  }
}
