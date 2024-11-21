import Image from "next/image";


export default function LandingHero() {
  return (
    <div className='px-10 w-full flex justify-center relative -top-20'>
        <Image src={`/hero-img.png`} height={600} width={1000} className="w-4/5" alt="hero-bg" />
    </div>
  )
}
