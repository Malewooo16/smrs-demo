"use server";
import prisma from "@/db/prisma";
async function updateScores(
  classId: number,
  courseId: number,
  teacherId: number,
  studentsScores: any,
) {
  try {
    // Check if the teacher is associated with the specified class and course
    const classCourse = await prisma.classCourse.findFirst({
      where: {
        classId: classId,
        courseId: courseId,
        teacherId: teacherId,
      },
    });

    if (!classCourse) {
      throw new Error(
        "Teacher does not have access to update scores for this class and course combination",
      );
    }

    // Iterate over each student's new scores and update them
    for (const studentScore of studentsScores) {
      const { studentId, newScores } = studentScore;

      // Upsert scores for the student
      await prisma.courseEnrollment.upsert({
        where: {
          studentId_courseId: {
            studentId: studentId,
            courseId: courseId,
          },
        },
        update: {
          score: newScores,
        },
        create: {
          studentId: studentId,
          courseId: courseId,
          score: newScores,
        },
      });
    }
    return { success: true, message: "Student Records added successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "An Error has occured" };
  }
}
