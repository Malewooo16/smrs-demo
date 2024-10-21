import Link from "next/link";
import Navbar from "./Navbar";
import {getServerSession} from "next-auth";
import {useRouter} from "next/navigation";
import RedirectToLogin from "./RedirectToLogin";
import ThemeProvider from "./ThemeProvider";
import LoginForm from "./LoginForm";
import {authOptions} from "@/utilities/authOptions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //console.log(session?.user)
  return (
    <section className=" mt-2">
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="flex ">
        <div>
          <ul className="hidden lg:flex menu  w-48 rounded-box sticky top-14 ms-1 ">
            <li>
              {" "}
              <Link href={`/dashboard`} className="mb-3">
                {" "}
                Dashboard{" "}
              </Link>{" "}
            </li>
            <li>
              <Link href={`/workflows`} className="mb-3">
                {" "}
                Workflows{" "}
              </Link>{" "}
            </li>
            <li>
              <Link href={`/analytics`} className="mb-3">
                {" "}
                Analytics{" "}
              </Link>{" "}
            </li>
            <li>
              <Link href={`/calender`} className="mb-3">
                {" "}
                Calender{" "}
              </Link>{" "}
            </li>

            <li>
              <Link href={`/teams`} className="mb-3">
                {" "}
                Teams{" "}
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
}
