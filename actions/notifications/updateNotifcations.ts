"use server"

import prisma from "@/db/prisma"
import { revalidatePath, revalidateTag } from "next/cache"

export async function readNotification(userId:number, notificationId:number){
    try{
         await prisma.notificationUser.update({
            where: {
              notificationId_userId: {
                notificationId: notificationId,
                userId: userId
              }
            },
            data: {
              isRead: true // Mark the notification as read for this user
            }
          });
          
        revalidatePath(`/tnotifications`)
        return true
    }catch(err){
        console.log(err)
        return false
    }
}