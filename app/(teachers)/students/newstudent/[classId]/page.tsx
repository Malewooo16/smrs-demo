import {getSingleClass} from "@/actions/classes/getClasses";
import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import AddStudentForm from "@/main-components/Students/AddStudentForm";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import React from "react";

export default async function NewStudent({
  params,
}: {
  params: {classId: string};
}) {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }
  const classData = await getSingleClass(
    schoolId as number,
    parseInt(params.classId)
  );
  return (
    <div>
      <h1 className="text-xl text-center my-4">
        Add New Student to {classData?.name}
      </h1>
      <AddStudentForm />
    </div>
  );
}
