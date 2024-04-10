import prisma from "@/db/prisma";
import { IStudentAdmission } from "../../utilities/admissionTypes";


export default async function createAdmission(admissionData:IStudentAdmission, parentId:number){

    try{
        const newAdmission = await prisma.admission.create({
            data:{...admissionData, parent:{connect:{id:parentId}}}
        })
        return{success:true, message:"Success", admissionId:newAdmission.id}
    }
    catch(e){
        console.log('Error', e)
    }
    
}