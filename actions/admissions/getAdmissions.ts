import prisma from "@/db/prisma";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";


export async function getAdmissionById(id: string): Promise<IStudentAdmission | { success: boolean; message: string }> {
    try {
        const admission = await prisma.admission.findUnique({
            where: {
                id
            }
        });
        if (admission !== null) {
            // If admission is not null, return it
            return admission;
        } else {
            // If admission is null, return an error object
            return { success: false, message: "Admission not found" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to Fetch Admissions" };
    }
}

export async function getAllAdmissionsForParent(){
    let parentId
    const session= await getServerSession(authOptions)
    if(session)
        parentId = parseInt(session.user.parent as string)
    try {
        const admissions = await prisma.admission.findMany({
            where:{
                parentId
            },
            include:{schools:true}
        })
        if(!admissions){
            return {success:false, message:"No admissions found"}
        }
      
        const admissionsWithSchools = admissions.filter(a => a.schools.length > 0);
        return admissionsWithSchools.length > 0 ? admissionsWithSchools : { success: false, message: "No admissions connected to schools" };
        
    } catch (error) {
        return {success:false, message:"No admissions found"}
    }

}