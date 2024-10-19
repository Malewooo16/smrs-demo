"use client"

import { updateClasses } from '@/actions/classes/updateClasses';
import toast from 'react-hot-toast';
import LoadingBackDrop from '../ServerLoaders/LoadingBackDrop';
import { useState } from 'react';

export function UpdateOlevelClassesForm({schoolId}:{schoolId:number}) {
  //const [loading, setLoading] = useState(false)
    const updateOlvelClasses = async ()=>{

        const response = await updateClasses(schoolId as number, 1);
        if (!response?.success) {
          toast.error(response?.message as string);
        } else {
          toast.success(response.message);
        }
      }
  return (
    <div>
         {/* Form to update classes */}
        
      <form action={updateOlvelClasses}>
      <LoadingBackDrop />
      <button type="submit" className="btn btn-success p-3 mt-6">
        Update
      </button>
      </form>
    </div>
  )
}
