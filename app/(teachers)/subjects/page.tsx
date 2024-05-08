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
      {subjects && subjects.length > 0 ? (
        subjects.map((s) => (
          <div className="card w-96" key={s.id}>
            <p> {s.name} </p>
          </div>
        ))
      ) : (
        <div>
          <p>No Subjects Available</p>
          <Link href={`/subjects/newSubject`}>Add a New Subject</Link>
        </div>
      )}
    </div>
  );
}
