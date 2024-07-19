import PCalender from "@/app/main-components/PCalender";
import SchoolInfo from "@/app/main-components/StdSchoolInfo";
import StudentsCards from "@/app/main-components/StudentsCards";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  //console.log("Session", session);

  return (
    <div className="mx-2">
      <div className="">
        <h1 className="text-3xl text-right my-5 ms-5">
          {" "}
          Welcome To Your Dashboard {session?.user.role}{" "}
        </h1>
      </div>
     <div className="flex justify-between">
    
     <div className="flex  flex-col ms-10"> <p className="text-2xl font-semi-bold">Your Students</p> <StudentsCards /></div>
     <SchoolInfo />
     <PCalender />
     </div>
    </div>
  );
}
