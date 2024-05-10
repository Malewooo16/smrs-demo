import { getTeachersCourseEnrollment } from "@/actions/teachers/getTeacherInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function tsubjects() {
  const session = await getServerSession(authOptions);
  if(session?.user){
    const teacherCourses = await getTeachersCourseEnrollment(parseInt(session.user.teacher as string))
   // console.log(teacherCourses)
   // console.log(session.user.teacher)
    return (
      <div>
          <h1 className="text-xl"> Welcome to Subjects </h1>
          <div className="grid grid-cols-1 w-[40rem]">
            {teacherCourses && teacherCourses.length > 0 ? (
                teacherCourses.map((t)=>(
                  <Link key={t.id} href={`/tsubjects/${t.courseId}?class=${t.classId}&access=${t.teacherId}`}>
                    <div className="card bg-base-200 px-4 py-10">
                      <p className="font semibold"> {t.course.name} {t.class.name} </p>
                    </div>
                  </Link>
                ))
            ) : null}
          </div>
      </div>
    )
  }

 
}
