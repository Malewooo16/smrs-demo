import { decryptData } from "@/actions/schools/crypto";
import { getSchoolById } from "@/actions/schools/findSchools";
import { redirect } from "next/navigation";
import Image from "next/image"; // Make sure to import Image
import Link from "next/link";

export default async function SchoolInfo({ params }: { params: { id: string } }) {
  const cryptoKey = process.env.CRYPTO_KEY;
  const schoolId = decryptData(params.id, cryptoKey as string);

  const school = await getSchoolById(params.id);

  console.log(school);
  
  if (school) {
    return (
      <div className="bg-navy-800 min-h-screen">
        <div className="container mx-auto mb-10 text-white">
          <div className="flex justify-between items-center py-4 mb-4">
            <h1 className="text-3xl font-bold">{school.name}</h1>
            <Link href={`/padmissions/newAdmission?escuela=${params.id}`}>
              <button className="btn bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-teal-600 transition duration-300">
                Apply Now
              </button>
            </Link>
          </div>

          <div className="flex flex-col mb-4 items-center">
            <Image
              className="h-24 w-24 mb-4 rounded-full"
              src={school.logo as string || ''}
              alt={`${school.name} Logo`}
              width={100}
              height={100}
            />
            <p className="text-lg text-gray-300 mb-4">{school.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {school.images.length > 0 && school.images.map((image: string, index: number) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    className="object-cover h-48 w-full"
                    src={image}
                    alt={`Image of ${school.name}`}
                    width={400}
                    height={300}
                  />
                </div>
              ))}
            </div>
            <div className="py-6">
              <a href={`https://${school.website}`} className="text-teal-400 underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return redirect(`/not-found`);
}
