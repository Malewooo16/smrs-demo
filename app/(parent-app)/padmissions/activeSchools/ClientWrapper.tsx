"use client";

import {encryptData} from "@/actions/schools/crypto";
import SearchInput from "@/main-components/SearchInput";
import {ISchoolAdmission} from "@/utilities/admissionTypes";
import Link from "next/link";
import {useState} from "react";

export default function ClientWrapper({admissions}: {admissions: any}) {
  const cryptoKey = process.env.CRYPTO_KEY;
  const [search, setSearch] = useState(" ");
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <SearchInput searchHandler={searchHandler} />
      <ul className="grid grid-rows-1 gap-2 mt-4">
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
                  pathname: "/padmissions/newAdmission",
                  query: {
                    escuela,
                  },
                }}
                key={a.id}
              >
                <li key={a.id} className="border rounded-lg p-4 shadow-md">
                  <div className="flex flex-col h-full">
                    <h1 className="text-lg font-semibold mb-2">{a.name}</h1>
                    <p className="text-sm mb-2">{a.address}</p>
                    <p className="text-sm">
                      <span>
                        From:{" "}
                        {new Date(a.admissionDates.from)
                          .toUTCString()
                          .slice(0, -13)}
                      </span>
                      <span className="ml-2">
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
