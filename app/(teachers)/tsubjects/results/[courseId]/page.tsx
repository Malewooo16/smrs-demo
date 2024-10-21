import {getStudentsClassDetails} from "@/actions/courses/getClassCourseInfo";
import ClassCourseResultsInfo from "@/main-components/ClassCourses/ClassCourseInfo";
import StudentClassCourseScoresmanager from "@/main-components/ClassCourses/ClassCourseResults";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import {Fira_Code} from "next/font/google";

export default async function ResultsInfo({
  params,
}: {
  params: {courseId: string};
}) {
  const session = await getServerSession(authOptions);

  //console.log(mutatedStudent);

  return <ClassCourseResultsInfo />;
}
