"use server";

import AWS from "aws-sdk";
import { NextResponse } from "next/server";
//import { promises as fsPromises } from 'fs';

const b2Credentials = {
    accessKeyId: '005a22d462ac6d30000000008',
    secretAccessKey: 'K005iBeLjL2ku4VvoZSO6Y1XfoKzVBE',
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    s3ForcePathStyle: true,
};

const s3 = new AWS.S3(b2Credentials);

// Upload function

export async function POST(request:Request) {
  
  const formData = await request.formData();

  try {
    const fileData = formData.get('userPic') as File
  const fileDos = formData.get('birthCet') as File 
  if (!fileData) return;
  if(fileData.size == 0){
    console.log("File Not Detected")
    return
  }
    // Read the file content
    const buffer = Buffer.from(await fileData.arrayBuffer())

    // Set the parameters for the S3 upload
    const params = {
      Bucket: 'SMRS-Demo',
      Key: fileData.name,
      Body: buffer,
      
    };

    // Upload the file to S3-compatible storage
    const response = await s3.upload(params).promise();

  
    return NextResponse.json({
        message: "Success",
        location: response.Location})
      
      
   
  } catch (error) {
    console.error('Error uploading file to S3-compatible storage:', error);
    return NextResponse.json({  success: false,
        message: "Upload Failed"}, {status:404}) 

  }
}

