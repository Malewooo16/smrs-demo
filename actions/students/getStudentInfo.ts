import prisma from "@/db/prisma";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession, Session } from "next-auth";

export async function getAllStudentInfo(schoolId: number) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
      },

      include: {
        studentData: true,
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}

export async function getAllStudentInClass(schoolId: number, classId: number) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
        classId,
      },

      include: {
        studentData: true,
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}

export async function getAdvancedStudentData(classId: number) {
  try {
    const localClassData = prisma.classes.findUnique({
      where: { id: classId },
      include: {
        StudentT: {
          select: {
            id: true,
            name: true,
          },
        },
        ClassCourse: {
          select: {
            courseId: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return localClassData;
  } catch (e) {
    console.log(e);
  }
}

export async function getStudentForParent(){
  const session = await getServerSession(authOptions);
  if(session?.user){
    const students = await prisma.studentT.findMany({
      where:{
        parentId:parseInt(session.user.parent as string)
      },
      select:{
        name:true,
        id:true,
        studentData:{
          select:{
            imgUrl:true
          }
          
        },
        class:{
          select:{
            name:true
          }
        }
      }
      },)
      return students
    }

    return []

    
}
