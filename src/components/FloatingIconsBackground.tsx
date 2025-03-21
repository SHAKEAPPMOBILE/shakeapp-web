'use client';

import { getRandomMovement, getRandomPosition, getRandomRotation } from '@/utils/floatingIconsBg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Icon {
  src: string;
  duration: number;
  initialPosition: { x: string; y: string };
}

const icons = [
  { src: '/icons/food/burger.svg' },
  { src: '/icons/food/tropical-drink.svg' },
  { src: '/icons/food/dish-3.svg' },
  { src: '/icons/activities/hiker.svg' },
  { src: '/icons/avatars/avatar-1.svg' },
  { src: '/icons/avatars/avatar-2.svg' },
  { src: '/icons/avatars/avatar-3.svg' },
  { src: '/icons/avatars/avatar-4.svg' },
  { src: '/icons/avatars/avatar-5.svg' },
];

export default function FloatingIconsBackground() {
  const [randomizedIcons, setRandomizedIcons] = useState<Icon[]>([]);

  useEffect(() => {
    setRandomizedIcons(
      icons.map((icon) => ({
        ...icon,
        duration: Math.random() * 5 + 7, 
        initialPosition: getRandomPosition(),
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {randomizedIcons.map((icon, index) => (
        <motion.img
          key={index}
          src={icon.src}
          alt={`Floating icon ${index}`}
          className="absolute w-[80px] h-auto opacity-70"
          initial={{
            ...icon.initialPosition,
            opacity: 0,
            rotate: getRandomRotation(),
          }}
          animate={{
            ...getRandomMovement(icon.src),
            opacity: [0, 1, 0], 
            rotate: [
              getRandomRotation(),
              getRandomRotation(),
              getRandomRotation(),
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 5, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
