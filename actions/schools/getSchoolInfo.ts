"use server"

import prisma from "@/db/prisma"

export async function schoolInfoFromTeacherId(id:number){ 

    try{
        const schoolInfo = await prisma.teacher.findUnique({
            where:{id},
            
        })

        return schoolInfo
    }
    catch (e){
        console.log(e)
    }
    
}