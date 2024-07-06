"use server";

import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

const b2Credentials = {
  accessKeyId: '005a22d462ac6d30000000008',
  secretAccessKey: 'K005iBeLjL2ku4VvoZSO6Y1XfoKzVBE',
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  s3ForcePathStyle: true,
};

const s3 = new AWS.S3(b2Credentials);

export async function POST(request:NextRequest) {
  try {
    const formData = await request.formData();
    const birthCertificate = formData.get('birthCert') as File;
    const schoolTranscripts = formData.get('trans') as File;
    const medicalRecords = formData.get('medicalRecords') as File;

    if (!birthCertificate || !schoolTranscripts) {
      return NextResponse.json({ success: false, message: "Files Not Found" }, { status: 405 });
    }

    const uploadFile = async (file:File) => {
      if (!file || file.size === 0) {
        throw new Error("File Not Detected");
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const params = {
        Bucket: 'SMRS-Demo',
        Key: file.name,
        Body: buffer,
      };
      const response = await s3.upload(params).promise();
      return response.Location;
    };

    const birthCertificateLocation = await uploadFile(birthCertificate);
    const schoolTranscriptsLocation = await uploadFile(schoolTranscripts);
    const medicalRecordsLocation = medicalRecords ? await uploadFile(medicalRecords) : null;

    console.log(birthCertificateLocation)

    return NextResponse.json({
      success: true,
      message: "Success",
      birthCertificateLocation,
      schoolTranscriptsLocation,
      medicalRecordsLocation
    });
  } catch (error) {
    console.error('Error uploading file to S3-compatible storage:', error);
    return NextResponse.json({ success: false, message: "Upload Failed" }, { status: 404 });
  }
}
