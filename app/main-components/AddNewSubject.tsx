"use client"
import { createSubject } from '@/actions/subjects/createNewSubject';
import { useIdStore } from '@/store/courseIdStore';
import { classTypeObject } from '@/utilities/classesInfo'
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface classesData{
    id:number,
    name:string,
} 

interface teachersData{
    id:number,
    firstName:string;
    lastName: string;
} 
export  function AddNewSubject({classes , teachers, schoolId}: {classes:any, teachers:any, schoolId:any}) {
    const {id, setId, clearId} = useIdStore()
    const [subjectSuccess, setSubjectSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const classesData = classes as classesData[]
    const teachersData = teachers as teachersData[];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        tagFor: Yup.string().required('Deadline is required'),
      
      });
    
    
      const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
      });

    const createNewSubject = async(formData:any)=>{
        setLoading(true)
        const newObj = {... formData , schoolId};
        const newSubjectResponse = await createSubject(newObj);
        if(newSubjectResponse.success){ 
            setSubjectSuccess(true)
            setId(newSubjectResponse.courseId as number)
            setLoading(false)
        }
       
        else{
            setLoading(false)
        }
    }
  return (
    <div>
        <form className={`${subjectSuccess ? `hidden` : `flex flex-col`}`} onSubmit={handleSubmit(createNewSubject)} >
            <label>
                <p>Subject Name</p>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg"  {...register("name")}/>
            </label>
            <label>
                <p>Subject Description</p>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" {...register("description")} />
            </label>
            <label>
                <p>Subject For</p>
                <select
            title="select Class"
            className="select select-bordered w-full max-w-lg"
            {...register("tagFor")}
          >
             <option  disabled selected>
                  Select Subjected Students
                </option>
            {classTypeObject.map((c, index) => (
              
               <option key={index} >{c.type}</option> 
              
            ))}
            
          </select>
            </label>
            <button className='btn btn-success max-w-lg my-4' type='submit' disabled={loading}>Create Subject</button>
        </form>

        <form className={`${subjectSuccess ? `flex flex-col` : `hidden`}`}>
            <p>Update Teachers for Each Class</p>
            <p>Classes</p>
            {classesData.map((c)=>(
                <div><p>{c.name}</p><select
                    title="select Class"
                    className="select select-bordered w-full max-w-lg"
                >
                    <option disabled selected>
                        Select Subjected Students
                    </option>
                    {teachersData.map((c) => (

                        <option key={c.id}>{c.firstName} {c.lastName}</option>
                        
                    ))}

                </select></div>
            ))}
        </form>
    </div>
  )
}
