"use server";
import prisma from "@/db/prisma";
import { decryptData } from "../schools/crypto";
import { revalidatePath } from "next/cache";

export async function validateAdmission(
  encrpytedId: any,
  admissionId: string | undefined,
  selectedClass: string,
) {
  const schoolId = parseInt(
    decryptData(encrpytedId, "MySuperSecretKeyMySuperSecretKey"),
  ) as number;
  try {
    const validateAdmission = await prisma.admissionStatus.create({
      data: {
        schoolId,
        admissionId: admissionId as string,
        selectedClass,
      },
    });
    return { success: true, message: "Student Admitted Succesfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Error While admiting student" };
  }
}

export async function updateAdmissionStatusString(
  admissionId: string,
  status: string,
  schoolId: number,
  admissionClass: number,
) {
  try {
    const admissionStatus = await prisma.admissionStatus.findFirst({
      where: {
        admissionId,
        schoolId
      },
    });
    
    await prisma.admissionStatus.update({
      where:{
        id:admissionStatus?.id
      },
      data:{
        status
      }
    })

    if (status === "Accepted") {
      const admission = await prisma.admission.findUnique({
        where: {
          id: admissionId,
        },
        include: { AdmissionStats: true },
      });

      // Connect admission to student model
      const student = await prisma.studentT.create({
        data: {
          name: `${admission?.firstName} ${admission?.lastName}`,
          studentData: { connect: { id: admissionId } },
          parent: { connect: { id: admission?.parentId } },
          school: { connect: { id: schoolId } },
          class: { connect: { id: admissionClass } },
        },
      });
      // const parent = await prisma.parent.update({
      //   where: {
      //     id: admission?.parentId,
      //   },
      //   data: {
      //     StudentT: { connect: { id: student.id } },
      //   },
      // });
    }

    revalidatePath("/");
    return { success: true, message: "Status Updated Successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Error Occurred" };
  }
}
