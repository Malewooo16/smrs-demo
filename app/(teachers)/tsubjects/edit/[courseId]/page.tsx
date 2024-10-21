import {getStudentsClassDetails} from "@/actions/courses/getClassCourseInfo";
import StudentClassCourseScoresmanager from "@/main-components/ClassCourses/ClassCourseResults";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import {Fira_Code} from "next/font/google";

export default async function page({params}: {params: {courseId: string}}) {
  const students = await getStudentsClassDetails(parseInt(params.courseId));

  const session = await getServerSession(authOptions);

  const mutatedStudent =
    students && students.length > 0
      ? students.map((student) => {
          const filteredCourses = student.courseEnrollments.filter(
            (course) => course.courseId === parseInt(params.courseId)
          );

          // If you want the first score in the filtered courses or undefined if no courses match
          const score =
            filteredCourses.length > 0 ? filteredCourses[0].score : {};

          return {
            id: student.id,
            name: student.name,
            scores: score ? score : {}, // Returns only the score, not the entire array
          };
        })
      : [];

  //console.log(mutatedStudent);
  if (students && students.length > 0) {
    return (
      <StudentClassCourseScoresmanager
        studentsData={mutatedStudent}
        courseId={parseInt(params.courseId)}
        teacherId={parseInt(session?.user.teacher as string)}
      />
    );
  }
}
