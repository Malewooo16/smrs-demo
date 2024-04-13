import prisma from "@/db/prisma";
import { IStudentAdmission } from "@/utilities/admissionTypes";

export async function getAdmissionById(id: string): Promise<IStudentAdmission | { success: boolean; message: string }> {
    try {
        const admission = await prisma.admission.findUnique({
            where: {
                id
            }
        });
        if (admission !== null) {
            // If admission is not null, return it
            return admission;
        } else {
            // If admission is null, return an error object
            return { success: false, message: "Admission not found" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to Fetch Admissions" };
    }
}
