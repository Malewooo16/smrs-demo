"use server"
import prisma from "@/db/prisma";
import { decryptData } from "../schools/crypto";

export async function validateAdmission(encrpytedId:any, admissionId:string | undefined){
    const id = parseInt(decryptData(encrpytedId, "MySuperSecretKeyMySuperSecretKey"))
    try{
      const admissionSuccess = await prisma.admission.update({
        where:{
            id:admissionId
        },
        data:{
            schools:{connect:{id}}
        }
        
      })
      return {success:true, message:"Student Admitted Succesfully"}
    }
    catch(e){
        console.log(e)
        return {success:false, message:"Error While admiting student"}
    }
}