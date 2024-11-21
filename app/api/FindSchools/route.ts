import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(){

try{
    const schools = await prisma.school.findMany()

    return NextResponse.json({message:"Success", schools})
}

catch(e){
  console.log(e);
  return NextResponse.json({message:"error"}, {status:500})
}
}