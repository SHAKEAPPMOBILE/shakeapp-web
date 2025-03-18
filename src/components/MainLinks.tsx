import Image from "next/image";
import Logo from "./Logo";


export default function MainLinks() {
  return (
    <div className="flex flex-col gap-[50px] items-center justify-center">
      <Logo height={230} width={230} />
      <Image src="/icons/slogan/meet-people.svg" width={350} height={350} alt="Meet new people icon"/>
      <div className="flex flex-row gap-[35px]">
        <a
          href="https://apps.apple.com/us/app/shake-social/id1509052946"
          target="_blank"
          rel="noopener noreferrer">
          <button
            className="w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl 
            cursor-pointer text-white bg-black rounded-lg  py-[15px]">
            IOS
            <Image src="/icons/OS/apple.svg" height={14} width={22} alt="IOS Icon" />
          </button>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.shakeapp.shakeapp"
          target="_blank"
          rel="noopener noreferrer">
          <button
            className="w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl 
            cursor-pointer text-white bg-black rounded-lg py-[15px]">
            Android
            <Image src="/icons/OS/android.svg" height={24} width={26} alt="Android Icon" />
          </button>
        </a>
      </div>
    </div>
  )
}