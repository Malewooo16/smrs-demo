"use server"
import prisma from "@/db/prisma";
import { decryptData } from "../schools/crypto";

export async function validateAdmission(encrpytedId:any, admissionId:string | undefined){
    const schoold = parseInt(decryptData(encrpytedId, "MySuperSecretKeyMySuperSecretKey"))
    try{
      const validateAdmission = await prisma.admissionStatus.create({
       
        data:{
          schoolId:23,
          admissionId: admissionId as string
        }
      })
      return {success:true, message:"Student Admitted Succesfully"}
    }
    catch(e){
        console.log(e)
        return {success:false, message:"Error While admiting student"}
    }
}

export async function updateAdmissionStatusString(admissionId:string, status:string){
  try{
    const updatedAdmission = await prisma.admissionStatus.update({
      where:{
        admissionId
      },
      data:{
        status
      }
    })
    return {success:true, message:"Status Updated Successfully"}
  }
  catch(e){
    console.log(e);
    return {success:false, message:"Error Occured"}

  }

}