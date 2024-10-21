import Image from "next/image";

export default function LandingNav() {
  return (
    <div className="flex p-2">
      <div className="flex flex-1"><Image src={`/wma-logo-2.svg`} alt="logo" width={100} height={100} className="w-20"/>  </div>
      <div className="flex items-center">
        <div className="mr-4 text-gray-200">Sign in</div>
        <div> <button className="p-3 bg-blue-900 text-white rounded-xl">Get Started</button> </div>
      </div>
    </div>
  );
}
