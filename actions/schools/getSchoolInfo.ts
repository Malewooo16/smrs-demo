"use server"

import prisma from "@/db/prisma"


export async function schoolInfoFromTeacherId(id:number){ 

    try{
        const schoolInfo = await prisma.teacher.findUnique({
            where:{id},
            include:{school:true},
            
            
        })

        return schoolInfo  // TODO rember to return only the school information
    }
    catch (e){
        console.log(e)
        
    }
    
}