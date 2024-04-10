import prisma from "@/db/prisma";
import AWS from "aws-sdk";
import { NextResponse } from "next/server";

const b2Credentials = {
  accessKeyId: '005a22d462ac6d30000000008',
  secretAccessKey: 'K005iBeLjL2ku4VvoZSO6Y1XfoKzVBE',
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  s3ForcePathStyle: true,
};

const s3 = new AWS.S3(b2Credentials);

// Upload function
export  async function POST(req:Request) {
  const formData = await req.formData();
  const files = formData.getAll('objects') as File[]

  if (!files || files.length === 0) {
    console.log("No files detected");
    return;
  }

  if (files.some((file) => !file.name.toLowerCase().endsWith('.pdf'))) {
    console.log("At least one file is not a PDF");
    return NextResponse.json({success:false, message:"Files are of invalid type"}, {status:415})
  }

  try {
    const uploadResponses = [];

    for (const file of files) {
      if (file.size === 0) {
        console.log(`Skipping empty file: ${file.name}`);
        continue;
      }

      // Read the file content
      const buffer = Buffer.from(await file.arrayBuffer());

      // Set the parameters for the S3 upload
      const params = {
        Bucket: 'SMRS-Demo',
        Key: file.name,
        Body: buffer,
      };

      // Upload the file to S3-compatible storage
      const response = await s3.upload(params).promise();

      uploadResponses.push(response);
    }

    // Update database records if necessary
    // Example: Updating Prisma model

    return NextResponse.json({success: true, message: "Success", locations: uploadResponses.map((response) => response.Location)})
  } catch (error) {
    console.error('Error uploading files to S3-compatible storage:', error);
    return NextResponse.json({success: false,
        message: "Upload Failed"})
  }
}
