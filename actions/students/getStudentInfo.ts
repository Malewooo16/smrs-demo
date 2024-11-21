"use server";
import prisma from "@/db/prisma";
import {authOptions} from "@/utilities/authOptions";
import {getServerSession, Session} from "next-auth";

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

export async function getStudentScoresResults(
  schoolId: number,
  classId: number
) {
  try {
  } catch (error) {}
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
        class: true,
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}
export async function getAllStudentInClassForProcessingReports(schoolId: number, classId: number) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
        classId,
      },

      include: {
         parent:true
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}
export async function getAllStudentResultsInClass(
  schoolId: number,
  classId: number
) {
  try {
    const student = await prisma.studentT.findMany({
      where: {
        schoolId,
        classId,
      },

      select: {
        id: true,
        name: true,
        results: true,
        parent: {select: {email: true}},
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting all Student");
  }
}

export async function getStudentForParent() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const students = await prisma.studentT.findMany({
      where: {
        parentId: parseInt(session.user.parent as string),
      },
      select: {
        name: true,
        id: true,
        studentData: {
          select: {
            imgUrl: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
      },
    });
    return students;
  }

  return [];
}

//TODO Modify to grant access to class teacher and headMaster
export async function getSingleStudent(id: number) {
  try {
    const student = await prisma.studentT.findUnique({
      where: {
        id,
      
      },
      include: {
        studentData: true,
       
      },
    });
    return student;
  } catch (error) {
    console.log("Error in getting single Student");
    return null;
  }
}

//Action that selects the neccessary fields for sending notice to parents
export async function getStudentandParentForNotice(id:number){
   try{
    const student = await prisma.studentT.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        parent: {
          select: {
            email: true,
            user:{
              select: {
               id:true
                
              }
            }
          },
        },
      },
    });
    return student;
   }catch(e){
    console.error("Error fetching student and parent for notice:", e);
    return null;
   }
}

export async function getAdvancedStudentData(classId: number) {
  try {
    const localClassData = await prisma.classes.findUnique({
      where: {id: classId},
      include: {
        StudentT: {
          select: {
            id: true,
            name: true,
            results: true,
          },
        },
        classCourses: {
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
    console.error("Error fetching advanced student data:", e);
    throw e; // Re-throw the error after logging it
  }
}
