"use client"
import { useState } from 'react';

import {Teacher} from "@prisma/client"
import { updateTeacherSubject } from '@/actions/teachers/updateTeacherSubject';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type EditTeacherClassCourseProps = {
  teachers: Teacher[] | undefined;
  classCourseId:number;
};



export default function EditTeacherClassCourse({ teachers, classCourseId}: EditTeacherClassCourseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTeacherSelect = (teacherId: number) => {
    setSelectedTeacher( teacherId === selectedTeacher ? null : teacherId);
  };

  const handleSubmit = async () => {
    if (!selectedTeacher) {
      setError(true)
      return;
    }
   try{
    const response = await updateTeacherSubject(selectedTeacher as number,classCourseId);
    if(response.success){
      router.push(`?tab=details`);
      toast.success(response.message);
    }else{
      toast.error(response.message);
    }

   }catch(e:any){
    console.log('Error saving teacher to class course:', e);
    toast.error(e.message);
  };
  }
  const filteredTeachers = teachers?.filter((teacher) =>
    teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col justify-center w-full lg:w-1/2 bg-white rounded-md p-4'>
      <h2 className='mb-2'>Select Teacher Class Course</h2>

      {/* Search Box */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a teacher"
        className="border rounded p-2 mb-4 w-full"
      />

      {/* Teacher List with Selection Effects */}
      <div className="mb-4 flex flex-col w-full">
        {filteredTeachers && filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => {
            const isSelected = selectedTeacher === teacher.id;
            return (
              <div
                key={teacher.id}
                onClick={() => handleTeacherSelect(teacher.id)}
                className={`p-3 my-1 rounded-lg cursor-pointer transition-transform transform hover:scale-105
                  ${isSelected ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white hover:bg-indigo-100'}
                `}
              >
                <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {teacher.firstName} {teacher.lastName}
                </p>
              </div>
            );
          })
        ) : (
          <p>No teachers found</p>
        )}
      </div>
        {error && <p className="text-error text-sm ">Please Select A Teacher To Teach the Class</p>}
      {/* Submit Button */}
      <button onClick={handleSubmit} className="btn btn-primary mt-4">
        Submit
      </button>
    </div>
  );
}
