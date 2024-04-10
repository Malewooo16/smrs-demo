
import emailjs from "@emailjs/browser"


 const sendValidationEmailToParent = async (emailAddress:string, identifier:string, toName:string,) =>{
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

export default sendValidationEmailToParent