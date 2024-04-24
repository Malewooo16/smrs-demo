import { getAdmissionsForSchool } from "@/actions/admissions/getAdmissions";
import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"


export default async function Admissions() {
  const session = await getServerSession(authOptions);
  let admissions;
  if(session?.user.teacher)
    admissions = await getAdmissionsForSchool(parseInt(session.user.teacher));

  console.log(admissions)

  return (
    <div>Admissions</div>
  )
}
