import { getAllClasses } from "@/actions/classes/getClasses";
import { updateClasses } from "@/actions/classes/updateClasses";
import { schoolInfoFromTeacherId } from "@/actions/schools/getSchoolInfo";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import toast from "react-hot-toast";
import LoadingBackDrop from "../ServerLoaders/LoadingBackDrop";
import { UpdateOlevelClassesForm } from "./UpdateClassesForm";

export default async function UpdateClasses() {
  const session = await getServerSession(authOptions);
  let schoolId : any;

  if (session?.user.teacher) {
    const school = await schoolInfoFromTeacherId(parseInt(session.user.teacher));
    schoolId = school?.id || 0;
  }

  const classes = await getAllClasses(schoolId);

  //@ts-ignore
  const OlevelClasses = classes?.filter((c) => c.metadata.id === 1);



  return (
    <div className="flex flex-col items-center w-full pt-4 relative">

      <h2 className="text-xl font-semibold my-4">Update Classes</h2>

      {/* Description Section */}
      <div className="max-w-2xl text-center mb-6 px-4">
        <p className="text-md mb-4">
          Use this form to automatically update existing classes or add new ones for the current academic year. This keeps all class information accurate, including schedules, student allocations, and planning.
        </p>
        <p className="text-md mb-4">
          Ensure all updates are correct as they impact school operations and curriculum management. Review the classes below and make the necessary updates.
        </p>
      </div>

      {/* Display O-Level Classes */}
      {OlevelClasses && OlevelClasses.length > 0 && (
        <div className="flex flex-col items-start w-full px-10">
          <h3 className="px-2 text-lg font-medium"> O-Level Classes</h3>
        <div className="grid grid-cols-4 gap-6">
        {OlevelClasses.map((c) => (
            <div className="card p-4 bg-white my-4" key={c.id}>
              {c.name}
            </div>
          ))}  
        </div>
          
        </div>
      )}
      <UpdateOlevelClassesForm schoolId={schoolId} />
     
    </div>
  );
}
