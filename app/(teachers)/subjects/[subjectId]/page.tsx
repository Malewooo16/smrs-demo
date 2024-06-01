import { getAllClasses } from "@/actions/classes/getClasses";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getSubjectData } from "@/actions/subjects/getSubjects";
import { getAllTeachers } from "@/actions/teachers/getTeacherInfo";
import { updateTeacherSubject } from "@/actions/teachers/updateTeacherSubject";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";


export default async function page({params}:{params:{subjectId:string}}) {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }

  const classes = await getAllClasses(schoolId as number);
  const subject = await getSubjectData(schoolId as number, parseInt(params.subjectId))
  const teachers = await getAllTeachers(schoolId as number)

   //console.log(classes?.map((item) => item.ClassCourse.filter( (item) => item.course.id === parseInt(params.subjectId))).map((item) => item[0].teacher.firstName))





  const updateSubject = async (formData:FormData) =>{
   "use server"
    await updateTeacherSubject(formData, parseInt(params.subjectId as string))
  }
   
  if(classes && subject){
    //TODO remind me to use route handlers
    return(
        <div>
        <h1 className="text-xl"> {subject.name} </h1>
        <p className="font-semibold"> {subject.description}  </p>

        <div className="grid grid-cols-1 gap-2 w-[40rem]">
            {classes && classes.length>0 ?  (
                classes.map((c)=>(
                    <div key={c.id} className="card bg-base-200 my-2 p-4">
                        <p className="font-semibold"> {c.name} </p>
                        <p className="font-semibold"> Current Teacher {} </p>
                        <form action={updateSubject}>
                            <label>
                                <p> Select Teacher to Teach the Class </p>
                                <select className="select select-bordered w-full max-w-xs" required name="teacherId" >
                                    {teachers && teachers.length > 0 ? (
                                        teachers.map((t)=>(
                                            <option value={JSON.stringify({classId:c.id, teacherId:t.id})} key={t.id}> {t.firstName} {t.lastName} </option>
                                        ))
                                    ) : null }
                                </select>
                            </label>
                            <button className=" mx-4 btn btn-success">Update Teacher</button>
                        </form>
                         </div>
                ))
            ) : null} 
        </div>
    </div>
    )
  }
}
