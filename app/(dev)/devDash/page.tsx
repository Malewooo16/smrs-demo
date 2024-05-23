import GroupInfo from "@/app/main-components/GroupInfo";

const links = [
    {
      text: "Home",
      description: "Go to the homepage",
      url: "/",
    },
    {
      text: "Login",
      description: "Login in the Page",
      url: "/login",
    },
    {
      text: "Register",
      description: "Parent Registrations",
      url: "/register",
    },
    
  ];

  const users = [
    { name: "dphidgina", password: "bihzGRK6)w{vUj", role:"HeadMaster" },
    { name: "tvonwelden0", password: "pliaGPI8@{Y*Y9fmHw", role:"Teacher" },
    
  ];

  const parents = [
    { name: "rpickerell2", password: "msbaNPG0%~,lidrU+Xq<h=" },
   
  ];
export default function DevDash() {
  return (
    <div className='flex flex-col'>
        <h1 className='text-xl'>Links</h1>
        <div className="flex justify-between max-w-5xl">
        <div className="flex flex-col items-start ">
      {links.map((link, index) => (
        <div key={index} className="my-4">
          <a href={link.url} className="text-blue-600 hover:underline font-bold">
            {link.text}
          </a>
          <p className="text-gray-500">{link.description}</p>
        </div>
      ))}
    </div>
    <GroupInfo groupName="Test School" users={users} definition="Test School For SMRS"/>
    <GroupInfo groupName="Parents" users={parents} definition="Test Parents For SMRS"/>
        </div>

    </div>
  )
}
