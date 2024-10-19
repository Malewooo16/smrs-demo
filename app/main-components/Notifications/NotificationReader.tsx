"use client"

import { readNotification } from "@/actions/notifications/updateNotifcations"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function NotificationReader({notificationId}:{notificationId:string}) {

    const {data:session} = useSession();
    const userId = session?.user.id as string;
    useEffect(()=>{
       
            const read = async (notificationId:string, userId:string)=>{
                await readNotification(parseInt(userId), parseInt(notificationId),);
            }
        read(notificationId, userId);
    }, [notificationId])

  return null;
}
