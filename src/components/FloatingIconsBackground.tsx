'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const icons = [
  { src: '/icons/food/burger.png' },
  { src: '/icons/food/tropical-drink.svg' },
  { src: '/icons/food/dish-3.svg' },
  { src: '/icons/activities/hiker.svg' },
  { src: '/icons/avatars/avatar-1.svg' },
  { src: '/icons/avatars/avatar-2.svg' },
  { src: '/icons/avatars/avatar-3.svg' },
  { src: '/icons/avatars/avatar-4.svg' },
  { src: '/icons/avatars/avatar-5.svg' },

];

// Function to generate a random position anywhere on the screen
const getRandomPosition = () => ({
  x: `${Math.random() * 100}vw`,
  y: `${Math.random() * 100}vh`,
});

// Function to generate a random movement direction across the whole screen
const getRandomMovement = () => ({
  x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
  y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
});

// Function to generate a random rotation between -20° and 20°
const getRandomRotation = () => Math.random() * 40 - 20; // -20° to 20°

export default function FloatingIconsBackground() {
  const [randomizedIcons, setRandomizedIcons] = useState<
    {
      src: string;
      duration: number;
      initialPosition: { x: string; y: string };
    }[]
  >([]);

  useEffect(() => {
    setRandomizedIcons(
      icons.map((icon) => ({
        ...icon,
        duration: Math.random() * 5 + 7, // Random duration (7s - 12s)
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
            ...getRandomMovement(),
            opacity: 1,
            rotate: [
              getRandomRotation(),
              getRandomRotation(),
              getRandomRotation(),
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 5, // Random speed per icon (5s - 15s)
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
