import prisma from "@/db/prisma";



export async function getAllClasses(schoolId:number){
 try {
    const classes = await prisma.classes.findMany({
        where:{
            schoolId,
        },
    })

    return classes;
 } catch (error) {
    console.log(error)
 }

 
}

export async function getSingleClass(schoolId:number, classId:number){
    try {
        const classes = await prisma.classes.findUnique({
            where:{
                schoolId,
                id:classId,
            },
        })
    
        return classes;
     } catch (error) {
        console.log(error)
     }
}