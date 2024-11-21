import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { getTeacherInfo } from "@/actions/teachers/getTeacherInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import SignOut from "../SignOut";
import getParentdata from "@/actions/parents/getParentData";

export default async function NavbarProfileParent() {
    const session = await getServerSession(authOptions);
    const teacher = await getParentdata(parseInt(session?.user.parent as string))
  return (
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="rounded-full m-1 text-2xl "> <FaUserCircle /> </div>
  <ul tabIndex={0} className="dropdown-content bg-base-100  z-[1] w-52 shadow">
    <li className="p-4 bg-[#006d77] text-white font-semibold">{teacher?.firstName} {teacher?.lastName} </li>
    <li className="p-2  hover:bg-gray-300"><a className="flex items-center hover:text-[#3aacb6]" href="/"><IoMdSettings className="mr-3" /> Settings</a></li>
    <li className="p-2 hover:bg-gray-300"><SignOut /></li>
  </ul>
</div>
  )
}
