import Image from "next/image";
import Logo from "../../../components/Logo";


export default function MainLinks({ showMobileLinks = true }) {
  return (
    <div className="flex flex-col gap-[50px] items-center justify-center">
      <Logo height={230} width={230} className="w-[170px] md:w-[230px] "/>
      <Image 
        src="/icons/slogan/meet-people.svg" 
        width={350} 
        height={350} 
        alt="Meet new people icon"
        className="w-[250px] md:w-[350px] "/>
      {showMobileLinks && (
        <div className="flex flex-row space-x-[25px] md:space-x-[35px]">
<a
  href="https://apps.apple.com/us/app/shake-social/id1509052946"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[130px] md:w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl cursor-pointer text-white bg-black rounded-lg py-[10px] md:py-[15px]"
>
  IOS
  <Image src="/icons/OS/apple.svg" height={14} width={22} alt="iOS Icon" />
</a>
<a
  href="https://play.google.com/store/apps/details?id=com.shakeapp.shakeapp"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[130px] md:w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl cursor-pointer text-white bg-black rounded-lg py-[10px] md:py-[15px]"
>
  Android
  <Image src="/icons/OS/android.svg" height={14} width={22} alt="Android Icon" />
</a>

        </div>
      )}
    </div>
  )
}