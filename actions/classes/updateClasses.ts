"use server";

import prisma from "@/db/prisma";
import { classTypeObject } from "@/utilities/classesInfo";
import { revalidatePath } from "next/cache";

const numberWords = ["One", "Two", "Three", "Four", "Five", "Six"];

/**
 * Function to update classes for a given school and class type.
 * @param schoolId - ID of the school
 * @param classType - Class type ID to filter and update
 */
export async function updateClasses(schoolId: number, classType: number) {
  try {
    // Fetch all existing classes for the school with the specific class type
    const existingClasses = await prisma.classes.findMany({
      where: {
        schoolId: schoolId,
        metadata: {
          path: ['id'], // Proper JSON path filtering
          equals: classType,
        },
      },
    });

    // If no classes exist, no updates can be performed
    if (existingClasses.length === 0) {
      console.log(`No existing classes found for schoolId: ${schoolId} and classType: ${classType}. No updates to perform.`);
      return { success: false, message: "No existing classes found. No updates to perform." };
    }

    const transactionOps: any[] = [];

    existingClasses.forEach((existingClass) => {
      // Destructure metadata for easier manipulation
      const metadata = existingClass.metadata as { type: string; turnovers: number; id:number };

      if (!metadata) {
        console.error(`Metadata missing for class: ${existingClass.name}. Skipping update.`);
        return;
      }

      console.log(`Current turnovers for '${existingClass.name}': ${metadata.turnovers}`);

      // Determine maximum turnovers based on class type
      const maxTurnovers =
        metadata.id === 1
          ? 3
          : metadata.id === 2
          ? 2
          : metadata.id === 3
          ? 5
          : 0;

      if (metadata.turnovers < maxTurnovers) {
        // If we haven't reached max turnovers, increment turnovers and update class name
        metadata.turnovers++;
        console.log(metadata.turnovers)
        const classLevel = numberWords[metadata.turnovers];
        existingClass.name = `${existingClass.name.split(" ")[0]} ${classLevel} ${new Date().getFullYear()}`;

        // Prepare update operation
        transactionOps.push(
          prisma.classes.update({
            where: { id: existingClass.id },
            data: {
              name: existingClass.name,
              metadata: metadata,
            },
          }),
          prisma.classCourse.updateMany({
            where: {
              classId: existingClass.id,
            },
            data: {
              courseLevel:`${existingClass.name.split(" ").slice(0,2).join(" ")}`
            },
          })
        );

        console.log(`Prepared update for class: ${existingClass.name} with turnovers: ${metadata.turnovers}`);
      } else {
        console.log(`Class '${existingClass.name}' has reached the maximum turnovers. No further updates.`);
      }
    });

    // Create new class operation if needed
    const classInfo = classTypeObject.find((c) => c.id === classType);

    if (classInfo) {
      const newClassName = `${classInfo.default.split(" ")[0]} ${numberWords[classInfo.turnovers]} ${new Date().getFullYear()}`;
      transactionOps.push(
        prisma.classes.create({
          data: {
            name: newClassName,
            schoolId: schoolId,
            metadata: classInfo,
          },
        })
      );
      console.log(`Prepared creation for new class: ${newClassName}`);
    } else {
      console.error(`Class type not found: ${classType}. Skipping creation.`);
    }

    // Execute all update and create operations in a transaction
    if (transactionOps.length > 0) {
      await prisma.$transaction(transactionOps);
      revalidatePath(`/classes`)
      return { success: true, message: "All classes have been updated successfully." };
    } else {
      return { success: false, message: "No classes were updated." };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update classes." };
  }
}
