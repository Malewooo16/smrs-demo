import prisma from "@/db/prisma";



export async function getSchoolById(id:number){
    try{
        const school = await prisma.school.findUnique({
            where:{
                id
            }
        })
        if(school !== null){
            return school
        }
        else{
            return {success:"false", message:"Failed to fetch School"}
        }
    }
    catch(e){
        console.log(e)
        return {success:false, message:"Error While fetching Schools"}
    }
}