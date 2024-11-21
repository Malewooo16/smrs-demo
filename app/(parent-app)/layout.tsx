
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/utilities/authOptions";
import ParentSideBar from "../../main-components/ParentSideBar";
import ParentNavbar from "@/main-components/Navbar/ParentNavbar";
import "../globals.css";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user && session.user.role === "Parent") {
    return (
      <div className="min-h-screen flex flex-col bg-[#e0f7fa]">
        <div className="sticky top-0 z-20">
          <ParentNavbar />
        </div>
        {/**Needs a permanent solution */}
        <div className="flex flex-1">
          <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)]">
            <ParentSideBar />
          </div>
          <div className="flex-1  mx-4 ">{children}</div>
        </div>
      </div>
    );
  } else {
    if (
      session?.user &&
      (session.user.role === "Teacher" || session.user.role === "HeadTeacher")
    ) {
      redirect(`/tdashboard`);
    } else {
      redirect(`/login`);
    }
  }
}
