"use client"
import { classTypeObject } from "@/utilities/classesInfo";

export default function AddNewClassForm() {
  return (
    <div>
      <form>
        <h1 className="text-xl font-bold mb-4">Add a new Class</h1>
        <label>
          <p>Select Class Type</p>
          <select
            title="select Class"
            className="select select-bordered w-full max-w-lg"
          >
             <option disabled selected>
                  Select Class Type
                </option>
            {classTypeObject.map((c) => (
              <>
               <option key={c.id} value={c.default} >{c.type}</option>
              </>
            ))}
            
          </select>
        </label>
        <label>
         <select title="select Class"
            className="select select-bordered w-full max-w-lg">
              <option disabled selected>
                  Select Subjects
                </option> 
                

         </select>

        </label>
      </form>
    </div>
  );
}
