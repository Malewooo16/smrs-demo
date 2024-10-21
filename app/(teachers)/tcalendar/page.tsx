import {getSchoolEvents} from "@/actions/calender/getEvents";
import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import {getAllStudentInClass} from "@/actions/students/getStudentInfo";
import SchoolEventCalendar from "@/main-components/SchoolCalender/MainCalender";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import Link from "next/link";

export default async function Calender() {
  const session = await getServerSession(authOptions);
  let schoolId;
  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    schoolId = school?.id || 0;
  }
  const events = await getSchoolEvents(schoolId as number);
  //console.log(events);
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-2 px-10">School Event Calendar</h2>
      <div className="flex w-full justify-end py-2">
        <button className="btn btn-success">
          <Link
            className="flex h-full items-center"
            href={`/tcalendar/newevent`}
          >
            New Event
          </Link>{" "}
        </button>{" "}
      </div>
      {events && events.length > 0 ? (
        <SchoolEventCalendar events={events} />
      ) : (
        <p className="text-center">There are no events please add</p>
      )}
    </div>
  );
}
