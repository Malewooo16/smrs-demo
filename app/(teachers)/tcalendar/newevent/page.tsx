import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import AddCalenderEventForm from "@/main-components/SchoolCalender/AddCalenderEvent";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";

export default async function NewEvent() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
    return <AddCalenderEventForm schoolId={schoolId} />;
  }
}
