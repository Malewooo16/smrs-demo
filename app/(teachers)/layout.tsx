import Navbar from "../../main-components/Navbar";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/utilities/authOptions";
import {getTeacherInfo} from "@/actions/teachers/getTeacherInfo";
import TeacherSideBar from "../../main-components/TeachersSideBar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const teacher = await getTeacherInfo(
    parseInt(session?.user.teacher as string)
  );

  if (
    session?.user &&
    (session.user.role === "Teacher" || session.user.role === "HeadTeacher")
  ) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex flex-1">
          <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)]">
            <TeacherSideBar teacher={teacher} session={session} />
          </div>
          <div className="flex-1 my-2  mx-4 ">{children}</div>
        </div>
      </div>
    );
  } else {
    redirect(`/`);
  }
}
