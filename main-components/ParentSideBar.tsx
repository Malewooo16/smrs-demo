"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ParentSideBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <ul className="hidden lg:flex flex-col h-full w-52 sticky top-20 bg-[#006d77] shadow-lg py-4 px-3">
      <li className="mb-4 text-[#b3ebe5] px-2 uppercase font-semibold">Menu</li>
      <li
        className={`${
          isActive("/studentsP")
            ? "bg-[#005f66] text-[#e0f7fa] border-l-4 border-[#83c5be]"
            : "text-white hover:text-[#f0fdfa] hover:bg-[#008c95] transition-all duration-200 ease-in-out"
        } mb-3 rounded-lg p-3 text-sm`}
      >
        <Link className="block w-full" href="/studentsP">
          Students
        </Link>
      </li>
      <li
        className={`${
          isActive("/padmissions")
            ? "bg-[#005f66] text-[#e0f7fa] border-l-4 border-[#83c5be]"
            : "text-white hover:text-[#f0fdfa] hover:bg-[#008c95] transition-all duration-200 ease-in-out"
        } mb-3 rounded-lg p-3 text-sm`}
      >
        <Link className="block w-full" href="/padmissions">
          Admissions
        </Link>
      </li>
      <li
        className={`${
          isActive("/pnotifications")
            ? "bg-[#005f66] text-[#e0f7fa] border-l-4 border-[#83c5be]"
            : "text-white hover:text-[#f0fdfa] hover:bg-[#008c95] transition-all duration-200 ease-in-out"
        } mb-3 rounded-lg p-3 text-sm`}
      >
        <Link className="block w-full" href="/pnotifications">
          Notifications
        </Link>
      </li>
      {/* <li
        className={`${
          isActive("/pinvoices")
            ? "bg-[#005f66] text-[#e0f7fa] border-l-4 border-[#83c5be]"
            : "text-white hover:text-[#f0fdfa] hover:bg-[#008c95] transition-all duration-200 ease-in-out"
        } mb-3 rounded-lg p-3 text-sm`}
      >
        <Link className="block w-full" href="/pinvoices">
          Invoices
        </Link>
      </li> */}
    </ul>
  );
};

export default ParentSideBar;
