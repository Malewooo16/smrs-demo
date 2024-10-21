import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import AddNewClassForm from "@/main-components/AddNewClassForm";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";

export default async function AddClass() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }
  return (
    <div>
      <AddNewClassForm schoolId={schoolId} />
    </div>
  );
}
