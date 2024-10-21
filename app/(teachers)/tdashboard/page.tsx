import {getTeacherInfo} from "@/actions/teachers/getTeacherInfo";
import HeadMasterDashboard from "@/main-components/HeadMaster/HeadMasterDashboard";
import TeachersDashboard from "@/main-components/TeachersDashboard";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";

export default async function TDashboard() {
  const session = await getServerSession(authOptions);
  const teacher = await getTeacherInfo(
    parseInt(session?.user.teacher as string)
  );

  if (teacher && session?.user.role.toLocaleLowerCase() === "headteacher") {
    return <HeadMasterDashboard />;
  } else {
    return <TeachersDashboard />;
  }
}
