'use client';

import Image from 'next/image';
import Logo from '../../../components/Logo';
import BookingModal from '@/components/BookingModal';
import { useState } from 'react';

type AppStoreButtonProps = {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
};

function AppStoreButton({
  href,
  label,
  iconSrc,
  iconAlt,
}: AppStoreButtonProps) {
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

export default function MainLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[50px] items-center justify-center">
        <Logo height={230} width={230} className="w-[170px] md:w-[230px] " />
        <Image
          src="/icons/slogan/meet-people.svg"
          loading="lazy"
          width={350}
          height={350}
          alt="Meet new people icon"
          className="w-[250px] md:w-[350px] "
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-row justify-center items-center px-[60px] py-[18px] md:px-[133px] md:py-[21px] gap-[13px] rounded-[80px] text-white text-xl md:text-3xl font-semibold bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 whitespace-nowrap cursor-pointer hover:shadow-lg transition-shadow"
        >
         {'  😎 '} Join SHAKE-SOCIAL Club{'  ⚡ '}
         {/* <Image
            src="/icons/food/dish-3.svg"
            height={28}
            width={28}
            alt="Dish icon"
            className="md:h-[32px] md:w-[32px]"
          /> */}
        </button>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-gray-600 text-lg md:text-xl">Available on</p>
          <div className="flex flex-row space-x-[25px] md:space-x-[35px]">
            <AppStoreButton
              href="https://apps.apple.com/pt/app/shake-social/id1509052946?l=en-GB"
              label="iOS"
               iconSrc="/icons/OS/apple.svg"
              iconAlt="iOS icon" 
            />
            <AppStoreButton
              href="https://play.google.com/store/apps/details?id=com.shakeapp.shakeapp&pcampaignid=web_share"
              label="Android"
              iconSrc="/icons/OS/android.svg"
              iconAlt="Android icon" 
            />
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
