"use client"

import Link from "next/link"
import { IoMdMenu } from "react-icons/io";

export default function ParentDrawer (){
    return(
        <div className="drawer lg:hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn bg-transparent text-xl border-none outline-none text-teal-700 hover:bg-transparent"><IoMdMenu /></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    
    <ul className="menu p-4 w-44 min-h-full bg-teal-200 text-teal-900">
      {/* Sidebar content here */}
      <h1 className="text-xl my-2 font-semibold"> SMRS </h1>
      <li> <Link href={`/studentsP`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Students</Link> </li>
      <li> <Link href={`/padmissions`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Admissions</Link> </li>
      <li> <Link href={`/pnotifications`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Notifications</Link> </li>
      
    </ul>
  </div>
</div>
    )
}