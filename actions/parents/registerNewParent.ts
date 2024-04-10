"use server"
import prisma from "@/db/prisma";
import { hash } from "bcrypt";

interface UserData{
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    password:string;
}

interface Success{
    success:boolean;
    message:string;
    identifier:string;
    name:string | undefined;
}

interface Error{
    error:boolean;
    message:string;
}

export default async function registerNewParent(formData:UserData)  {
    console.log(formData)
    const {firstName, lastName, phoneNumber, email, password} = formData
    try{
        const existingUser = await prisma.parent.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return({error:true, message:"User already exists"})
        }
        const encryptedPassword = await hash(password,10) as string;
        const newParent = await prisma.parent.create({
            data:{
                firstName,
                lastName,
                email,
                phoneNumber,
            }
        })
        const newUser = await prisma.user.create({
            data:{
                username:email,
                password:encryptedPassword,
                role:"Parent"
            }
        })
        return{success:true, message:"Parent added successfully", identifier:newParent.identifier, name:newParent.firstName}
    }
    catch(e){
        console.log()
        return{error:true, message:"Failed to add parent"}
    }

}