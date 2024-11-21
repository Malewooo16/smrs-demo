import { FaBell } from "react-icons/fa";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOptions";
import NavbarSearch from "./NavbarSearch";
import NavbarProfile from "./NavbarProfile";
import { getTeacherInfo } from "@/actions/teachers/getTeacherInfo";
import TeacherDrawer from "./Common/TeacherDrawer";

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  if(session) {
    const teacher = await getTeacherInfo(parseInt(session.user.teacher as string));
    return (
      <div>
        <TeacherDrawer session={session} teacher={teacher} />
        <div className="hidden lg:flex h-20 bg-white shadow-lg w-full p-4 items-center">
         <div className="flex flex-1"> <h1 className="text-xl font-semibold text-blue-600">SMRS</h1> </div>
         <div className="flex justify-end w-[40%]">
          <div className="border-r"> <NavbarSearch />  </div>
          <div className="border-r flex items-center px-4 "> <span><FaBell className="text-xl" /></span>  </div>
          <div className="flex items-center mx-4"><NavbarProfile /></div>
         </div>
        </div>
      </div>
    );
  }

}
