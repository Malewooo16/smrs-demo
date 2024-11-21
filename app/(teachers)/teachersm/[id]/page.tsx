import {getTeacherInfo} from "@/actions/teachers/getTeacherInfo";
import ViewandEditTeacher from "@/main-components/Teachers/ViewandEditTeacher";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";

export default async function TeacherId({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);

  // Check if the user is a teacher and has the role of headteacher
  if (
    session?.user?.teacher &&
    session.user.role.toLowerCase() === "headteacher"
  ) {
    const teacher = await getTeacherInfo(parseInt(params.id));
   // console.log(teacher)

    // Conditional rendering: Check if teacher is not null
    if (teacher !== null) {
      return (
        <div>
          <ViewandEditTeacher teacher={teacher} />
        </div>
      );
    }
  }

  // Fallback if not authorized or teacher not found
  return (
    <p className="text-error text-center">
      Unauthorized access. Please log in.
    </p>
  );
}
