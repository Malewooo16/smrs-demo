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
      <div className="min-h-screen  p-6">
      <h1 className="text-xl font-semibold mb-6">Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherCourses && teacherCourses.length > 0 ? (
          teacherCourses.map((t) => (
            <Link
              key={t.id}
              href={`/tsubjects/${t.courseId}?class=${t.classId}&access=${t.teacherId}`}
              className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex flex-col items-start">
                <p className="text-lg font-medium text-gray-800">{t.course.name}</p>
                <p className="text-sm text-gray-600">{t.class.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">No courses available.</p>
        )}
      </div>
    </div>
    )
  }

 
}
