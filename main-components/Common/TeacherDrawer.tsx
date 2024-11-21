"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";

export default function TeacherDrawer({ teacher, session }: {teacher:any, session:Session}) {
  return (
    <div className="drawer lg:hidden">
      <input id="teacher-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="teacher-drawer"
          className="btn bg-transparent text-xl border-none outline-none text-indigo-700 hover:bg-transparent"
        >
          <IoMdMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="teacher-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-44 min-h-full bg-indigo-200 text-indigo-900">
          {/* Sidebar content here */}
          <h1 className="text-xl my-2 font-semibold">SMRS</h1>
          <li>
            <Link
              href={`/tdashboard`}
              onClick={() => document.getElementById("teacher-drawer")?.click()}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={`/tsubjects`}
              onClick={() => document.getElementById("teacher-drawer")?.click()}
            >
              Subjects
            </Link>
          </li>
          {teacher?.canAccessAdmissions && (
            <li>
              <Link
                href={`/tadmissions`}
                onClick={() => document.getElementById("teacher-drawer")?.click()}
              >
                Admissions
              </Link>
            </li>
          )}
          {teacher?.canAccessAcademics && (
            <li>
              <Link
                href={`/trecords`}
                onClick={() => document.getElementById("teacher-drawer")?.click()}
              >
                Academic Records
              </Link>
            </li>
          )}
          {teacher?.Classes?.length > 0 && (
            <li>
              <Link
                href={`/tclass`}
                onClick={() => document.getElementById("teacher-drawer")?.click()}
              >
                Class Teacher
              </Link>
            </li>
          )}
          <li>
            <Link
              href={`/tnotifications`}
              onClick={() => document.getElementById("teacher-drawer")?.click()}
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              href={`/tcalendar`}
              onClick={() => document.getElementById("teacher-drawer")?.click()}
            >
              Calendar
            </Link>
          </li>
          {session?.user?.role === "HeadTeacher" && (
            <>
              <h1 className="text-xl my-2 font-semibold">Head Master</h1>
              <li>
                <Link
                  href={`/classesAndSubjects`}
                  onClick={() => document.getElementById("teacher-drawer")?.click()}
                >
                  Classes and Subjects
                </Link>
              </li>
              <li>
                <Link
                  href={`/teachersm`}
                  onClick={() => document.getElementById("teacher-drawer")?.click()}
                >
                  Teachers
                </Link>
              </li>
              <li>
                <Link
                  href={`/hmRecords`}
                  onClick={() => document.getElementById("teacher-drawer")?.click()}
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href={`/feedback`}
                  onClick={() => document.getElementById("teacher-drawer")?.click()}
                >
                  Feedback to Devs
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
