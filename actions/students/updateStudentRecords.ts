"use server";
import prisma from "@/db/prisma";
export async function updateStudentResults(
  students :any,
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.$transaction(async (tx) => {
      const updates = students.map(async (studentData:any) => {
        const existingStudent = await tx.studentT.findUnique({
          where: { id: studentData.studentId },
        });

        if (!existingStudent) {
          throw new Error(`Student  does not exist.`);
        }

        let updatedResults = [];

        if (existingStudent.results) {
          updatedResults = existingStudent.results.map((result) => {
            //@ts-ignore
            if (result?.name === studentData.courseName) {
              return {
                name: studentData.courseName,
                scores: studentData.scores,
                rank: studentData.rank,
                avg: studentData.avgScore,
              };
            }
            return result;
          });

          const courseExists = updatedResults.some(
            //@ts-ignore
            (result) => result.name === studentData.courseName,
          );
          if (!courseExists) {
            updatedResults.push({
              name: studentData.courseName,
              scores: studentData.scores,
              rank: studentData.rank,
              avg: studentData.avgScore,
            });
          }
        } else {
          updatedResults.push({
            name: studentData.courseName,
            scores: studentData.scores,
            rank: studentData.rank,
            avg: studentData.avgScore,
          });
        }

        return tx.studentT.update({
          where: { id: studentData.studentId },
          //@ts-ignore
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

export async function showStudentResults(id: number) {
  try {
    await prisma.studentT.update({
      where: {
        id,
      },
      data: {
        showRecords: true,
      },
    });
    return { success: true, message: "Updated Succesfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Update Error" };
  }
}
