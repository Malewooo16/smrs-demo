"use server"

import prisma from "@/db/prisma"


export const getClasses = async (schoolId:number, classId:number)=>{
    try{
        const classes = await prisma.classes.findUnique({
            where:{
                id:classId,
                schoolId
            }
        })
        return classes
    }
  catch(e){
    console.log(e);
    return{success:false, message:"Error While Fetching Classes"}

  }
}