import Image from "next/image";
import Logo from "../../../components/Logo";

type AppStoreButtonProps = {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
};

function AppStoreButton({ href, label, iconSrc, iconAlt }: AppStoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[130px] md:w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl cursor-pointer text-white bg-black rounded-lg py-[10px] md:py-[15px]"
    >
      {label}
      <Image src={iconSrc} height={20} width={24} alt={iconAlt} />
    </a>
  );
}

export default function MainLinks({ showMobileLinks = true }) {
  return (
    <div className="flex flex-col gap-[50px] items-center justify-center">
      <Logo height={230} width={230} className="w-[170px] md:w-[230px] "/>
      <Image 
        src="/icons/slogan/meet-people.svg" 
        loading="lazy"
        width={350} 
        height={350} 
        alt="Meet new people icon"
        className="w-[250px] md:w-[350px] "/>
      {showMobileLinks && (
        <div className="flex flex-row space-x-[25px] md:space-x-[35px]">
          <AppStoreButton
            href="https://apps.apple.com/us/app/shake-social/id1509052946"
            label="iOS"
            iconSrc="/icons/OS/apple.svg"
            iconAlt="iOS icon"
          />
          <AppStoreButton
            href="https://play.google.com/store/apps/details?id=com.shakeapp.shakeapp"
            label="Android"
            iconSrc="/icons/OS/android.svg"
            iconAlt="Android icon"
          />
        </div>
      )}
    </div>
  )
}