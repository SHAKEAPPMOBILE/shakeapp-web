import Image from "next/image";
import Logo from "./Logo";


export default function MainLinks() {
  return(
    <div className="flex flex-col gap-[35px] items-center justify-center min-h-screen">
      
      <div className="flex flex-col items-center gap-[20px]">
      <Logo height={37} width={46.5}/>
      <p className="font-bold text-3xl text-white">
        SHAKE
      </p>
      </div>
      <div className="flex flex-row gap-[35px]">
        <a 
          className="flex items-center gap-[5px] font-bold text-xl cursor-pointer text-white"
          href="https://apps.apple.com/app/idYOUR_APP_ID" 
          target="_blank" 
          rel="noopener noreferrer">
          IOS
          <Image src="/icons/OS/apple.svg" height={14} width={22} alt="IOS Icon"/>
        </a>
        <a 
          className="flex items-center gap-[5px] font-bold text-xl cursor-pointer text-white"
          href="https://apps.apple.com/app/idYOUR_APP_ID" 
          target="_blank" 
          rel="noopener noreferrer">
          Android
          <Image src="/icons/OS/android.svg" height={24} width={26} alt="Android Icon"/>
        </a>
      </div>
    </div>
  )
}