"use server";

import prisma from "@/db/prisma";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";

export async function schoolInfoFromTeacherId(id: number) {
  try {
    const schoolInfo = await prisma.teacher.findUnique({
      where: { id },
      include: {
        school: {
          include: {
            classes: true,
          },
        },
      },
    });

    return schoolInfo?.school; // TODO rember to return only the school information
  } catch (e) {
    console.log(e);
  }
}

export async function getSchoolInfoParent(){
  const session = await getServerSession(authOptions);
  if(session?.user){
    const students = await prisma.studentT.findMany({
      where:{
        parentId:parseInt(session.user.parent as string)
      },
       select:{
        school:true
       }
      },)
      return students
    }

    return []

    
}




