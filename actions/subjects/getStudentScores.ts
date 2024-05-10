import prisma from "@/db/prisma";
import { JsonObject } from "@prisma/client/runtime/library";

interface CourseScores {
  [test: string]: string | number | boolean | null; // Adjusted type to include null
}
  
interface FormattedStudent {
  id: number;
  name: string;
  scores: {
    [courseName: string]: CourseScores;
  };
}

export async function getStudentScores(classId: number, courseId: number, teacherId: number): Promise<FormattedStudent[] | undefined> {
  try {
    const students = await prisma.studentT.findMany({
      where: {
        classId,
      },
      include: {
        courseEnrollments: {
          where: {
            courseId,
            course: {
              ClassCourse: {
                some: {
                  teacherId,
                },
              },
            },
          },
          include: {
            course: true,
          },
        },
      },
    });

    const formattedStudents = students.map((student) => {
      const scores: { [courseName: string]: CourseScores } = {};

      student.courseEnrollments.forEach((enrollment) => {
        const courseName = enrollment.course.name;

        // Check if score is null or not
        if (enrollment.score !== null) {
          scores[courseName] = enrollment.score as CourseScores; // Type assertion
        } else {
          scores[courseName] = {}; // Assign empty object if score is null
        }
      });

      return {
        id: student.id,
        name: student.name,
        scores,
      };
    });

    return formattedStudents;
  } catch (e) {
    console.log(e);
  }
}
