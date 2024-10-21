import CourseDetail from "@/main-components/ClassCourses/ClassCourseOverview";
import ScoreUpdateForm from "@/main-components/UpdateStudentScores";

export default async function StudentSubjectsScores({
  searchParams,
  params,
}: {
  searchParams: {class: string; access: string};
  params: {courseId: string};
}) {
  return <CourseDetail />;
}
