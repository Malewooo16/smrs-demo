import { getAdmissionsForSchool } from "@/actions/admissions/getAdmissions";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"
import ClientWrapperTAdmissions from "./ClientWrapper";


export default async function Admissions() {
  const session = await getServerSession(authOptions);
  let admissions;
  if(session?.user.teacher){
    const schoolInfo = await schoolInfoFromTeacherId(parseInt(session.user.teacher))
    admissions = await getAdmissionsForSchool(schoolInfo?.schoolId);
  }
  //console.log(admissions)

  return (
    <div>
      <h1 className="text-2xl">Admissions</h1>
      <ClientWrapperTAdmissions admissions={admissions} />
    </div>
  )
}