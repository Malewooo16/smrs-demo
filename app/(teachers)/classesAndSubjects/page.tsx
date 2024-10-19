import { SiGoogleclassroom } from "react-icons/si";
import { GiBlackBook } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";


export default function ClassesAndSubjects() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl my-4 font-semibold">Manage Classes and Subjects in your School</h1>
      <div className="flex justify-center ">
        <div className="grid grid-cols-2 gap-10 ">
          <Link href={`/classes`}><div className="card w-96 h-60 bg-white flex justify-center items-center hover:outline-outline hover:outline">
          <SiGoogleclassroom size={"3em"} />
          <p className="text-lg my-4 ">Classes</p>

          </div></Link>
          <Link href={`/subjects`}><div className="card w-96 h-60 bg-white flex justify-center items-center hover:outline-outline hover:outline">
          <GiBlackBook size={"3em"} />
          <p className="text-lg my-4 ">Subjects</p>
          </div></Link>
          <div></div> 
        </div>
      </div>
    </div>
  );
}
