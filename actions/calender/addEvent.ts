"use server"

import prisma from "@/db/prisma"


export async function addEvent(event:any, schoolId:number){
    try {
        await prisma.event.create({
            data: {
              ...event,
              createdBy:"Admin",
              schoolId
              
            }
        })
        return{success:true, message:"Event added successfully"}
    } catch (err) {
        console.log(err);
        return {success:false, message:"Error adding event"}
    }
}