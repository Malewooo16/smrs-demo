import { revalidatePath } from "next/cache";
import prisma from "../db/prismadb";

async function fetchWorkflowsPerUser(creatorEmail: any ) {
    try {
        if (!creatorEmail || creatorEmail.trim() === '') {
            return { error: "Email address cannot be empty" };
        }

        const workflows = await prisma.theWorkflow.findMany({
            where: {
               creatorEmail
            }
        });

        if (!workflows || workflows.length === 0) {
            return { message: "No workflows available" };
        }
        revalidatePath(`/`)
        return workflows;
    
    } catch (error) {
        console.error("Error fetching workflows:", error);
        return { error: "Internal Server Error" };
    }

    
}

export default fetchWorkflowsPerUser;
