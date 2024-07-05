"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TeacherSideBar = ({ teacher, session }:{teacher:any; session:any}) => {
  const pathname = usePathname();

  const isActive = (path:string) => pathname === path;

  return (
    <ul className="hidden lg:flex flex-col menu h-[90vh] w-48 sticky top-14 ms-1 bg-blue-50 shadow-lg p-4 rounded-box">
      <li className={`${isActive('/tdashboard') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} mb-3 rounded-lg `}>
        <Link href="/tdashboard">Dashboard</Link>
      </li>
      <li className={`${isActive('/tsubjects') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} mb-3 rounded-lg `}>
        <Link href="/tsubjects">Subjects</Link>
      </li>
      {teacher && teacher.canAccessAdmissions ? (
        <li className={`${isActive('/tadmissions?T=1') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} mb-3 rounded-lg `}>
          <Link href="/tadmissions?T=1">Admissions</Link>
        </li>
      ) : null}
      {teacher && teacher.canAccessAcademics ? (
        <li className={`${isActive('/trecords') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} mb-3 rounded-lg `}>
          <Link href="/trecords">Academic Records</Link>
        </li>
      ) : null}
      {session && session.user.role === "HeadTeacher" ? (
        <li className="mb-3">
          <details className="bg-blue-100 rounded-lg ">
            <summary className="">HeadMaster Actions</summary>
            <ul className="mt-2">
              <li className={`${isActive('/tadmissions?T=1') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/tadmissions?T=1">Admissions</Link>
              </li>
              <li className={`${isActive('/classesAndSubjects') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/classesAndSubjects">Classes and Subjects</Link>
              </li>
              <li className={`${isActive('/teachers') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/teachers">Teachers</Link>
              </li>
              <li className={`${isActive('/hmRecords') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/hmRecords">Reports</Link>
              </li>
              <li className={`${isActive('/announcements') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/announcements">Announcements</Link>
              </li>
              <li className={`${isActive('/feedback') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} rounded-lg `}>
                <Link href="/feedback">Feedback to Devs</Link>
              </li>
            </ul>
          </details>
        </li>
      ) : null}
      <li className={`${isActive('/calendar') ? 'bg-blue-200 underline' : 'hover:bg-blue-200'} mb-3 rounded-lg`}>
        <Link href="/calendar">Calendar</Link>
      </li>
     
    </ul>
  );
};

export default TeacherSideBar;
