import {getClassCourseReports} from "@/actions/courses/getClassCourseInfo";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getAllTeachers } from "@/actions/teachers/getTeacherInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import {FaEdit} from "react-icons/fa";
import EditTeacherClassCourse from "./EditTeacherClassCourse";
import Link from "next/link";

// Details component for rendering class course info
export function ClassCourseDetails({classCourse}: {classCourse: any}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 ">
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h2 className="text-xl font-semibold">
          {classCourse.course.name} for {classCourse.class.name}
        </h2>
        <Link href="?tab=edit"><FaEdit size={24} /></Link>
      </div>
      <p className="text-gray-600 mb-2">
        Course Description: {classCourse.description}
      </p>
      <p className="text-gray-600 mb-2">Tag: {classCourse.course.tagFor}</p>
      <p className="text-gray-600 mb-2">
  Teacher:{" "}
  {classCourse.teacher?.firstName && classCourse.teacher?.lastName
    ? `${classCourse.teacher.firstName} ${classCourse.teacher.lastName}`
    : "No teacher assigned"}
</p>
    </div>
  );
} // Weekly Reports component for listing weekly reports
export async function WeeklyReports({
  id,
  classId,
}: {
  id: number;
  classId: number;
}) {
  const reports = await getClassCourseReports(id);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Weekly Reports</h3>
      {reports && reports.length > 0 ? (
        <ul className="list-disc list-inside">
          {reports.map((report, index) => (
            <li key={index} className="text-gray-600 mb-2">
              Week {report.week}: {report.summary}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No reports available.</p>
      )}
    </div>
  );
}


export async function EditClassCourseDetails({classCourseId}: {classCourseId:number}){
    const session = await getServerSession(authOptions);
    if(session && session.user.role.toLowerCase() === "headteacher"){
        const school = await schoolInfoFromTeacherId(
            parseInt(session.user.teacher as string)
          );

        const teachers = await getAllTeachers(school?.id as number);

        return(
            <EditTeacherClassCourse
                teachers={teachers}
                classCourseId={classCourseId}
            />
        )
    }
}
