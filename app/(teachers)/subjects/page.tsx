import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { getAllSubjects } from "@/actions/subjects/getSubjects";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Subjects() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }
  //TODO Separate a-level from o-level
  const subjects = await getAllSubjects(schoolId as number);
  return (
    <div>
      <div className="w-full flex justify-end my-2">
        <button className="btn-submit w-1/5"><Link href={`/subjects/newSubject`}>
              Add New Subject +         
        </Link></button>
        </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 ">
        {subjects && subjects.length > 0 ? (
          subjects.map((c, index) => (
            <Link href={`/subjects/${c.id}`} key={c.id}>
              {" "}
              <div key={index} className="card bg-white ">
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
