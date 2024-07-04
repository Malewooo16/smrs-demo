"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ParentSideBar: React.FC = () => {
  const pathname = usePathname()
 

  const isActive = (path: string) => pathname === path;

  return (
    <ul className="hidden lg:flex flex-col menu h-[100vh] w-48 sticky top-14 ms-1 bg-gray-100 shadow-lg">
      <li className={`${isActive('/pdashboard') ? 'bg-gray-300 underline' : 'text-gray-800 hover:bg-gray-200 hover:underline active:bg-gray-300 active:underline'} mb-3 rounded`}>
        <Link href="/pdashboard">Dashboard</Link>
      </li>
      <li className={`${isActive('/studentsP') ? 'bg-gray-300 underline' : 'text-gray-800 hover:bg-gray-200 hover:underline active:bg-gray-300 active:underline'} mb-3 rounded`}>
        <Link href="/studentsP">Students</Link>
      </li>
      <li className={`${isActive('/padmissions') ? 'bg-gray-300 underline' : 'text-gray-800 hover:bg-gray-200 hover:underline active:bg-gray-300 active:underline'} mb-3  rounded`}>
        <Link href="/padmissions">Admissions</Link>
      </li>
    </ul>
  );
};

export default ParentSideBar;
