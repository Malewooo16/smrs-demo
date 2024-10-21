import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import {getStudentandParentForNotice} from "@/actions/students/getStudentInfo";
import {getSchoolHeadTeacher} from "@/actions/teachers/getTeacherInfo";
import NewStudentNoticeForm from "@/main-components/Notifications/NewStudentNoticeForm";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";

export default async function page({searchParams}: {searchParams: any}) {
  const student = await getStudentandParentForNotice(
    parseInt(searchParams.student)
  );

  const parentId = student?.parent?.user?.id;

  const session = await getServerSession(authOptions);

  if (session && session.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    const headteacherId = await getSchoolHeadTeacher(school?.id as number);

    if (student && headteacherId) {
      return (
        <>
          <NewStudentNoticeForm
            headteacherId={headteacherId}
            parentId={parentId as number}
            studentName={student.name}
          />
        </>
      );
    }
  }
}
