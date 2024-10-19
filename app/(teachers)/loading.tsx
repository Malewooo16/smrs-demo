import Image from "next/image"

export default function loading() {
    //TODO use loading skeleton
  return (
    <div className="w-full h-full flex justify-center items-center">
        <Image className='w-30 rounded-full' src='/wma-logo.png' alt={"logo"} height={256} width={192} priority = {true} />
    </div>
  )
}
