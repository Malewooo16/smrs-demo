import Link from "next/link";
import Navbar from "../main-components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import LoginForm from "../main-components/LoginForm";
import { authOptions } from "@/utilities/authOptions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  //console.log(session?.user)

  if (session?.user && session.user.role==="dev") {
    return (
      <section className="">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex ">
          <div>
            <ul className="hidden lg:flex menu  w-48 rounded-box sticky top-14 ms-1 ">
              <li>
                {" "}
                <Link href={`/devDash`} className="mb-3">
                  {" "}
                  Dashboard{" "}
                </Link>{" "}
              </li>
              
              

              
             
              
            </ul>
          </div>
          <div className="flex-1 mx-4">{children}</div>
          {/* <div>
            {" "}
            <div className="hidden sticky top-14 lg:flex flex-col p-4 me-4 w-52 hover:bg-neutral">
              <p className="text-lg ">Right Sidebar</p>
              <p> Another sidebar </p>
            </div>
          </div> */}
        </div>
      </section>
    );
  } else {
    
      redirect(`/`)
  }
}
