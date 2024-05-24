import prisma from "@/db/prisma";

interface CourseScores {
  [test: string]: string | number;
}

interface FormattedStudent {
  id: number;
  name: string;
  scores: { [courseName: string]: CourseScores };
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

    const formattedStudents: FormattedStudent[] = students.map((student) => {
      const scores: { [courseName: string]: CourseScores } = {};

      student.courseEnrollments.forEach((enrollment) => {
        const courseName = enrollment.course.name;

        // Ensure the score is of type CourseScores
        const score = enrollment.score 

        // If score is not null, assign it to the courseName key, otherwise assign an empty object
        scores[courseName] = score ? (score as CourseScores) : {};
      });

      return {
        id: student.id,
        name: student.name,
        scores,
      };
    });

    return formattedStudents;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
