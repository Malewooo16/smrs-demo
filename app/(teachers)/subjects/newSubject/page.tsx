import { getAllClasses } from '@/actions/classes/getClasses';
import { schoolInfoFromTeacherId } from '@/actions/schools/getSchoolInfo';
import { getAllTeachers } from '@/actions/teachers/getTeacherInfo';
import {AddNewSubject }from '@/app/main-components/AddNewSubject'
import { authOptions } from '@/utilities/authOptions';
import { getServerSession } from 'next-auth';


export default async function AddNewwSubject() {
    const session = await getServerSession(authOptions);
    let schoolId;
    if (session?.user.teacher) {
      const school = await schoolInfoFromTeacherId(
        parseInt(session.user.teacher)
      );
      schoolId = school?.id || 0;
    }
  
    const classes = await getAllClasses(schoolId as number);
    const teachers = await getAllTeachers(schoolId as number)
    //console.log(teachers)
  return (
    <div>
        <AddNewSubject classes={classes} teachers={teachers} schoolId={schoolId} />
    </div>
  )
}
