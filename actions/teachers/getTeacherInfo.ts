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

export async function getAllTeachers(schoolId:number){
    try{
        const teachers = await prisma.teacher.findMany({
            where:{schoolId},
        })

        return teachers;
    }
    catch(e){
        console.log(e);
    }

}


export async function getTeachersCourseEnrollment(teacherId:number){
    try{
        const teachers = await prisma.classCourse.findMany({
            where:{
                teacherId
            },
            include:{
                course:true,
                class:true
            },
            
        })

        return teachers;
    }
    catch(e){
        console.log(e);
    }

}