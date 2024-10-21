import { getHeadMasterDashbaord } from "@/actions/dashboard/teachers";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import { FaChalkboardTeacher, FaSchool, FaUserGraduate } from "react-icons/fa";


export default async function HeadMasterDashboard() {
    const session = await getServerSession(authOptions);
    const data = await getHeadMasterDashbaord(parseInt(session?.user.teacher as string));

  //  console.log(schoolInfo)

  return (
    <><div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="relative bg-blue-100 p-6 rounded-lg shadow-md overflow-hidden">
              <FaUserGraduate className="absolute -top-5 -right-5 text-blue-400 opacity-50 text-9xl" />
              <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-blue-800">Students</h3>
                  <p className="text-4xl font-bold text-blue-800">{data.students}</p>
              </div>
          </div>

          <div className="relative bg-green-100 p-6 rounded-lg shadow-md overflow-hidden">
              <FaChalkboardTeacher className="absolute -top-5 -right-5 text-green-400 opacity-50 text-9xl" />
              <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-green-800">Teachers</h3>
                  <p className="text-4xl font-bold text-green-800">{data.teachers}</p>
              </div>
          </div>

          <div className="relative bg-yellow-100 p-6 rounded-lg shadow-md overflow-hidden">
              <FaSchool className="absolute -top-5 -right-5 text-yellow-400 opacity-50 text-9xl" />
              <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-yellow-800">Classes</h3>
                  <p className="text-4xl font-bold text-yellow-800">{data.classes}</p>
              </div>
          </div>
      </div></>
  )
}
