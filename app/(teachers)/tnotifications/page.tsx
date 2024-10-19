import { getUserNotifications } from "@/actions/notifications/getNotifications";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import NewNotificationForm from "@/app/main-components/Notifications/NewNotificationForm";
import { authOptions } from "@/utilities/authOptions";
import { wordCount } from "@/utilities/wordCount";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { IoFilter } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";

export default async function TeachersNotifications({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
    const schoolId = school?.id || 0;

    const notifications = await getUserNotifications(parseInt(session.user.id));

    const maxWordCount = 15;

    const filteredNotifications = notifications.filter((notification) => {
      const userNotification = notification.NotificationUser.find((nu) => nu.userId === parseInt(session.user.id));
      const isRead = userNotification ? userNotification.isRead : false; // Default to false if no user-specific record is found

      if (searchParams.read === "true") return isRead; // Filter for read notifications
      if (searchParams.read === "false") return !isRead; // Filter for unread notifications
      return true; // Return all notifications if no filter is applied
    });

    return (
      <div className="w-full p-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>

          <div className="flex justify-between w-full mb-3">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="p-2 rounded bg-gray-400 text-white m-1"
              >
                <IoFilter />{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <Link href={`/tnotifications`}>All</Link>{" "}
                </li>
                <li>
                  <Link href={`/tnotifications?read=false`}>Unread</Link>
                </li>
                <li>
                  <Link href={`/tnotifications?read=true`}>Read</Link>
                </li>
              </ul>
            </div>

            <button className="btn btn-success">
              <Link
                href={`/tnotifications/new-notification`}
                className="flex h-full py-4 items-center"
              >
                New{" "}
                <span className="ml-2 text-lg">
                  <MdEditSquare />{" "}
                </span>
              </Link>
            </button>
          </div>

          {filteredNotifications.length === 0 ? (
            <p className="text-gray-500">No notifications found.</p>
          ) : (
            filteredNotifications.map((n) => {
              const userNotification = n.NotificationUser.find((nu) => nu.userId === parseInt(session.user.id));
              const isRead = userNotification ? userNotification.isRead : false; // Get isRead status

              return (
                <Link href={`/tnotifications/${n.id}`} key={n.id}>
                  <div
                    className={`p-4 rounded-lg shadow-md bg-white mb-4 lg:w-[75vw] relative transition-transform transform hover:scale-105 ${
                      isRead ? "opacity-75" : "bg-indigo-50"
                    }`}
                  >
                    {/* Unread Indicator */}
                    {!isRead && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {n.title}
                    </h3>

                    {/* Message */}
                    <p className="text-gray-600 mb-2">
                      {wordCount(n.message) > maxWordCount
                        ? `${n.message.split(/\s+/).slice(0, maxWordCount).join(" ")}...`
                        : n.message}
                    </p>

                    {/* Timestamp */}
                    <p className="text-sm text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <p className="text-center text-red-500">
      Unauthorized access. Please log in.
    </p>
  );
}
