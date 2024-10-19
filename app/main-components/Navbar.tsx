import { FaBell } from "react-icons/fa";
import ThemeProvider from "./ThemeProvider";
import SignOut from "./SignOut";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOptions";
import Drawer from "./Drawer";
import NavbarSearch from "./NavbarSearch";
import NavbarProfile from "./NavbarProfile";

export default async function Navbar() {
  //const userInfo = await getServerSession(authOptions)
  //const id = userInfo?.user.id
  return (
    <div>
      <Drawer />
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
