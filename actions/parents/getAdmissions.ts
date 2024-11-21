import prisma from "@/db/prisma";



export default async function getAdmissionsParents(id:number | undefined){
    if(!id){
        return {success:false}
    }
    try {
        const admissions = await prisma.admission.findMany({
            where:{
                parentId:id
            }
        })
        return admissions
    } catch (error) {
        return{success:false, message:"Failed to fetch Admissions"}
        
    }
}

export async function getUnresolvedAdmissions(id:number | undefined){
    if(!id){
        return []
    }
    try {
        const admissions = await prisma.admission.findMany({
            where:{
                parentId:id
            },
            include:{
                StudentT:true,
            }
        })
        return admissions.filter((a)=> a.StudentT.length === 0)
    } catch (error) {
        return []
        
    }
}

