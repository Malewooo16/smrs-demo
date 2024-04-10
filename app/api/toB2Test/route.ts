
import B2 from 'backblaze-b2'

// const b2 = new B2({
//     applicationKeyId:"a22d462ac6d3",
//     applicationKey:"005d8f403f4a7f9221ad0fd529dbe09ace28a19314"
// });


// export async function GET() {
//     try{
//         const b2AuthData = await b2.authorize();
//         console.log(b2AuthData.data);
//     }

//     catch(err){
//         console.log(err)
//     }
// }


const AWS = require('aws-sdk');
import { NextResponse } from "next/server";

// Set your S3-compatible API credentials
const s3Credentials = {
  accessKeyId: '005a22d462ac6d30000000006',
  secretAccessKey: 'K005S4WF3Aa6kcIQ5vKfFu0fPC1hyKk',
  endpoint: 'https://s3.us-east-005.backblazeb2.com', // Update the endpoint based on your S3-compatible API region
  s3ForcePathStyle: true, // Set to true for S3-compatible APIs
};

const s3 = new AWS.S3(s3Credentials);

// Function to list all buckets
export async function GET() {
  try {
    const response = await s3.listBuckets().promise();
    const buckets = response.Buckets
    console.log('List of buckets:', response.Buckets);
    return NextResponse.json({message:"Success", buckets}, {status:200})

  } catch (error) {
    console.error('Error listing buckets:', error);
    throw NextResponse.json({message:"Error", error}, {status:408});
  }
}


