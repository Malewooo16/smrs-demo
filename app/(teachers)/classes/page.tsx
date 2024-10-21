import {getAllClasses} from "@/actions/classes/getClasses";
import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import DaisyModal from "@/main-components/AgendaAdder";
import {ISchoolAdmission} from "@/utilities/admissionTypes";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import Link from "next/link";

export default async function Classes() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }

  const classes = await getAllClasses(schoolId as number);
  //console.log(classes[0])

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-5">My Classes</h1>
      <div className="flex w-full justify-center py-4">
        <div className="">
          <button className="btn btn-success p-3">
            <Link href={`/classes/newClass`}>Add new class </Link>
          </button>
          <button className="btn btn-warning p-3 mx-4">
            <Link href={`/classes/updateClass`}>Update Classes</Link>
          </button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 ">
        {classes && classes.length > 0 ? (
          classes.map((c, index) => (
            <Link href={`/students/${c.id}`} key={c.id}>
              {" "}
              <div key={index} className="card bg-white p-3">
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
