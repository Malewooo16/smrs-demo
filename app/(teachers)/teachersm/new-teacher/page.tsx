import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import AddNewTeacher from "@/main-components/Teachers/CreateTeacher";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import React from "react";

export default async function NewTeacherPage() {
  const session = await getServerSession(authOptions);

  if (
    session?.user.teacher &&
    session.user.role.toLocaleLowerCase() === "headteacher"
  ) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    const schoolId = school?.id;

    return <AddNewTeacher schoolId={schoolId as number} />;
  }

  return (
    <div className="text-center">
      <h1 className="text-red-500">
        Unauthorized Access. Please log in as a Headteacher.
      </h1>
    </div>
  );
}
