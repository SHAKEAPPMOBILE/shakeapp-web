import Image from "next/image";


export default function Footer(){
  return(
    <div className="flex flex-row flex-wrap justify-around py-[20px] gap-[20px]">
      <div className="flex flex-row items-center justify-center gap-[20px]">
        <a
          href="https://www.instagram.com/shakeapp.inc/"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/icons/socialMedia/instagram.svg" height={14} width={22} alt="Instagram Icon"/>
        </a>
        <a
          href="https://www.tiktok.com/@shake.mobile"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/icons/socialMedia/tik-tok.svg" height={14} width={22} alt="TikTok Icon"/>
        </a>
      </div>
      <div>
        <a
          href="mailto:contact@shakeapp.today"
          target="_blank"
          rel="noopener noreferrer">
          SHAKEapp Inc. 2024 | contact@shakeapp.today
        </a>
      </div>
      <div>
        <a>
          Privacy Policy
        </a>
      </div>
      <div>
        <a>
          Terms of Service
        </a>
      </div>
    </div>
  )
}