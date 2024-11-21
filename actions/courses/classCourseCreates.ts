"use server"

import prisma from "@/db/prisma";

interface IWeeklyReport{
    summary:string;
    report:string;
    week:number
}

export async function createWeeklyReport(report:IWeeklyReport, classCourseId:number){
    try{
        await prisma.classCourseWeeklyReport.create({
            data:{
                ...report,
                classCourseId
            }
        })
        return {success:true, message:"Weekly Report created successfully"};
    }catch(err){
        console.log(err);
        return {success:false, message:"Failed to create Report"}
    }
}