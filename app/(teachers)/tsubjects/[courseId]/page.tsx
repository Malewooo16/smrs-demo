import { getStudentScores } from "@/actions/subjects/getStudentScores";
import ScoreUpdateForm from "@/app/main-components/UpdateStudentScores";

export default async function StudentSubjectsScores({searchParams, params}: {searchParams:{class:string, access:string}, params:{courseId:string}}) {
    
   // Parse the parameters and validate them
   const classId = parseInt(searchParams.class as string);
   const courseId = parseInt(params.courseId as string);
   const accessId = parseInt(searchParams.access as string);
   
   // Check if parsing was successful and all parameters are valid
   if (isNaN(classId) || isNaN(courseId) || isNaN(accessId)) {
       // Handle the case where one or more parameters are invalid
       console.error("Invalid parameters passed");
       return (
         <div>
           <p>Error: Invalid parameters provided.</p>
         </div>
       );
   }

   // Fetch student scores
   const studentSubjects = await getStudentScores(classId, courseId, accessId);

   // Check if studentSubjects is valid
   if (!studentSubjects) {
       // Handle the case where studentSubjects is undefined or null
       console.error("Failed to fetch student scores");
       return (
         <div>
           <p>Error: Failed to load student scores.</p>
         </div>
       );
   }

   return (
     <div>
       <ScoreUpdateForm courseId={courseId} studentsData={studentSubjects}/>
     </div>
   );
}
