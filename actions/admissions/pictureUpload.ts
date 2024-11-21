"use server";

import prisma from "@/db/prisma";
import AWS from "aws-sdk";
//import { promises as fsPromises } from 'fs';

const b2Credentials = {
  accessKeyId: '005a22d462ac6d3000000000e',
  secretAccessKey: 'K005SU3sasV+35W74tRFOLTtv7rFSo0',
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  s3ForcePathStyle: true,
};

const s3 = new AWS.S3(b2Credentials);

// Upload function

export default async function userPicUpload(formData: FormData, emailAddress:string) {
  
  const fileData = formData.get('userPic') as File
  if (!fileData) return;
  if(fileData.size == 0){
    console.log("File Not Detected")
    return
  }

  try {
    // Read the file content
    const buffer = Buffer.from(await fileData.arrayBuffer())

    // Set the parameters for the S3 upload
    const params = {
      Bucket: 'WMA-File-Test',
      Key: fileData.name,
      Body: buffer,
      
    };

    // Upload the file to S3-compatible storage
    const response = await s3.upload(params).promise();

    const updatedFile = await prisma.admission.update({
      where: {
        id:emailAddress
      },
      data: {
        imgUrl:response.Location
      },
    });
    return {
      success: true,
      message: "Success",
      location: response.Location
      
    };
  } catch (error) {
    console.error('Error uploading file to S3-compatible storage:', error);
    return {
      success: false,
      message: "Upload Failed"
    };
  }
}

