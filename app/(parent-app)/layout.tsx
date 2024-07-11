
import Navbar from "../main-components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { authOptions } from "@/utilities/authOptions";
import ParentSideBar from "../main-components/ParentSideBar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user && session.user.role === "Parent") {
    return (
      <div className="min-h-screen flex flex-col ">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex flex-1">
          <div className="hidden lg:block fixed top-[4.1rem] h-[calc(100vh-56px)] ">
            <ParentSideBar />
          </div>
          <div className="flex-1 lg:ms-52 mx-4 ">
            {children}
            
          </div>
        </div>
      </div>
    );
  } else {
    if (session?.user && (session.user.role === "Teacher" || session.user.role === "HeadTeacher")) {
      redirect(`/tdashboard`);
    } else {
      redirect(`/`);
    }
  }
}
