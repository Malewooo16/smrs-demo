"use server"
import prisma from "@/db/prisma";
import { IStudentAdmission } from "../../utilities/admissionTypes";


export async function createAdmission(admissionData:any, parentId:number){

    try{
        const newAdmission = await prisma.admission.create({
            data:{...admissionData, dob:new Date(admissionData.dob) , Parent:{connect:{id:parentId}}}
        })
        return{success:true, message:"Success", admissionId:newAdmission.id}
    }
    catch(e){
        console.log(e)
        return {success:false, message:"An error occured when adding admissions"}
    }
    
}

export async function addParentInfo(admissionData:any, admissionId:string){
    try {
        await prisma.admission.update({
            where:{id:admissionId},
            data:{
                parentsInfo:{...admissionData}
            }
        })

        return{success:true, message:"Success", }
    } catch (error) {
        console.log(error)
        return{success:false, message:"Error", }
    }
}