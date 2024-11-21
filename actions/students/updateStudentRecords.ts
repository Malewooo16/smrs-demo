"use server";
import prisma from "@/db/prisma";
export async function updateStudentResults(
  students: any
): Promise<{success: boolean; message: string}> {
  try {
    console.log(students);
    await prisma.$transaction(async (tx) => {
      const updates = students.map(async (studentData: any) => {
        const existingStudent = await tx.studentT.findUnique({
          where: {id: studentData.studentId},
        });

        if (!existingStudent) {
          throw new Error(`Student  does not exist.`);
        }

        let updatedResults = [];

        if (existingStudent.results) {
          updatedResults = existingStudent.results.map((result) => {
            //@ts-ignore
            if (result?.name === studentData.term) {
              return {
                name: studentData.term,
                scores: studentData.scores,
                avg: studentData.avgScore,
                rank: studentData.rank,
                showRecords:studentData.showRecords

              };
            }
            return result;
          });

          const courseExists = updatedResults.some(
            //@ts-ignore
            (result) => result.name === studentData.term
          );
          if (!courseExists) {
            updatedResults.push({
              name: studentData.term,
              scores: studentData.scores,
              rank: studentData.rank,
              avg: studentData.avgScore,
              showRecords:studentData.showRecords
            });
          }
        } else {
          updatedResults.push({
            name: studentData.term,
            scores: studentData.scores,
            avg: studentData.avgScore,
            rank: studentData.rank,
            showRecords:studentData.showRecords
          });
        }

        return tx.studentT.update({
          where: {id: studentData.studentId},
          //@ts-ignore
          data: {results: updatedResults},
        });
      });

      // Ensure all updates are executed
      await Promise.all(updates);
    });

    return {success: true, message: "Student results updated successfully"};
  } catch (error) {
    console.error("Error updating student results:", error);
    return {success: false, message: `Error updating student results`};
  } finally {
    await prisma.$disconnect();
  }
}

export async function showStudentResults(id: number, term: string) {
  try {
    // Step 1: Fetch the student's results
    const student = await prisma.studentT.findUnique({
      where: { id },
      select: {
        results: true, // Assuming results is stored as a JSON array in the database
      },
    });

    if (!student || !student.results) {
      return { success: false, message: "Student or results not found" };
    }

    // Step 2: Update the specific term's showRecords property
    const updatedResults = student.results.map((result: any) => {
      if (result.name === term) {
        return { ...result, showRecords: true };
      }
      return result;
    });

    // Step 3: Update the student's results in the database
    await prisma.studentT.update({
      where: { id },
      data: { results: updatedResults },
    });

    return { success: true, message: "Updated Successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Update Error" };
  }
}

