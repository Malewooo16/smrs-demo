import prisma from "@/db/prisma";


export async function getAllStudentInfo(schoolId:number){

    try{
        const student = await prisma.studentT.findMany({
            where:{
                schoolId,
            },
         
            include:{
                studentData:true
            }
          });
          return student
    }

    catch(error){
        console.log("Error in getting all Student")
    }

}

export async function getAllStudentInClass(schoolId:number, classId:number){

    try{
        const student = await prisma.studentT.findMany({
            where:{
                schoolId,
                classId
            },
         
            include:{
                studentData:true
            }
          });
          return student
    }

    catch(error){
        console.log("Error in getting all Student")
    }

}


