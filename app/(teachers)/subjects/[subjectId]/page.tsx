import {
  getAllClasses,
  getAllClassesWithClassCourse,
} from "@/actions/classes/getClasses";
import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import {getSubjectData} from "@/actions/subjects/getSubjects";
import {getAllTeachers} from "@/actions/teachers/getTeacherInfo";
import {updateTeacherSubject} from "@/actions/teachers/updateTeacherSubject";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import Link from "next/link";

export default async function page({params}: {params: {subjectId: string}}) {
  const session = await getServerSession(authOptions);
  let schoolId: number = 0;

  // Determine the school ID based on the session
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }

  // Fetch classes, subject data, and teachers for the school
  const classes = await getAllClassesWithClassCourse(schoolId);
  const subject = await getSubjectData(schoolId, parseInt(params.subjectId));
  const teachers = await getAllTeachers(schoolId);

  // Function to update teacher assignment for a class course
  //Todo Update this logic to a client form for toasts
  

  if (classes && subject) {
    return (
      <div className="p-4">
        <h1 className="text-2xl uppercase mx-2"> {subject.name} </h1>

        <div className="grid grid-cols-1 gap-2 w-[40rem]">
          {classes && classes.length > 0
            ? classes.map((c) => {
                // Filter to find ClassCourses related to the specific subject
                const relatedClassCourses = c.classCourses.filter(
                  (cc) => cc.course.id === parseInt(params.subjectId)
                );
                return (
                  <Link href={`/subjects/${params.subjectId}/${relatedClassCourses[0]?.id}`} key={c.id}>
                  <div key={c.id} className="card bg-white my-2 p-4 hover:outline hover:outline-2 hover:outline-outline">
                    <p className="font-semibold text-xl mb-4">{c.name}</p>
                    <p className="font-semibold">Current Teacher</p>
                    <ul>
                      {relatedClassCourses.map((cc, index) => (
                        <li key={index} className="my-1">
                          {cc.teacher?.firstName && cc.teacher?.lastName
                            ? `${cc.teacher.firstName} ${cc.teacher.lastName}`
                            : "No teacher assigned"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
                
                
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
