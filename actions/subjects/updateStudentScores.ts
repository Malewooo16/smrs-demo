"use server";
import prisma from "@/db/prisma";
export async function updateClassCourseScores(
 
  courseId: number,
  teacherId: number,
 
  studentsScores: any[],
) {
  try {
    // Find the ClassCourse entry
    const classCourse = await prisma.classCourse.findFirst({
      where: {
       
        courseId: courseId,
        teacherId: teacherId,
       
      },
    });

    if (!classCourse) {
      throw new Error(
        "Teacher does not have access to update scores for this class, course, and level combination"
      );
    }

    // Iterate over each student's new scores and update them
    for (const studentScore of studentsScores) {
      const { studentId, score } = studentScore;

      // Upsert scores for the student
      await prisma.courseEnrollment.upsert({
        where: {
          studentTId_courseId: {
            studentTId: studentId,
            courseId: courseId,
          },
        },
        update: {
          score: score,
        },
        create: {
          studentTId: studentId,
          courseId: courseId,
          score: score,
        },
      });
    }
    return { success: true, message: "Student records updated successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "An error has occurred" };
  }
}
