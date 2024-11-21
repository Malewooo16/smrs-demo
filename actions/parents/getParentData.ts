"use server"
import prisma from "@/db/prisma";


export default async function getParentdata (id:number){
    try {
        const parent = await prisma.parent.findUnique({
            where:{
                id
            }
        })
        return parent;
    } catch (error) {
        console.log(error);
        return null;
    }
}