'use client';

import Image from 'next/image';
import Logo from '../../../components/Logo';
import BookingModal from '@/components/BookingModal';
import GradientButton from '@/components/GradientButton';
import { useState, useRef } from 'react';
import SubscriptionBox from './SubscriptionBox';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import { motion } from 'framer-motion';

type AppStoreButtonProps = {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function AppStoreButton({
  href,
  label,
  iconSrc,
  iconAlt,
  onClick,
}: AppStoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="w-[130px] md:w-[180px] flex items-center justify-center gap-[7px] font-bold text-xl cursor-pointer text-white bg-black rounded-lg py-[10px] md:py-[15px]"
    >
      {label}
      <Image src={iconSrc} height={20} width={24} alt={iconAlt} />
    </a>
  );
}

export default function MainLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightSubscription, setHighlightSubscription] = useState(false);
  const subscriptionRef = useRef<HTMLDivElement>(null);

  const handleStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setHighlightSubscription(true);

    // Scroll to subscription box if needed, or just highlight
    subscriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset highlight after animation
    setTimeout(() => {
      setHighlightSubscription(false);
    }, 2000);
  };

  return (
    <>
      <FadeInStagger className="flex flex-col gap-[50px] items-center justify-center">
        <FadeIn>
          <Logo height={230} width={230} className="w-[170px] md:w-[230px] " />
        </FadeIn>

        <FadeIn>
          <Image
            src="/icons/slogan/meet-people.svg"
            loading="lazy"
            width={350}
            height={350}
            alt="Meet new people icon"
            className="w-[250px] md:w-[350px] "
          />
        </FadeIn>

        <FadeIn>
          <GradientButton onClick={() => setIsModalOpen(true)}>
            {'  😎 '} Join SHAKE-SOCIAL Club{'  ⚡ '}
            {/* <Image
              src="/icons/food/dish-3.svg"
              height={28}
              width={28}
              alt="Dish icon"
              className="md:h-[32px] md:w-[32px]"
            /> */}
          </GradientButton>
        </FadeIn>

        <FadeIn fullWidth={true}>
          <SubscriptionBox ref={subscriptionRef} highlight={highlightSubscription} />
        </FadeIn>

        <FadeIn>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-gray-600 text-lg md:text-xl">Soon on</p>
            <div className="flex flex-row space-x-[25px] md:space-x-[35px]">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AppStoreButton
                  href="https://apps.apple.com/pt/app/shake-social/id1509052946?l=en-GB"
                  label="iOS"
                  iconSrc="/icons/OS/apple.svg"
                  iconAlt="iOS icon"
                  onClick={handleStoreClick}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AppStoreButton
                  href="https://play.google.com/store/apps/details?id=com.shakeapp.shakeapp&pcampaignid=web_share"
                  label="Android"
                  iconSrc="/icons/OS/android.svg"
                  iconAlt="Android icon"
                  onClick={handleStoreClick}
                />
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </FadeInStagger>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
