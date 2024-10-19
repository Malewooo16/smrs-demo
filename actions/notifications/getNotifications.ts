"use server"

import prisma from "@/db/prisma"

export async function getUserNotifications(userId: number) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            NotificationUser: {
              some: {
                userId: userId, // User-specific notifications
              },
            },
          },
          {
            NotificationUser: {
              none: {}, // General notifications for everyone
            },
          },
        ],
      },
      include: {
        createdBy: true, // Include the creator's details
        NotificationUser: {
          where: {
            userId: userId, // Filter `isRead` for the specific user
          },
          
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return notifications;
  } catch (err) {
    console.log(err);
    return [];
  }
}





export async function getTestNotifications(userId:number){
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            NotificationUser: {
              some: {
                userId: userId,
              },
            },
          },
          { NotificationUser: { none: {} } },
        ],
      },
      include: {
        createdBy: true,
        NotificationUser: {
          where: {
            userId: userId,
          },
          select: {
            isRead: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return notifications
}catch(e){

}
}


  export async function getSingleNotification(id:number){
    try {
      const notification = await prisma.notification.findFirst({
        where: {
          id
        },
        select:{
            title:true,
            message:true,
            createdAt:true,
            createdBy:{
               select:{name:true, role:true} 
            }
        }
      });
      return notification;

  } catch (err){
     console.log(err)
     return null;
  }
  }
  