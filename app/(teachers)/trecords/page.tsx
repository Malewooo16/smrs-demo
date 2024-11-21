import {getAllClasses} from "@/actions/classes/getClasses";
import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import DaisyModal from "@/main-components/AgendaAdder";
import {ISchoolAdmission} from "@/utilities/admissionTypes";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
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
            <div
              key={c.id}
              tabIndex={0}
              className="collapse collapse-arrow border-base-300 bg-white border"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">{c.name}</div>
              <div className="collapse-content flex flex-col">
                <Link
                  className="hover:underline"
                  href={`/trecords/${
                    c.id
                  }?term=Term+One+${new Date().getFullYear()}`}
                >
                  {`Term One ${new Date().getFullYear()}`}{" "}
                </Link>
                <Link
                  className="hover:underline"
                  href={`/trecords/${
                    c.id
                  }?term=Term+Two+${new Date().getFullYear()}`}
                >
                  {`Term Two ${new Date().getFullYear()}`}{" "}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Classes Data Not Available</p>
        )}
      </div>
    </div>
  );
}
