import {getSingleNotification} from "@/actions/notifications/getNotifications";
import NotificationReader from "@/main-components/Notifications/NotificationReader";
import React from "react";

export default async function SingleNotification({
  params,
}: {
  params: {id: string};
}) {
  const notification = await getSingleNotification(parseInt(params.id));
  // console.log(notification);

  if (notification) {
    const {title, message, createdBy, createdAt} = notification;

    return (
      <div>
        <NotificationReader notificationId={params.id} />
        <div className="p-6 rounded-lg shadow-lg bg-white mb-6 relative">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

          {/* Message */}
          <p className="text-gray-700 mb-4">{message}</p>

          {/* Creator Info */}
          <div className="text-sm text-gray-500 mb-2">
            <span>
              By:{" "}
              <span className="font-semibold text-gray-600">
                {createdBy?.name}
              </span>
            </span>
            <span className="my-2 block">{createdBy?.role}</span>
          </div>

          {/* Timestamp */}
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toString().slice(0, -31)}
          </p>
        </div>
      </div>
    );
  }
}
