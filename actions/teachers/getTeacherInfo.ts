import prisma from "@/db/prisma";



export async function getTeacherInfo(id:number){
    try{
        const teacher = await prisma.teacher.findUnique({
            where:{id},
            include:{Classes:true}
        })
        
        return teacher;
    }
    catch(e){
        console.log(e);
        return null
    }

}

export async function getClassTeacherClassandStudents(id:number){
    try{
        const teacher = await prisma.teacher.findUnique({
            where:{id},
            select:{
                Classes:{
                    select:{
                        id:true,
                        name:true,
                        StudentT:{
                            select:{name:true, id:true}
                        }
                    }
                }
            }
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

//TODO Temporary Function Will be enhanced later on
export async function getSchoolHeadTeacher(schoolId:number){
    try{
        const school = await prisma.school.findUnique({
            where:{
                id:schoolId
            },
            include:{headMaster:true}
        })
        return school?.headMasterId
}catch(e){
    console.log(e);
    return null;
}
}