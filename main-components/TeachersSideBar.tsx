"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "./SignOut";

const TeacherSideBar = ({
  teacher,
  session,
}: {
  teacher: any;
  session: any;
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <ul className="hidden lg:flex flex-col h-full w-52 sticky top-20  bg-sidebar-500 shadow-lg p-4 ">
      <li className="mb-4 text-[#7a80b4] px-2 uppercase font-semibold">Menu</li>
      <li
        className={`${
          isActive("/tdashboard")
            ? "bg-sidebar-300 text-white  p-2 text-sm"
            : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
        } mb-3 rounded-lg `}
      >
        <Link className="block w-full" href="/tdashboard">
          Dashboard
        </Link>
      </li>
      <li
        className={`${
          isActive("/tsubjects")
            ? "bg-sidebar-300 text-white  p-2 text-sm"
            : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
        } mb-3 rounded-lg `}
      >
        <Link className="block w-full" href="/tsubjects">
          Subjects
        </Link>
      </li>
      {teacher && teacher.canAccessAdmissions && (
        <li
          className={`${
            isActive("/tadmissions")
              ? "bg-sidebar-300 text-white  p-2 text-sm"
              : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
          } mb-3 rounded-lg `}
        >
          <Link className="block w-full" href="/tadmissions?T=1">
            Admissions
          </Link>
        </li>
      )}
      {teacher && teacher.canAccessAcademics && (
        <li
          className={`${
            isActive("/trecords")
              ? "bg-sidebar-300 text-white  p-2 text-sm"
              : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
          } mb-3 rounded-lg `}
        >
          <Link className="block w-full" href="/trecords">
            Academic Records
          </Link>
        </li>
      )}
       {teacher && teacher.Classes.length > 0 && (
        <li
          className={`${
            isActive("/tclass")
              ? "bg-sidebar-300 text-white  p-2 text-sm"
              : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
          } mb-3 rounded-lg `}
        >
          <Link className="block w-full" href="/tclass">
            Class Teacher
          </Link>
        </li>
      )}
      <li
        className={`${
          isActive("/tnotifications")
            ? "bg-sidebar-300 text-white  p-2 text-sm"
            : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
        } mb-3 rounded-lg `}
      >
        <Link className="block w-full" href="/tnotifications">
          Notifications
        </Link>
      </li>
      <li
        className={`${
          isActive("/tcalendar")
            ? "bg-sidebar-300 text-white  p-2 text-sm"
            : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"
        } mb-3 rounded-lg `}
      >
        <Link className="block w-full" href="/tcalendar">
          Calendar
        </Link>
      </li>
      
      {session && session.user.role === "HeadTeacher" && (
        <><li className="mb-2 text-[#7a80b4] px-2 uppercase font-semibold">Head Master</li><li className="">

          <ul className="">
            <li
              className={`${isActive("/tadmissions")
                  ? "bg-sidebar-300 text-white  p-2 text-sm"
                  : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"} rounded-lg `}
            >
              <Link className="block w-full" href="/tadmissions">
                Admissions
              </Link>
            </li>
            <li
              className={`${isActive("/classesAndSubjects")
                  ? "bg-sidebar-300 text-white  p-2 text-sm"
                  : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"} rounded-lg `}
            >
              <Link className="block w-full" href="/classesAndSubjects">
                Classes and Subjects
              </Link>
            </li>
            <li
              className={`${isActive("/teachersm")
                  ? "bg-sidebar-300 text-white  p-2 text-sm"
                  : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"} rounded-lg `}
            >
              <Link className="block w-full" href="/teachersm">
                Teachers
              </Link>
            </li>
            <li
              className={`${isActive("/hmRecords")
                  ? "bg-sidebar-300 text-white  p-2 text-sm"
                  : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"} rounded-lg `}
            >
              <Link className="block w-full" href="/hmRecords">
                Reports
              </Link>
            </li>
            
            <li
              className={`${isActive("/feedback")
                  ? "bg-sidebar-300 text-white  p-2 text-sm"
                  : "text-[#7a80b4] hover:bg-sidebar-300 hover: hover:border-white  active: active p-2 text-sm"} rounded-lg `}
            >
              <Link className="block w-full" href="/feedback">
                Feedback to Devs
              </Link>
            </li>
          </ul>

        </li></>
      )}
      
    </ul>
  );
};

export default TeacherSideBar;
