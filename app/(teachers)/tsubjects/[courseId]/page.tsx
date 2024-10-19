
import CourseDetail from "@/app/main-components/ClassCourses/ClassCourseOverview";
import ScoreUpdateForm from "@/app/main-components/UpdateStudentScores";

export default async function StudentSubjectsScores({searchParams, params}: {searchParams:{class:string, access:string}, params:{courseId:string}}) {
    
 return(
  <CourseDetail />
 )
}
