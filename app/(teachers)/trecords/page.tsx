import { getAllClasses } from "@/actions/classes/getClasses";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import DaisyModal from "@/app/main-components/AgendaAdder";
import { ISchoolAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function Records() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }

  const classes = await getAllClasses(schoolId as number);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-5">Class Records</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 ">
        {classes && classes.length > 0 ? (
          classes.map((c, index) => (
            <Link href={`/trecords/${c.id}`} key={c.id}>
              {" "}
              <div key={index} className="card bg-base-200 ">
                <p className="font-semibold text-lg px-6 py-4 rounded-tl-md rounded-tr-none">
                  {c.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>Classes Data Not Available</p>
        )}
        
      </div>
    </div>
  );
}
