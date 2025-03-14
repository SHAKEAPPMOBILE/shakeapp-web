'use client';

import { motion } from 'framer-motion';

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-black">
      <div className="w-full h-full relative">
        {/* Top Circle */}
        <motion.div
          className="absolute left-1/2 w-[100vh] h-[100vh] bg-[#339B5E] opacity-70 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            y: ['0%', '-5%', '5%', '0%'],
            x: ['0%', '5%', '-5%', '0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />

        {/* Right Circle */}
        <motion.div
          className="absolute right-[-100px] top-[10%] w-[80vh] h-[80vh] bg-[#775AA2] opacity-70 blur-[120px] rounded-full"
          animate={{
            y: ['0%', '5%', '-5%', '0%'],
            x: ['0%', '-5%', '5%', '0%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />

        {/* Bottom Circle */}
        <motion.div
          className="absolute bottom-[-100px] left-1/2 w-[80vh] h-[80vh] bg-[#C23550] opacity-70 blur-[120px] rounded-full -translate-x-1/2"
          animate={{
            y: ['0%', '-10%', '5%', '0%'],
            x: ['0%', '5%', '-5%', '0%'],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />

        {/* Left Circle */}
        <motion.div
          className="absolute left-[-100px] top-[15%] w-[80vh] h-[80vh] bg-[#EFB12F] opacity-70 blur-[120px] rounded-full"
          animate={{
            y: ['0%', '5%', '-5%', '0%'],
            x: ['0%', '-5%', '5%', '0%'],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
