import prisma from "@/db/prisma";
import { decryptData } from "./crypto";



export async function getSchoolByIdForAdmission(encrpytedId:any){
    const id = parseInt(decryptData(encrpytedId, process.env.CRYPTO_KEY as string));
    try{
        const school = await prisma.school.findUnique({
            where:{
                id
            }
        })
        if(school !== null){
            return school
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e)
        return null;
    }
}

export async function getSchoolById(encrpytedId:any){
    const id = parseInt(decryptData(encrpytedId, process.env.CRYPTO_KEY as string));
    try{
        const school = await prisma.school.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                name:true,
                description:true,
                images:true,
                website:true,
                logo:true
            }
        })
        if(!school){
            return null;
        }
        return school;
    }
    catch(e){
        console.log(e)
        return null;
    }
}