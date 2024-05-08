import prisma from "@/db/prisma";



export async function getAllSubjects(schoolId:number) {

    try {
        const subjects = await prisma.course.findMany({
            where:{
                schoolId,
            },
        })
        return subjects
    } catch (error) {
        console.log(error)
    }
    
}