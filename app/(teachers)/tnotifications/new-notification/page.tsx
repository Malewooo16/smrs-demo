import {schoolInfoFromTeacherId} from "@/actions/schools/getSchoolInfo";
import NewNotificationForm from "@/main-components/Notifications/NewNotificationForm";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession} from "next-auth";
import React from "react";

//Page for Creating new school announcements

export default async function NewNotification() {
  const session = await getServerSession(authOptions);

  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(
      parseInt(session.user.teacher)
    );
    let schoolId = school?.id || 0;

    return (
      <div className="w-full items-center justify-center">
        <NewNotificationForm schoolId={schoolId} />
      </div>
    );
  }
}
