import prisma from "@/app/db/prismadb"
import { NextResponse } from "next/server"
import { hash} from 'bcrypt'



export async function POST(req:Request){
    const requestBody= await req.json();
    const {firstName, lastName, emailAddress, phoneNumber, password, role}= requestBody

    try{
        const existingEmail= await prisma.users.findUnique({
            where:{emailAddress:emailAddress}
        })
    
        if(existingEmail){
            return NextResponse.json({user:null, message:"This email exists"}, {status:408})
        }
    
        const encryptedPassword= await hash(password, 10)
        const newUser= await prisma.users.create({
            data:{
                firstName, lastName, emailAddress, phoneNumber, hashedPassword:encryptedPassword, role
            }
        })
    
        return NextResponse.json({ user:newUser, message:"User Created Successfully"})
    }

    catch(err){
        console.error('Error creating customer:', err);
        return NextResponse.json({message:"Fatal Error"}, {status:500})
    }
}