"use server";
import prisma from "@/db/prisma";
export async function updateStudentResults(
  students,
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.$transaction(async (tx) => {
      const updates = students.map(async (studentData) => {
        const existingStudent = await tx.studentT.findUnique({
          where: { id: studentData.studentId },
        });

        if (!existingStudent) {
          throw new Error(`Student  does not exist.`);
        }

        let updatedResults = [];

        if (existingStudent.results) {
          updatedResults = existingStudent.results.map((result) => {
            if (result.name === studentData.courseName) {
              return {
                name: studentData.courseName,
                scores: studentData.newScores,
                rank: studentData.rank,
                avg: studentData.avg,
              };
            }
            return result;
          });

          const courseExists = updatedResults.some(
            (result) => result.name === studentData.courseName,
          );
          if (!courseExists) {
            updatedResults.push({
              name: studentData.courseName,
              scores: studentData.newScores,
              rank: studentData.rank,
              avg: studentData.avg,
            });
          }
        } else {
          updatedResults.push({
            name: studentData.courseName,
            scores: studentData.newScores,
            rank: studentData.rank,
            avg: studentData.avg,
          });
        }

        return tx.studentT.update({
          where: { id: studentData.studentId },
          data: { results: updatedResults },
        });
      });

      // Ensure all updates are executed
      await Promise.all(updates);
    });

    return { success: true, message: "Student results updated successfully" };
  } catch (error) {
    console.error("Error updating student results:", error);
    return { success: false, message: `Error updating student results` };
  } finally {
    await prisma.$disconnect();
  }
}
