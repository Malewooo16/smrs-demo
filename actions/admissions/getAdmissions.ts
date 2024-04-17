import prisma from "@/db/prisma";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import { decryptData } from "../schools/crypto";


export async function getAdmissionById(id: string, encryptedId: string): Promise<IStudentAdmission | { success: boolean; message: string }> {
    const schoolId = parseInt(decryptData(encryptedId, "MySuperSecretKeyMySuperSecretKey"));
    try {
        const admission = await prisma.admission.findUnique({
            where: {
                id
            },
            include: { AdmissionStats: true }
        });
        if (admission) {
            // If admission is found, check if it has AdmissionStats for the specified school
            const hasSchool = admission.AdmissionStats.some(stats => stats.schoolId === schoolId);
            if (hasSchool) {
                return null;
            } else {
                // If admission does not have AdmissionStats for the specified school, return error
                return admission;
            }
        } else {
            // If admission is null, return an error object
            return { success: false, message: "Admission not found" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch admissions" };
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
           include:{AdmissionStats:{include:{school:true}}}
        })
        if(!admissions){
            return {success:false, message:"No admissions found"}
        }
      
        const admissionsWithSchools = admissions.filter(a => a.AdmissionStats.length > 0);
        return admissionsWithSchools.length > 0 ? admissionsWithSchools : { success: false, message: "No admissions connected to schools" };
        
    } catch (error) {
        return {success:false, message:"No admissions found"}
    }

}