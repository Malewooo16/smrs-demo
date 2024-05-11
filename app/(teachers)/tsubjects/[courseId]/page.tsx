import { getStudentScores } from "@/actions/subjects/getStudentScores"
import ScoreUpdateForm from "@/app/main-components/UpdateStudentScores"


export default async function StudentSubjectsScores({searchParams, params}: {searchParams:{class:string, access:string}, params:{courseId:string}}) {
    
   const studentSubjects = await getStudentScores(parseInt(searchParams.class as string), parseInt(params.courseId as string), parseInt(searchParams.access as string))

   console.log(studentSubjects)
  return (
    <div>
      <ScoreUpdateForm courseId={parseInt(params.courseId)}  studentsData={studentSubjects}/>
    </div>
  )
}
