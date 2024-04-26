import prisma from "@/db/prisma";
import { IStudentAdmission } from "@/utilities/admissionTypes";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import { decryptData } from "../schools/crypto";


interface ErrorResponse {
    success: false;
    message: string;
}

type Response<T> = T | ErrorResponse;

export async function getAdmissionById<T>(id: string): Promise<Response<T>> {
    
    try {
        const admission = await prisma.admission.findUnique({
            where: {
                id
            },
            include: { AdmissionStats: true }
        });
        if (admission) {
           return admission as T
        } else {
            return { success: false, message: "Admission not found" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch admissions" };
    }
}

export async function getSpecifcAdmissionById<T>(admissionId:string): Promise<Response<T>> {
    try {
        const admission = await prisma.admissionStatus.findUnique({
            where: {
                admissionId
            },
            include: { admission: true }
        });
        if (admission) {
           return admission as T
        } else {
            return { success: false, message: "Admission not found" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch admissions" };
    }
}
export async function getAllAdmissionsForParent <T> () : Promise<Response<T>>{
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
        return admissionsWithSchools.length > 0 ? admissionsWithSchools as T : { success: false, message: "No admissions connected to schools" };
        
    } catch (error) {
        return {success:false, message:"No admissions found"}
    }

}

export async function getAdmissionsForSchool(schoolId:any){ //acc the id is number I was bored to use types
    try{
        const admissions = await prisma.admissionStatus.findMany({
            where:{
                schoolId 
            },
            include:{admission:true}

        })

        if(!admissions || admissions===null){
            return{success:false, message:"No admissions found"}
        }

        return admissions
    }
    catch(e){
        console.log(e)
        return{success:false, message:"Error when fetching data"}
    }

}