import { getTeacherInfo } from "@/actions/teachers/getTeacherInfo"
import TeachersDashboard from "@/app/main-components/TeachersDashboard";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";




export default async function TDashboard() {
    const session = await getServerSession(authOptions);
    const teacher = await getTeacherInfo(parseInt(session?.user.teacher as string))
  
    if(teacher){
        return(
            <div>
                <h1 className="text-2xl text-right">Welcome {teacher.firstName}</h1>
                <TeachersDashboard />
            </div>
        )








    }








    else{
        throw new Error()
    }
}
