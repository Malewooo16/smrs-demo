import prisma from "@/db/prisma";

interface CourseScores {
  [test: string]: string | number;
}

interface FormattedStudent {
  id: number;
  name: string;
  scores: { [courseName: string]: CourseScores };
}

