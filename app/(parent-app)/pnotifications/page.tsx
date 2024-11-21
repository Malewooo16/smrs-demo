import {getUserNotifications} from "@/actions/notifications/getNotifications";
import {authOptions} from "@/utilities/authOptions";
import {wordCount} from "@/utilities/wordCount";
import {getServerSession} from "next-auth";
import Link from "next/link";
import {IoFilter} from "react-icons/io5";
import {MdEditSquare} from "react-icons/md";

export default async function TeachersNotifications({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.parent) {
    // console.log(session.user.id);
    const notifications = await getUserNotifications(parseInt(session.user.id));

    const maxWordCount = 15;

    const filteredNotifications = notifications.filter((notification) => {
      const userNotification = notification.NotificationUser.find(
        (nu) => nu.userId === parseInt(session.user.id)
      );
      const isRead = userNotification ? userNotification.isRead : false; // Default to false if no user-specific record is found

      if (searchParams.read === "true") return isRead; // Filter for read notifications
      if (searchParams.read === "false") return !isRead; // Filter for unread notifications
      return true; // Return all notifications if no filter is applied
    });

    return (
      <div className="w-full p-6 bg-[#e0f7fa] min-h-screen">
        <div className="flex flex-col items-center justify-center text-gray-800">
          <h1 className="text-3xl font-bold mb-8 text-teal-700">
            Notifications
          </h1>

          <div className="flex justify-between w-full mb-5">
            {/* Filter Dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="p-2 rounded-lg bg-teal-500 text-white shadow-md transition duration-200 hover:bg-teal-600"
              >
                <IoFilter className="text-xl" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg z-10 w-44 p-2 shadow-lg text-teal-700"
              >
                <li>
                  <Link
                    href={`/pnotifications`}
                    className="hover:text-teal-500"
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pnotifications?read=false`}
                    className="hover:text-teal-500"
                  >
                    Unread
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pnotifications?read=true`}
                    className="hover:text-teal-500"
                  >
                    Read
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <p className="text-gray-500">No notifications found.</p>
          ) : (
            filteredNotifications.map((n) => {
              const userNotification = n.NotificationUser.find(
                (nu) => nu.userId === parseInt(session.user.id)
              );
              const isRead = userNotification ? userNotification.isRead : false;

              return (
                <Link href={`/pnotifications/${n.id}`} key={n.id}>
                  <div
                    className={`p-5 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3 xl:w-[80vw] bg-white transition-transform transform hover:scale-105 hover:shadow-lg mb-4 relative ${
                      isRead ? "opacity-80" : "bg-teal-50"
                    }`}
                  >
                    {/* Unread Indicator */}
                    {!isRead && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-teal-700 mb-1">
                      {n.title}
                    </h3>

                    {/* Message */}
                    <p className="text-gray-600 mb-2">
                      {wordCount(n.message) > maxWordCount
                        ? `${n.message
                            .split(/\s+/)
                            .slice(0, maxWordCount)
                            .join(" ")}...`
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
