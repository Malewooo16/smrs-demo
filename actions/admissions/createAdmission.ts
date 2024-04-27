"use server"
import prisma from "@/db/prisma";
import { IStudentAdmission } from "../../utilities/admissionTypes";


export default async function createAdmission(admissionData:any, parentId:number){

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