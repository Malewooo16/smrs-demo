import prisma from "@/db/prisma";



export async function getTeacherInfo(id:number){
    try{
        const teacher = await prisma.teacher.findUnique({
            where:{id},
        })

        return teacher;
    }
    catch(e){
        console.log(e);
    }

}