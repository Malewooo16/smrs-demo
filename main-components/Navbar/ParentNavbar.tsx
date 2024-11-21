import { FaBell } from "react-icons/fa";
import Drawer from "../Drawer";
import NavbarSearch from "../NavbarSearch";
import NavbarProfileParent from "./ParentProfileNavbar";
import ParentDrawer from "../Common/ParentDrawer";


export default async function ParentNavbar() {
  //const userInfo = await getServerSession(authOptions)
  //const id = userInfo?.user.id
  return (
    <div>
      <ParentDrawer />
      <div className="hidden lg:flex h-20 bg-white shadow-lg w-full p-4 items-center">
       <div className="flex flex-1"> <h1 className="text-xl font-semibold text-[#3aacb6]">SMRS</h1> </div>
       <div className="flex justify-end w-[40%]">
        <div className="border-r"> <NavbarSearch />  </div>
        <div className="border-r flex items-center px-4 "> <span><FaBell className="text-xl" /></span>  </div>
        <div className="flex items-center mx-4"><NavbarProfileParent /></div>
       </div>
      </div>
    </div>
  );
}
