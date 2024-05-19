"use server";
import prisma from "@/db/prisma";
import { NextResponse } from "next/server";
export async function POST(
  req: Request,
): Promise<{ success: boolean; message: string }> {
  try {
    const body = await req.json();
    console.log(body)
    await prisma.$transaction(async (tx) => {
      const updates = body.map(async (studentData) => {
        const existingStudent = await tx.studentT.findUnique({
          where: { id: studentData.studentId },
        });

        if (!existingStudent) {
          return NextResponse.json(
            { success: false, message: "error occured" },
            { status: 405 },
          );
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

    return NextResponse.json({ success: true, message: "Successfully" });
  } catch (error) {
    console.error("Error updating student results:", error);
    return NextResponse.json({
      success: false,
      message: `Error updating student results`,
    });
  } finally {
    await prisma.$disconnect();
  }
}
