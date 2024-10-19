"use server"

import prisma from "@/db/prisma"
import { TeacherForm } from "@/utilities/types/TeacherTypes";

export async function updateTeachersDetails(formData:any, teacherId:number){
     try {
        await prisma.teacher.update({
            where:{
                id: teacherId
            },
            data:{...formData}
        })
        return {success:true, message:"Teacher Successfully Updated"}
     } catch (err) {
        console.log(err);
        return {success:false, message:"Failed to Update Teacher"}
     }
}

export async function createTeacher(formData:TeacherForm, schoolId:number){
    try {
        const newTeacher = await prisma.teacher.create({
            data:{...formData, schoolId}
        })
        return {success:true, message:"Teacher Successfully Created", teacher:newTeacher}
     } catch (err) {
        console.log(err);
        return {success:false, message:"Failed to Create Teacher"}
     }
}