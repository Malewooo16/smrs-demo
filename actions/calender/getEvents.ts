"use server"

import prisma from "@/db/prisma"

export async function getSchoolEvents(schoolId:number){
    try {
        const events = await prisma.event.findMany({
            where: {
              schoolId
            }
        });
        return events;
    } catch (err) {
        console.log(err)
       // return {success:false, message:"Failed to get events"}
    }
}