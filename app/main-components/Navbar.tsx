import { BsThreeDots } from "react-icons/bs";
import ThemeProvider from "./ThemeProvider";
import SignOut from "./SignOut";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOptions";
import Drawer from "./Drawer";

export default async function Navbar() {
  //const userInfo = await getServerSession(authOptions)
  //const id = userInfo?.user.id
  return (
    <div>
      <Drawer />
      <div className="hidden lg:flex h-20">
        <div className="w-52 bg-logo"> </div>
        <div className="flex-1 bg-navbar"> </div>
      </div>
    </div>
  );
}
