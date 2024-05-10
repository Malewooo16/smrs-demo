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
  const subjects = await getAllSubjects(schoolId as number);
  return (
    <div>
      <h1 className="text-lg">Subjects</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 ">
        {subjects && subjects.length > 0 ? (
          subjects.map((c, index) => (
            <Link href={`/students/${c.id}`} key={c.id}>
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
        <Link href={`/subjects/newSubject`}>
          {" "}
          <div className="card bg-white ">
            {" "}
            <p className="font-semibold text-lg px-6 py-4 rounded-tl-md rounded-tr-none">
              {" "}
              Add New Subject +{" "}
            </p>{" "}
          </div>
        </Link>
      </div>
    </div>
    
  );
}
