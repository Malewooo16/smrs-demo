"use client";

import { encryptData } from "@/actions/schools/crypto";
import SearchInput from "@/main-components/SearchInput";
import { ISchoolAdmission } from "@/utilities/admissionTypes";
import Link from "next/link";
import { useState } from "react";


//TODO remind me to refactor this to use server components
export default function ClientWrapper({ admissions }: { admissions: any }) {
  const cryptoKey = process.env.CRYPTO_KEY;
  const [search, setSearch] = useState(" ");
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="bg-[#e0f7fa] min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-[#006d77] my-6">
        Find Active Schools
      </h1>
      <div className="max-w-lg mx-auto">
        <SearchInput searchHandler={searchHandler} />
      </div>
      <ul className="grid grid-cols-1 gap-4 mt-8">
        {admissions
          .filter((item: any) => {
            return search.toLowerCase() === " "
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((a: ISchoolAdmission) => {
            const escuela = encryptData(
              `${a.id}`,
              "MySuperSecretKeyMySuperSecretKey"
            );
            return (
              <Link
                href={{
                  pathname: `/school/${escuela}`,
                  
                }}
                key={a.id}
              >
                <li className="border border-[#83c5be] rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
                  <div className="flex flex-col h-full">
                    <h2 className="text-lg font-semibold text-[#006d77] mb-2">
                      {a.name}
                    </h2>
                    <p className="text-sm text-[#4f5d75] mb-2">{a.address}</p>
                    <p className="text-sm text-[#4f5d75]">
                      <span>
                        From:{" "}
                        {new Date(a.admissionDates.from)
                          .toUTCString()
                          .slice(0, -13)}
                      </span>
                      <span className="ml-4">
                        To:{" "}
                        {new Date(a.admissionDates.to)
                          .toUTCString()
                          .slice(0, -13)}
                      </span>
                    </p>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
