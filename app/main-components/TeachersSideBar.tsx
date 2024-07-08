"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TeacherSideBar = ({
  teacher,
  session,
}: {
  teacher: any;
  session: any;
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <ul className="hidden lg:flex flex-col menu h-[90vh] w-53 sticky top-14 ms-1 bg-[#072f7c] shadow-lg p-4 rounded-box">
      <li
        className={`${
          isActive("/tdashboard")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded-lg p-2`}
      >
        <Link href="/tdashboard">Dashboard</Link>
      </li>
      <li
        className={`${
          isActive("/tsubjects")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded-lg p-2`}
      >
        <Link href="/tsubjects">Subjects</Link>
      </li>
      {teacher && teacher.canAccessAdmissions && (
        <li
          className={`${
            isActive("/tadmissions?T=1")
              ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
              : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
          } mb-3 rounded-lg p-2`}
        >
          <Link href="/tadmissions?T=1">Admissions</Link>
        </li>
      )}
      {teacher && teacher.canAccessAcademics && (
        <li
          className={`${
            isActive("/trecords")
              ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
              : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
          } mb-3 rounded-lg p-2`}
        >
          <Link href="/trecords">Academic Records</Link>
        </li>
      )}
      {session && session.user.role === "HeadTeacher" && (
        <li className="mb-3">
          <details className="bg-blue-100 rounded-lg">
            <summary className="p-2">HeadMaster Actions</summary>
            <ul className="mt-2">
              <li
                className={`${
                  isActive("/tadmissions?T=1")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/tadmissions?T=1">Admissions</Link>
              </li>
              <li
                className={`${
                  isActive("/classesAndSubjects")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/classesAndSubjects">Classes and Subjects</Link>
              </li>
              <li
                className={`${
                  isActive("/teachers")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/teachers">Teachers</Link>
              </li>
              <li
                className={`${
                  isActive("/hmRecords")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/hmRecords">Reports</Link>
              </li>
              <li
                className={`${
                  isActive("/announcements")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/announcements">Announcements</Link>
              </li>
              <li
                className={`${
                  isActive("/feedback")
                    ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
                } rounded-lg p-2`}
              >
                <Link href="/feedback">Feedback to Devs</Link>
              </li>
            </ul>
          </details>
        </li>
      )}
      <li
        className={`${
          isActive("/calendar")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded-lg p-2`}
      >
        <Link href="/calendar">Calendar</Link>
      </li>
    </ul>
  );
};

export default TeacherSideBar;
