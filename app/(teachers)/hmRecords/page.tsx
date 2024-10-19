import { getAllClasses } from "@/actions/classes/getClasses";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import DaisyModal from "@/app/main-components/AgendaAdder";
import { ISchoolAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Classes() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }

 if(session && session.user.role === "HeadTeacher"){
  const classes = await getAllClasses(schoolId as number);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-5">My Classes</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 ">
        {classes && classes.length > 0 ? (
          classes.map((c, index) => (
            <div key={c.id} tabIndex={0} className="collapse collapse-arrow border-base-300 bg-white border">
              <input type="checkbox" />
  <div className="collapse-title text-xl font-medium">{c.name}</div>
  <div className="collapse-content flex flex-col">
    <Link className="hover:underline" href={`/hmRecords/${c.id}?term=Term+1+${new Date().getFullYear()}`}>{`Term 1 ${new Date().getFullYear()}`} </Link>
    <Link className="hover:underline" href={`/hmRecords/${c.id}?term=Term+2+${new Date().getFullYear()}`}>{`Term 2 ${new Date().getFullYear()}`} </Link>
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
}
