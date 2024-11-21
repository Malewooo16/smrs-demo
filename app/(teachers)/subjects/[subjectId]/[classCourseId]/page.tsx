import Link from "next/link";
import {getClassCourseOverview} from "@/actions/courses/getClassCourseInfo";
import {Suspense} from "react";
import {EditClassCourseDetails, WeeklyReports} from "@/main-components/ClassCourseManage";
import {ClassCourseDetails} from "@/main-components/ClassCourseManage";

// Main page component with tabs
export default async function ClassCoursePage({
  params,
  searchParams,
}: {
  params: {classCourseId: string};
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const classCourseData = await getClassCourseOverview(
    parseInt(params.classCourseId)
  );

 // console.log(classCourseData)

  const classId = classCourseData?.classId;

  // Search Params from URL to track the active tab

  const activeTab = searchParams.tab || "details"; // Default to 'details'

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <Link
          href={`?tab=details`}
          className={`py-2 px-4 ${
            activeTab === "details"
              ? "border-b-2 border-indigo-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Course Details
        </Link>
        <Link
          href={`?tab=reports`}
          className={`py-2 px-4 ${
            activeTab === "reports"
              ? "border-b-2 border-indigo-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Weekly Reports
        </Link>
      </div>

      {/* Render content based on the active tab */}
      {activeTab === "details" && (
        <ClassCourseDetails classCourse={classCourseData} />
      )}
      {activeTab === "reports" && (
        <Suspense fallback={<p>Loading..</p>}>
          <WeeklyReports
            id={parseInt(params.classCourseId)}
            classId={classId as number}
          />
        </Suspense>
      )}
      {activeTab === "edit" && (
        classCourseData && <EditClassCourseDetails classCourseId={classCourseData.id}/>
      )}
    </div>
  );
}
