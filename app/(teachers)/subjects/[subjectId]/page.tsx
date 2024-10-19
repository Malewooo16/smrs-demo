import { getAllClasses, getAllClassesWithClassCourse } from "@/actions/classes/getClasses";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getSubjectData } from "@/actions/subjects/getSubjects";
import { getAllTeachers } from "@/actions/teachers/getTeacherInfo";
import { updateTeacherSubject } from "@/actions/teachers/updateTeacherSubject";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";

export default async function page({ params }: { params: { subjectId: string } }) {
  const session = await getServerSession(authOptions);
  let schoolId: number = 0;

  // Determine the school ID based on the session
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
    schoolId = school?.id || 0;
  }

  // Fetch classes, subject data, and teachers for the school
  const classes = await getAllClassesWithClassCourse(schoolId);
  const subject = await getSubjectData(schoolId, parseInt(params.subjectId));
  const teachers = await getAllTeachers(schoolId);

  // Function to update teacher assignment for a class course
  //Todo Update this logic to a client form for toasts
  const updateSubject = async (formData: FormData) => {
    "use server";
    await updateTeacherSubject(formData, parseInt(params.subjectId as string));
  };

  if (classes && subject) {
    return (
      <div className="p-4">
        <h1 className="text-2xl uppercase mx-2"> {subject.name} </h1>

        <div className="grid grid-cols-1 gap-2 w-[40rem]">
          {classes && classes.length > 0 ? (
            classes.map((c) => {
              // Filter to find ClassCourses related to the specific subject
              const relatedClassCourses = c.classCourses.filter(
                (cc) => cc.course.id === parseInt(params.subjectId)
              );

              return (
                <div key={c.id} className="card bg-white my-2 p-4">
                  <p className="font-semibold"> {c.name} </p>
                  <p className="font-semibold"> Current Teacher(s) </p>
                  <ul>
                    {relatedClassCourses.length > 0 ? (
                      relatedClassCourses.map((cc, index) => (
                        <li key={index} className="my-2">
                          {cc.teacher.firstName} {cc.teacher?.lastName} (Level: {cc.courseLevel})
                        </li>
                      ))
                    ) : (
                      <p>No teachers assigned to this class for the selected subject.</p>
                    )}
                  </ul>
                  <form action={updateSubject}>
                    <label>
                      <p> Update Teacher to Teach the Class </p>
                      <select className="select select-bordered w-full max-w-xs" required name="teacherId">
                        {teachers && teachers.length > 0
                          ? teachers.map((t) => (
                              <option
                                value={JSON.stringify({ classId: c.id, teacherId: t.id })}
                                key={t.id}
                              >
                                {t.firstName} {t.lastName}
                              </option>
                            ))
                          : null}
                      </select>
                    </label>
                    <button className="mx-4 btn btn-success">Update Teacher</button>
                  </form>
                </div>
              );
            })
          ) : null}
        </div>
      </div>
    );
  }
}
