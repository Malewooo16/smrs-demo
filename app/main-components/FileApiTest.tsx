"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import admissionStore from "@/store/admissionState";
import ServerBtn from "./ServerBtn";
import toast from 'react-hot-toast';

interface FileMap {
  [key: string]: File;
}

export default function FileApiUpload() {
  const searchParams = useSearchParams();
  const escuela = searchParams.get("escuela");
  const router = useRouter();
  const [files, setFiles] = useState<FileMap>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles({
        ...files,
        [e.target.name]: e.target.files[0]
      });
    }
  };

  const uploadAdmissionFiles = async (event: FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }

    const admissionId = admissionStore.getState().admissionId;
    // formData.append('admissionId', admissionId); // Include admissionId if needed by the API

    try {
      const response = await fetch('http://localhost:3000/api/FileTest', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.success === false) {
        toast.error(result.message);
      } else {
        console.log(result);
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={uploadAdmissionFiles}>
        <h1 className="text-lg my-2">Upload the files detailed below</h1>
        <div className="join join-vertical flex max-w-xl">
          <label className="form-control max-w-xl mb-4 join-item">
            <p className="mb-2">Birth Certificate</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="birthCert"
              onChange={handleFileChange}
            />
          </label>
          <label className="form-control max-w-xl my-4 join-item">
            <p className="my-2">School Transcripts</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="trans"
              onChange={handleFileChange}
            />
          </label>
          <label className="form-control max-w-xl mt-4 mb-10 join-item">
            <p className="my-2">
              Medical Records <span className="text-md">(optional)</span>
            </p>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="medicalRecords"
              onChange={handleFileChange}
            />
          </label>
          <ServerBtn />
        </div>
      </form>
    </div>
  );
}
