import prisma from "@/db/prisma";




export default async function getActiveAdmissions(){
    try{
        const activeSchools = await prisma.school.findMany({
            where:{
                admissionStatus:true
            }
        })

        return activeSchools
    }
    catch(e){
        console.log(e);
        return {success:false, message:"Failed to retrive data"}
    }
}