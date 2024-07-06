import { RiDashboard3Line } from "react-icons/ri"
import { IoPeople } from "react-icons/io5";
import { IoBook } from "react-icons/io5";
import { BsFileBarGraph } from "react-icons/bs";
import Link from "next/link";
import Navbar from "../main-components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { authOptions } from "@/utilities/authOptions";
import { getTeacherInfo } from "@/actions/teachers/getTeacherInfo";
import styles from "./teachers.module.css"
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const teacher = await getTeacherInfo(parseInt(session?.user.teacher as string))
  //console.log(session?.user)
 
 

  if (session?.user && session.user.role==="Teacher" || session?.user.role === "HeadTeacher") {
    return (
      
      <section className="text-white">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex ">
          <div>
            <ul className={`hidden lg:flex flex-col bg-base-400 w-52 h-screen sticky top-14 p-0 ${styles.customlist}`}>
              <li>
                {" "}
                <Link href={`/tdashboard`} className="mb-3 flex">
                <span className="text-2xl"> <RiDashboard3Line/> </span>
                  {" "}
                 &nbsp;  Dashboard{" "}
                </Link>{" "}
              </li>
              <li>
                <Link href={`/tsubjects`} className="mb-3 flex">
                  <span className="text-2xl">  <IoBook />  </span>
                  {" "}
                  &nbsp; Subjects{" "}
                </Link>{" "}
              </li>
              {teacher && teacher.canAccessAdmissions ? <li>
                <Link href={`/tadmissions?T=1`} className="mb-3 flex">
                  <span className="text-2xl"> <IoPeople /> </span>
                  {" "}
                  &nbsp;
                  Admissions{" "}
                </Link>
              </li> : null}
              {teacher && teacher.canAccessAcademics ? <li>
                <Link href={`/trecords`} className="mb-3 flex">
                  <span className="text-2xl"> <BsFileBarGraph /> </span>
                  {" "} &nbsp;
                  Academic Records{" "}
                </Link>
              </li> : null}
              
              {session && session.user.role === "HeadTeacher" ?   <li className="mb-3">
                <details>
      <summary>HeadMaster Actions</summary>
      <ul>
        <li><Link href={`/tadmissions?T=1`}>Admissions</Link></li>
        <li><Link href={`/classesAndSubjects`}>Classes and Subjects</Link></li>
        <li><a>Teachers</a></li>
        <li><Link href={`/hmRecords`}>Reports</Link></li>
        <li><a>Annoucements</a></li>
        <li><a>FeedBack to Devs</a></li>

      </ul>
    </details>
                  
                </li> : null}
                
          
              <li>
                <Link href={`/calender`} className="mb-3">
                  {" "}
                  Error{" "}
                </Link>{" "}
              </li>

              
            
              
            </ul>
          </div>
          <div className="flex-1 mx-4">{children}</div>
          {/* <div>
            {" "}
            <div className="hidden sticky top-14 lg:flex flex-col p-4 me-4 w-52 hover:bg-neutral">
              <p className="text-lg ">Right Sidebar</p>
              <p> Another sidebar </p>
            </div>
          </div> */}
        </div>
      </section>
    );
  } else {
      redirect(`/`)
  }
}
