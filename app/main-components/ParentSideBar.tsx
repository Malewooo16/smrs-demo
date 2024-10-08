"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ParentSideBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <ul className="hidden lg:flex flex-col  h-[93vh] w-52 sticky top-14  bg-[#072f7c] shadow-lg ">
      <li
        className={`${
          isActive("/pdashboard")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded mt-4  text-lg`}
      >
        <Link className="block w-full ms-2 py-4" href="/pdashboard">
          Dashboard
        </Link>
      </li>
      <li
        className={`${
          isActive("/studentsP")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded text-lg `}
      >
        <Link className="block w-full ms-2 py-4" href="/studentsP">
          Students
        </Link>
      </li>
      <li
        className={`${
          isActive("/padmissions")
            ? "bg-[#051f4c] text-white border-l-4 border-yellow-400"
            : "text-white hover:bg-[#0a4fa0] hover:border-l-4 hover:border-white active:bg-[#051f4c] active:border-l-4 active:border-yellow-400"
        } mb-3 rounded  text-lg`}
      >
        <Link className="block w-full ms-2 py-4" href="/padmissions">
          Admissions
        </Link>
      </li>
    </ul>
  );
};

export default ParentSideBar;
