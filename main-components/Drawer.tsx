"use client"

import Link from "next/link"
import { IoMdMenu } from "react-icons/io";

export default function Drawer (){
    return(
        <div className="drawer lg:hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn "><IoMdMenu /></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <h1 className="text-lg my-2"> Elegance </h1>
      <li> <Link href={`/pdashboard`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Dashboard</Link> </li>
      <li> <Link href={`/studentsP`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Students</Link> </li>
      <li> <Link href={`/padmissions`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Admissions</Link> </li>
 
      
    </ul>
  </div>
</div>
    )
}