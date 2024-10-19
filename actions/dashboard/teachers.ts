"use server";

import prisma from "@/db/prisma";

export async function getTeachersDashboard() {
  return 0;
}

export async function getHeadMasterDashbaord(id:number){
  try{
    const teacher = await prisma.teacher.findUnique({
      where:{
        id
      },
     select:{
      school:{select:{StudentT:true, teachers:true, classes:true}}

     }
    
    })

    return {students:teacher?.school?.StudentT.length, teachers:teacher?.school?.teachers.length, classes:teacher?.school?.classes.length}
  }catch(e){
    console.log(e);
    throw new Error('Failed to fetch headmaster dashboard data');
  }
}
