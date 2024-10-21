"use client";
import FileUploadModal from "@/main-components/FileUploadModal";
import SearchInput from "@/main-components/SearchInput";
import {ISchoolAdmission} from "@/utilities/admissionTypes";
import Link from "next/link";
import React, {useState} from "react";

export default function AdmissionWraper({
  admissions,
  headers,
}: {
  admissions: any;
  headers: string;
}) {
  const [modal, setmodal] = useState(false);
  const [search, setSearch] = useState(" ");
  console.log("Search", search);
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Link
        href={{
          pathname: `/padmissions/activeSchools`,
        }}
      >
        <button className="btn btn-success">Find Admiting Schools</button>
      </Link>
    </div>
  );
}
