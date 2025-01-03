import { getAdmissionsForSchool } from "@/actions/admissions/getAdmissions";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"
import ClientWrapperTAdmissions from "./ClientWrapper";
import { ISchoolAdmission } from "@/utilities/admissionTypes";
import { revalidatePath } from "next/cache";


export default async function Admissions() {
  revalidatePath(`/tadmissions`);
  const session = await getServerSession(authOptions);
  let admissions;
  let schoolInfo
  if(session?.user.teacher){
    schoolInfo = await schoolInfoFromTeacherId(parseInt(session.user.teacher))
    admissions = await getAdmissionsForSchool(schoolInfo?.id);
  }
 //console.log(schoolInfo)

  return (
    <div className="p-2">
      <h1 className="text-2xl">Admissions</h1>
      <ClientWrapperTAdmissions admissions={admissions} school={schoolInfo} />
    </div>
  )
}
