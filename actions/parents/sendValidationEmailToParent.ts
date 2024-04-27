
import emailjs from "@emailjs/browser"


export const sendValidationEmailToParent = async (emailAddress:string, identifier:string, toName:string,) =>{
    const serviceId = "service_jsgnv1l";
    const templateId = "template_gmw2a6i";
    const publicKey = "b-FvyqvR8k3C9GFEo"
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //console.log(process.env.NEXT_PUBLIC_BASE_URL)
    const templateParams ={
        to_name:toName,
        message:`${baseUrl}/register/autoLogin?token=${identifier}`,
        to_email:emailAddress
    }

    try{
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
        return{sucesss:true, message:"Email Sent Succesfully"}
    }

    catch (error){
      console.log("Failed To Send Email", error)
    }
}

export const sendSuccessAdmissionToParent = async (emailAddress:string, studentName:string, schoolName:string) =>{
    const requestData = {
      api_key: "api-43198ADE6E384945996AFCE71A0AFA06",
      to: [`<${emailAddress}>`],
      sender: "MalewooDev <test@jaadvocates.co.tz>",
      subject:"Feedback on Admissions",
      template_id:"3795882",
      template_data:{
        school_name:schoolName,
        student_name:studentName
      }
    }
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(requestData)
    })
    
    if(response.ok){
        return {success:true, message:"Email Successfully Sent"}
    }
    else{
        return {success:false, message:"Error While Sending email"}
    }
    
}

